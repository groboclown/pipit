'use strict';

const createLambda = require('./lambda');

module.exports = function createLambdaDepot() {
  return new LambdaDepot();
};

function LambdaDepot() {
  // Stores the most recent version of a function.
  this.byFunctionName = {};

  // Stores all the versions of the functions; keyed by <function name>@@<version>
  this.byFunctionNameVersion = {};

  // Stores the functions by their arn.
  this.byFunctionArn = {};

  // Stores the alias, which is name -> { name: , version:, aliasArn: }
  this.aliases = {};

  // Stores the alias name.
  this.aliasArns = {};
}


LambdaDepot.prototype.getByNameVersion = function getByNameVersion(name, version) {
  var key = name + '@@' + version;
  if (!!this.byFunctionNameVersion[key]) {
    return this.byFunctionNameVersion[key];
  }
  return null;
};

/**
 * Generic retrieval to get by either a function or alias arn.
 */
LambdaDepot.prototype.getByArn = function getByArn(arn) {
  var ret = null;
  if (!!this.aliasArns[arn]) {
    ret = this.getByAlias(this.aliasArns[arn]);
  }
  ret = (ret || this.byFunctionArn[arn] || null);
  return ret;
};


/**
 * Checks aliases first, then checks the most recent name.
 */
LambdaDepot.prototype.getByName = function getByName(name) {
  var ret = null;
  if (!!this.aliases[name]) {
    var alias = this.aliases[name];
    ret = this.getByNameVersion(alias.name, alias.version);
  }
  ret = (ret || this.byFunctionName[name] || null);
  return ret;
};


/**
 * @return {Q} a promise that either raises an error with
 *    [error name, error text] as the message, or returns
 *    the lambda created.
 */
LambdaDepot.prototype.addLambda = function addLambda(p) {
  var t = this;
  return createLambda(p)
  .then(function(lambda) {
    if (!!t.getByNameVersion(lambda.FunctionName, lambda.Version)) {
      throw ['ResourceConflictException', `Lambda (${lambda.FunctionName}, version ${lambda.Version}) already exists`];
    }

    var problems = lambda.findProblems();
    if (!!problems) {
      throw problems;
    }

    // Now the most recent version of the function
    t.byFunctionName[lambda.FunctionName] = lambda;
    t.byFunctionNameVersion[lambda.FunctionName + '@@' + lambda.Version] = lambda;
    t.byFunctionArn[lambda.FunctionArn] = lambda;
    return lambda;
  });
};
