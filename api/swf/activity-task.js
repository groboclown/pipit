'use strict';

const commonInbox = require('../../lib/inbox');
const awsCommon = require('../../lib/aws-common');
const util = require('util');
const Q = require('q');


/*
 * Activities posted to a task list.
 */

module.exports = function createActivityTask(p) {
  return new ActivityTask(p);
};


const ACTIVITY_STATE_SCHEDULED = 0;
const ACTIVITY_STATE_RUNNING = 1;
const ACTIVITY_STATE_TIMED_OUT = 2;
const ACTIVITY_STATE_CANCELED = 3;
const ACTIVITY_STATE_FAILED = 4;
const ACTIVITY_STATE_COMPLETED = 5;

/**
 * @param {Object} p - parameters
 * @param {string} p.activityId - activity ID (as created by the decider).
 * @param {ActivityType} p.activityType - activity type.
 * @param {string} p.input - input
 * @param {long} p.startedEventId - event that started this activity
 * @param {long} p.scheduledEventId - event that scheduled this activity
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
  this.scheduledEventId = null;
  this.startedEventId = null;
  this.workflowRun = p.workflowRun;
  this.control = p.control;
  this.outOfBandWorfklowEventFunc = p.outOfBandEventFunc;
  this.queueActivityTaskFunc = p.queueActivityTaskFunc;

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
  this.heartbeatDetails = null;

  // Every heartbeat has a timeout.  If a heartbeat for index 101 fires,
  // but the current heartbeat is 102, then heartbeat 101 will not cause
  // a timeout.
  this.heartbeatIndex = 0;

  this.latestCancelRequestedEventId = null;

  // Registration with the workflow
  this.workflowRun.registerActivity(this);

  // Add Scheduled time-outs
  var t = this;
  setTimeout(
    function() {
      if (!t.isClosed()) {
        t.__timeout('SCHEDULE_TO_CLOSE');
      }
    },
    this.scheduleToCloseTimeout * 1000);
  setTimeout(
    function() {
      if (t.isScheduled()) {
        t.__timeout('SCHEDULE_TO_START');
      }
    },
    this.scheduleToStartTimeout * 1000);
}

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

ActivityTask.prototype.getMissingDefault = function getMissingDefault() {
  var defaultParams = {
    scheduleToCloseTimeout: 'DEFAULT_SCHEDULE_TO_CLOSE_TIMEOUT_UNDEFINED',
    taskList: 'DEFAULT_TASK_LIST_UNDEFINED',
    scheduleToStartTimeout: 'DEFAULT_SCHEDULE_TO_START_TIMEOUT_UNDEFINED',
    startToCloseTimeout: 'DEFAULT_START_TO_CLOSE_TIMEOUT_UNDEFINED',
    heartbeatTimeout: 'DEFAULT_HEARTBEAT_TIMEOUT_UNDEFINED',
  };
  for (var k in defaultParams) {
    if (defaultParams.hasOwnProperty(k)) {
      if (!this[k]) {
        return defaultParams[k];
      }
    }
  }
  if (!this.taskList.name) {
    return 'DEFAULT_TASK_LIST_UNDEFINED';
  }
  return null;
};



ActivityTask.prototype.isScheduled = function isScheduled() {
  return ACTIVITY_STATE_SCHEDULED === this.statusCode;
};

ActivityTask.prototype.isRunning = function isRunning() {
  return ACTIVITY_STATE_RUNNING === this.statusCode;
};

ActivityTask.prototype.isOpen = function isClosed() {
  return this.statusCode < ACTIVITY_STATE_TIMED_OUT;
};

ActivityTask.prototype.isClosed = function isClosed() {
  return this.statusCode >= ACTIVITY_STATE_TIMED_OUT;
};

/**
 * A request from an in-band process to cancel the activity.
 * @return {Object[]} list of event objects.
 */
ActivityTask.prototype.requestCancel = function requestCancel(p) {
  var cancelRequestedEventId = p.cancelRequestedEventId;
  this.latestCancelRequestedEventId = cancelRequestedEventId;
  this.cancelRequested = true;

  // If we're open but not running, then close us.
  if (this.isOpen() && !this.isRunning()) {
    this.statusCode = ACTIVITY_STATE_CANCELED;

    // Workflow needs to know about the abort.
    return [{
      workflow: this.workflowRun,
      name: 'ActivityTaskCanceled',
      data: {
        latestCancelRequestedEventId: cancelRequestedEventId,
        scheduledEventId: this.scheduledEventId,
        startedEventId: this.startedEventId,
      },
    },];
  }
  // No extra events generated.  The cancellation will occur when the
  // activity acknowledges the cancel.
  return null;
};


/**
 * Called when the activity is picked up by the activity processor.
 * This handles the workflow events by itself.
 */
ActivityTask.prototype.start = function start(p) {
  var workerId = p.workerId;

  if (this.isScheduled()) {
    this.statusCode = ACTIVITY_STATE_RUNNING;
    var t = this;
    setTimeout(
      function() {
        t.__timeout('START_TO_CLOSE');
      },
      this.scheduleToCloseTimeout * 1000
    );
    this.outOfBandWorfklowEventFunc([{
      workflow: this.workflowRun,
      name: 'ActivityTaskStarted',
      data: {
        identity: workerId,
        scheduledEventId: t.scheduledEventId,
      },
      postEventCreation: function postEventCreation(p) {
        var sourceEvent = p.sourceEvent;
        t.startedEventId = sourceEvent.id;
        return null;
      },
    },]);
    // Return the poll result.
    return {
      activityId: this.activityId,
      taskToken: this.taskToken,
      startedEventId: this.startedEventId,
      input: this.input,
      workflowExecution: {
        workflowId: this.workflowRun.workflowId,
        runId: this.workflowRun.runId,
      },
      activityType: {
        name: this.activityType.name,
        version: this.activityType.version,
      },
    };
  }

  // Not a valid task anymore; try another one.
  return null;
};


/**
 * Create the correct heartbeat status response.  This includes proper
 * heartbeat timeout handling.
 */
ActivityTask.prototype.heartbeatStatus = function heartbeatStatus(p) {
  var details = p.details;
  this.heartbeatDetails = details;
  if (this.isRunning()) {
    var t = this;
    var heartbeatId = ++this.heartbeatIndex;
    setTimeout(
      function t() {
        if (t.isRunning() && t.heartbeatIndex === heartbeatId) {
          t.__timeout('HEARTBEAT');
        }
      },
      this.heartbeatTimeout * 1000
    );
    return [200, { cancelRequested: this.cancelRequested }];
  }
  return [400, 'Sender', 'UnknownResourceFault', `Activity ${this.activityId} is not running`];
};

/**
 * Out-of-band event processing.
 */
ActivityTask.prototype.canceled = function canceled(p) {
  var details = p.details;
  this.statusCode = ACTIVITY_STATE_CANCELED;
  this.workflowRun.deleteActivity(this);
  this.outOfBandWorfklowEventFunc([{
    workflow: this.workflowRun,
    name: 'ActivityTaskCanceled',
    data: {
      details: details,
      latestCancelRequestedEventId: this.latestCancelRequestedEventId,
      scheduledEventId: this.startedEventId,
      startedEventId: this.startedEventId,
    },
  },]);
  this.workflowRun.deleteActivity(this);
};

/**
 * Out-of-band event processing.
 */
ActivityTask.prototype.completed = function completed(p) {
  var result = p.result;
  this.statusCode = ACTIVITY_STATE_COMPLETED;
  this.workflowRun.deleteActivity(this);
  this.outOfBandWorfklowEventFunc([{
    workflow: this.workflowRun,
    name: 'ActivityTaskCompleted',
    data: {
      result: result,
      scheduledEventId: this.startedEventId,
      startedEventId: this.startedEventId,
    },
  },]);
  this.workflowRun.deleteActivity(this);
};

/**
 * Out-of-band event processing.
 */
ActivityTask.prototype.failed = function failed(p) {
  var reason = p.reason;
  var details = p.details;
  this.statusCode = ACTIVITY_STATE_FAILED;
  this.workflowRun.deleteActivity(this);
  this.outOfBandWorfklowEventFunc([{
    workflow: this.workflowRun,
    name: 'ActivityTaskFailed',
    data: {
      reason: reason,
      details: details,
      scheduledEventId: this.startedEventId,
      startedEventId: this.startedEventId,
    },
  },]);
  this.workflowRun.deleteActivity(this);
};


ActivityTask.prototype.createScheduledEvents = function createScheduledEvents(p) {
  var decisionTaskCompletedEventId = p.decisionTaskCompletedEventId;
  var t = this;
  return [{
    workflow: this.workflowRun,
    name: 'ActivityTaskScheduled',
    data: {
      activityId: this.activityId,
      activityType: {
        name: this.activityType.name,
        version: this.activityType.version,
      },
      control: this.control,
      decisionTaskCompletedEventId: decisionTaskCompletedEventId,
      heartbeatTimeout: this.heartbeatTimeout,
      input: this.input,
      scheduleToCloseTimeout: this.scheduleToCloseTimeout,
      scheduleToStartTimeout: this.scheduleToStartTimeout,
      startToCloseTimeout: this.startToCloseTimeout,
      taskList: { name: this.taskList.name },
      taskPriority: this.taskPriority,
    },
    // When the event is actually created, the activity needs to capture
    // the id of the event.
    postEventCreation: function postEventCreation(p) {
      var sourceEvent = p.sourceEvent;
      t.scheduledEventId = sourceEvent.id;

      // Add the activity task to the task list.
      t.queueActivityTaskFunc(t);
    },
  },];
};


ActivityTask.prototype.__timeout = function __timeout(timeoutType) {
  // Set the status to timed out.
  this.statusCode = ACTIVITY_STATE_TIMED_OUT;
  // Send an out-of-band event to the workflow.
  this.outOfBandWorfklowEventFunc([{
    workflow: this.workflowRun,
    name: 'ActivityTaskTimedOut',
    data: {
      details: this.details,
      scheduledEventId: this.scheduledEventId,
      startedEventId: this.startedEventId,
      timeoutType: timeoutType,
    },
  },]);
  this.workflowRun.deleteActivity(this);
};
