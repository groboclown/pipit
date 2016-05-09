'use strict';

const commonInbox = require('../../lib/inbox');
const awsCommon = require('../../lib/aws-common');
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

  this.workflowRun.registerLambda(this);
}

LambdaTask.prototype.createSheduledEvents = function createSheduledEvents() {
  // FIXME create the event
};
