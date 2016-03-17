'use strict';

const aws_common = require('../../lib/aws-common');

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
    this.creationDate = aws_common.timestamp();
    this.configuration = {};
    this.configuration.defaultChildPolicy = "";
    this.configuration.defaultTaskStartToCloseTimeout = "";
    this.configuration.defaultExecutionStartToCloseTimeout = "";
    this.configuration.defaultLambdaRole = "";
    this.configuration.defaultTaskList = null;
    this.configuration.defaultTaskPriority = "";

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
WorkflowType.prototype.createRun = function createRun(workflowId) {
    return new WorkflowRun(this, workflowId);
};


var ActivityType = function(name, version) {
    this.configuration = {
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
    this.creationDate = aws_common.timestamp();
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



// active states
const RUN_STATE_RUNNING = 0;
const RUN_STATE_CANCEL_REQUESTED = 1;

// closed states
const RUN_STATE_CLOSED_STATE_START = 10;
const RUN_STATE_COMPLETED = 10;
const RUN_STATE_FAILED = 11;
const RUN_STATE_CANCELED = 12;
const RUN_STATE_TERMINATED = 13;
const RUN_STATE_CONTINUED_AS_NEW = 14;
const RUN_STATE_TIMED_OUT = 15;

var WorkflowRun = function(workflowType, workflowId) {
    this.workflowType = workflowType;
    this.workflowId = workflowId;
    this.runId = aws_common.gen_request_id();
    this.executionConfiguration = {
        lambdaRole: workflowType.configuration.defaultLambdaRole,
        taskStartToCloseTimeout: workflowType.configuration.defaultTaskStartToCloseTimeout,
        executionStartToCloseTimeout: workflowType.configuration.defaultExecutionStartToCloseTimeout,
        taskPriority: workflowType.configuration.defaultTaskPriority,
        childPolicy: workflowType.configuration.defaultChildPolicy,
        taskList: null
    };
    if (!! workflowType.configuration.defaultTaskList) {
        this.executionConfiguration.taskList = {
            name: workflowType.configuration.defaultTaskList.name
        };
    }

    this.tagList = [];
    this.openDecisionTasks = [];
    this.openTimers = [];
    this.openLambdaFunctions = [];
    this.openActivityTasks = [];
    this.openChildWorkflowExecutions = [];
    this.eventHistory = [];
    this.startTimestamp = aws_common.timestamp();
    this.closeTimestamp = null;
    this.runState = RUN_STATE_RUNNING;
    this.latestActivityTaskTimestamp = aws_common.timestamp(),
    this.executionContext = "";
    this.parent = null;
};
WorkflowRun.prototype.getMissingDefault = function getMissingDefault() {
    var defaultParams = [ "lambdaRole", "taskStartToCloseTimeout",
        "executionStartToCloseTimeout", "taskPriority",
        "childPolicy", "taskList" ];
    for (var i = 0; i < defaultParams.length; i++) {
        if (! this.executionConfiguration[defaultParams[i]]) {
            return defaultParams[i];
        }
    }
    return null;
};
WorkflowRun.prototype.overrideDefault = function overrideDefault(key, value) {
    if (!! value) {
        this.executionConfiguration[key] = value;
    }
};
WorkflowRun.prototype.describe = function describe() {
    return {
        executionConfiguration: this.executionConfiguration,
        openCounts: {
            openDecisionTasks: this.openDecisionTasks.length,
            openTimers: this.openTimers.length,
            openLambdaFunctions: this.openLambdaFunctions.length,
            openActivityTasks: this.openActivityTasks.length,
            openChildWorkflowExecutions: this.openChildWorkflowExecutions.length
        },
        executionInfo: {
            closeStatus: this.getCloseStatus(),
            parent: this.parent === null ? null : {
                workflowId: this.parent.workflowId,
                runId: this.parent.runId
            },
            startTimestamp: "" + this.startTimestamp,
            cancelRequested: this.runState === RUN_STATE_CANCEL_REQUESTED,
            tagList: this.tagList,
            workflowType: {
                version: this.workflowType.version,
                name: this.workflowType.name
            },
            closeTimestamp: this.closeTimestamp,
            execution: {
                workflowId: this.workflowId,
                runId: this.runId
            },
            executionStatus: this.runState < RUN_STATE_CLOSED_STATE_START ? "OPEN" : "CLOSED"
        },
        latestActivityTaskTimestamp: "" + latestActivityTaskTimestamp,
        latestExecutionContext: this.executionContext
    };
};
WorkflowRun.prototype.getCloseStatus = function getCloseStatus() {
    switch (this.runState) {
        case RUN_STATE_COMPLETED:
            return "COMPLETED";
        case RUN_STATE_FAILED:
            return "FAILED";
        case RUN_STATE_CANCELED:
            return "CANCELED";
        case RUN_STATE_TERMINATED:
            return "TERMINATED";
        case RUN_STATE_CONTINUED_AS_NEW:
            return "CONTINUED_AS_NEW";
        case RUN_STATE_TIMED_OUT:
            return "TIMED_OUT";
        default:
            return null;
    }
};
WorkflowRun.prototype.matches = function matches(workflowId, runId) {
    return this.workflowId === workflowId && this.runId === runId;
};
WorkflowRun.prototype.describeEvents = function describeEvents() {
    var events = [];
    for (var i = 0; i < this.eventHistory.length; i++) {
        events.push(this.eventHistory[i].describe());
    }
    return events;
};
WorkflowRun.prototype.isClosed = function isClosed() {
    return this.runState >= RUN_STATE_CLOSED_STATE_START;
};
WorkflowRun.prototype.matchesFilter = function matchesFilter(filterMap) {
    var tagFilter = filterMap['tagFilter'];
    var executionFilter = filterMap['executionFilter'];
    var closeStatusFilter = filterMap['closeStatusFilter'];
    var closeTimeFilter = filterMap['closeTimeFilter'];
    var startTimeFilter = filterMap['startTimeFilter'];
    var typeFilter = filterMap['typeFilter'];

    // time filters are independent of each other, and the other
    // filters are independent of each other.  However,
    // they must cooperate.

    var timeFilterPass = true;
    var otherFilterPass = true;

    if (!! startTimeFilter) {
        if (!! startTimeFilter.latestDate) {
            // Optional parameter
            if (this.startTimestamp > test_parse.parseInteger(startTimeFilter.latestDate)) {
                timeFilterPass = false;
            }
        }
        timeFilterPass = timeFilterPass &&
            (this.startTimestamp >= test_parse.parseInteger(startTimeFilter.oldestDate));
    }
    if (!! closeTimeFilter) {
        if (!! closeTimeFilter.latestDate) {
            // Optional parameter
            if (this.closeTimestamp > test_parse.parseInteger(closeTimeFilter.latestDate)) {
                timeFilterPass = false;
            }
        }
        timeFilterPass = timeFilterPass &&
            (this.closeTimestamp >= test_parse.parseInteger(closeTimeFilter.oldestDate));
    }

    if (!! closeStatusFilter) {
        otherFilterPass = otherFilterPass && (this.getCloseStatus() === closeStatusFilter.status);
    }
    if (!! executionFilter) {
        otherFilterPass = otherFilterPass && (this.workflowId === executionFilter.workflowId);
    }
    if (!! tagFilter) {
        var tagFilter = false;
        for (var i = 0; i < this.tagList.length; i++) {
            if (tagFilter.tag === this.tagList[i]) {
                tagFilter = true;
                break;
            }
        }
        otherFilterPass = otherFilterPass && tagFilter;
    }
    if (!! typeFilter) {
        otherFilterPass = otherFilterPass &&
            (this.workflowType.name === typeFilter.name &&
            this.workflowType.version === typeFilter.version);
    }

    return otherFilterPass && timeFilterPass;
};
