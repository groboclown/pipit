'use strict';

/**
 * Common API for the AWS emulation to find and run callback lambdas.
 */

const textParse = require('../test-parse');
const fs = require('fs');
const Q = require('q');
const crypto = require('crypto');
const yauzl = require('yauzl');
const mkdirp = require('mkdirp');
const path = require('path');
const vm = require('vm');
const jsonWatch = require('../json-watch');
const s3 = require('../s3');
const tmp = require('tmp');

const createLambdaDepot = require('./depot');

// Maps lambda function name -> list of versioned Lambda objects
var lambdaDepot = createLambdaDepot();


module.exports.getLambda = function getLambda(name, version) {
  var ret = (
    lambdaDepot.getByNameVersion(name, version) ||
    lambdaDepot.getByName(name) ||
    lambdaDepot.getByArn(name) ||
    null
  );
  return ret;
};


module.exports.hasLambda = function hasLambda(name, version) {
  return !!this.getLambda(name, version);
};


/**
 * @return {Q} promise with the lambda.
 */
module.exports.addLambda = function addLambda(p) {
  return lambdaDepot.addLambda(p);
};

module.exports.removeLambda = function removeLambda(lambdaName, version) {
  // TODO implement
};


/**
 * Save the given base-64 encoded text to a temporary file.
 * Returns a promise that has the filename as its parameter.
 */
module.exports.saveBase64File = function saveBase64File(base64Text) {
  var ret = Q.defer();
  tmp.file(function(err, path, fd, cleanupCallback) {
    if (err) {
      return ret.reject(err);
    }
    var binary = Buffer(base64Text, 'base64');
    fs.writeFile(path, binary, function(err) {
      if (err) {
        return ret.reject(err);
      }
      ret.resolve(path);
    });
  });
  return ret.promise;
};


module.exports.loadLambdasFromJson = function loadLambdasFromJson(jsonFile) {
  var text = '';
  fs.createReadStream(jsonFile)
    .on('data', function(chunk) {
      text += chunk;
    })
    .on('end', function() {
      var obj = null;
      try {
        obj = JSON.parse(text);
      } catch (e) {
        // Ignore
        obj = null;
      }
      if (!!obj && !!obj.lambdas && obj.lambdas.length > 0) {
        jsonWatched[jsonFile] = obj.lambdas;
        for (var i = 0; i < obj.lambdas.length; i++) {
          var name = obj.lambdas[i].name;
          var version = obj.lambdas[i].version;
          var handler = obj.lambdas[i].handler;
          var description = obj.lambdas[i].description || '';
          var role = obj.lambdas[i].role || '';
          var codeFileLocation = obj.lambdas[i].codeFileLocation || '';
          var memorySize = obj.lamdas[i].memorySize || 0;
          var publish = obj.lambdas[i].publish || false;
          var runtime = 'nodejs';
          var timeout = obj.lambdas[i].timeout || 300;
          // TODO fix invocation
          module.exports.addLambda(name, description,
            role, codeFileLocation, memorySize, publish, runtime,
            handler, timeout, {
              region: (obj.lambdas[i].region || 'XY-MOCK-1'),
            });
        }
      }
    });
};

module.exports.removeLambdasForJsonFile = function removeLambdasForJsonFile(jsonFile) {
  if (!!jsonWatched[jsonFile]) {
    for (var i = 0; i < jsonWatched.length; i++) {
      module.exports.removeLambda(jsonWatched[i].name);
    }
  }
};
var jsonWatched = {};


module.exports.monitorDir = function monitorDir(dirname) {
  if (!!watchedDirs[dirname]) {
    return;
  }
  var dirWatcher = jsonWatch.createJsonEmitter(dirname);
  dirWatcher
    .on('add', function o1(filepath) {
      module.exports.loadLambdasFromJson(filepath);
    })
    .on('change', function o2(filepath) {
      module.exports.loadLambdasFromJson(filepath);
    })
    .on('unlink', function o3(filepath) {
      module.exports.removeLambdasForJsonFile(filepath);
    });
  watchedDirs[dirname] = dirWatcher;
};

var watchedDirs = {};


// FIXME running a lambda will require passing in the source AWS object.
// This will be used to construct the aws object that is passed to the
// service.

// FIXME add a listener for auto-registered lambdas.
module.exports.monitorDir(jsonWatch.jsonExtensionDir);


/**
* Helper for unit testing:
* - load module with mocked dependencies
* - allow accessing private state of the module
*
* @param {string} filePath Absolute path to module (file to load)
* @param {Object=} mocks Hash of mocked dependencies
*/
var loadModule = function(filePath, mocks) {
  mocks = mocks || {};

  // This is necessary to allow relative path modules within loaded file
  // i.e. requiring ./some inside file /a/b.js needs to be resolved to /a/some
  var resolveModule = function(module) {
    if (module.charAt(0) !== '.') {
      return module;
    }
    return path.resolve(path.dirname(filePath), module);
  };

  var exports = {};
  var context = {
    require: function(name) {
      return mocks[name] || require(resolveModule(name));
    },
    console: console,
    exports: exports,
    module: { exports: exports },
  };

  // FIXME "vm" is not a variable
  vm.runInNewContext(fs.readFileSync(filePath), context);
  return context;
};
