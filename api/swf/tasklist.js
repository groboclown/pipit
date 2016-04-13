'use strict';

const CommonInbox = require('../../lib/inbox');
const awsCommon = require('../../lib/aws-common');
const util = require('util');
const Q = require('q');
const tasks = require('./tasks');


/**
 * The inbox of sorts used for polling and pushing
 * swf events.
 */
function BaseTaskList(domain, name) {
  this.domain = domain;
  this.name = name;
  this.inbox = new CommonInbox();
}
BaseTaskList.prototype.size = function size() {
  return this.inbox.countLiveMessages();
};


module.exports.Decider = function(domain, name) {
  module.exports.Decider.super_.call(this, domain, name);

  // All workflow runs with open deciders
  this._pendingRuns = {};
};
util.inherits(module.exports.Decider, BaseTaskList);

/**
 * Returns the decision task for this run.
 */
module.exports.Decider.prototype.addWorkflowExecution = function addWorkflowExecution(run) {
  this._pendingRuns[run] = true;
  var task = new tasks.DecisionTask(run);
  // The task will not be "open" until a decider receives the task message.
  this.inbox.push(task, 0, 100);
  return task;
};

/** Returns a promise, or null if a pull w/ an invalid next page token. */
module.exports.Decider.prototype.pull = function pull(
        nextPageToken, maximumPageSize, reverseOrder) {
  if (!!nextPageToken) {
    console.log('Request w/ page token ' + nextPageToken);

    // User requesting paged results from a previously requested poll.
    // The start of the token contains the decision task token.
    var pos = nextPageToken.indexOf('^');
    var prefix = null;
    if (pos >= 0) {
      prefix = nextPageToken.substr(0, pos);
    }
    for (var run in this._pendingRuns) {
      if (this._pendingRuns.hasOwnProperty(run)) {
        for (var i = 0; i < run.openDecisionTasks.length; i++) {
          var page = run.openDecisionTasks[i].pageEvents(
              nextPageToken, maximumPageSize, reverseOrder);
          if (!!page) {
            // Note: page[0] indicates whether there are more pages or not.
            // However, we use the decision task "complete" to
            // remove it from the list.

            console.log('Returning cached page result');

            return Q(page[1]);
          }
        }
      }
    }

    console.log('No existing page request with token ' + nextPageToken);

    // There are no more events in this result.
    // Because we don't have the run information for this
    // page key, it should be a client-side error.
    return Q(null);
  }

  console.log('Polling inbox for messages');
  var t = this;
  // Note that the timeouts are all hard-coded, because this is in
  // the spec for how the decision task list works.
  return this.inbox.pull(1, 60, 1000)
    .then(function t1(msgs) {
      console.log('received pending messages in inbox: ' + msgs.length +
          ' = ' + msgs);
      var task = msgs[0].value;
      t.inbox.deleteByMessageId(msgs[0].messageId);


      // Only now is the decision task "open", which means that
      // the decider has received the message.
      task.workflowRun.openDecisionTasks.push(task);


      var page = task.pageEvents(null, maximumPageSize, reverseOrder);
      if (!!page) {
        return page[1];
      }
      // Something went wrong in the paging or the task creation.
      console.log('WARN: initial decision task poll returned no paged results');
      return null;
    })
    .catch(function c1(err) {
      // Generally a timeout
      console.log('error pollling for task: ' + err);
      return {};
    });
};


module.exports.Activty = function(domain, name) {
  module.exports.Activty.super_.call(this, domain, name);
};
util.inherits(module.exports.Activty, BaseTaskList);
