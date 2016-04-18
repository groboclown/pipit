'use strict';

const commonInbox = require('../../lib/inbox');
const awsCommon = require('../../lib/aws-common');
const util = require('util');


/*
 * Activities posted to a task list.
 */

/**
 * The only kind of task posted to a Decision task list.
 * These will automatically add themselves to the history.
 * They will not, though, manage the openDecisionTask list
 * in the workflowRun object.
 */
function DecisionTask(domain, workflowRun) {
  this.workflowRun = workflowRun;
  this.domainName = domain;
  this.taskToken = awsCommon.genRequestId();

  // Can only populate the started id stuff once we've started.
  this.previousStartedEventId = null;
  this.startedEventId = null;

  this.deciderIdentity = null;
  this.completedEventId = null;


  // Add ourself to the history
  var scheduledEvent = workflowRun.addEvent('DecisionTaskScheduled', {
    startToCloseTimeout: 'FIXME',
    taskList: { name: 'FIXME' },
    taskPriority: 'FIXME',
  });
  this.scheduledEventId = scheduledEvent.id;

  this.eventList = [];
  // Snapshot the events up to this point
  for (var i = 0; i < workflowRun.eventHistory.length; i++) {
    var event = workflowRun.eventHistory[i].describe();
    console.log(`[DECISION ${this.taskToken}] added event ${JSON.stringify(event)}`);
    this.eventList.push(event);
  }

  this.started = false;
}
/** Call when the task is fetched for a polling decider. */
DecisionTask.prototype.start = function start(deciderId) {
  if (!this.started) {
    this.started = true;
    // Add a started event
    var startedEvent = this.workflowRun.addEvent('DecisionTaskStarted', {
      identity: deciderId,
      scheduledEventId: this.scheduledEventId,
    });
    // TODO see if this DecisionTaskStarted should go in this task or the
    // next one.  I think it's this one.
    var event = startedEvent.describe();
    console.log(`[DECISION ${this.taskToken}] added event ${JSON.stringify(event)}`);
    this.eventList.push(event);

    this.deciderIdentity = deciderId;
    this.previousStartedEventId = this.workflowRun.previousStartedEventId;
    this.startedEventId = startedEvent.id;
    this.workflowRun.previousStartedEventId = startedEvent.id;

    // TODO create the timer for the decision task timed out event.
  }
};
DecisionTask.prototype.end = function end() {
  if (!this.started) {
    throw new Error('Not started yet');
  }
  var completedEvent = this.workflowRun.addEvent('DecisionTaskCompleted', {
    executionContext: this.workflowRun.executionContext,
    scheduledEventId: this.scheduledEventId,
    startedEventId: this.startedEventId,
  });
  this.completedEventId = completedEvent.id;
  return completedEvent.id;
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
  ret.startedEventId = this.taskToken;
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

module.exports.DecisionTask = DecisionTask;
