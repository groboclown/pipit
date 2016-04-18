'use strict';

const Q = require('q');
const awsCommon = require('../../lib/aws-common');
const testParse = require('../../lib/test-parse');
const tasks = require('./tasks');

module.exports.createWorkflowType = function createWorkflowType(name, version, domain) {
  return new WorkflowType(name, version, domain);
};
module.exports.createActivityType = function createActivityType(name, version) {
  return new ActivityType(name, version);
};

var WorkflowType = function(name, version, domain) {
  this.name = name;
  this.version = version;
  this.description = '';
  this.domain = domain;
  this.status = 'REGISTERED';
  this.creationDate = awsCommon.timestamp();
  this.deprecationDate = null;
  this.configuration = {};
  this.configuration.defaultChildPolicy = '';
  this.configuration.defaultTaskStartToCloseTimeout = '';
  this.configuration.defaultExecutionStartToCloseTimeout = '';
  this.configuration.defaultLambdaRole = '';
  this.configuration.defaultTaskList = null;
  this.configuration.defaultTaskPriority = '';
};
WorkflowType.prototype.describe = function describe() {
  return {
    configuration: this.configuration,
    typeInfo: /*S1m*/{
      status: this.status,
      workflowType: /*Sr*/{
        version: this.version,
        name: this.name,
      },
      creationDate: '' + this.creationDate,
      description: this.description,
      deprecationDate: null,
    },
  };
};
WorkflowType.prototype.matches = function matches(name, version) {
  return this.name === name && this.version === version;
};
WorkflowType.prototype.createRun = function createRun(workflowId) {
  return new WorkflowRun(this, workflowId);
};


var ActivityType = function(name, version) {
  this.configuration = {
    defaultTaskScheduleToStartTimeout: '',
    defaultTaskScheduleToCloseTimeout: '',
    defaultTaskStartToCloseTimeout: '',
    defaultTaskHeartbeatTimeout: '',
    defaultTaskList: null,
    defaultTaskPriority: '',
  };
  this.status = 'REGISTERED';
  this.deprecationDate = null;
  this.name = name;
  this.version = version;
  this.description = '';
  this.creationDate = awsCommon.timestamp();
};
ActivityType.prototype.describe = function describe() {
  return {
    configuration: this.configuration,
    typeInfo: {
      status: this.status,
      deprecationDate: this.deprecationDate,
      activityType: {
        name: this.name,
        version: this.version,
      },
      description: this.description,
      creationDate: '' + this.creationDate,
    },
  };
};
ActivityType.prototype.matches = function matches(name, version) {
  return this.name === name && this.version === version;
};



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

var WorkflowRun = function(workflowType, workflowId) {
  this.workflowType = workflowType;
  this.workflowId = workflowId;
  this.runId = awsCommon.genRequestId();
  var taskListName = (!workflowType.configuration.defaultTaskList ? null : workflowType.configuration.defaultTaskList.name);
  this.taskList = { name: taskListName };
  this.executionConfiguration = {
    lambdaRole: workflowType.configuration.defaultLambdaRole,
    taskStartToCloseTimeout: workflowType.configuration.defaultTaskStartToCloseTimeout,
    executionStartToCloseTimeout: workflowType.configuration.defaultExecutionStartToCloseTimeout,
    taskPriority: workflowType.configuration.defaultTaskPriority,
    childPolicy: workflowType.configuration.defaultChildPolicy,
    taskList: null,
  };
  if (!!workflowType.configuration.defaultTaskList) {
    this.executionConfiguration.taskList = {
      name: workflowType.configuration.defaultTaskList.name,
    };
  }

  // Creation-time settings
  this.tagList = [];
  this.executionContext = '';
  this.parent = null;
  this.startChildWorkflowEvent = null;
  this.childWorkflowExecutionStartedEvent = null;

  this.openDecisionTasks = [];
  this.openTimers = [];
  this.openLambdaFunctions = [];
  this.openActivityTasks = [];
  this.openChildWorkflowExecutions = [];
  this.eventHistory = [];
  this.startTimestamp = awsCommon.timestamp();
  this.closeTimestamp = null;
  this.runState = RUN_STATE_RUNNING;
  this.latestActivityTaskTimestamp = awsCommon.timestamp();
  this.previousStartedEventId = null;
  this.result = null;

  this.nextEventId = 0;

  // Data used to manage when a decision task should be added to the
  // queue.
  this._pendingDecisionEvents = [];
  this._taskList = null;
};
WorkflowRun.prototype.getMissingDefault = function getMissingDefault() {
  var defaultParams = [
    'lambdaRole',
    'taskStartToCloseTimeout',
    'executionStartToCloseTimeout',
    'taskPriority',
    'childPolicy',
    'taskList',
  ];
  for (var i = 0; i < defaultParams.length; i++) {
    if (!this.executionConfiguration[defaultParams[i]]) {
      return defaultParams[i];
    }
  }
  return null;
};
WorkflowRun.prototype.overrideDefault = function overrideDefault(key, value) {
  if (!!value) {
    this.executionConfiguration[key] = value;
  }
};
WorkflowRun.prototype.describe = function describe() {
  return {
    executionConfiguration: this.executionConfiguration,
    openCounts: {
      openDecisionTasks: this.openDecisionTasks.length,
      openTimers: this.openTimers.length,
      openLambdaFunctions: this.openLambdaFunctions.length,
      openActivityTasks: this.openActivityTasks.length,
      openChildWorkflowExecutions: this.openChildWorkflowExecutions.length,
    },
    executionInfo: {
      closeStatus: this.getCloseStatus(),
      parent: this.parent === null ? null : {
        workflowId: this.parent.workflowId,
        runId: this.parent.runId,
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
    },
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
      return null;
    }
  }
};
WorkflowRun.prototype.matches = function matches(workflowId, runId) {
  return this.workflowId === workflowId && this.runId === runId;
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
* Call after initializing the workflow execution in order to
* add the history and start timers.
* It is up to the caller to add the decision task to the inbox.
*/
WorkflowRun.prototype.start = function start(taskList) {
  // Assign the task list first, so that addEvent can work its magic.
  this._taskList = taskList;
  this._taskList.addWorkflowRun(this);

  // Create the workflow start event.
  this.addEvent('WorkflowExecutionStarted', {
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
  });

  if (!!this.parent) {
    this.childWorkflowExecutionStartedEvent = this.parent.addEvent('ChildWorkflowExecutionStarted', {
      workflowExecution: {
        runId: this.runId,
        workflowId: this.workflowId,
      },
      workflowType: {
        version: this.workflowType.version,
        name: this.workflowType.name,
      },
      initiatedEventId: this.startChildWorkflowEvent.id,
    });
  }

  // Expire the workflow run after a certain period of time.
  var t = this;
  setTimeout(
    function() {
      t.timeOut();
    },
    // AWS timeout property is in seconds, setTimeout is in ms.
    this.executionConfiguration.executionStartToCloseTimeout * 1000);
};
WorkflowRun.prototype.timeOut = function timeOut() {
  // FIXME check if the workflow has actually completed or not before
  // marking it as timed out.
  // FIXME complete
};
WorkflowRun.prototype.addEvent = function addEvent(name, details) {
  var id = this.nextEventId;
  this.nextEventId++;
  var event = new WorkflowEvent(id, name, details);
  console.log(`[WORKFLOW ${this.workflowId}] add event ${name} / ${id}`);
  this.eventHistory.push(event);
  this._pendingDecisionEvents.push(event);
  return event;
};
WorkflowRun.prototype.completeTask = function completeTask(name) {
  if (!this.isClosed() && isDecisionTaskReady(name, this._pendingDecisionEvents)) {
    this._pendingDecisionEvents = [];
    return this._taskList.addDecisionTaskFor(this);
  }
  return null;
};
WorkflowRun.prototype.terminate = function terminate(reason, details, requestedChildPolicy, cause) {
  var i;
  var cwRun;

  if (this.isClosed()) {
    // Don't change the actual state.
    return;
  }
  var childPolicy = requestedChildPolicy || this.executionConfiguration.childPolicy;

  // Set our state.
  this.runState = RUN_STATE_TERMINATED;
  this.closeTimestamp = awsCommon.timestamp();

  // Deal with the children.
  if (childPolicy === 'REQUEST_CANCEL') {
    for (i = 0; i < this.openChildWorkflowExecutions.length; i++) {
      cwRun = this.openChildWorkflowExecutions[i];
      if (!cwRun.isClosed()) {
        cwRun.requestCancel();
      }
    }
  } else if (childPolicy === 'ABANDON') {
    // Do nothing; they keep running
  } else { // Default to 'TERMINATE'
    for (i = 0; i < this.openChildWorkflowExecutions.length; i++) {
      cwRun = this.openChildWorkflowExecutions[i];
      if (!cwRun.isClosed()) {
        cwRun.terminate(reason, details, requestedChildPolicy);
      }
    }
  }

  // Clear out all open stuff
  this.openDecisionTasks = [];
  this.openTimers = [];
  this.openLambdaFunctions = [];
  this.openActivityTasks = [];
  this.openChildWorkflowExecutions = [];

  // Record the history event.
  this.addEvent('WorkflowExecutionTerminated', {
    details: details,
    cause: cause,
    reason: reason,
    childPolicy: childPolicy,
  });

  if (!!this.parent) {
    // Send a message to the parent that the child died.
    var initiatedEventId = ((!!this.startChildWorkflowEvent) ? this.startChildWorkflowEvent.id : null);
    var startedEventId = ((!!this.childWorkflowExecutionStartedEvent) ? this.childWorkflowExecutionStartedEvent.id : null);
    this.parent.addEvent('ChildWorkflowExecutionTerminated', {
      initiatedEventId: initiatedEventId,
      startedEventId: startedEventId,
      workflowExecution: {
        runId: this.runId,
        workflowId: this.workflowId,
      },
      workflowType: {
        name: this.workflowType.name,
        version: this.workflowType.version,
      },
    });
    this.parent.removeChild(this);
  }

  this._taskList.removeWorkflowRun(this);
};
WorkflowRun.prototype.cancel = function cancel(decisionTaskCompletedEventId, details) {
  if (this.isClosed()) {
    // Don't change the actual state.
    return;
  }

  // Set our state.
  this.runState = RUN_STATE_CANCELED;
  this.closeTimestamp = awsCommon.timestamp();

  // Children are left running?
  // TODO figure out what to do with children

  // Clear out all open stuff
  this.openDecisionTasks = [];
  this.openTimers = [];
  this.openLambdaFunctions = [];
  this.openActivityTasks = [];
  this.openChildWorkflowExecutions = [];

  // Record the history event.
  this.addEvent('WorkflowExecutionCanceled', {
    details: details,
    cause: cause,
    reason: reason,
    childPolicy: childPolicy,
  });

  if (!!this.parent) {
    // Send a message to the parent that the child died.
    var initiatedEventId = ((!!this.startChildWorkflowEvent) ? this.startChildWorkflowEvent.id : null);
    var startedEventId = ((!!this.childWorkflowExecutionStartedEvent) ? this.childWorkflowExecutionStartedEvent.id : null);
    this.parent.addEvent('ChildWorkflowExecutionCanceled', {
      initiatedEventId: initiatedEventId,
      startedEventId: startedEventId,
      workflowExecution: {
        runId: this.runId,
        workflowId: this.workflowId,
      },
      workflowType: {
        name: this.workflowType.name,
        version: this.workflowType.version,
      },
    });
    this.parent.removeChild(this);
  }

  this._taskList.removeWorkflowRun(this);
};
WorkflowRun.prototype.complete = function complete(decisionTaskCompletedEventId, result) {
  if (this.isClosed()) {
    // Don't change the actual state.
    return;
  }

  // Set our state.
  this.runState = RUN_STATE_COMPLETED;
  this.closeTimestamp = awsCommon.timestamp();
  this.result = result;

  // Children are left running?
  // TODO figure out what to do with children

  // Clear out all open stuff
  this.openDecisionTasks = [];
  this.openTimers = [];
  this.openLambdaFunctions = [];
  this.openActivityTasks = [];
  this.openChildWorkflowExecutions = [];

  // Record the history event.
  this.addEvent('WorkflowExecutionCompleted', {
    decisionTaskCompletedEventId: decisionTaskCompletedEventId,
    result: result,
  });

  if (!!this.parent) {
    // Send a message to the parent that the child died.
    var initiatedEventId = ((!!this.startChildWorkflowEvent) ? this.startChildWorkflowEvent.id : null);
    var startedEventId = ((!!this.childWorkflowExecutionStartedEvent) ? this.childWorkflowExecutionStartedEvent.id : null);
    this.parent.addEvent('ChildWorkflowExecutionCompleted', {
      initiatedEventId: initiatedEventId,
      startedEventId: startedEventId,
      workflowExecution: {
        runId: this.runId,
        workflowId: this.workflowId,
      },
      workflowType: {
        name: this.workflowType.name,
        version: this.workflowType.version,
      },
      result: result,
    });
    this.parent.removeChild(this);
  }

  this._taskList.removeWorkflowRun(this);
};
WorkflowRun.prototype.fail = function fail(decisionTaskCompletedEventId, reason, details) {
  if (this.isClosed()) {
    // Don't change the actual state.
    return;
  }

  // Set our state.
  this.runState = RUN_STATE_FAILED;
  this.closeTimestamp = awsCommon.timestamp();

  // Children are left running?
  // TODO figure out what to do with children

  // Clear out all open stuff
  this.openDecisionTasks = [];
  this.openTimers = [];
  this.openLambdaFunctions = [];
  this.openActivityTasks = [];
  this.openChildWorkflowExecutions = [];

  // Record the history event.
  this.addEvent('FailWorkflowExecution', {
    decisionTaskCompletedEventId: decisionTaskCompletedEventId,
    details: details,
    reason: reason,
  });

  if (!!this.parent) {
    // Send a message to the parent that the child died.
    var initiatedEventId = ((!!this.startChildWorkflowEvent) ? this.startChildWorkflowEvent.id : null);
    var startedEventId = ((!!this.childWorkflowExecutionStartedEvent) ? this.childWorkflowExecutionStartedEvent.id : null);
    this.parent.addEvent('ChildWorkflowExecutionCompleted', {
      initiatedEventId: initiatedEventId,
      startedEventId: startedEventId,
      workflowExecution: {
        runId: this.runId,
        workflowId: this.workflowId,
      },
      workflowType: {
        name: this.workflowType.name,
        version: this.workflowType.version,
      },
      result: result,
    });
    this.parent.removeChild(this);
  }

  this._taskList.removeWorkflowRun(this);
};
WorkflowRun.prototype.requestCancel = function requestCancel() {
  // FIXME implement
};
WOrkflowRun.prototype.signal = function signal(signalName, input) {
  // FIXME implement
};
WorkflowRun.prototype.removeChild = function removeChild(childRun) {
  for (var i = 0; i < this.openChildWorkflowExecutions.length; i++) {
    // Delete ourself from the parent's open workflow list.
    if (this.openChildWorkflowExecutions[i] === childRun) {
      this.openChildWorkflowExecutions.splice(i, 1);
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
WorkflowRun.prototype.createTimer = function createTimer(p) {
  var timerId = p.timerId;
  var startToFireTimeout = p.startToFireTimeout;
  var control = p.control;
  var decisionTaskCompletedEventId = p.decisionTaskCompletedEventId;
  var timer = new WorkflowTimer({
    workflowRun: this,
    timerId: timerId,
    timeout: startToFireTimeout,
    control: control,
    decisionTaskCompletedEventId: decisionTaskCompletedEventId,
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


function WorkflowEvent(id, name, details) {
  if (name.endsWith('Event') || name.endsWith('Attributes')) {
    throw new Error('bad event name: ' + name);
  }
  this.id = id;
  this.created = awsCommon.timestamp();
  this.name = name;
  this.details = details;
}
WorkflowEvent.prototype.describe = function describe() {
  var ret = {
    eventType: this.name,
    eventId: this.id,
    eventTimestamp: '' + this.created,
  };
  var attrName = this.name.charAt(0).toLowerCase() + this.name.substr(1) + 'EventAttributes';
  ret[attrName] = {};
  // Shallow copy
  for (var p in this.details) {
    if (this.details.hasOwnProperty(p)) {
      ret[attrName][p] = this.details[p];
    }
  }
  return ret;
};


function WorkflowTimer(p) {
  var workflowRun = p.workflowRun;
  var timerId = p.timerId;
  var timeout = p.timeout;
  var control = p.control;
  var decisionTaskCompletedEventId = decisionTaskCompletedEventId;
  this.workflowRun = workflowRun;
  this.timerId = timerId;
  this.active = true;

  var startedEvent = workflowRun.addEvent('TimerStarted', {
    control: control,
    timerId: timerId,
    startToFireTimeout: timeout,
    decisionTaskCompletedEventId: decisionTaskCompletedEventId,
  });
  this.startedEventId = startedEvent.id;

  var t = this;
  // `timeout` is in seconds
  Q.timeout(timeout * 1000).then(function() {
    if (t.active) {
      // FIXME add timeout event.
      workflowRun.addEvent('TimerFired', {
        startedEventId: startedEvent.id,
        timerId: timerId,
      });
    }
    workflowRun.deleteTimer(timerId);
  });
}
WorkflowTimer.prototype.cancel = function cancel(decisionTaskCompletedEventId) {
  if (this.active) {
    // FIXME add event to workflow run
    this.workflowRun.addEvent('TimerCanceled', {
      decisionTaskCompletedEventId: decisionTaskCompletedEventId,
      startedEventId: this.startedEventId,
      timerId: this.timerId,
    });
  }
  this.active = false;
};



const SPAWNS_DECISION_TASK = {
  WorkflowExecutionStarted: 2,
  RequestCancelWorkflowExecution: 2,
  ActivityTaskStarted: 2,
  ActivityTaskCompleted: 2,
  ActivityTaskFailed: 2,
  ActivityTaskTimedOut: 2,
  ActivityTaskCanceled: 2,
  ActivityTaskCancelRequested: 2,
  WorkflowExecutionSignaled: 2,
  TimerFired: 2,
  ChildWorkflowExecutionStarted: 2,
  ChildWorkflowExecutionCompleted: 2,
  ChildWorkflowExecutionFailed: 2,
  ChildWorkflowExecutionTimedOut: 2,
  ChildWorkflowExecutionCanceled: 2,
  ChildWorkflowExecutionTerminated: 2,
  LambdaFunctionStarted: 2,
  LambdaFunctionCompleted: 2,
  LambdaFunctionFailed: 2,
  LambdaFunctionTimedOut: 2,

  // All the failure notices cause a decision task.
  CancelTimerFailed: 2,
  CancelWorkflowExecutionFailed: 2,
  CompleteWorkflowExecutionFailed: 2,
  FailWorkflowExecutionFailed: 2,
  ScheduleActivityTaskFailed: 2,
  StartTimerFailed: 2,
  RequestCancelActivityTaskFailed: 2,
  StartChildWorkflowExecutionFailed: 2,
  SignalExternalWorkflowExecutionFailed: 2,
  RequestCancelExternalWorkflowExecutionFailed: 2,
  ScheduleLambdaFunctionFailed: 2,
  StartLambdaFunctionFailed: 2,

  // Actions caused by a decision task.
  WorkflowExecutionCompleted: 2,
  WorkflowExecutionContinuedAsNew: 2,

  // If spawned from the Respond Decision Task, then don't generate a decision task.
  FailWorkflowExecution: 1,
  WorkflowExecutionCancelRequested: 1,

  // Explicitly NOT a decision task spawner
  RespondDecisionTaskCompleted: 0,
  RecordMarker: 0,
  MarkerRecorded: 0,
  SignalExternalWorkflowExecutionInitiated: 0,
  ExternalWorkflowExecutionSignaled: 0,
  TimerCanceled: 0,
  TimerStarted: 0,
  DecisionTaskStarted: 0,
  DecisionTaskScheduled: 0,
  DecisionTaskCompleted: 0,
  DecisionTaskTimedOut: 0,
  ActivityTaskScheduled: 0,
  RequestCancelExternalWorkflowExecutionInitiated: 0,
  ExternalWorkflowExecutionCancelRequested: 0,
  StartChildWorkflowExecutionInitiated: 0,
  LambdaFunctionScheduled: 0,
  WorkflowExecutionFailed: 0, // TODO see if this is ever generated.
  WorkflowExecutionCanceled: 0, // TODO see if this is ever generated.
  WorkflowExecutionTerminated: 0, // TODO see if this is ever generated.
};
function isDecisionTaskReady(name, eventList) {
  var mode = (name === 'RespondDecisionTaskCompleted') ? 2 : 1;
  if (undefined !== SPAWNS_DECISION_TASK[name] &&
        SPAWNS_DECISION_TASK[name] >= mode) {
    return true;
  }
  // Debugging
  if (undefined === SPAWNS_DECISION_TASK[name]) {
    console.log(`DECISION TASK: unknown task type ${name}`);
  }
  for (var i = 0; i < eventList.length; i++) {
    if (undefined !== SPAWNS_DECISION_TASK[eventList[i].name] &&
          SPAWNS_DECISION_TASK[eventList[i].name] >= mode) {
      return true;
    }
    // Debugging
    if (undefined === SPAWNS_DECISION_TASK[eventList[i].name]) {
      console.log(`DECISION TASK: unknown event type ${eventList[i].name}`);
    }
  }
  return false;
}
