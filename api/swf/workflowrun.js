'use strict';

const Q = require('q');
const testParse = require('../../lib/test-parse');
const createLambdaTask = require('./lambda-task');

module.exports = function createWorkflowRun(p) {
  return new WorkflowRun(p);
};

const awsCommon = require('../../lib/aws-common');

// Active states
const RUN_STATE_RUNNING = 0;
const RUN_STATE_CANCEL_REQUESTED = 1;

// Closed states
const RUN_STATE_CLOSED_STATE_START = 10;
const RUN_STATE_COMPLETED = 10;
const RUN_STATE_FAILED = 11;
const RUN_STATE_CANCELED = 12;
const RUN_STATE_TERMINATED = 13;
const RUN_STATE_CONTINUED_AS_NEW = 14;
const RUN_STATE_TIMED_OUT = 15;

/**
 * @constructor
 * @param {Object} p - parameters
 * @param {WorkflowType} p.workflowType
 * @param {string} p.workflowId
 * @param {function} p.outOfBandEventFunc
 * @param {string} [p.lambdaRole]
 * @param {string} [p.taskStartToCloseTimeout]
 * @param {string} [p.executionStartToCloseTimeout]
 * @param {string} [p.taskPriority]
 * @param {string} [p.childPolicy]
 * @param {Object} [p.taskList]
 * @param {string} [p.taskList.name]
 * @param {string[]} [p.tagList]
 * @param {string} [p.input]
 */
function WorkflowRun(p) {
  this.workflowType = p.workflowType;
  this.workflowId = p.workflowId;
  this.outOfBandEventFunc = p.outOfBandEventFunc;
  this.runId = awsCommon.genRequestId();
  this.executionConfiguration = {
    lambdaRole: p.lambdaRole || p.workflowType.configuration.defaultLambdaRole,
    executionStartToCloseTimeout: p.executionStartToCloseTimeout || p.workflowType.configuration.defaultExecutionStartToCloseTimeout,
    taskPriority: p.taskPriority || p.workflowType.configuration.defaultTaskPriority,
    childPolicy: p.childPolicy || p.workflowType.configuration.defaultChildPolicy,
    taskList: null,

    // Decision task start to close timeout, not activity task.
    taskStartToCloseTimeout: p.taskStartToCloseTimeout || p.workflowType.configuration.defaultTaskStartToCloseTimeout,
  };
  if (!!p.taskList && !!p.taskList.name) {
    this.executionConfiguration.taskList = { name: p.taskList.name };
  } else if (!!p.workflowType.configuration.defaultTaskList) {
    this.executionConfiguration.taskList = {
      name: p.workflowType.configuration.defaultTaskList.name,
    };
  }

  // Creation-time settings
  this.tagList = p.tagList || [];
  this.executionContext = p.input || '';

  // Parent workflow's run ID
  this.parentRunId = null;
  this.parentWorkflowId = null;

  // StartChildWorkflowExecutionInitiated event
  this.childInitiatedEvent = null;

  // ChildWorkflowExecutionStarted event
  this.childStartedEvent = null;

  // Remove the decision task when a response handles it.
  // TODO ensure this is removed at the right time.
  this.openDecisionTasks = [];

  // Remove a timer when it is cancelled or fired.
  this.openTimers = [];

  // Remove the lambda when it finishes (however that is)
  // TODO ensure this is removed at the right time.
  this.openLambdaFunctions = [];

  // Remove the activity when it finishes (however that is)
  // TODO ensure this is removed at the right time.
  this.openActivityTasks = [];

  // These are only cleaned up when explicitly told to clean them
  // up.  This means that the list can contain both open and closed
  // workflows.
  this.childWorkflowExecutions = [];

  // Never cleaned up
  this.eventHistory = [];

  this.startTimestamp = awsCommon.timestamp();
  this.closeTimestamp = null;
  this.runState = RUN_STATE_RUNNING;
  this.latestActivityTaskTimestamp = awsCommon.timestamp();
  this.previousStartedEventId = null;

  // Expire the workflow run after a certain period of time.
  var t = this;
  var timeout = this.executionConfiguration.executionStartToCloseTimeout * 1000;
  setTimeout(function() { t.__timeOut(); }, timeout);
}
WorkflowRun.prototype.getMissingDefault = function getMissingDefault() {
  var defaultParams = {
    taskStartToCloseTimeout: 'DEFAULT_TASK_START_TO_CLOSE_TIMEOUT_UNDEFINED',
    executionStartToCloseTimeout: 'DEFAULT_EXECUTION_START_TO_CLOSE_TIMEOUT_UNDEFINED',
    childPolicy: 'DEFAULT_CHILD_POLICY_UNDEFINED',
    taskList: 'DEFAULT_TASK_LIST_UNDEFINED',

    // No default is fine for these
    // ` lambdaRole: '',
    // ` taskPriority: '',
  };
  for (var k in defaultParams) {
    if (defaultParams.hasOwnProperty(k)) {
      if (!this.executionConfiguration[k]) {
        return defaultParams[k];
      }
    }
  }
  if (!this.executionConfiguration.taskList.name) {
    return 'DEFAULT_TASK_LIST_UNDEFINED';
  }
  return null;
};
WorkflowRun.prototype.overrideDefault = function overrideDefault(key, value) {
  if (!!value) {
    this.executionConfiguration[key] = value;
  }
};
WorkflowRun.prototype.summary = function summary() {
  return {
    closeStatus: this.getCloseStatus(),
    parent: this.parentRunId === null ? null : {
      workflowId: this.parentWorkflowId,
      runId: this.parentRunId,
    },
    startTimestamp: '' + this.startTimestamp,
    cancelRequested: this.runState === RUN_STATE_CANCEL_REQUESTED,
    tagList: this.tagList,
    workflowType: {
      version: this.workflowType.version,
      name: this.workflowType.name,
    },
    closeTimestamp: this.closeTimestamp,
    execution: {
      workflowId: this.workflowId,
      runId: this.runId,
    },
    executionStatus: this.runState < RUN_STATE_CLOSED_STATE_START ? 'OPEN' : 'CLOSED',
  };
};
WorkflowRun.prototype.describe = function describe() {
  return {
    executionConfiguration: this.executionConfiguration,
    openCounts: {
      openDecisionTasks: this.openDecisionTasks.length,
      openTimers: this.openTimers.length,
      openLambdaFunctions: this.openLambdaFunctions.length,
      openActivityTasks: this.openActivityTasks.length,
      childWorkflowExecutions: this.getOpenChildWorkflowExecutions().length,
    },
    executionInfo: this.summary(),
    latestActivityTaskTimestamp: '' + this.latestActivityTaskTimestamp,
    latestExecutionContext: this.executionContext,
  };
};
WorkflowRun.prototype.getCloseStatus = function getCloseStatus() {
  switch (this.runState) {
    case RUN_STATE_COMPLETED: {
      return 'COMPLETED';
    }
    case RUN_STATE_FAILED: {
      return 'FAILED';
    }
    case RUN_STATE_CANCELED: {
      return 'CANCELED';
    }
    case RUN_STATE_TERMINATED: {
      return 'TERMINATED';
    }
    case RUN_STATE_CONTINUED_AS_NEW: {
      return 'CONTINUED_AS_NEW';
    }
    case RUN_STATE_TIMED_OUT: {
      return 'TIMED_OUT';
    }
    default: {
      // ` console.log(`Illegal workflow run state ${this.runState}`);
      return null;
    }
  }
};
WorkflowRun.prototype.getOpenChildWorkflowExecutions = function getOpenChildWorkflowExecutions() {
  // Take the time to clean out closed workflows
  var open = [];
  var child;
  for (var i = 0; i < this.childWorkflowExecutions.length; i++) {
    child = this.childWorkflowExecutions[i];
    if (!child.isClosed()) {
      open.push(child);
    }
  }
  this.childWorkflowExecutions = open;
  return open;
};
WorkflowRun.prototype.matches = function matches(workflowId, runId) {
  // Note: both runId and workflowId are optional, but at least one
  // must be set.
  return (
    (!!workflowId || !!runId) &&
    (!!workflowId || this.workflowId === workflowId) &&
    (!runId || this.runId === runId)
  );
};
WorkflowRun.prototype.describeEvents = function describeEvents() {
  var events = [];
  for (var i = 0; i < this.eventHistory.length; i++) {
    events.push(this.eventHistory[i].describe());
  }
  return events;
};
WorkflowRun.prototype.isClosed = function isClosed() {
  return this.runState >= RUN_STATE_CLOSED_STATE_START;
};
WorkflowRun.prototype.matchesFilter = function matchesFilter(filterMap) {
  var tagFilter = filterMap.tagFilter;
  var executionFilter = filterMap.executionFilter;
  var closeStatusFilter = filterMap.closeStatusFilter;
  var closeTimeFilter = filterMap.closeTimeFilter;
  var startTimeFilter = filterMap.startTimeFilter;
  var typeFilter = filterMap.typeFilter;

  // Time filters are independent of each other, and the other
  // filters are independent of each other.  However,
  // they must cooperate.

  var timeFilterPass = true;
  var otherFilterPass = true;

  if (!!startTimeFilter) {
    if (!!startTimeFilter.latestDate) {
      // Optional parameter
      if (this.startTimestamp > testParse.parseInteger(startTimeFilter.latestDate)) {
        timeFilterPass = false;
      }
    }
    timeFilterPass = timeFilterPass &&
      (this.startTimestamp >= testParse.parseInteger(startTimeFilter.oldestDate));
  }
  if (!!closeTimeFilter) {
    if (!!closeTimeFilter.latestDate) {
      // Optional parameter
      if (this.closeTimestamp > testParse.parseInteger(closeTimeFilter.latestDate)) {
        timeFilterPass = false;
      }
    }
    timeFilterPass = timeFilterPass &&
      (this.closeTimestamp >= testParse.parseInteger(closeTimeFilter.oldestDate));
  }

  if (!!closeStatusFilter) {
    otherFilterPass = otherFilterPass && (this.getCloseStatus() === closeStatusFilter.status);
  }
  if (!!executionFilter) {
    otherFilterPass = otherFilterPass && (this.workflowId === executionFilter.workflowId);
  }
  if (!!tagFilter) {
    var doTagFilter = false;
    for (var i = 0; i < this.tagList.length; i++) {
      if (tagFilter.tag === this.tagList[i]) {
        doTagFilter = true;
        break;
      }
    }
    otherFilterPass = otherFilterPass && doTagFilter;
  }
  if (!!typeFilter) {
    otherFilterPass = otherFilterPass &&
      (this.workflowType.name === typeFilter.name &&
      this.workflowType.version === typeFilter.version);
  }

  return otherFilterPass && timeFilterPass;
};


/**
 * @param {Object} p - parameters
 * @param {WorkflowRun} p.childWorkflow - child workflow to add.
 * @param {WorkflowEvent} p.childInitiatedEvent - event from the parent
 *   (this workflow) decision that requests the execution of the child
 *   workflow.
 * @param {WorkflowEvent} p.childStartedEvent - event that
 *   indicates that the child workflow was created.
 */
WorkflowRun.prototype.addChild = function addChild(p) {
  var childWorkflow = p.childWorkflow;
  var childStartedEvent = p.childStartedEvent;
  var childInitiatedEvent = p.childInitiatedEvent;

  childWorkflow.childStartedEvent = childStartedEvent;
  childWorkflow.childInitiatedEvent = childInitiatedEvent;
  childWorkflow.parentRunId = this.runId;
  childWorkflow.parentWorkflowId = this.workflowId;

  this.childWorkflowExecutions.push(childWorkflow);
};


WorkflowRun.prototype.getDecisionTaskByToken = function getDecisionTaskByToken(taskToken) {
  for (var j = 0; j < this.openDecisionTasks.length; j++) {
    var task = this.openDecisionTasks[j];
    if (task.isOpen() && task.taskToken === taskToken) {
      return task;
    }
  }
  return null;
};


WorkflowRun.prototype.getActivityTaskByToken = function getActivityTaskByToken(taskToken) {
  for (var i = 0; i < this.openActivityTasks.length; i++) {
    var task = this.openActivityTasks[i];
    if (task.isOpen() && task.taskToken === taskToken) {
      return task;
    }
  }
  return null;
};


WorkflowRun.prototype.getActivityTaskById = function getActivityTaskById(id) {
  for (var i = 0; i < this.openActivityTasks.length; i++) {
    var task = this.openActivityTasks[i];
    if (task.isOpen() && task.activityId === id) {
      return task;
    }
  }
  return null;
};


WorkflowRun.prototype.getLambdaTaskById = function getLambdaTaskById(id) {
  for (var i = 0; i < this.openLambdaFunctions.length; i++) {
    var task = this.openLambdaFunctions[i];
    if (task.isOpen() && task.lambdaId === id) {
      return task;
    }
  }
  return null;
};


// ---------------------------------------------------------------------------
// Event Processing


/**
 * An in-band request to terminate a process.
 *
 * @param {Object} p - parameters
 * @param {string} p.reason - reaspon for the termination
 * @param {string} [p.cause='OPERATOR_INITIATED'] - cause of the termination
 * @param {string} p.details - details for the termination
 * @param {string} [p.requestedChildPolicy] - requested child termination policy
 * @return {Object[]} event objects created by this terminate event.
 */
WorkflowRun.prototype.terminate = function terminate(p) {
  var reason = p.reason;
  var details = p.details;
  var childPolicy = p.requestedChildPolicy ||
    this.executionConfiguration.childPolicy;
  var cause = p.cause || 'OPERATOR_INITIATED';

  if (this.isClosed()) {
    // Don't change the actual state.
    return [];
  }

  return this.__close({
    closeState: RUN_STATE_TERMINATED,
    childPolicy: childPolicy,
    closeEvent: {
      name: 'WorkflowExecutionTerminated',
      data: {
        details: details,
        cause: cause,
        reason: reason,
        childPolicy: childPolicy,
      },
    },
    parentEvent: {
      name: 'ChildWorkflowExecutionTerminated',
      data: {
        // No extra values
      },
    },
  });
};


/**
 * An in-band request to generate a start workflow event.  There was no
 * parent event that spawned this workflow.
 */
WorkflowRun.prototype.createWorkflowExecutionStartedEvent = function createWorkflowExecutionStartedEvent() {
  return {
    workflow: this,
    name: 'WorkflowExecutionStarted',
    data: {
      taskList: { name: this.executionConfiguration.taskList.name },
      // This is initiated explicitly as a first workflow, so no parent.
      parentInitiatedEventId: 0,
      taskStartToCloseTimeout: '' + (this.executionConfiguration.taskStartToCloseTimeout),
      childPolicy: this.executionConfiguration.childPolicy,
      executionStartToCloseTimeout: '' + (this.executionConfiguration.executionStartToCloseTimeout),
      input: this.executionContext,
      workflowType: {
        version: this.workflowType.version,
        name: this.workflowType.name,
      },
      tagList: this.tagList,
    },
  };
};


/**
 * An in-band request to generate the request cancel events.
 *
 * @param {Object} p - parameters
 * @param {boolean} [p.forChild=false] - request sent to the children workflows
 * @param {WorkflowEvent} [p.externalInitiatedEvent] - if the request came from
 *    another workflow, this is the
 *    RequestCancelExternalWorkflowExecutionInitiated event from the calling
 *    workflow.
 * @param {WowkflowRun} [p.externalWorkflow] - workflow that generated the
 *    RequestCancelExternalWorkflowExecutionInitiated event.
 */
WorkflowRun.prototype.createRequestCancelEvents = function createRequestCancelEvents(p) {
  var cause = !!p.forChild ? 'CHILD_POLICY_APPLIED' : null;
  var externalInitiatedEventId = (!!p.externalInitiatedEvent
    ? p.externalInitiatedEvent.id
    : null);
  var externalWorkflowExecution = (!!p.externalWorkflow
    ? {
      runId: p.externalWorkflow.runId,
      workflowId: p.externalWorkflow.workflowId,
    }
    : null);
  return [{
    name: 'WorkflowExecutionCancelRequested',
    data: {
      cause: cause,
      externalInitiatedEventId: externalInitiatedEventId,
      externalWorkflowExecution: externalWorkflowExecution,
    },
  },];
};


/**
 * Signal that does **not** come from a decision, but rather from an
 * application or operator.
 *
 * @param {Object} p - parameters
 * @param {string} p.signalName - signal name
 * @param {string} p.input - context data
 */
WorkflowRun.prototype.createSignalWorkflowEvent = function createSignalWorkflowEvent(p) {
  var signalName = p.signalName;
  var input = p.input;
  return {
    workflow: this,
    name: 'WorkflowExecutionSignaled',
    data: {
      externalInitiatedEventId: null,
      externalWorkflowExecution: null,
      signalName: signalName,
      input: input,
    },
  };
};


WorkflowRun.prototype.createDecisionTaskScheduledEvent = function createDecisionTaskScheduledEvent() {
  return {
    workflow: this,
    name: 'DecisionTaskScheduled',
    data: {
      startToCloseTimeout: this.executionConfiguration.executionStartToCloseTimeout,
      taskList: { name: this.executionConfiguration.taskList.name },
      taskPriority: this.executionConfiguration.taskPriority,
    },
  };
};


/**
 * Handle a "decision" from the decider.  The decision object should already
 * be checked to have the 'decisionType' key, and the corresponding decision
 * attribute key, which follows a well established pattern (e.g.
 * CancelTimer -> cancelTimerDecisionAttributes).
 *
 * @return {string|Object[]} string if an error, object list for the events.
 */
WorkflowRun.prototype.handleDecision = function handleDecision(p) {
  var decision = p.decision;
  var completedEvent = p.decisionTaskCompletedEvent;
  var decisionTaskCompletedEventId = completedEvent.id;
  var t = this;
  switch (decision.decisionType) {
    // .....................................................................
    case 'CancelTimer': {
      let attrs = decision.cancelTimerDecisionAttributes;
      let timerId = attrs.timerId;
      if (!timerId) {
        return 'cancelTimerDecisionAttributes.timerId';
      }
      let timer = this.getTimer(timerId);
      if (!timer) {
        return [{
          name: 'CancelTimerFailed',
          data: {
            cause: 'TIMER_ID_UNKNOWN',
            decisionTaskCompletedEventId: decisionTaskCompletedEventId,
            timerId: timerId,
          },
        },];
      }
      this.deleteTimer(timerId);
      return [timer.cancel(decisionTaskCompletedEventId)];
    }

    // .....................................................................
    case 'CancelWorkflowExecution': {
      let attrs = decision.cancelWorkflowExecutionDecisionAttributes;
      let details = attrs.details;
      // Don't include our own decision
      if (this.openDecisionTasks.length > 1) {
        console.log(`[WORKFLOW ${this.workflowId}] could not cancel because ${this.openDecisionTasks.length} decision tasks are unhandled`);
        return [{
          name: 'CancelWorkflowExecutionFailed',
          data: {
            cause: 'UNHANDLED_DECISION',
            decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          },
        },];
      }
      return this.__cancel({
        decisionTaskCompletedEventId: decisionTaskCompletedEventId,
        details: details,
      });
    }

    // .....................................................................
    case 'CompleteWorkflowExecution': {
      let attrs = decision.completeWorkflowExecutionDecisionAttributes;
      let result = attrs.result;
      // Don't include our own decision
      if (this.openDecisionTasks.length > 1) {
        console.log(`[WORKFLOW ${this.workflowId}] could not complete because ${this.openDecisionTasks.length} decision tasks are unhandled`);
        return [{
          name: 'CompleteWorkflowExecutionFailed',
          data: {
            cause: 'UNHANDLED_DECISION',
            decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          },
        },];
      }
      return this.__complete({
        decisionTaskCompletedEventId: decisionTaskCompletedEventId,
        result: result,
      });
    }

    // .....................................................................
    case 'ContinueAsNewWorkflowExecution': {
      let attrs = decision.continueAsNewWorkflowExecutionDecisionAttributes;
      let childPolicy = attrs.childPolicy;
      let executionStartToCloseTimeout = attrs.executionStartToCloseTimeout;
      let input = attrs.input;
      let lambdaRole = attrs.lambdaRole;
      let tagList = attrs.tagList;
      let taskList = { name: attrs.taskList.name };
      let taskPriority = attrs.taskPriority;
      let taskStartToCloseTimeout = attrs.taskStartToCloseTimeout;
      let workflowTypeVersion = attrs.workflowTypeVersion;
      // FIXME implement
      return [{
        ERROR: true,
        result: [500, 'Server', 'ServerFailure', 'ContinueAsNewWorkflowExecution - Not Implemented'],
      },];
    }

    // .....................................................................
    case 'FailWorkflowExecution': {
      let attrs = decision.failWorkflowExecutionDecisionAttributes;
      let details = attrs.details;
      let reason = attrs.reason;
      // Don't include our own workflow
      if (this.openDecisionTasks.length > 1) {
        console.log(`[WORKFLOW ${this.workflowId}] could not fail because ${this.openDecisionTasks.length} decision tasks are unhandled`);
        return [{
          name: 'FailWorkflowExecutionFailed',
          data: {
            cause: 'UNHANDLED_DECISION',
            decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          },
        },];
      }
      return this.__fail({
        decisionTaskCompletedEventId: decisionTaskCompletedEventId,
        reason: reason,
        details: details,
      });
    }

    // .....................................................................
    case 'RecordMarker': {
      let attrs = decision.recordMarkerDecisionAttributes;
      let details = attrs.details;
      let markerName = attrs.markerName;
      if (!markerName) {
        return 'recordMarkerDecisionAttributes.markerName';
      }
      return [{
        name: 'MarkerRecorded',
        data: {
          markerName: markerName,
          decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          details: details,
        },
      },];
    }

    // .....................................................................
    case 'RequestCancelActivityTask': {
      let attrs = decision.requestCancelActivityTaskDecisionAttributes;
      let activityId = decision.activityId;

      // Add ActivityTaskCancelRequested to the workflow events.
      // If the activity has not started yet, then belay that order
      // and mark the activity as canceled.
      // If the activity has been started, then send the cancel request
      // through the heart-beat response mechanism.
      // If the activity has already stopped, then return a failure event.

      let mkPost = function mkPost(task) {
        return function postEventCreation(p) {
          var sourceEvent = p.sourceEvent;
          // This request can potentially generate an actual
          // cancellation.
          return task.requestCancel({
            cancelRequestedEventId: sourceEvent.id,
          });
        };
      };

      for (let i = 0; i < this.openActivityTasks.length; i++) {
        let task = this.openActivityTasks[i];
        if (activityId === task.activityId) {
          // The request is always entered, regardless of the state of the
          // task.
          return [{
            name: 'ActivityTaskCancelRequested',
            data: {
              activityId: activityId,
              decisionTaskCompletedEventId: decisionTaskCompletedEventId,
            },
            // Don't make a function within a loop, so create it in a called-to function.
            postEventCreation: mkPost(task),
          },];
        }
      }

      // Could not find the activity.
      return [{
        name: 'RequestCancelActivityTaskFailed',
        data: {
          activityId: activityId,
          cause: 'ACTIVITY_ID_UNKNOWN',
          decisionTaskCompletedEventId: decisionTaskCompletedEventId,
        },
      },];
    }

    // .....................................................................
    case 'RequestCancelExternalWorkflowExecution': {
      let attrs = decision.requestCancelExternalWorkflowExecutionDecisionAttributes;
      let control = attrs.control;
      let runId = attrs.runId;
      let workflowId = attrs.workflowId;

      // This event causes an external event to signal.
      // We need to process the external event signal
      // after this event that declares the initiation of
      // the event.  It's kind of convoluted, but it has
      // an internal logic.  We handle this processing
      // by taking advantage of the `postEventCreation`
      // method.
      return [{
        name: 'RequestCancelExternalWorkflowExecutionInitiated',
        data: {
          control: control,
          decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          runId: runId,
          workflowId: workflowId,
        },
        postEventCreation: function postEventCreation(p) {
          var sourceEvent = p.sourceEvent;
          var getWorkflowRun = p.getWorkflowRun;
          var extWorkflowRun = getWorkflowRun({
            workflowId: workflowId,
            runid: runId,
          });
          if (!extWorkflowRun || extWorkflowRun.isClosed()) {
            return [{
              workflow: t,
              name: 'RequestCancelExternalWorkflowExecutionFailed',
              data: {
                cause: 'UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION',
                control: control,
                decisionTaskCompletedEventId: decisionTaskCompletedEventId,
                initiatedEventId: null, // No generated event
                runId: runId,
                workflowId: workflowId,
              },
            },];
          }
          return [{
            workflow: extWorkflowRun,
            name: 'WorkflowExecutionCancelRequested',
            data: {
              cause: null,
              externalInitiatedEventId: sourceEvent.id,
              externalWorkflowExecution: {
                workflowId: t.workflowId,
                runId: t.runid,
              },
            },
          }, {
            workflow: t,
            name: 'ExternalWorkflowExecutionCancelRequested',
            data: {
              initiatedEventId: sourceEvent.id,
              workflowExecution: {
                workflowId: extWorkflowRun.workflowId,
                runId: extWorkflowRun.runId,
              },
            },
          },];
        },
      },];
    }

    // .....................................................................
    case 'ScheduleActivityTask': {
      let attrs = decision.scheduleActivityTaskDecisionAttributes;
      let activityId = attrs.activityId;
      let activityTypeName = attrs.activityType.name;
      let activityTypeVersion = attrs.activityType.version;
      let control = attrs.control;
      let input = attrs.input;
      let heartbeatTimeout = attrs.heartbeatTimeout;
      let scheduleToCloseTimeout = attrs.scheduleToCloseTimeout;
      let scheduleToStartTimeout = attrs.scheduleToStartTimeout;
      let startToCloseTimeout = attrs.startToCloseTimeout;
      let taskList = attrs.taskList;
      let taskPriority = attrs.taskPriority;

      // We don't do anything at the start, because we need to find the
      // activity type (which may not exist).

      return [{
        postEventCreation: function postEventCreation(p) {
          var getActivityType = p.getActivityType;
          var activityType = getActivityType({
            name: activityTypeName,
            version: activityTypeVersion,
          });
          var err = null;
          var activity = null;

          if (!activityType) {
            err = 'ACTIVITY_TYPE_DOES_NOT_EXIST';
          } else if (t.getActivityTaskById(activityId)) {
            err = 'ACTIVITY_ID_ALREADY_IN_USE';
          } else if (activityType.isDeprecated()) {
            err = 'ACTIVITY_TYPE_DEPRECATED';
          } else {
            activity = activityType.createActivityTask({
              activityId: activityId,
              input: input,
              control: control,
              heartbeatTimeout: heartbeatTimeout,
              scheduleToCloseTimeout: scheduleToCloseTimeout,
              scheduleToStartTimeout: scheduleToStartTimeout,
              startToCloseTimeout: startToCloseTimeout,
              taskPriority: taskPriority,
              taskList: taskList,
              outOfBandEventFunc: t.outOfBandEventFunc,
              workflowRun: t,
            });
            err = activity.getMissingDefault();
          }

          if (!!err) {
            return [{
              workflow: t,
              name: 'ScheduleActivityTaskFailed',
              data: {
                activityId: activityId,
                activityType: { name: activityTypeName, version: activityTypeVersion },
                cause: err,
                decisionTaskCompletedEventId: decisionTaskCompletedEventId,
              },
            },];
          }

          // We have the new activity.  Schedule it to start.
          // Note that this returned event should know how to deal with
          // updating the acitivy from the generated event.
          return activity.createScheduledEvents({
            decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          });
        },
      },];
    }

    // .....................................................................
    case 'ScheduleLambdaFunction': {
      let attrs = decision.scheduleLambdaFunctionDecisionAttributes;
      let id = attrs.id;
      let input = attrs.input;
      let name = attrs.name;
      let startToCloseTimeout = attrs.startToCloseTimeout;

      let lambda = createLambdaTask({
        workflowRun: this,
        outOfBandEventFunc: this.outOfBandEventFunc,
        id: id,
        name: name,
        startToCloseTimeout: startToCloseTimeout || '300', // 60 * 5 TODO what is the default?
        input: input,
      });

      let ret = lambda.createScheduledEvents({
        decisionTaskCompletedEventId: decisionTaskCompletedEventId,
      });
      // ` for (let i = 0; i < ret.length; i++) {
      // `   console.log(`[WORKFLOW ${this.workflowId}] lambda scheduled event: ${ret[i].name}`);
      // ` }
      return ret;
    }

    // .....................................................................
    case 'SignalExternalWorkflowExecution': {
      let attrs = decision.signalExternalWorkflowExecutionDecisionAttributes;
      let control = attrs.control;
      let input = attrs.input;
      let runId = attrs.runId;
      let signalName = attrs.signalName;
      if (!signalName) {
        return 'signalExternalWorkflowExecutionDecisionAttributes.signalName';
      }
      let workflowId = attrs.workflowId;
      if (!workflowId) {
        return 'signalExternalWorkflowExecutionDecisionAttributes.workflowId';
      }

      // Uses the workflow -> event -> workflow logic.
      return [{
        name: 'SignalExternalWorkflowExecutionInitiated',
        data: {
          control: control,
          input: input,
          decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          signalName: signalName,
          workflowId: workflowId,
          runId: runId,
        },
        postEventCreation: function postEventCreation(p) {
          var sourceEvent = p.sourceEvent;
          var getWorkflowRun = p.getWorkflowRun;
          var extWorkflowRun = getWorkflowRun({
            workflowId: workflowId,
            runid: runId,
          });
          if (!extWorkflowRun || extWorkflowRun.isClosed()) {
            return [{
              workflow: t,
              name: 'SignalExternalWorkflowExecutionFailed',
              data: {
                cause: 'UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION',
                control: control,
                decisionTaskCompletedEventId: decisionTaskCompletedEventId,
                initiatedEventId: sourceEvent.id,
                runId: runId,
                workflowId: workflowId,
              },
            },];
          }
          return [{
            workflow: extWorkflowRun,
            name: 'WorkflowExecutionSignaled',
            data: {
              signalName: signalName,
              input: input,
              externalInitiatedEventId: sourceEvent.id,
              externalWorkflowExecution: {
                workflowId: t.workflowId,
                runId: t.runId,
              },
            },
          }, {
            workflow: t,
            name: 'ExternalWorkflowExecutionSignaled',
            data: {
              initiatedEventId: sourceEvent.id,
              workflowExecution: {
                workflowId: extWorkflowRun.workflowId,
                runId: extWorkflowRun.runId,
              },
            },
          },];
        },
      },];
    }

    // ..............................
    case 'StartChildWorkflowExecution': {
      let attrs = decision.startChildWorkflowExecutionDecisionAttributes;
      let childPolicy = attrs.childPolicy;
      let control = attrs.control;
      let executionStartToCloseTimeout = attrs.executionStartToCloseTimeout;
      let input = attrs.input;
      let lambdaRole = attrs.lambdaRole;
      let tagList = attrs.tagList;
      let taskList = attrs.taskList;
      let taskPriority = attrs.taskPriority;
      let taskStartToCloseTimeout = attrs.taskStartToCloseTimeout;
      let workflowId = attrs.workflowId;
      let workflowType = attrs.workflowType;

      if (!workflowId) {
        return 'startChildWorkflowExecutionDecisionAttributes.workflowId';
      }
      if (!workflowType || !workflowType.name || !workflowType.version) {
        return 'startChildWorkflowExecutionDecisionAttributes.workflowType';
      }

      // Uses the workflow -> event -> workflow logic.
      return [{
        name: 'StartChildWorkflowExecutionInitiated',
        data: {
          decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          childPolicy: childPolicy || 'TERMINATE', // Just guess.
          control: control,
          input: input,
          executionStartToCloseTimeout: executionStartToCloseTimeout,
          lambdaRole: lambdaRole,
          tagList: tagList,
          taskList: taskList || { name: 'unknown' }, // Just a guess.
          taskPriority: taskPriority,
          taskStartToCloseTimeout: taskStartToCloseTimeout,
          workflowId: workflowId,
          workflowType: { name: workflowType.name, version: workflowType.version },
        },
        postEventCreation: function postEventCreation(p) {
          var sourceEvent = p.sourceEvent;
          var getWorkflowType = p.getWorkflowType;
          var hasOpenWorkflowId = p.hasOpenWorkflowId;
          var registerChildWorkflowRun = p.registerChildWorkflowRun;
          var err = null;
          var workflowTypeObj = getWorkflowType(workflowType);
          var workflowRunObj = null;
          if (!workflowTypeObj) {
            err = 'WORKFLOW_TYPE_DOES_NOT_EXIST';
          } else if (workflowTypeObj.isDeprecated()) {
            err = 'WORKFLOW_TYPE_DEPRECATED';
          } else if (hasOpenWorkflowId(workflowId)) {
            err = 'WORKFLOW_ALREADY_RUNNING';
          } else {
            // FIXME include task list checking
            workflowRunObj = workflowTypeObj.createRun({
              workflowId: workflowId,
              tagList: tagList,
              input: input,
              lambdaRole: lambdaRole,
              executionStartToCloseTimeout: executionStartToCloseTimeout,
              taskStartToCloseTimeout: taskStartToCloseTimeout,
              taskPriority: taskPriority,
              childPolicy: childPolicy,
              taskList: taskList,
            });
            var missing = workflowRunObj.getMissingDefault();
            if (!!missing) {
              // The returned missing value is the error code.
              err = missing;
            }
          }

          if (!!err) {
            if (!!workflowRunObj) {
              // Don't allow a cancel
              workflowRunObj.runState = 100;
            }
            // Return failure object.
            return [{
              workflow: t,
              name: 'StartChildWorkflowExecutionFailed',
              data: {
                decisionTaskCompletedEventId: decisionTaskCompletedEventId,
                cause: err,
                control: control,
                initiatedEventId: sourceEvent.id,
                workflowId: workflowId,
                workflowType: { name: workflowType.name, version: workflowType.version },
              },
            },];
          }

          // Launch the child workflow.
          registerChildWorkflowRun(workflowRunObj);
          t.addChild(workflowRunObj);
          return [
            {
              workflow: t,
              name: 'ChildWorkflowExecutionStarted',
              data: {
                initiatedEventId: sourceEvent.id,
                workflowExecution: {
                  workflowId: workflowRunObj.workflowId,
                  runId: workflowRunObj.runId,
                },
                workflowType: {
                  name: workflowRunObj.workflowType.name,
                  version: workflowRunObj.workflowType.version,
                },
              },
            },
            workflowRunObj.createWorkflowExecutionStartedEvent(),
          ];
        },
      },];
    }

    // ..............................
    case 'StartTimer': {
      let attrs = decision.startTimerDecisionAttributes;
      let control = attrs.control;
      let startToFireTimeout = attrs.startToFireTimeout;
      if (startToFireTimeout === null || startToFireTimeout === undefined || startToFireTimeout < 0) {
        return 'startTimerDecisionAttributes.startToFireTimeout';
      }
      let timerId = attrs.timerId;
      if (!timerId) {
        return 'startTimerDecisionAttributes.timerId';
      }
      let timer = this.getTimer(timerId);
      if (!!timer) {
        return [{
          name: 'StartTimerFailed',
          data: {
            cause: `TIMER_ID_ALREADY_IN_USE`,
            // Other possibilities: OPEN_TIMERS_LIMIT_EXCEEDED, TIMER_CREATION_RATE_EXCEEDED
            decisionTaskCompletedEventId: decisionTaskCompletedEventId,
            timerId: timerId,
          },
        },];
      }

      timer = this.createTimer({
        timerId: timerId,
        startToFireTimeout: startToFireTimeout,
        control: control,
        decisionTaskCompletedEventId: decisionTaskCompletedEventId,
      });
      let startedEvent = timer.createStartedEventObject();
      startedEvent.postEventCreation = function postEventCreation(p) {
        var sourceEvent = p.sourceEvent;
        timer.setStartedEvent(sourceEvent);
      };
      return [startedEvent];
    }
    default: {
      return [{
        ERROR: true,
        result: [400, 'Sender', 'InvalidParameterValue', 'decisionType'],
      },];
    }
  }
};


// ---------------------------------------------------------------------------
// Private methods

/**
 * Should only be called by the EventBus to add an event to the history.
 *
 * @private
 * @friend EventBus
 * @param {WorkflowEvent} eventObj
 */
WorkflowRun.prototype._addEvent = function _addEvent(eventObj) {
  this.eventHistory.push(eventObj);
};

/**
 * @private
 */
WorkflowRun.prototype.__timeOut = function __timeOut() {
  // Check if the workflow has actually completed or not before
  // marking it as timed out.
  if (!this.isClosed()) {
    console.log(`[WORKFLOW ${this.workflowId}] Timed out (${this.executionConfiguration.executionStartToCloseTimeout} seconds)`);

    this.outOfBandEventFunc(this.__close({
      closeState: RUN_STATE_TIMED_OUT,
      childPolicy: this.executionConfiguration.childPolicy,
      closeEvent: {
        name: 'WorkflowExecutionTimedOut',
        data: {
          childPolicy: this.executionConfiguration.childPolicy,
          timeoutType: 'START_TO_CLOSE',
        },
      },
      parentEvent: {
        name: 'ChildWorkflowExecutionTimedOut',
        data: {
          timeoutType: 'START_TO_CLOSE',
        },
      },
    }));
  }
};


/**
 * In-band cancelation of the workflow.
 */
WorkflowRun.prototype.__cancel = function __cancel(p) {
  var decisionTaskCompletedEventId = p.decisionTaskCompletedEventId;
  var details = p.details;

  if (!this.isClosed()) {
    return this.__close({
      closeState: RUN_STATE_CANCELED,
      childPolicy: this.executionConfiguration.childPolicy,
      closeEvent: {
        name: 'WorkflowExecutionCanceled',
        data: {
          decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          details: details,
        },
      },
      parentEvent: {
        name: 'ChildWorkflowExecutionCanceled',
        data: {
          details: details,
        },
      },
    });
  }
  return [];
};


WorkflowRun.prototype.__complete = function __complete(p) {
  var decisionTaskCompletedEventId = p.decisionTaskCompletedEventId;
  var result = p.result;

  if (!this.isClosed()) {
    return this.__close({
      closeState: RUN_STATE_CANCELED,
      childPolicy: this.executionConfiguration.childPolicy,
      closeEvent: {
        name: 'WorkflowExecutionCompleted',
        data: {
          decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          result: result,
        },
      },
      parentEvent: {
        name: 'ChildWorkflowExecutionCompleted',
        data: {
          result: result,
        },
      },
    });
  }
  return [];
};


/**
 */
WorkflowRun.prototype.__fail = function __fail(p) {
  var decisionTaskCompletedEventId = p.decisionTaskCompletedEventId;
  var reason = p.reason;
  var details = p.details;

  if (!this.isClosed()) {
    return this.__close({
      closeState: RUN_STATE_FAILED,
      childPolicy: this.executionConfiguration.childPolicy,
      closeEvent: {
        name: 'WorkflowExecutionFailed',
        data: {
          decisionTaskCompletedEventId: decisionTaskCompletedEventId,
          details: details,
          reason: reason,
        },
      },
      parentEvent: {
        name: 'ChildWorkflowExecutionFailed',
        data: {
          details: details,
          reason: reason,
        },
      },
    });
  }
  return [];
};


/**
 * @private
 * @param {Object} p - parameters
 * @param {string} p.childPolicy - how to close off the child workflows
 *    when this exits; set to null (or undefined) if children should not
 *    be affected.
 * @param {Object} p.closeEvent - event that closes the workflow execution.
 * @param {Object} p.parentEvent - event that tells the parent workflow about
 *    the closing.
 * @param {int} p.closeState - new state after closing.
 */
WorkflowRun.prototype.__close = function __close(p) {
  var closeEvent = p.closeEvent;
  var parentEvent = p.parentEvent;
  var childPolicy = p.childPolicy;
  var closeState = p.closeState;
  var generatedEvents = [];
  if (this.isClosed()) {
    throw new Error('invalid usage: called __close when already closed.');
  }

  var i, j;
  var cwRun;
  var events;

  // Handle the children first.
  for (i = 0; i < this.childWorkflowExecutions.length; i++) {
    cwRun = this.childWorkflowExecutions[i];
    if (!cwRun.isClosed()) {
      events = null;
      if ('REQUEST_CANCEL' === childPolicy) {
        events = cwRun.requestCancel();
      } else if ('TERMINATE' === childPolicy) {
        events = cwRun.terminate({
          reason: 'Parent closed',
          cause: 'CHILD_POLICY_APPLIED',
          details: '',
        });
      } // Else ignore
      if (!!events) {
        // DEBUG console.log(`[WF ${this.workflowId}] Adding ${events.length} child termination events`);
        for (j = 0; j < events.length; j++) {
          generatedEvents.push(events[j]);
        }
      }
    }
    // Explicitly clean out the children.
    this.getOpenChildWorkflowExecutions();
  }


  // Clear out all open stuff
  this.openDecisionTasks = [];
  this.openTimers = [];
  this.openLambdaFunctions = [];
  this.openActivityTasks = [];
  this.childWorkflowExecutions = [];
  this.runState = closeState;
  this.closeTimestamp = awsCommon.timestamp();

  closeEvent.workflow = this;
  // DEBUG console.log(`[WF ${this.workflowId}] Adding close event`);
  generatedEvents.push(closeEvent);

  if (!!this.parentRunId) {
    parentEvent.data.runId = this.parentRunId;
    parentEvent.data.initiatedEventId =
      (!this.childInitiatedEvent ? null : this.childInitiatedEvent.id);
    parentEvent.data.startedEventId =
      (!this.childStartedEvent ? null : this.childStartedEvent.id);
    parentEvent.data.workflowExecution = {
      runId: this.runId,
      workflowId: this.workflowId,
    };
    parentEvent.data.workflowType = {
      name: this.workflowType.name,
      version: this.workflowType.version,
    };
    parentEvent.runId = this.parentRunId;

    // DEBUG console.log(`[WF ${this.workflowId}] Adding parent report of child termination`);
    generatedEvents.push(parentEvent);
  }

  return generatedEvents;
};

WorkflowRun.prototype.removeChild = function removeChild(childRun) {
  for (var i = 0; i < this.childWorkflowExecutions.length; i++) {
    // Delete ourself from the parent's open workflow list.
    if (this.childWorkflowExecutions[i] === childRun) {
      this.childWorkflowExecutions.splice(i, 1);
      return true;
    }
  }
  return false;
};
WorkflowRun.prototype.getTimer = function getTimer(timerId) {
  for (var i = 0; i < this.openTimers.length; i++) {
    if (this.openTimers[i].timerId === timerId) {
      return this.openTimers[i];
    }
  }
  return null;
};
WorkflowRun.prototype.registerActivity = function registerActivity(activity) {
  this.openActivityTasks.push(activity);
};
WorkflowRun.prototype.deleteActivity = function deleteActivity(activity) {
  for (var i = 0; i < this.openActivityTasks.length; i++) {
    if (activity.taskToken === this.openActivityTasks[i].taskToken) {
      this.openActivityTasks.splice(i, 1);
      return true;
    }
  }
  return false;
};
WorkflowRun.prototype.registerLambda = function registerLambda(lambda) {
  this.openLambdaFunctions.push(lambda);
};
WorkflowRun.prototype.deleteLambda = function deleteLambda(lambda) {
  for (var i = 0; i < this.openLambdaFunctions.length; i++) {
    if (lambda.lambdaId === this.openLambdaFunctions[i].lambdaId) {
      this.openLambdaFunctions.splice(i, 1);
      return true;
    }
  }
  return false;
};


// ---------------------------------------------------
// FIXME all below here needs to be rethought.

WorkflowRun.prototype.createTimer = function createTimer(p) {
  var timerId = p.timerId;
  var startToFireTimeout = p.startToFireTimeout;
  var control = p.control;
  var decisionTaskCompletedEventId = p.decisionTaskCompletedEventId;
  var timer = new WorkflowTimer({
    timerId: timerId,
    timeout: startToFireTimeout,
    control: control,
    decisionTaskCompletedEventId: decisionTaskCompletedEventId,
    workflowRun: this,
  });
  this.openTimers.push(timer);
  return timer;
};
WorkflowRun.prototype.deleteTimer = function deleteTimer(timerId) {
  for (var i = 0; i < this.openTimers.length; i++) {
    if (this.openTimers[i].timerId === timerId) {
      this.openTimers.splice(i, 1);
      return;
    }
  }
};

function WorkflowTimer(p) {
  this.timerId = p.timerId;
  this.timeout = p.timeout;
  this.control = p.control;
  this.decisionTaskCompletedEventId = p.decisionTaskCompletedEventId;
  this.workflowRun = p.workflowRun;
  this.outOfBandEventFunc = p.outOfBandEventFunc;
  this.active = true;
  this.startedEvent = null;

  var t = this;
  setTimeout(
    function() {
      if (t.active && !!t.startedEvent) {
        // Timers execution fires in an out-of-band way.
        t.workflowRun.outOfBandEventFunc([{
          workflow: t.workflowRun,
          name: 'TimerFired',
          data: {
            startedEventId: t.startedEvent.id,
            timerId: t.timerId,
          },
        },]);
      }
      t.workflowRun.deleteTimer(t.timerId);
    },
    // `timeout` is in seconds
    t.timeout * 1000
  );
}
WorkflowTimer.prototype.createStartedEventObject = function createStartedEventObject() {
  return {
    workflow: this.workflowRun,
    name: 'TimerStarted',
    data: {
      control: this.control,
      timerId: this.timerId,
      startToFireTimeout: this.timeout,
      decisionTaskCompletedEventId: this.decisionTaskCompletedEventId,
    },
  };
};
WorkflowTimer.prototype.setStartedEvent = function setStartedEvent(event) {
  this.startedEvent = event;
};
WorkflowTimer.prototype.cancel = function cancel(decisionTaskCompletedEventId) {
  var ret = null;
  if (this.active) {
    ret = {
      name: 'TimerCanceled',
      data: {
        decisionTaskCompletedEventId: decisionTaskCompletedEventId,
        startedEventId: this.startedEventId,
        timerId: this.timerId,
      },
    };
  }
  this.active = false;
  return ret;
};
