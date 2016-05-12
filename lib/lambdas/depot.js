'use strict';

const createLambda = require('./lambda');

module.exports = function createLambdaDepot() {
  return new LambdaDepot();
};


function LambdaDepot() {
  // Maps the function name to the version store.
  this.functions = {};
}

// TODO better and smarter search for functions
// Function names, when selected, can have this form:
// (arn:aws:lambda:)?([a-z]{2}-[a-z]+-\d{1}:)?(\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\$LATEST|[a-zA-Z0-9-_]+))?
// The fully formed name (with version) is:
// arn:aws:lambda:us-west-2:account-id:function:MyFunctionName:MyFunctionVersion
// But note how we can take advantage of the knowledge that the version
// and function name and account id and region do not have a colon character.
// Also note how the "arn:aws:lambda:" is optional, as is the region.

LambdaDepot.prototype.getByNameVersion = function getByNameVersion(name, version) {
  if (!this.functions[name]) {
    return null;
  }
  return this.functions[name].getLambdaByVersion(version);
};

/**
 * Generic retrieval to get by either a function or alias arn.
 */
LambdaDepot.prototype.getByArn = function getByArn(arn) {
  // This is really slow
  for (var k in this.functions) {
    if (this.functions.hasOwnProperty(k)) {
      var ret = this.functions[k].getLambdaByArn(arn);
      if (!!ret) {
        return ret;
      }
    }
  }
  return null;
};


/**
 * Checks aliases first, then checks the most recent name or arn.
 */
LambdaDepot.prototype.getByName = function getByName(name) {
  var lambdas = this.functions[name];
  if (!lambdas) {
    return null;
  }
  // Get the latest
  return lambdas.getByNameVersion(null);
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
    var problems = lambda.findProblems();
    if (!!problems) {
      throw problems;
    }

    if (!t.functions[lambda.FunctionName]) {
      t.functions[lambda.FunctionName] = new LambdaNameDepot(lambda);
    } else {
      problems = t.functions[lambda.FunctionName].addVersion(lambda);
      if (!problems) {
        throw problems;
      }
    }
    return lambda;
  })
  .catch(function(err) {
    console.log(`[LAMBDA DEPOT] ${err.message}\n${err.stack}`);
    throw err;
  });
};



LambdaDepot.prototype.removeByQualifier = function removeByQualifier(name, qualifier) {
  if (!this.functions[name]) {
    return `No such function ${name}`;
  }
  return this.functions[name].removeVersion(qualifier);
};


LambdaDepot.prototype.removeByName = function removeByName(name) {
  if (!this.functions[name]) {
    return `No such function ${name}`;
  }
  delete this.functions[name];
  return null;
}


// ------------------------------------------------------------------------------
function LambdaNameDepot(initialLambda) {
  this.name = initialLambda.FunctionName;
  this.baseArn = initialLambda.FunctionArn;
  this.isAlias = false;
  this.versions = {};
  if (!initialLambda.Version) {
    initialLambda.Version = '$LATEST';
  }
  this.versions[initialLambda.Version] = initialLambda;

  // Alias name -> version
  // Aliases are just aliases for a specific version.
  this.aliasVersions = {};
};

LambdaNameDepot.prototype.addAlias = function addAlias(p) {
  var aliasName = p.aliasName;
  var version = p.version || '$LATEST';
  if (!this.versions[version]) {
    throw new Error(`No such function ${this.name} version ${version}`);
  }
  this.aliasVersions[aliasName] = version;
};

LambdaNameDepot.prototype.hasAlias = function hasAlias(aliasName) {
  return !!this.aliasVersions[aliasName];
};

LambdaNameDepot.prototype.removeAlias = function removeAlias(aliasName) {
  if (!!this.aliasVersions[aliasName]) {
    delete this.aliasVersions[aliasName];
  }
};

LambdaNameDepot.prototype.addVersion = function addVersion(lambda) {
  if (!lambda.Version) {
    lambda.Version = '$LATEST';
  }
  if (!!this.versions[lambda.Version]) {
    return ['ResourceConflictException', `Lambda (${lambda.FunctionName}, version ${lambda.Version}) already exists`];
  }
  this.versions[lambda.Version] = lambda;
  return null;
};

/**
 * @return {string} null if there was no problem, or a string describing the problem.
 */
LambdaNameDepot.prototype.removeVersion = function removeVersion(version) {
  // Cannot delete the latest version unless you're deleting the whole function.
  if (!latest || latest === '$LATEST') {
    return `Cannot delete latest version of ${this.name}`;
  }
  for (var k in this.aliasVersions) {
    if (this.aliasVersions.hasOwnProperty(k)) {
      if (version === this.aliasVersions[k]) {
        throw new Error(`Cannot delete version that has an alias`);
      }
    }
  }
  if (!this.versions[version]) {
    return `Version ${version} does not exist`;
  }
  delete this.versions[version];
  return null;
}

LambdaNameDepot.prototype.getLambdaByVersion = function getLambdaByVersion(version) {
  if (!version) {
    version = '$LATEST';
  }
  return this.versions[version];
};

LambdaNameDepot.prototype.getLambdaByArn = function getLambdaByArn(arn) {
  if (arn === this.baseArn) {
    return this.latest;
  }

  for (var k in this.aliasVersions) {
    if (this.aliasVersions.hasOwnProperty(k)) {
      if (arn === this.baseArn + ':' + k) {
        return this.versions[this.aliasVersions[k]];
      }
    }
  }
  for (var k in this.versions) {
    if (this.versions.hasOwnProperty(k)) {
      if (arn === this.baseArn + ':' + k) {
        return this.versions[k];
      }
    }
  }
  return null;
};
