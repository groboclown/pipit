'use strict';

module.exports.createWorkflowType = function createWorkflowType(name, version, domain) {
    return new WorkflowType(name, version, domain);
};
module.exports.createActivityType = function createActivityType(name, version) {
    return new ActivityType(name, version, domain);
};

var WorkflowType = function(name, version, domain) {
    this.name = name;
    this.version = version;
    this.description = "";
    this.domain = domain;
    this.status = 'REGISTERED';
    this.creationDate = now();
    this.configuration = {};
    this.configuration.defaultChildPolicy = "";
    this.configuration.defaultTaskStartToCloseTimeout = "";
    this.configuration.defaultExecutionStartToCloseTimeout = "";
    this.configuration.defaultLambdaRole = "";
    this.configuration.defaultTaskList = null;
    this.configuration.defaultTaskPriority = "";
    this.configuration.defaultTaskStartToCloseTimeout = "";

    this.activities = [];
};
WorkflowType.prototype.describe = function describe() {
    return {
        configuration: this.configuration,
        typeInfo: /*S1m*/{
            status: this.status,
            workflowType: /*Sr*/{
                version: this.version,
                name: this.name
            },
            creationDate: "" + this.creationDate,
            description: this.description,
            deprecationDate: null
        }
    };
};
WorkflowType.prototype.matches = function matches(name, version) {
    return this.name === name && this.version === version;
};


var ActivityType = function(name, version) {
    this.configuration: {
        defaultTaskScheduleToStartTimeout: "",
        defaultTaskScheduleToCloseTimeout: "",
        defaultTaskStartToCloseTimeout: "",
        defaultTaskHeartbeatTimeout: "",
        defaultTaskList: null,
        defaultTaskPriority: ""
    };
    this.status = 'REGISTERED';
    this.deprecationDate = null;
    this.name = name;
    this.version = version;
    this.description = "";
    this.creationDate: now();
};
ActivityType.prototype.describe = function describe() {
    return {
        configuration: this.configuration,
        typeInfo: {
            status: this.status,
            deprecationDate: this.deprecationDate,
            activityType: {
                name: this.name,
                version: this.version
            },
            description: this.description,
            creationDate: "" + this.creationDate
        }
    };
};
ActivityType.prototype.matches = function matches(name, version) {
    return this.name === name && this.version === version;
};




var WorkflowRun = function(workflowType) {
    this.workflowType = workflowType;
};
