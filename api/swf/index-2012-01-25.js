'use strict';
const aws_common = require('../../lib/aws-common');
const workflow_def = require('./workflow');
const textParse = require('../../lib/test-parse');
const common_inbox = require('../../lib/inbox');

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
        activityTypes: [],
        workflowRuns: [],

        // queues to listen to
        activityTaskLists: {},
        decisionsTaskLists: {}
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
    return [200, aws_common.pageResults({
        resultList: domains,
        reverseOrder: reverseOrder,
        maximumPageSize: maximumPageSize,
        nextPageToken: nextPageToken,
        key: domainInfos
    })];
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
    if (!! getWorkflowType(domain, name, version)) {
        return [400, "Sender", "TypeAlreadyExistsFault", "Workflow type already exists " +
            name + " version " + version];
    }
    if (!! defaultTaskList && ! isValidTaskListName(defaultTaskList.name)) {
        return [400, "Sender", "InvalidParameterValue", "Invalid task list name " + defaultTaskList.name];
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

    var workflow = getWorkflowType(domain, workflowType.name, workflowType.version);
    if (!! workflow) {
        return [200, workflow.describe()];
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

    return [200, aws_common.pageResults({
        resultList: infos,
        reverseOrder: reverseOrder,
        maximumPageSize: maximumPageSize,
        nextPageToken: nextPageToken,
        key: 'typeInfos'
    })];
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

    return [200, aws_common.pageResults({
        reverseOrder: reverseOrder,
        maximumPageSize: maximumPageSize,
        nextPageToken: nextPageToken,
        key: 'typeInfos',
        resultList: infos
    })];
};



// -----------------------------------------------------------------------------
// Workflow Execution Queries

module.exports.DescribeWorkflowExecution = function DescribeWorkflowExecution(aws) {
    var domain = aws.params['domain'];
    var execution = aws.params['execution'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! execution) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter execution"];
    }
    if (! execution.runId) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter execution.runId"];
    }
    if (! execution.workflowId) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter execution.workflowId"];
    }

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
        var wrun = domainWorkflows[domain].workflowRuns[i];
        if (wrun.matches(execution.workflowId, execution.runId)) {
            return [200, wrun.describe()];
        }
    }
    return [400, "Sender", "UnknownResourceFault", "unknown workflow execution " +
        execution.workflowId + " run " + execution.runId];
};
module.exports.GetWorkflowExecutionHistory = function GetWorkflowExecutionHistory(aws) {
    var maximumPageSize = aws.params['maximumPageSize'] /* integer */;
    var reverseOrder = aws.params['reverseOrder'] /* boolean */;
    var nextPageToken = aws.params['nextPageToken'];
    var domain = aws.params['domain'];
    var execution = aws.params['execution'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! execution) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter execution"];
    }
    if (! execution.runId) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter execution.runId"];
    }
    if (! execution.workflowId) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter execution.workflowId"];
    }

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
        var wrun = domainWorkflows[domain].workflowRuns[i];
        if (wrun.matches(execution.workflowId, execution.runId)) {
            var events = wrun.describeEvents();
            return [200, aws_common.pageResults({
                reverseOrder: reverseOrder,
                maximumPageSize: maximumPageSize,
                nextPageToken: nextPageToken,
                key: 'events',
                resultList: events
            })];
        }
    }
    return [400, "Sender", "UnknownResourceFault", "unknown workflow execution " +
        execution.workflowId + " run " + execution.runId];
};
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
    }
    if (! startTimeFilter) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter startTimeFilter"];
    }

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    var infos = [];
    var wrun;
    for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
        wrun = domainWorkflows[domain].workflowRuns[i];
        if (! wrun.isClosed() && wrun.matchesFilter(aws.params)) {
            infos.push(wrun.describe().executionInfo);
        }
    }

    return [200, aws_common.pageResults({
        reverseOrder: reverseOrder,
        maximumPageSize: maximumPageSize,
        nextPageToken: nextPageToken,
        key: 'executionInfos',
        resultList: infos
    })];
};
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

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    var infos = [];
    var wrun;
    for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
        wrun = domainWorkflows[domain].workflowRuns[i];
        if (wrun.isClosed() && wrun.matchesFilter(aws.params)) {
            infos.push(wrun.describe().executionInfo);
        }
    }

    return [200, aws_common.pageResults({
        reverseOrder: reverseOrder,
        maximumPageSize: maximumPageSize,
        nextPageToken: nextPageToken,
        key: 'executionInfos',
        resultList: infos
    })];
};
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

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    var wrun;
    var count = 0;
    for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
        wrun = domainWorkflows[domain].workflowRuns[i];
        if (wrun.isClosed() && wrun.matchesFilter(aws.params)) {
            count++;
        }
    }

    var ret = {
        count: count,
        truncated: false
    };
    return [200, ret];
};
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

    var wrun;
    var count = 0;
    for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
        wrun = domainWorkflows[domain].workflowRuns[i];
        if (! wrun.isClosed() && wrun.matchesFilter(aws.params)) {
            count++;
        }
    }

    var ret = {
        count: count,
        truncated: false
    };
    return [200, ret];
};
module.exports.CountPendingDecisionTasks = function CountPendingDecisionTasks(aws) {
    var domain = aws.params['domain'];
    var taskList = aws.params['taskList'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! taskList) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter taskList"];
    }
    if (! taskList.name) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter taskList.name"];
    }

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }


    if (!! domainWorkflows[domain].decisionsTaskLists[taskList.name]) {
        return [200, {
            count: domainWorkflows[domain].decisionsTaskLists[taskList.name].
                countLiveMessages(),
            truncated: false
        }];
    }
    return [200, {count: 0, truncated: false}];
};
module.exports.CountPendingActivityTasks = function CountPendingActivityTasks(aws) {
    var domain = aws.params['domain'];
    var taskList = aws.params['taskList'];
    if (! domain) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter domain"];
    }
    if (! taskList) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter taskList"];
    }
    if (! taskList.name) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter taskList.name"];
    }

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    if (!! domainWorkflows[domain].activityTaskLists[taskList.name]) {
        return [200, {
            count: domainWorkflows[domain].activityTaskLists[taskList.name].
                countLiveMessages(),
            truncated: false
        }];
    }
    return [200, {count: 0, truncated: false}];
};



// -----------------------------------------------------------------------------
// Workflow Execution Controls

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
    }
    if (! workflowId) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter workflowId"];
    }
    if (! workflowType) {
        return [400, "Sender", "MissingParameter", "Did not specify parameter workflowType"];
    }

    // validate workflow id - it has the same format as task list names
    if (! isValidTaskListName(workflowId)) {
        return [400, "Sender", "InvalidParameterValue", "Invalid workflow id " + workflowId];
    }

    // validate task list name, if given
    if (!! taskList && ! isValidTaskListName(taskList.name)) {
        return [400, "Sender", "InvalidParameterValue", "Invalid task list name " + defaultTaskList.name];
    }

    if (! domainWorkflows[domain]) {
        return [400, "Sender", "UnknownResourceFault", "unknown domain " + domain];
    }

    var wtype = getWorkflowType(domain, workflowType.name, workflowType.version);
    if (! wtype) {
        return [400, "Sender", "UnknownResourceFault", "Invalid workflow type " +
            workflowType.name + " version " + workflowType.version];
    }

    // ensure we don't have an existing open workflow with the same id
    for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
        if (! domainWorkflows[domain].workflowRuns[i].isClosed() &&
                domainWorkflows[domain].workflowRuns[i].workflowId === workflowId) {
            return [400, "Sender", "WorkflowExecutionAlreadyStartedFault",
                "Workflow id " + workflowId + " is already running"];
        }
    }

    var run = wtype.createRun(workflowId);

    // Set the actual values for the parameters; the passed-in parameters
    // override the default values.
    // If any parameter is not specified (no default, and not passed in),
    // it generates a DefaultUndefinedFault error.
    run.overrideDefault('lambdaRole', lambdaRole);
    run.overrideDefault('executionStartToCloseTimeout', executionStartToCloseTimeout);
    run.overrideDefault('tagList', tagList);
    run.overrideDefault('taskStartToCloseTimeout', taskStartToCloseTimeout);
    run.overrideDefault('taskPriority', taskPriority);
    run.overrideDefault('taskList', taskList);
    run.overrideDefault('childPolicy', childPolicy);

    var missingDefault = run.getMissingDefault();
    if (!! missingDefault) {
        return [400, "Sender", "DefaultUndefinedFault", "Missing parameter " +
            missingDefault];
    }

    var inbox = getDecisionTaskList(domain, run.executionConfiguration.taskList.name);

    // insert into the message the history up to this point.



    // TODO implement code

    var ret = {
        runId: run.runId
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
























var isValidTaskListName = function isValidTaskListName(name) {
    // The specified string must not start or end with whitespace. It must not contain a  : (colon),  / (slash),
    // | (vertical bar), or any control characters (\u0000-\u001f | \u007f - \u009f). Also, it must not contain
    // the literal string "arn".

    return
        // must be non-null
        !! name &&

        // must not start or end with whitespace
        name.trim() === name &&

        // must not contain a colon, slash, vertical bar, or any
        // control characters, or the literal string "arn"
        ! name.match(/:|\/|\||[\u0000-\u001f]|[\u007f-\u009f]|arn/);
};

var getWorkflowType = function getWorkflowType(domain, name, version) {
    for (var i = 0; i < domainWorkflows[domain].workflowTypes.length; i++) {
        if (domainWorkflows[domain].workflowTypes[i].matches(name, version)) {
            return domainWorkflows[domain].workflowTypes[i];
            break;
        }
    }
    return null;
};

var getDecisionTaskList = function getDecisionTaskList(domain, name) {
    if (! domainWorkflows[domain].decisionsTaskLists[name]) {
        domainWorkflows[domain].decisionsTaskLists[name] = new common_inbox();
    }
    return domainWorkflows[domain].decisionsTaskLists[name];
};

var getActivityTaskList = function getActivityTaskList(domain, name) {
    if (! domainWorkflows[domain].activityTaskLists[name]) {
        domainWorkflows[domain].activityTaskLists[name] = new common_inbox();
    }
    return domainWorkflows[domain].activityTaskLists[name];
};
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
