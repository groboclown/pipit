'use strict';

const commonInbox = require('../../lib/inbox');
const awsCommon = require('../../lib/aws-common');
const util = require('util');
const Q = require('q');


/*
 * Activities posted to a task list.
 */


module.exports.createDecisionTask = function createDecisionTask(p) {
  return new DecisionTask(p);
};

module.exports.createActivityTask = function createActivityTask(p) {
  return new ActivityTask(p);
};

module.exports.createLambdaTask = function createLambdaTask(p) {
  return new LambdaTask(p);
};

const RUN_STATE_CREATED = 0;
const RUN_STATE_STARTED = 1;
const RUN_STATE_COMPLETED = 2;
const RUN_STATE_TIMED_OUT = 3;


/**
 * The only kind of task posted to a Decision task list.
 * These will automatically add themselves to the history.
 * They will not, though, manage the openDecisionTask list
 * in the workflowRun object.
 *
 * @param {Object} p parameters
 * @param {WorkflowRun} p.workflow workflow run object
 * @param {WorkflowEvent} p.scheduledEvent DecisionTaskScheduled event.
 */
function DecisionTask(p) {
  this.workflowRun = p.workflow;
  this.taskToken = awsCommon.genRequestId();
  this.outOfBandEventFunc = p.outOfBandEventFunc;
  var scheduledEvent = p.scheduledEvent;

  // Can only populate the started id stuff once we've started.
  this.previousStartedEventId = null;
  this.startedEventId = null;

  this.deciderIdentity = null;
  this.completedEventId = null;

  this.scheduledEventId = scheduledEvent.id;

  this.eventList = [];
  // Snapshot the events up to this point
  for (var i = 0; i < this.workflowRun.eventHistory.length; i++) {
    var event = this.workflowRun.eventHistory[i].describe();
    console.log(`[DECISION ${this.taskToken}] added event ${JSON.stringify(event)}`);
    this.eventList.push(event);
  }

  this.runState = RUN_STATE_CREATED;
}

DecisionTask.prototype.createStartedEvent = function createStartedEvent(p) {
  var deciderId = p.deciderId;
  return {
    workflow: this.workflowRun,
    name: 'DecisionTaskStarted',
    data: {
      identity: deciderId,
      scheduledEventId: this.scheduledEventId,
    },
  };
};

/** Call when the task is fetched for a polling decider. */
DecisionTask.prototype.start = function start(p) {
  var startedEvent = p.startedEvent;
  var deciderId = p.deciderId;

  if (this.runState === RUN_STATE_CREATED) {
    this.runState = RUN_STATE_STARTED;

    // TODO see if this DecisionTaskStarted should go in this task or the
    // next one.  Because this task has already been loaded with events
    // for when it was queued, there's a chance that new events could be
    // loaded up before this ran.  Adding that new event here would mean
    // that the events are loaded out-of-order.

    // Only now is the decision task "open", which means that
    // the decider has received the message.
    this.workflowRun.openDecisionTasks.push(this);

    this.deciderIdentity = deciderId;
    this.previousStartedEventId = this.workflowRun.previousStartedEventId;
    this.startedEventId = startedEvent.id;
    this.workflowRun.previousStartedEventId = startedEvent.id;

    // Create the timer for the decision task timed out event.
    var t = this;
    Q.timeout(
      // AWS timeout property is in seconds, timeout is in ms.
      t.workflowRun.executionConfiguration.taskStartToCloseTimeout * 1000
    ).then(function() {
      t.__timeout();
    });
  }
};


/**
 * @return the event data that will be converted to an event object.
 */
DecisionTask.prototype.complete = function complete() {
  if (this.runState !== RUN_STATE_STARTED) {
    throw new Error('Not started yet');
  }
  this.runState = RUN_STATE_COMPLETED;
  return {
    name: 'DecisionTaskCompleted',
    data: {
      executionContext: this.workflowRun.executionContext,
      scheduledEventId: this.scheduledEventId,
      startedEventId: this.startedEventId,
    },
  };
};


// FIXME do we need this method?  Is this ID really necessary?
DecisionTask.prototype.setCompletedEvent = function setCompletedEvent(event) {
  this.completedEventId = event.id;
};


DecisionTask.prototype.isOpen = function isOpen() {
  return this.runState <= RUN_STATE_STARTED;
};


/**
* Called by the task list to find the decision task that matches the
* page token.  If it matches, then this will return an array of:
* [ is last page?, page details ].  If it doesn't match, then it
* returns null.
*/
DecisionTask.prototype.pageEvents = function pageEvents(
      pageToken, maximumPageSize, reverseOrder) {
  if (pageToken !== null  && pageToken.substr(0, pageToken.indexOf('^')) !== this.taskToken) {
    return null;
  }
  var ret = awsCommon.pageResults({
    reverseOrder: reverseOrder,
    maximumPageSize: maximumPageSize,
    nextPageToken: pageToken,
    key: 'events',
    resultList: this.eventList,
  });
  ret.previousStartedEventId = this.previousStartedEventId;
  ret.startedEventId = this.startedEventId;
  ret.taskToken = this.taskToken;
  ret.workflowExecution = {
    runId: this.workflowRun.runId,
    workflowId: this.workflowRun.workflowId,
  };
  ret.workflowType = {
    name: this.workflowRun.workflowType.name,
    version: this.workflowRun.workflowType.version,
  };
  // Augment the page token to reference this specific decision event
  if (!!ret.nextPageToken) {
    ret.nextPageToken = this.taskToken + '^' + ret.nextPageToken;
  }
  console.log(`[DECISION ${this.taskToken}] returning paged events ${JSON.stringify(ret)}`);
  return [
    // Is last?
    !ret.nextPageToken,

    // Actual results
    ret,
  ];
};


DecisionTask.prototype.__timeout = function __timeout() {
  if (this.isOpen()) {
    console.log(`[DECISION TASK ${this.taskToken}] Timed out`);
    this.runState = RUN_STATE_TIMED_OUT;
    this.outOfBandEventFunc([{
      workflow: this.workflowRun,
      name: 'DecisionTaskTimedOut',
      data: {
        scheduledEventId: this.scheduledEventId,
        startedEventId: this.startedEventId,
        timeoutType: 'START_TO_CLOSE',
      },
    },]);
  }
};


// ===========================================================================

const ACTIVITY_STATE_SCHEDULED = 0;
const ACTIVITY_STATE_RUNNING = 1;
const ACTIVITY_STATE_TIMED_OUT = 2;
const ACTIVITY_STATE_CANCELED = 3;
const ACTIVITY_STATE_FAILED = 4;

/**
 * @param {Object} p - parameters
 * @param {string} p.activityId - activity ID (as created by the decider).
 * @param {ActivityType} p.activityType - activity type.
 * @param {string} p.input - input
 * @param {long} p.startedEventId - event that started this activity
 * @param {string} [p.control] - used by workflow, not sent to activity.
 * @param {long|string} [p.heartbeatTimeout] - heartbeat timeout.
 * @param {long|string} [p.scheduleToCloseTimeout] - entire activity timeout.
 * @param {long|string} [p.scheduleToStartTimeout] - schedule to start timeout.
 * @param {long|string} [p.startToCloseTimeout] - start to close timeout.
 * @param {long} [p.taskPriority] - task priority
 * @param {Object} [p.taskList] - task list for listening.
 * @param {string} [p.taskList.name] - task list name.
 * @param {WorkflowRun} p.workflowRun - workflow that owns this task.
 */
function ActivityTask(p) {
  this.activityId = p.activityId;
  this.activityType = p.activityType;
  this.input = p.input || null;
  this.startedEventId = p.startedEventId;
  this.workflowRun = p.workflowRun;
  this.control = p.control;
  this.outOfBandWorfklowEventFunc = p.outOfBandEventFunc;

  this.heartbeatTimeout = p.heartbeatTimeout || p.activityType.configuration.defaultTaskHeartbeatTimeout;
  this.scheduleToCloseTimeout = p.scheduleToCloseTimeout || p.activityType.configuration.defaultTaskScheduleToCloseTimeout;
  this.scheduleToStartTimeout = p.scheduleToStartTimeout || p.activityType.configuration.defaultTaskScheduleToStartTimeout;
  this.startToCloseTimeout = p.startToCloseTimeout || p.activityType.configuration.defaultTaskStartToCloseTimeout;
  this.taskPriority = p.taskPriority || p.activityType.configuration.defaultTaskPriority;
  this.taskList = { name: null };
  if (!!p.taskList && !!p.taskList.name) {
    this.taskList.name = p.taskList.name;
  } else if (!!p.activityType.configuration.defaultTaskList && !!p.activityType.configuration.defaultTaskList.name) {
    this.taskList.name = p.activityType.configuration.defaultTaskList.name;
  }



  this.taskToken = awsCommon.genRequestId();
  this.statusCode = 0;
  this.failure = null;
  this.cancelRequested = false;

  // Every heartbeat has a timeout.  If a heartbeat for index 101 fires,
  // but the current heartbeat is 102, then heartbeat 101 will not cause
  // a timeout.
  this.heartbeatIndex = 0;

  // FIXME complete
  // Add Scheduled time-outs
};

ActivityTask.prototype.describe = function describe() {
  return {
    activityId: this.activityId,
    activityType: {
      name: this.activityType.name,
      version: this.activityType.version,
    },
    input: this.input,
    startedEventId: this.startedEventId,
    taskToken: this.taskToken,
    workflowExecution: {
      runId: this.workflowRun.runId,
      workflowId: this.workflowRun.workflowId,
    },
  };
};

ActivityTask.prototype.isScheduled = function isScheduled() {
  return ACTIVITY_STATE_SCHEDULED === this.statusCode;
};

ActivityTask.prototype.isRunning = function isRunning() {
  return ACTIVITY_STATE_RUNNING === this.statusCode;
};

ActivityTask.prototype.isClosed = function isClosed() {
  return this.statusCode >= ACTIVITY_STATE_TIMED_OUT;
};

/**
 * Create the correct heartbeat status response.  This includes proper
 * heartbeat timeout handling.
 */
ActivityTask.prototype.heartbeatStatus = function heartbeatStatus() {
  if (this.isRunning()) {
    var t = this;
    var heartbeatId = ++this.heartbeatIndex;
    Q.timeout(this.heartbeatTimeout * 1000).then(function t() {
      if (t.isRunning() && t.heartbeatIndex === heartbeatId) {
        // FIXME time out the activity:
        // Set the status to timed out.
        // Send an out-of-band event to the workflow.
      }
    });
    return [200, { cancelRequested: this.cancelRequested }];
  };
  return [400, 'Sender', 'UnknownResourceFault', `Activity ${this.activityId} is not running`];
};



// ===========================================================================

function LambdaTask(p) {
  this.lambdaId = p.lambdaId;
  // FIXME complete.
}
