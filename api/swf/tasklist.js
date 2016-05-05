'use strict';

const CommonInbox = require('../../lib/inbox');
const awsCommon = require('../../lib/aws-common');
const util = require('util');
const Q = require('q');
const createDecisionTask = require('./decision-task');

/**
 * The inbox of sorts used for polling and pushing
 * swf events.
 */
function BaseTaskList(p) {
  this.name = p.name;
  this.outOfBandEventFunc = p.outOfBandEventFunc;
  this.inbox = new CommonInbox();
}
BaseTaskList.prototype.size = function size() {
  return this.inbox.countLiveMessages();
};

module.exports.createDecider = function createDecider(p) {
  return new Decider(p);
};

function Decider(p) {
  Decider.super_.call(this, p);

  this.handleStartDecisionEventFunc = p.handleStartDecisionEventFunc;

  // All workflow runs with pending deciders
  this._pendingDecisionTasks = [];

  console.log(`[DECIDER ${this.name}] starting`);
}
util.inherits(Decider, BaseTaskList);

/**
 * Returns the decision task for this run.
 */
Decider.prototype.addDecisionTaskFor = function addDecisionTaskFor(p) {
  p.outOfBandEventFunc = this.outOfBandEventFunc;
  var task = createDecisionTask(p);
  // The task will not be "open" until a decider receives the task message.
  console.log(`[DECIDER ${this.name}] added task to inbox: decision task for run ${task.workflowRun.workflowId}`);
  this.inbox.push(task, 0, 100);
  this._pendingDecisionTasks.push(task);
  return task;
};

/** Returns a promise, or null if a pull w/ an invalid next page token. */
Decider.prototype.pull = function pull(deciderId, nextPageToken, maximumPageSize, reverseOrder) {
  if (!!nextPageToken) {
    console.log('Request w/ page token ' + nextPageToken);

    // User requesting paged results from a previously requested poll.
    // The start of the token contains the decision task token.
    for (var i = 0; i < this._pendingDecisionTasks.length; i++) {
      var page = this._pendingDecisionTasks[i].pageEvents(
          nextPageToken, maximumPageSize, reverseOrder);
      if (!!page) {
        // `page[0]` indicates whether there are more pages or not.
        if (!page[0]) {
          // Remove this particular workflow run from the pending runs;
          // it might be in the list more than once, if there are
          // more than one decision, then there will be more than
          // one entry in the pending runs.
          this._pendingDecisionTasks.splice(i, 1);

          // Note that the owning workflow run will only remove the
          // decision task from its list of open decision tasks
          // when the task is closed.
        }

        console.log(`[DECIDER ${this.name}] Returning cached page result`);

        return Q(page[1]);
      }
    }

    console.log(`[DECIDER ${this.name}] No existing page request with token ${nextPageToken}`);

    // There are no more events in this result.
    // Because we don't have the run information for this
    // page key, it should be a client-side error.
    return Q(null);
  }

  console.log(`[DECIDER ${this.name}] Polling inbox for messages`);
  var t = this;
  // Note that the timeouts are all hard-coded, because this is in
  // the spec for how the decision task list works.
  return this.inbox.pull(1, 60, 1000)
    .then(function t1(msgs) {
      console.log(`[DECIDER ${t.name}] received pending messages in inbox: [${msgs.length}] = ${msgs}`);
      var task = msgs[0].value;
      t.inbox.deleteByMessageId(msgs[0].messageId);

      if (!task.isOpen()) {
        // Search again.  It probably timed out.
        console.log(`[DECIDER ${t.name}] pending message timed out; searching again`);
        return t.pull(deciderId, nextPageToken, maximumPageSize, reverseOrder);
      }

      // Start the task
      var startedEvent = t.handleStartDecisionEventFunc({
        decisionTask: task,
        deciderId: deciderId,
      });
      task.start({
        startedEvent: startedEvent,
        deciderId: deciderId,
      });

      var page = task.pageEvents(null, maximumPageSize, reverseOrder);
      if (!!page) {
        return page[1];
      }

      // Something went wrong in the paging or the task creation.
      console.log(`[DECIDER ${t.name}] WARN: initial decision task poll returned no paged results`);
      return null;
    })
    .catch(function c1(err) {
      // Generally a timeout
      console.log(`[DECIDER ${t.name}] error pollling for task: ${err}\n${err.stack}`);
      return {};
    });
};


// ===========================================================================

module.exports.createActivity = function createActivity(p) {
  return new Activity(p);
};

function Activity(p) {
  Activity.super_.call(this, p);
}
util.inherits(Activity, BaseTaskList);

Activity.prototype.addActivityTask = function addActivityTask(activityTask) {
  // The task will not be "open" until a decider receives the task message.
  console.log(`[ACTIVITY ${this.name}] added task to inbox: activity ${activityTask.activityId} / ${activityTask.taskList.name}`);
  this.inbox.push(activityTask, 0, 100);
};

Activity.prototype.pull = function pull(p) {
  var workerId = p.workerId;

  var t = this;
  // Note that the timeouts are all hard-coded, because this is in
  // the spec for how the decision task list works.
  return this.inbox.pull(1, 60, 1000)
    .then(function t1(msgs) {
      console.log(`[ACTIVITY ${t.name}] received pending messages in inbox: [${msgs.length}] = ${msgs}`);
      var task = msgs[0].value;
      t.inbox.deleteByMessageId(msgs[0].messageId);

      var result = task.start({
        workerId: workerId,
      });
      if (!result) {
        // Search again.  It probably timed out.
        console.log(`[ACTIVITY ${t.name}] pending message timed out; searching again`);
        return t.pull({ workerId: workerId });
      }

      return result;
    })
    .catch(function c1(err) {
      // Generally a timeout
      console.log(`[ACTIVITY ${t.name}] error pollling for task: ${err}\n${err.stack}`);
      return {
        // Empty version of the ActivityTask object.
        // Note, specifically, that the taks token is given, but it's empty.
        taskToken: '',
        input: null,
        workflowExecution: null,
        activityType: null,
        startedEventId: 0 /*Long*/,
        activityId: '',
      };
    });
};
