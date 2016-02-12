'use strict';

const textParse = require('../test-parse');
var lambdaDepot = {};
var eventSourceMappings = {};

function Lambda(params, awsRequest) {
    var now = new Date();
    this.Description = params.Description;
    this.Role: params.Role;
    this.MemorySize = params.MemorySize;
    this.LastModified =
        now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    this.Enabled = textParse.parseBoolean(params.Enabled, true); // boolean, defaults to true
    this.Timeout = textParse.parseInteger();
    this.Handler = "";
    this.FunctionName = "";

    // This can also include the version number, or "latest"
    this.FunctionArn = "arn:aws:lambda:" + awsRequest.region + ':' +
        awsRequest.accessKey + ':function:' + this.FunctionName;
    this.Version = "";
    this.CodeSize = 0; /*long*/
    this.Runtime = "";
    this.CodeSha256 = "";
}





// FIXME running a lambda will require passing in the source AWS object.
// This will be used to construct the aws object that is passed to the
// service.

// FIXME add a listener for auto-registered lambdas.

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

    // this is necessary to allow relative path modules within loaded file
    // i.e. requiring ./some inside file /a/b.js needs to be resolved to /a/some
    var resolveModule = function(module) {
        if (module.charAt(0) !== '.') return module;
        return path.resolve(path.dirname(filePath), module);
    };

    var exports = {};
    var context = {
        require: function(name) {
            return mocks[name] || require(resolveModule(name));
        },
        console: console,
        exports: exports,
        module: {
            exports: exports
        }
    };

    vm.runInNewContext(fs.readFileSync(filePath), context);
    return context;
};
