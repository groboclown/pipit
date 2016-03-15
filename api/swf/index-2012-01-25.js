'use strict';
const aws_common = require('../../lib/aws-common');
const workflow_def = require('./workflow');
const textParse = require('../../lib/test-parse');

/**
 * Amazon Simple Workflow Service version 2012-01-25
 */


// ------------------------------------------------------------------------
// Domain API
var domainWorkflows = {};

module.exports.RegisterDomain = function RegisterDomain(aws) {
    var description = aws.params['description'];
    var workflowExecutionRetentionPeriodInDays = aws.params['workflowExecutionRetentionPeriodInDays'];
    var name = aws.params['name'];
    if (! name) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
    }
    if (workflowExecutionRetentionPeriodInDays === null ||
            typeof workflowExecutionRetentionPeriodInDays === 'undefined') {
        return [400, "Sender", "MissingParameter", "Did not specify parameter workflowExecutionRetentionPeriodInDays"];
    }

    if (!! domainWorkflows[name]) {
        return [400, "Sender", "DomainAlreadyExistsFault", "Domain already registered: " + name];
    }

    domainWorkflows[name] = {
        name: name,
        description: description,
        workflowExecutionRetentionPeriodInDays: workflowExecutionRetentionPeriodInDays,
        status: 'REGISTERED',
        workflowTypes: [],
        activityTypes: []
    };

    var ret = {};
    return [200, ret];
};
module.exports.ListDomains = function ListDomains(aws) {
    var maximumPageSize = aws.params['maximumPageSize'] /* integer */;
    var reverseOrder = aws.params['reverseOrder'] /* boolean */;
    var nextPageToken = aws.params['nextPageToken'];
    var registrationStatus = aws.params['registrationStatus'];
    if (! registrationStatus) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter registrationStatus"];
    }

    // Rather than implement paging correctly, just return all the domains.
    // Also, we're just ignoring the reverseOrder request.
    var domains = [];
    for (var p in domainWorkflows) {
        if (domainWorkflows.hasOwnProperty(p)) {
            var domain = domainWorkflows[p];
            if (registrationStatus === domain.status) {
                domains.push({
                    name: domain.name,
                    description: domain.description,
                    status: domain.status
                });
            }
        }
    }

    var ret = {
        nextPageToken: null,
        domainInfos: domains
    };
    return [200, ret];
};
module.exports.DescribeDomain = function DescribeDomain(aws) {
    var name = aws.params['name'];
    if (! name) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
    }
    if (! domainWorkflows[name]) {
        return [400, "Sender", "UnknownResourceFault", "No such domain " + name];
    }
    var domain = domainWorkflows[name];

    // TODO implement code

    var ret = {
        configuration: {
            workflowExecutionRetentionPeriodInDays: domain.workflowExecutionRetentionPeriodInDays
        },
        domainInfo: {
            status: domain.status,
            description: domain.description,
            name: name
        }
    };
    return [200, ret];
};


// -----------------------------------------------------------------------------
// Workflow Maintenance Stuff

module.exports.RegisterWorkflowType = function RegisterWorkflowType(aws) {
    var defaultLambdaRole = aws.params['defaultLambdaRole'];
    var defaultTaskPriority = aws.params['defaultTaskPriority'];
    var defaultChildPolicy = aws.params['defaultChildPolicy'];
    var defaultTaskStartToCloseTimeout = aws.params['defaultTaskStartToCloseTimeout'];
    var defaultExecutionStartToCloseTimeout = aws.params['defaultExecutionStartToCloseTimeout'];
    var version = aws.params['version'];
    var name = aws.params['name'];
    var domain = aws.params['domain'];
    var description = aws.params['description'];
    var defaultTaskList = aws.params['defaultTaskList'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! name) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
    }
    if (! version) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter version"];
    }
    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "Unknown domain " + domain];
    }
    for (var i = 0; i < domainWorkflows[domain].workflowTypes.length; i++) {
        if (domainWorkflows[domain].workflowTypes[i].matches(name, version)) {
            return [400, "Sender", "TypeAlreadyExistsFault", "Workflow type already exists " +
                name + " version " + version];
        }
    }

    var workflowType = workflow_def.createWorkflowType(name, version, domain);
    workflowType.description = description;
    workflowType.configuration.defaultChildPolicy = defaultChildPolicy;
    workflowType.configuration.defaultTaskStartToCloseTimeout = defaultTaskStartToCloseTimeout;
    workflowType.configuration.defaultExecutionStartToCloseTimeout = defaultExecutionStartToCloseTimeout;
    workflowType.configuration.defaultLambdaRole = defaultLambdaRole;
    workflowType.configuration.defaultTaskList = defaultTaskList;
    workflowType.configuration.defaultTaskPriority = defaultTaskPriority;
    workflowType.configuration.defaultTaskStartToCloseTimeout = defaultTaskStartToCloseTimeout;
    domainWorkflows[domain].workflowTypes.push(workflowType);

    var ret = {};
    return [200, ret];
};
module.exports.RegisterActivityType = function RegisterActivityType(aws) {
    var defaultTaskScheduleToStartTimeout = aws.params['defaultTaskScheduleToStartTimeout'];
    var defaultTaskPriority = aws.params['defaultTaskPriority'];
    var defaultTaskScheduleToCloseTimeout = aws.params['defaultTaskScheduleToCloseTimeout'];
    var defaultTaskStartToCloseTimeout = aws.params['defaultTaskStartToCloseTimeout'];
    var defaultTaskHeartbeatTimeout = aws.params['defaultTaskHeartbeatTimeout'];
    var version = aws.params['version'];
    var name = aws.params['name'];
    var domain = aws.params['domain'];
    var description = aws.params['description'];
    var defaultTaskList = aws.params['defaultTaskList'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! name) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
    }
    if (! version) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter version"];
    }
    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "Unknown domain " + domain];
    }
    for (var i = 0; i < domainWorkflows[domain].activityTypes.length; i++) {
        if (domainWorkflows[domain].activityTypes[i].matches(name, version)) {
            return [400, "Sender", "TypeAlreadyExistsFault", "Workflow type already exists " +
                name + " version " + version];
        }
    }

    var activityType = workflow_def.createActivityType(name, version);
    activityType.description = description;
    activityType.configuration.defaultChildPolicy = defaultChildPolicy;
    activityType.configuration.defaultTaskStartToCloseTimeout = defaultTaskStartToCloseTimeout;
    activityType.configuration.defaultExecutionStartToCloseTimeout = defaultExecutionStartToCloseTimeout;
    activityType.configuration.defaultLambdaRole = defaultLambdaRole;
    activityType.configuration.defaultTaskList = defaultTaskList;
    activityType.configuration.defaultTaskPriority = defaultTaskPriority;
    activityType.configuration.defaultTaskStartToCloseTimeout = defaultTaskStartToCloseTimeout;
    domainWorkflows[domain].activityTypes.push(activityType);

    var ret = {};
    return [200, ret];
};
module.exports.DescribeWorkflowType = function DescribeWorkflowType(aws) {
    var workflowType = aws.params['workflowType'];
    var domain = aws.params['domain'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! workflowType) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter workflowType"];
    }
    if (! workflowType.name) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter workflowType.name"];
    }
    if (! workflowType.version) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter workflowType.version"];
    }

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    var workflow;
    for (var i = 0; i < domainWorkflows[domain].workflowTypes.length; i++) {
        workflow = domainWorkflows[domain].workflowTypes[i];
        if (workflow.matches(workflowType.name, workflowType.version)) {
            return [200, workflow.describe()];
        }
    }
    return [400, "Sender", "UnknownResourceFault", "unknown workflow type " +
        workflowType.name + " version " + workflowType.version];
};
module.exports.ListWorkflowTypes = function ListWorkflowTypes(aws) {
    var maximumPageSize = aws.params['maximumPageSize'] /* integer */;
    var reverseOrder = aws.params['reverseOrder'] /* boolean */;
    var nextPageToken = aws.params['nextPageToken'];
    var domain = aws.params['domain'];
    var name = aws.params['name'];
    var registrationStatus = aws.params['registrationStatus'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! registrationStatus) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter registrationStatus"];
    }

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    var infos = [];
    for (var i = 0; i < domainWorkflows[domain].workflowTypes.length; i++) {
        var workflowType = domainWorkflows[domain].workflowTypes[i];
        if (workflowType.status === registrationStatus) {
            infos.push({
                status: workflowType.status,
                workflowType: /*Sr*/{
                    version: workflowType.version,
                    name: workflowType.name
                },
                creationDate: "" + workflowType.creationDate,
                description: workflowType.description,
                deprecationDate:"" +  workflowType.deprecationDate
            });
        }
    }


    // no paging - returns in one response
    // no reverseOrder
    var ret = {
        nextPageToken: null,
        typeInfos: infos
    };
    return [200, ret];
};
module.exports.DescribeActivityType = function DescribeActivityType(aws) {
    var activityType = aws.params['activityType'];
    var domain = aws.params['domain'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! activityType) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter activityType"];
    }
    if (! activityType.name) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter activityType.name"];
    }
    if (! activityType.version) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter activityType.version"];
    }
    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "Unknown domain " + domain];
    }
    for (var i = 0; i < domainWorkflows[domain].activityTypes.length; i++) {
        if (domainWorkflows[domain].activityTypes[i].matches(activityType.name, activityType.version)) {
            return [200, domainWorkflows[domain].activityTypes[i].describe()];
        }
    }
    return [400, "Sender", "UnknownResourceFault", "Unknown activity type  " +
        activityType.name + " version " + activityType.version];
};
module.exports.ListActivityTypes = function ListActivityTypes(aws) {
    var maximumPageSize = aws.params['maximumPageSize'] /* integer */;
    var reverseOrder = aws.params['reverseOrder'] /* boolean */;
    var nextPageToken = aws.params['nextPageToken'];
    var domain = aws.params['domain'];
    var name = aws.params['name'];
    var registrationStatus = aws.params['registrationStatus'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! registrationStatus) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter registrationStatus"];
    }

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    // ignores paging - return all results.
    // ignores reverse order
    var infos = [];
    for (var i = 0; i < domainWorkflows[domain].activityTypes.length; i++) {
        var activityType = domainWorkflows[domain].activityTypes[i];
        if (activityType.status === registrationStatus) {
            infos.push({
                status: activityType.status,
                deprecationDate: "" + activityType.deprecationDate,
                activityType: {
                    version: activityType.version,
                    name: activityType.name
                },
                description: activityType.description,
                creationDate: "" + activityType.creationDate
            });
        }
    }

    var ret = {
        nextPageToken: null,
        typeInfos: infos
    };
    return [200, ret];
};



// -----------------------------------------------------------------------------
// Workflow Execution Queries


// -----------------------------------------------------------------------------
// TODO to sort









module.exports.RespondActivityTaskCanceled = function RespondActivityTaskCanceled(aws) {
        var details = aws.params['details'];
        var taskToken = aws.params['taskToken'];
        if (! taskToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskToken"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeWorkflowExecution = function DescribeWorkflowExecution(aws) {
        var domain = aws.params['domain'];
        var execution = aws.params['execution'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! execution) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter execution"];
        }

        // TODO implement code

        var ret = {
            executionConfiguration: {
                lambdaRole: "",
                taskStartToCloseTimeout: "",
                executionStartToCloseTimeout: "",
                taskPriority: "",
                childPolicy: "",
                taskList: /*Sj*/{
                    name: ""
                }
            },
            openCounts: {
                openDecisionTasks: 0,
                openTimers: 0,
                openLambdaFunctions: 0,
                openActivityTasks: 0,
                openChildWorkflowExecutions: 0
            },
            executionInfo: /*S19*/{
                closeStatus: "",
                parent: /*S16*/{
                    workflowId: "",
                    runId: ""
                },
                startTimestamp: now(),
                cancelRequested: false,
                tagList: /*S1b*/[ "" /*, ...*/ ],
                workflowType: /*Sr*/{
                    version: "",
                    name: ""
                },
                closeTimestamp: now(),
                execution: /*S16*/{
                    workflowId: "",
                    runId: ""
                },
                executionStatus: ""
            },
            latestActivityTaskTimestamp: now(),
            latestExecutionContext: ""
        };
        return [200, ret];
    }

module.exports.GetWorkflowExecutionHistory = function GetWorkflowExecutionHistory(aws) {
        var maximumPageSize = aws.params['maximumPageSize'] /* integer */;
        var reverseOrder = aws.params['reverseOrder'] /* boolean */;
        var nextPageToken = aws.params['nextPageToken'];
        var domain = aws.params['domain'];
        var execution = aws.params['execution'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! execution) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter execution"];
        }

        // TODO implement code

        var ret = {
            events: /*S1t*/[ {
                activityTaskCancelRequestedEventAttributes: {
                    activityId: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                timerCanceledEventAttributes: {
                    timerId: "",
                    startedEventId: 0 /*long*/,
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                workflowExecutionContinuedAsNewEventAttributes: {
                    lambdaRole: "",
                    input: "",
                    executionStartToCloseTimeout: "",
                    tagList: /*S1b*/[ "" /*, ...*/ ],
                    decisionTaskCompletedEventId: 0 /*long*/,
                    newExecutionRunId: "",
                    taskPriority: "",
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    taskStartToCloseTimeout: "",
                    taskList: /*Sj*/{
                        name: ""
                    },
                    childPolicy: ""
                },
                markerRecordedEventAttributes: {
                    details: "",
                    markerName: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                activityTaskStartedEventAttributes: {
                    identity: "",
                    scheduledEventId: 0 /*long*/
                },
                signalExternalWorkflowExecutionFailedEventAttributes: {
                    workflowId: "",
                    initiatedEventId: 0 /*long*/,
                    runId: "",
                    control: "",
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                requestCancelActivityTaskFailedEventAttributes: {
                    cause: "",
                    activityId: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                activityTaskCompletedEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    result: ""
                },
                activityTaskFailedEventAttributes: {
                    details: "",
                    reason: "",
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/
                },
                startTimerFailedEventAttributes: {
                    timerId: "",
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                childWorkflowExecutionCanceledEventAttributes: {
                    details: "",
                    workflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/
                },
                requestCancelExternalWorkflowExecutionFailedEventAttributes: {
                    workflowId: "",
                    initiatedEventId: 0 /*long*/,
                    runId: "",
                    control: "",
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                signalExternalWorkflowExecutionInitiatedEventAttributes: {
                    workflowId: "",
                    control: "",
                    runId: "",
                    signalName: "",
                    input: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                requestCancelExternalWorkflowExecutionInitiatedEventAttributes: {
                    control: "",
                    workflowId: "",
                    decisionTaskCompletedEventId: 0 /*long*/,
                    runId: ""
                },
                continueAsNewWorkflowExecutionFailedEventAttributes: {
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                childWorkflowExecutionTerminatedEventAttributes: {
                    workflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/
                },
                eventId: 0 /*long*/,
                decisionTaskTimedOutEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    timeoutType: "",
                    startedEventId: 0 /*long*/
                },
                decisionTaskStartedEventAttributes: {
                    identity: "",
                    scheduledEventId: 0 /*long*/
                },
                workflowExecutionCancelRequestedEventAttributes: {
                    cause: "",
                    externalWorkflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    externalInitiatedEventId: 0 /*long*/
                },
                lambdaFunctionFailedEventAttributes: {
                    details: "",
                    reason: "",
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/
                },
                activityTaskScheduledEventAttributes: {
                    input: "",
                    activityType: /*Sn*/{
                        version: "",
                        name: ""
                    },
                    decisionTaskCompletedEventId: 0 /*long*/,
                    activityId: "",
                    control: "",
                    taskPriority: "",
                    scheduleToStartTimeout: "",
                    heartbeatTimeout: "",
                    startToCloseTimeout: "",
                    scheduleToCloseTimeout: "",
                    taskList: /*Sj*/{
                        name: ""
                    }
                },
                failWorkflowExecutionFailedEventAttributes: {
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                workflowExecutionSignaledEventAttributes: {
                    externalInitiatedEventId: 0 /*long*/,
                    input: "",
                    signalName: "",
                    externalWorkflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    }
                },
                cancelWorkflowExecutionFailedEventAttributes: {
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                childWorkflowExecutionFailedEventAttributes: {
                    workflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    reason: "",
                    startedEventId: 0 /*long*/,
                    details: "",
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/
                },
                startLambdaFunctionFailedEventAttributes: {
                    cause: "",
                    scheduledEventId: 0 /*long*/,
                    message: ""
                },
                timerStartedEventAttributes: {
                    timerId: "",
                    startToFireTimeout: "",
                    decisionTaskCompletedEventId: 0 /*long*/,
                    control: ""
                },
                lambdaFunctionStartedEventAttributes: {
                    scheduledEventId: 0 /*long*/
                },
                activityTaskTimedOutEventAttributes: {
                    details: "",
                    scheduledEventId: 0 /*long*/,
                    timeoutType: "",
                    startedEventId: 0 /*long*/
                },
                cancelTimerFailedEventAttributes: {
                    timerId: "",
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                scheduleLambdaFunctionFailedEventAttributes: {
                    cause: "",
                    name: "",
                    decisionTaskCompletedEventId: 0 /*long*/,
                    id: ""
                },
                workflowExecutionCompletedEventAttributes: {
                    decisionTaskCompletedEventId: 0 /*long*/,
                    result: ""
                },
                lambdaFunctionCompletedEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    result: ""
                },
                lambdaFunctionTimedOutEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    timeoutType: ""
                },
                startChildWorkflowExecutionInitiatedEventAttributes: {
                    lambdaRole: "",
                    input: "",
                    tagList: /*S1b*/[ "" /*, ...*/ ],
                    workflowId: "",
                    childPolicy: "",
                    taskStartToCloseTimeout: "",
                    executionStartToCloseTimeout: "",
                    taskList: /*Sj*/{
                        name: ""
                    },
                    control: "",
                    taskPriority: "",
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                activityTaskCanceledEventAttributes: {
                    details: "",
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    latestCancelRequestedEventId: 0 /*long*/
                },
                workflowExecutionCanceledEventAttributes: {
                    details: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                lambdaFunctionScheduledEventAttributes: {
                    startToCloseTimeout: "",
                    input: "",
                    name: "",
                    decisionTaskCompletedEventId: 0 /*long*/,
                    id: ""
                },
                childWorkflowExecutionStartedEventAttributes: {
                    workflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/
                },
                workflowExecutionTerminatedEventAttributes: {
                    details: "",
                    cause: "",
                    reason: "",
                    childPolicy: ""
                },
                scheduleActivityTaskFailedEventAttributes: {
                    cause: "",
                    activityType: /*Sn*/{
                        version: "",
                        name: ""
                    },
                    activityId: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                decisionTaskCompletedEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    executionContext: ""
                },
                externalWorkflowExecutionCancelRequestedEventAttributes: {
                    workflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    initiatedEventId: 0 /*long*/
                },
                childWorkflowExecutionTimedOutEventAttributes: {
                    startedEventId: 0 /*long*/,
                    workflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/,
                    timeoutType: ""
                },
                workflowExecutionFailedEventAttributes: {
                    details: "",
                    reason: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                startChildWorkflowExecutionFailedEventAttributes: {
                    workflowId: "",
                    initiatedEventId: 0 /*long*/,
                    control: "",
                    cause: "",
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                recordMarkerFailedEventAttributes: {
                    cause: "",
                    markerName: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                eventType: "",
                workflowExecutionStartedEventAttributes: {
                    lambdaRole: "",
                    parentInitiatedEventId: 0 /*long*/,
                    parentWorkflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    input: "",
                    childPolicy: "",
                    taskStartToCloseTimeout: "",
                    executionStartToCloseTimeout: "",
                    continuedExecutionRunId: "",
                    taskPriority: "",
                    tagList: /*S1b*/[ "" /*, ...*/ ],
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    taskList: /*Sj*/{
                        name: ""
                    }
                },
                completeWorkflowExecutionFailedEventAttributes: {
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                childWorkflowExecutionCompletedEventAttributes: {
                    startedEventId: 0 /*long*/,
                    workflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/,
                    result: ""
                },
                workflowExecutionTimedOutEventAttributes: {
                    timeoutType: "",
                    childPolicy: ""
                },
                eventTimestamp: now(),
                decisionTaskScheduledEventAttributes: {
                    startToCloseTimeout: "",
                    taskList: /*Sj*/{
                        name: ""
                    },
                    taskPriority: ""
                },
                externalWorkflowExecutionSignaledEventAttributes: {
                    workflowExecution: /*S16*/{
                        workflowId: "",
                        runId: ""
                    },
                    initiatedEventId: 0 /*long*/
                },
                timerFiredEventAttributes: {
                    timerId: "",
                    startedEventId: 0 /*long*/
                }
            } /*, ...*/ ],
            nextPageToken: ""
        };
        return [200, ret];
    }
module.exports.CountPendingActivityTasks = function CountPendingActivityTasks(aws) {
        var domain = aws.params['domain'];
        var taskList = aws.params['taskList'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! taskList) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskList"];
        }

        // TODO implement code

        var ret = /*Sk*/{
            count: 0,
            truncated: false
        };
        return [200, ret];
    }
module.exports.RequestCancelWorkflowExecution = function RequestCancelWorkflowExecution(aws) {
        var workflowId = aws.params['workflowId'];
        var domain = aws.params['domain'];
        var runId = aws.params['runId'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! workflowId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter workflowId"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.RespondActivityTaskCompleted = function RespondActivityTaskCompleted(aws) {
        var taskToken = aws.params['taskToken'];
        var result = aws.params['result'];
        if (! taskToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskToken"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.SignalWorkflowExecution = function SignalWorkflowExecution(aws) {
        var workflowId = aws.params['workflowId'];
        var domain = aws.params['domain'];
        var signalName = aws.params['signalName'];
        var input = aws.params['input'];
        var runId = aws.params['runId'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! workflowId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter workflowId"];
        }        if (! signalName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter signalName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.CountClosedWorkflowExecutions = function CountClosedWorkflowExecutions(aws) {
        var tagFilter = aws.params['tagFilter'];
        var executionFilter = aws.params['executionFilter'];
        var closeStatusFilter = aws.params['closeStatusFilter'];
        var closeTimeFilter = aws.params['closeTimeFilter'];
        var startTimeFilter = aws.params['startTimeFilter'];
        var domain = aws.params['domain'];
        var typeFilter = aws.params['typeFilter'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }

        // TODO implement code

        var ret = /*Se*/{
            count: 0,
            truncated: false
        };
        return [200, ret];
    }
module.exports.RecordActivityTaskHeartbeat = function RecordActivityTaskHeartbeat(aws) {
        var details = aws.params['details'];
        var taskToken = aws.params['taskToken'];
        if (! taskToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskToken"];
        }

        // TODO implement code

        var ret = {
            cancelRequested: false
        };
        return [200, ret];
    }
module.exports.PollForActivityTask = function PollForActivityTask(aws) {
        var domain = aws.params['domain'];
        var identity = aws.params['identity'];
        var taskList = aws.params['taskList'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! taskList) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskList"];
        }

        // TODO implement code

        var ret = {
            input: "",
            workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
            activityType: /*Sn*/{
                version: "",
                name: ""
            },
            startedEventId: 0 /*long*/,
            taskToken: "",
            activityId: ""
        };
        return [200, ret];
    }
module.exports.CountOpenWorkflowExecutions = function CountOpenWorkflowExecutions(aws) {
        var startTimeFilter = aws.params['startTimeFilter'];
        var executionFilter = aws.params['executionFilter'];
        var domain = aws.params['domain'];
        var tagFilter = aws.params['tagFilter'];
        var typeFilter = aws.params['typeFilter'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! startTimeFilter) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter startTimeFilter"];
        }

        // TODO implement code

        var ret = /*Se*/{
            count: 0,
            truncated: false
        };
        return [200, ret];
    }
module.exports.RespondDecisionTaskCompleted = function RespondDecisionTaskCompleted(aws) {
        var decisions = aws.params['decisions'] /* list */;
        var taskToken = aws.params['taskToken'];
        var executionContext = aws.params['executionContext'];
        if (! taskToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskToken"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.ListClosedWorkflowExecutions = function ListClosedWorkflowExecutions(aws) {
        var tagFilter = aws.params['tagFilter'];
        var executionFilter = aws.params['executionFilter'];
        var closeStatusFilter = aws.params['closeStatusFilter'];
        var closeTimeFilter = aws.params['closeTimeFilter'];
        var maximumPageSize = aws.params['maximumPageSize'] /* integer */;
        var reverseOrder = aws.params['reverseOrder'] /* boolean */;
        var startTimeFilter = aws.params['startTimeFilter'];
        var nextPageToken = aws.params['nextPageToken'];
        var domain = aws.params['domain'];
        var typeFilter = aws.params['typeFilter'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }

        // TODO implement code

        var ret = /*S4g*/{
            executionInfos: [ /*S19*/{
                closeStatus: "",
                parent: /*S16*/{
                    workflowId: "",
                    runId: ""
                },
                startTimestamp: now(),
                cancelRequested: false,
                tagList: /*S1b*/[ "" /*, ...*/ ],
                workflowType: /*Sr*/{
                    version: "",
                    name: ""
                },
                closeTimestamp: now(),
                execution: /*S16*/{
                    workflowId: "",
                    runId: ""
                },
                executionStatus: ""
            } /*, ...*/ ],
            nextPageToken: ""
        };
        return [200, ret];
    }
module.exports.RespondActivityTaskFailed = function RespondActivityTaskFailed(aws) {
        var details = aws.params['details'];
        var reason = aws.params['reason'];
        var taskToken = aws.params['taskToken'];
        if (! taskToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskToken"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.ListOpenWorkflowExecutions = function ListOpenWorkflowExecutions(aws) {
        var maximumPageSize = aws.params['maximumPageSize'] /* integer */;
        var reverseOrder = aws.params['reverseOrder'] /* boolean */;
        var typeFilter = aws.params['typeFilter'];
        var executionFilter = aws.params['executionFilter'];
        var startTimeFilter = aws.params['startTimeFilter'];
        var nextPageToken = aws.params['nextPageToken'];
        var domain = aws.params['domain'];
        var tagFilter = aws.params['tagFilter'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! startTimeFilter) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter startTimeFilter"];
        }

        // TODO implement code

        var ret = /*S4g*/{
            executionInfos: [ /*S19*/{
                closeStatus: "",
                parent: /*S16*/{
                    workflowId: "",
                    runId: ""
                },
                startTimestamp: now(),
                cancelRequested: false,
                tagList: /*S1b*/[ "" /*, ...*/ ],
                workflowType: /*Sr*/{
                    version: "",
                    name: ""
                },
                closeTimestamp: now(),
                execution: /*S16*/{
                    workflowId: "",
                    runId: ""
                },
                executionStatus: ""
            } /*, ...*/ ],
            nextPageToken: ""
        };
        return [200, ret];
    }
module.exports.CountPendingDecisionTasks = function CountPendingDecisionTasks(aws) {
        var domain = aws.params['domain'];
        var taskList = aws.params['taskList'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! taskList) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskList"];
        }

        // TODO implement code

        var ret = /*Sk*/{
            count: 0,
            truncated: false
        };
        return [200, ret];
    }
module.exports.TerminateWorkflowExecution = function TerminateWorkflowExecution(aws) {
        var workflowId = aws.params['workflowId'];
        var reason = aws.params['reason'];
        var runId = aws.params['runId'];
        var details = aws.params['details'];
        var domain = aws.params['domain'];
        var childPolicy = aws.params['childPolicy'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! workflowId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter workflowId"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PollForDecisionTask = function PollForDecisionTask(aws) {
        var maximumPageSize = aws.params['maximumPageSize'] /* integer */;
        var reverseOrder = aws.params['reverseOrder'] /* boolean */;
        var identity = aws.params['identity'];
        var nextPageToken = aws.params['nextPageToken'];
        var domain = aws.params['domain'];
        var taskList = aws.params['taskList'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! taskList) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskList"];
        }

        // TODO implement code

        var ret = {
            workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
            previousStartedEventId: 0 /*long*/,
            startedEventId: 0 /*long*/,
            nextPageToken: "",
            events: /*S1t*/[ {
                activityTaskCancelRequestedEventAttributes: {
                    activityId: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                timerCanceledEventAttributes: {
                    timerId: "",
                    startedEventId: 0 /*long*/,
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                workflowExecutionContinuedAsNewEventAttributes: {
                    lambdaRole: "",
                    input: "",
                    executionStartToCloseTimeout: "",
                    tagList: /*S1b*/[ "" /*, ...*/ ],
                    decisionTaskCompletedEventId: 0 /*long*/,
                    newExecutionRunId: "",
                    taskPriority: "",
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    taskStartToCloseTimeout: "",
                    taskList: /*Sj*/{
                        name: ""
                    },
                    childPolicy: ""
                },
                markerRecordedEventAttributes: {
                    details: "",
                    markerName: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                activityTaskStartedEventAttributes: {
                    identity: "",
                    scheduledEventId: 0 /*long*/
                },
                signalExternalWorkflowExecutionFailedEventAttributes: {
                    workflowId: "",
                    initiatedEventId: 0 /*long*/,
                    runId: "",
                    control: "",
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                requestCancelActivityTaskFailedEventAttributes: {
                    cause: "",
                    activityId: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                activityTaskCompletedEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    result: ""
                },
                activityTaskFailedEventAttributes: {
                    details: "",
                    reason: "",
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/
                },
                startTimerFailedEventAttributes: {
                    timerId: "",
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                childWorkflowExecutionCanceledEventAttributes: {
                    details: "",
                    workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/
                },
                requestCancelExternalWorkflowExecutionFailedEventAttributes: {
                    workflowId: "",
                    initiatedEventId: 0 /*long*/,
                    runId: "",
                    control: "",
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                signalExternalWorkflowExecutionInitiatedEventAttributes: {
                    workflowId: "",
                    control: "",
                    runId: "",
                    signalName: "",
                    input: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                requestCancelExternalWorkflowExecutionInitiatedEventAttributes: {
                    control: "",
                    workflowId: "",
                    decisionTaskCompletedEventId: 0 /*long*/,
                    runId: ""
                },
                continueAsNewWorkflowExecutionFailedEventAttributes: {
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                childWorkflowExecutionTerminatedEventAttributes: {
                    workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/
                },
                eventId: 0 /*long*/,
                decisionTaskTimedOutEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    timeoutType: "",
                    startedEventId: 0 /*long*/
                },
                decisionTaskStartedEventAttributes: {
                    identity: "",
                    scheduledEventId: 0 /*long*/
                },
                workflowExecutionCancelRequestedEventAttributes: {
                    cause: "",
                    externalWorkflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    externalInitiatedEventId: 0 /*long*/
                },
                lambdaFunctionFailedEventAttributes: {
                    details: "",
                    reason: "",
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/
                },
                activityTaskScheduledEventAttributes: {
                    input: "",
                    activityType: /*Sn*/{
                        version: "",
                        name: ""
                    },
                    decisionTaskCompletedEventId: 0 /*long*/,
                    activityId: "",
                    control: "",
                    taskPriority: "",
                    scheduleToStartTimeout: "",
                    heartbeatTimeout: "",
                    startToCloseTimeout: "",
                    scheduleToCloseTimeout: "",
                    taskList: /*Sj*/{
                        name: ""
                    }
                },
                failWorkflowExecutionFailedEventAttributes: {
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                workflowExecutionSignaledEventAttributes: {
                    externalInitiatedEventId: 0 /*long*/,
                    input: "",
                    signalName: "",
                    externalWorkflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            }
                },
                cancelWorkflowExecutionFailedEventAttributes: {
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                childWorkflowExecutionFailedEventAttributes: {
                    workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    reason: "",
                    startedEventId: 0 /*long*/,
                    details: "",
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/
                },
                startLambdaFunctionFailedEventAttributes: {
                    cause: "",
                    scheduledEventId: 0 /*long*/,
                    message: ""
                },
                timerStartedEventAttributes: {
                    timerId: "",
                    startToFireTimeout: "",
                    decisionTaskCompletedEventId: 0 /*long*/,
                    control: ""
                },
                lambdaFunctionStartedEventAttributes: {
                    scheduledEventId: 0 /*long*/
                },
                activityTaskTimedOutEventAttributes: {
                    details: "",
                    scheduledEventId: 0 /*long*/,
                    timeoutType: "",
                    startedEventId: 0 /*long*/
                },
                cancelTimerFailedEventAttributes: {
                    timerId: "",
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                scheduleLambdaFunctionFailedEventAttributes: {
                    cause: "",
                    name: "",
                    decisionTaskCompletedEventId: 0 /*long*/,
                    id: ""
                },
                workflowExecutionCompletedEventAttributes: {
                    decisionTaskCompletedEventId: 0 /*long*/,
                    result: ""
                },
                lambdaFunctionCompletedEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    result: ""
                },
                lambdaFunctionTimedOutEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    timeoutType: ""
                },
                startChildWorkflowExecutionInitiatedEventAttributes: {
                    lambdaRole: "",
                    input: "",
                    tagList: /*S1b*/[ "" /*, ...*/ ],
                    workflowId: "",
                    childPolicy: "",
                    taskStartToCloseTimeout: "",
                    executionStartToCloseTimeout: "",
                    taskList: /*Sj*/{
                        name: ""
                    },
                    control: "",
                    taskPriority: "",
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                activityTaskCanceledEventAttributes: {
                    details: "",
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    latestCancelRequestedEventId: 0 /*long*/
                },
                workflowExecutionCanceledEventAttributes: {
                    details: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                lambdaFunctionScheduledEventAttributes: {
                    startToCloseTimeout: "",
                    input: "",
                    name: "",
                    decisionTaskCompletedEventId: 0 /*long*/,
                    id: ""
                },
                childWorkflowExecutionStartedEventAttributes: {
                    workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/
                },
                workflowExecutionTerminatedEventAttributes: {
                    details: "",
                    cause: "",
                    reason: "",
                    childPolicy: ""
                },
                scheduleActivityTaskFailedEventAttributes: {
                    cause: "",
                    activityType: /*Sn*/{
                        version: "",
                        name: ""
                    },
                    activityId: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                decisionTaskCompletedEventAttributes: {
                    scheduledEventId: 0 /*long*/,
                    startedEventId: 0 /*long*/,
                    executionContext: ""
                },
                externalWorkflowExecutionCancelRequestedEventAttributes: {
                    workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    initiatedEventId: 0 /*long*/
                },
                childWorkflowExecutionTimedOutEventAttributes: {
                    startedEventId: 0 /*long*/,
                    workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/,
                    timeoutType: ""
                },
                workflowExecutionFailedEventAttributes: {
                    details: "",
                    reason: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                startChildWorkflowExecutionFailedEventAttributes: {
                    workflowId: "",
                    initiatedEventId: 0 /*long*/,
                    control: "",
                    cause: "",
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                recordMarkerFailedEventAttributes: {
                    cause: "",
                    markerName: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                eventType: "",
                workflowExecutionStartedEventAttributes: {
                    lambdaRole: "",
                    parentInitiatedEventId: 0 /*long*/,
                    parentWorkflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    input: "",
                    childPolicy: "",
                    taskStartToCloseTimeout: "",
                    executionStartToCloseTimeout: "",
                    continuedExecutionRunId: "",
                    taskPriority: "",
                    tagList: /*S1b*/[ "" /*, ...*/ ],
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    taskList: /*Sj*/{
                        name: ""
                    }
                },
                completeWorkflowExecutionFailedEventAttributes: {
                    cause: "",
                    decisionTaskCompletedEventId: 0 /*long*/
                },
                childWorkflowExecutionCompletedEventAttributes: {
                    startedEventId: 0 /*long*/,
                    workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
                    initiatedEventId: 0 /*long*/,
                    result: ""
                },
                workflowExecutionTimedOutEventAttributes: {
                    timeoutType: "",
                    childPolicy: ""
                },
                eventTimestamp: now(),
                decisionTaskScheduledEventAttributes: {
                    startToCloseTimeout: "",
                    taskList: /*Sj*/{
                        name: ""
                    },
                    taskPriority: ""
                },
                externalWorkflowExecutionSignaledEventAttributes: {
                    workflowExecution: /*S16*/{
                workflowId: "",
                runId: ""
            },
                    initiatedEventId: 0 /*long*/
                },
                timerFiredEventAttributes: {
                    timerId: "",
                    startedEventId: 0 /*long*/
                }
            } /*, ...*/ ],
            workflowType: /*Sr*/{
                        version: "",
                        name: ""
                    },
            taskToken: ""
        };
        return [200, ret];
    }
module.exports.StartWorkflowExecution = function StartWorkflowExecution(aws) {
        var lambdaRole = aws.params['lambdaRole'];
        var workflowId = aws.params['workflowId'];
        var executionStartToCloseTimeout = aws.params['executionStartToCloseTimeout'];
        var tagList = aws.params['tagList'];
        var taskStartToCloseTimeout = aws.params['taskStartToCloseTimeout'];
        var taskPriority = aws.params['taskPriority'];
        var workflowType = aws.params['workflowType'];
        var domain = aws.params['domain'];
        var input = aws.params['input'];
        var taskList = aws.params['taskList'];
        var childPolicy = aws.params['childPolicy'];
        if (! domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
        }        if (! workflowId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter workflowId"];
        }        if (! workflowType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter workflowType"];
        }

        // TODO implement code

        var ret = {
            runId: ""
        };
        return [200, ret];
    }



// --------------------------------------------------------------------------
// TODO
// Not implemented features.
module.exports.DeprecateDomain = function DeprecateDomain(aws) {
    var name = aws.params['name'];
    if (! name) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
    }

    // TODO implement code

    var ret = {};
    return [200, ret];
};
module.exports.DeprecateWorkflowType = function DeprecateWorkflowType(aws) {
    var workflowType = aws.params['workflowType'];
    var domain = aws.params['domain'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! workflowType) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter workflowType"];
    }

    // TODO implement code

    var ret = {};
    return [200, ret];
};
module.exports.DeprecateActivityType = function DeprecateActivityType(aws) {
    var activityType = aws.params['activityType'];
    var domain = aws.params['domain'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! activityType) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter activityType"];
    }

    // TODO implement code

    var ret = {};
    return [200, ret];
};
