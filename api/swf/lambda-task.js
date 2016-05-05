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
  this.lambdaId = p.lambdaId;
  // FIXME complete.
}
