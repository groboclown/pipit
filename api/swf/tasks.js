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
function DecisionTask(workflowRun) {
  this.workflowRun = workflowRun;
  this.taskToken = awsCommon.genRequestId();

  // Can only populate the started id stuff once we've started.
  this.previousStartedEventId = null;
  this.startedEventId = null;

  this.deciderIdentity = null;

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
    this.eventList.push(workflowRun.eventHistory[i].describe());
  }

  this.started = false;
}
/** Call when the task is fetched for a polling decider. */
DecisionTask.prototype.start = function(deciderId) {
  if (!this.started) {
    this.started = true;
    // Add a started event
    var startedEvent = this.workflowRun.addEvent('DecisionTaskStarted', {
      identity: deciderId,
      scheduledEventId: this.scheduledEventId,
    });
    this.deciderIdentity = deciderId;
    this.previousStartedEventId = this.workflowRun.previousStartedEventId;
    this.startedEventId = startedEvent.id;
    this.workflowRun.previousStartedEventId = startedEvent.id;
  }
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
    runId: this.workflowExecution.runId,
    workflowId: this.workflowExecution.workflowId,
  };
  ret.workflowType = {
    name: this.workflowExecution.workflowType.name,
    version: this.workflowExecution.workflowType.version,
  };
  // Augment the page token to reference this specific decision event
  ret.nextPageToken = this.taskToken + '^' + ret.nextPageToken;
  return [
    // Is last?
    !ret.nextPageToken,

    // Actual results
    ret,
  ];
};

module.exports.DecisionTask = DecisionTask;
