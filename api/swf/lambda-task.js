'use strict';

const commonInbox = require('../../lib/inbox');
const awsCommon = require('../../lib/aws-common');
const textParse = require('../../lib/test-parse');
const lambdas = require('../../lib/lambdas');
const util = require('util');
const Q = require('q');


/*
 * Activities posted to a task list.
 */


module.exports = function createLambdaTask(p) {
  return new LambdaTask(p);
};


function LambdaTask(p) {
  this.lambdaId = p.id;
  this.input = p.input;
  this.name = p.name;
  this.workflowRun = p.workflowRun;
  this.outOfBandEventFunc = p.outOfBandEventFunc;
  this.startToCloseTimeout = p.startToCloseTimeout;
  this.scheduledEventId = null;
  this.startedEventId = null;
  this.started = false;
  this.stopped = false;

  this.workflowRun.registerLambda(this);
}

LambdaTask.prototype.createScheduledEvents = function createScheduledEvents(p) {
  var decisionTaskCompletedEventId = p.decisionTaskCompletedEventId;

  // Perform all the correct validation for the lambda.
  if (!textParse.isValidIdentifier(this.lambdaId)) {
    return [{
      ERROR: true,
      // FIXME fix this exception name
      result: [400, 'Sender', 'ValidationError', `invalid id ${this.lambdaId}`],
    },];
  }

  if (!!this.workflowRun.getLambdaTaskById(this.lambdaId)) {
    return this.__createScheduleFailedEvents({
      cause: 'ID_ALREADY_IN_USE',
      decisionTaskCompletedEventId: decisionTaskCompletedEventId,
    });
  }

  var t = this;

  // Don't check yet whether the lambda is registered or not.
  return [{
    workflow: this.workflowRun,
    name: 'LambdaFunctionScheduled',
    data: {
      decisionTaskCompletedEventId: decisionTaskCompletedEventId,
      id: this.lambdaId,
      input: this.input,
      name: this.name,
      startToCloseTimeout: this.startToCloseTimeout,
    },
    postEventCreation: function postEventCreation(p) {
      var sourceEvent = p.sourceEvent;
      t.scheduledEventId = sourceEvent.id;
      t.__queueLambda();
    },
  },];
};


LambdaTask.prototype.isOpen = function isOpen() {
  return !this.stopped;
};


// Run the lambda processing in the background.
LambdaTask.prototype.__queueLambda = function __queueLambda() {
  var t = this;
  Q.delay(1).then(function() {
    if (t.started) {
      throw new Error(`already started ${t.name}`);
    }
    this.started = true;
    var lambdaFunction = lambdas.getByName(t.name);
    if (!lambdaFunction) {
      t.outOfBandEventFunc(t.__createStartFailedEvents({
        cause: 'LAMBDA_NOT_FOUND',
        message: `No such lambda found ${t.name}`,
      }));
      t.stopped = true;
    } else {
      t.outOfBandEventFunc(t.__createStartEvents({}));
      setTimeout(function() {
        t.__timeout();
      }, this.startToCloseTimeout * 1000);
      // TODO what additional parameters are passed in?
      lambdaFunction.invoke({
        event: t.input,
      })
        .then(function(result) {
          t.__handleLambdaComplete(result);
        })
        .fail(function(err) {
          t.__handleLambdaFailed(err);
        });
    }
  });
};


LambdaTask.prototype.__timeout = function __timeout() {
  if (this.isOpen()) {
    this.stopped = true;
    console.log(`[LAMBDA TASK ${this.name}] timed out`);
    this.outOfBandEventFunc([{
      workflow: this.workflowRun,
      name: 'LambdaFunctionTimedOut',
      data: {
        scheduledEventId: this.scheduledEventId,
        startedEventId: this.startedEventId,
        timeoutType: 'START_TO_CLOSE',
      },
    },]);
  }
  // Ignore if already stopped
};


LambdaTask.prototype.__handleLambdaComplete = function __handleLambdaComplete(result) {
  if (this.isOpen()) {
    this.stopped = true;
    console.log(`[LAMBDA TASK ${this.name}] completed`);
    this.outOfBandEventFunc([{
      workflow: this.workflowRun,
      name: 'LambdaFunctionCompleted',
      data: {
        result: result,
        scheduledEventId: this.scheduledEventId,
        startedEventId: this.startedEventId,
      },
    },]);
  }
  // Ignore if already stopped
};


LambdaTask.prototype.__handleLambdaFailed = function __handleLambdaFailed(err) {
  if (this.isOpen()) {
    this.stopped = true;
    console.log(`[LAMBDA TASK ${this.name}] failed`);
    this.outOfBandEventFunc([{
      workflow: this.workflowRun,
      name: 'LambdaFunctionFailed',
      data: {
        details: '' + err.stack,
        reason: '' + err,
        scheduledEventId: this.scheduledEventId,
        startedEventId: this.startedEventId,
      },
    },]);
  }
  // Ignore if already stopped
};


LambdaTask.prototype.__createScheduleFailedEvents = function __createScheduleFailedEvents(p) {
  return [{
    workflow: this.workflowRun,
    name: 'ScheduleLambdaFunctionFailed',
    data: {
      cause: p.cause,
      decisionTaskCompletedEventId: p.decisionTaskCompletedEventId,
      id: this.lambdaId,
      name: this.name,
    },
  },];
};


LambdaTask.prototype.__createStartFailedEvents = function __createStartFailedEvents(p) {
  return [{
    workflow: this.workflowRun,
    name: 'StartLambdaFunctionFailed',
    data: {
      cause: p.cause,
      message: p.message,
      scheduledEventId: this.scheduledEventId,
    },
  },];
};


LambdaTask.prototype.__createStartEvents = function __createStartEvents(p) {
  var t = this;
  return [{
    workflow: this.workflowRun,
    name: 'LambdaFunctionStarted',
    data: {
      scheduledEventId: this.scheduledEventId,
    },
    postEventCreation: function postEventCreation(p) {
      var sourceEvent = p.sourceEvent;
      t.startedEventId = sourceEvent.id;
    },
  },];
};
