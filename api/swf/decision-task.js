'use strict';

const commonInbox = require('../../lib/inbox');
const awsCommon = require('../../lib/aws-common');
const util = require('util');
const Q = require('q');


/*
 * Activities posted to a task list.
 */


module.exports = function createDecisionTask(p) {
  return new DecisionTask(p);
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
    // FIXME DEBUG
    console.log(`[DECISION ${this.taskToken}] Starting decision task`);

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

    setTimeout(
      function() {
        console.log(`[DECISION ${this.taskToken}] timed out after ${t.workflowRun.executionConfiguration.taskStartToCloseTimeout} seconds`);
        t.__timeout();
      },
      // AWS timeout property is in seconds, timeout is in ms.
      t.workflowRun.executionConfiguration.taskStartToCloseTimeout * 1000
    );
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
