'use strict';

const awsCommon = require('../../lib/aws-common');
const workflowDef = require('./workflow');
const textParse = require('../../lib/test-parse');
const tasklist = require('./tasklist.js');

/**
 * Amazon Simple Workflow Service version 2012-01-25
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);

// ------------------------------------------------------------------------
// Domain API
var domainWorkflows = {};

module.exports.RegisterDomain = function RegisterDomain(aws) {
  var description = aws.params.description;
  var workflowExecutionRetentionPeriodInDays = aws.params.workflowExecutionRetentionPeriodInDays;
  var name = aws.params.name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter name'];
  }
  if (workflowExecutionRetentionPeriodInDays === null ||
          typeof workflowExecutionRetentionPeriodInDays === 'undefined') {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter workflowExecutionRetentionPeriodInDays'];
  }

  if (!!domainWorkflows[name]) {
    return [400, 'Sender', 'DomainAlreadyExistsFault', 'Domain already registered: ' + name];
  }

  domainWorkflows[name] = {
    name: name,
    description: description,
    workflowExecutionRetentionPeriodInDays:
      workflowExecutionRetentionPeriodInDays,
    status: 'REGISTERED',
    workflowTypes: [],
    activityTypes: [],
    workflowRuns: [],

    // Queues to listen to
    activityTaskLists: {},
    decisionsTaskLists: {},
  };

  var ret = {};
  return [200, ret];
};
module.exports.ListDomains = function ListDomains(aws) {
  var maximumPageSize = aws.params.maximumPageSize /* Integer */;
  var reverseOrder = aws.params.reverseOrder /* Boolean */;
  var nextPageToken = aws.params.nextPageToken;
  var registrationStatus = aws.params.registrationStatus;
  if (!registrationStatus) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter registrationStatus'];
  }

  var domains = [];
  for (var p in domainWorkflows) {
    if (domainWorkflows.hasOwnProperty(p)) {
      var domain = domainWorkflows[p];
      if (registrationStatus === domain.status) {
        domains.push({
          name: domain.name,
          description: domain.description,
          status: domain.status,
        });
      }
    }
  }
  return [200, awsCommon.pageResults({
    resultList: domains,
    reverseOrder: reverseOrder,
    maximumPageSize: maximumPageSize,
    nextPageToken: nextPageToken,
    key: 'domainInfos',
  }),];
};
module.exports.DescribeDomain = function DescribeDomain(aws) {
  var name = aws.params.name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter name'];
  }
  if (!domainWorkflows[name]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + name];
  }
  var domain = domainWorkflows[name];

  var ret = {
    configuration: {
      workflowExecutionRetentionPeriodInDays: domain.workflowExecutionRetentionPeriodInDays,
    },
    domainInfo: {
      status: domain.status,
      description: domain.description,
      name: name,
    },
  };
  return [200, ret];
};


// -----------------------------------------------------------------------------
// Workflow Maintenance Stuff

module.exports.RegisterWorkflowType = function RegisterWorkflowType(aws) {
  var defaultLambdaRole = aws.params.defaultLambdaRole;
  var defaultTaskPriority = aws.params.defaultTaskPriority;
  var defaultChildPolicy = aws.params.defaultChildPolicy;
  var defaultTaskStartToCloseTimeout = aws.params.defaultTaskStartToCloseTimeout;
  var defaultExecutionStartToCloseTimeout = aws.params.defaultExecutionStartToCloseTimeout;
  var version = aws.params.version;
  var name = aws.params.name;
  var domain = aws.params.domain;
  var description = aws.params.description;
  var defaultTaskList = aws.params.defaultTaskList;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter name'];
  }
  if (!version) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter version'];
  }
  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }
  if (!!getWorkflowType(domain, name, version)) {
    return [400, 'Sender', 'TypeAlreadyExistsFault', 'Workflow type already exists ' + name + ' version ' + version];
  }
  if (!!defaultTaskList && !isValidTaskListName(defaultTaskList.name)) {
    console.log('Invalid default task list name [' + defaultTaskList.name +
      ']: ' + (!!defaultTaskList) + ' && ' +
      (!isValidTaskListName(defaultTaskList.name)) + ' = ' +
      (!!defaultTaskList && !isValidTaskListName(defaultTaskList.name)));
    return [400, 'Sender',
      'InvalidParameterValue',
      'Invalid task list name ' + defaultTaskList.name,
    ];
  }

  var workflowType = workflowDef.createWorkflowType(name, version, domain);
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
module.exports.DescribeWorkflowType = function DescribeWorkflowType(aws) {
  var workflowType = aws.params.workflowType;
  var domain = aws.params.domain;
  if (!domain) {
    return [400, 'Sender',
      'MissingParameter',
      'Did not specify parameter domain',
    ];
  }
  if (!workflowType) {
    return [400, 'Sender',
      'MissingParameter',
      'Did not specify parameter workflowType',
    ];
  }
  if (!workflowType.name) {
    return [400, 'Sender',
      'MissingParameter',
      'Did not specify parameter workflowType.name',
    ];
  }
  if (!workflowType.version) {
    return [400, 'Sender',
      'MissingParameter',
      'Did not specify parameter workflowType.version',
    ];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var workflow = getWorkflowType(
    domain, workflowType.name, workflowType.version);
  if (!!workflow) {
    return [200, workflow.describe()];
  }
  return [400, 'Sender', 'UnknownResourceFault',
    'unknown workflow type ' +
    workflowType.name + ' version ' + workflowType.version,];
};
module.exports.ListWorkflowTypes = function ListWorkflowTypes(aws) {
  var maximumPageSize = aws.params.maximumPageSize /* Integer */;
  var reverseOrder = aws.params.reverseOrder /* Boolean */;
  var nextPageToken = aws.params.nextPageToken;
  var domain = aws.params.domain;
  var name = aws.params.name;
  var registrationStatus = aws.params.registrationStatus;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!registrationStatus) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter registrationStatus'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var infos = [];
  for (var i = 0; i < domainWorkflows[domain].workflowTypes.length; i++) {
    var workflowType = domainWorkflows[domain].workflowTypes[i];
    if (workflowType.status === registrationStatus) {
      infos.push({
        status: workflowType.status,
        workflowType: /*Sr*/{
          version: workflowType.version,
          name: workflowType.name,
        },
        creationDate: '' + workflowType.creationDate,
        description: workflowType.description,
        deprecationDate: (!workflowType.deprecationDate ? null : ('' + workflowType.deprecationDate)),
      });
    }
  }

  return [200, awsCommon.pageResults({
    resultList: infos,
    reverseOrder: reverseOrder,
    maximumPageSize: maximumPageSize,
    nextPageToken: nextPageToken,
    key: 'typeInfos',
  }),];
};
module.exports.RegisterActivityType = function RegisterActivityType(aws) {
  var defaultTaskScheduleToStartTimeout = aws.params.defaultTaskScheduleToStartTimeout;
  var defaultTaskPriority = aws.params.defaultTaskPriority;
  var defaultTaskScheduleToCloseTimeout = aws.params.defaultTaskScheduleToCloseTimeout;
  var defaultTaskStartToCloseTimeout = aws.params.defaultTaskStartToCloseTimeout;
  var defaultTaskHeartbeatTimeout = aws.params.defaultTaskHeartbeatTimeout;
  var version = aws.params.version;
  var name = aws.params.name;
  var domain = aws.params.domain;
  var description = aws.params.description;
  var defaultTaskList = aws.params.defaultTaskList;

  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter name'];
  }
  if (!version) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter version'];
  }
  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }
  for (var i = 0; i < domainWorkflows[domain].activityTypes.length; i++) {
    if (domainWorkflows[domain].activityTypes[i].matches(name, version)) {
      return [400, 'Sender', 'TypeAlreadyExistsFault', 'Workflow type already exists ' + name + ' version ' + version];
    }
  }

  var activityType = workflowDef.createActivityType(name, version);
  activityType.description = description;

  activityType.configuration.defaultTaskScheduleToStartTimeout =
    defaultTaskScheduleToStartTimeout;
  activityType.configuration.defaultTaskScheduleToCloseTimeout =
    defaultTaskScheduleToCloseTimeout;
  activityType.configuration.defaultTaskStartToCloseTimeout =
    defaultTaskStartToCloseTimeout;
  activityType.configuration.defaultTaskHeartbeatTimeout =
    defaultTaskHeartbeatTimeout;
  activityType.configuration.defaultTaskList = defaultTaskList;
  activityType.configuration.defaultTaskPriority = defaultTaskPriority;
  domainWorkflows[domain].activityTypes.push(activityType);

  var ret = {};
  return [200, ret];
};
module.exports.DescribeActivityType = function DescribeActivityType(aws) {
  var activityType = aws.params.activityType;
  var domain = aws.params.domain;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!activityType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter activityType'];
  }
  if (!activityType.name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter activityType.name'];
  }
  if (!activityType.version) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter activityType.version'];
  }
  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }
  for (var i = 0; i < domainWorkflows[domain].activityTypes.length; i++) {
    if (domainWorkflows[domain].activityTypes[i].matches(activityType.name, activityType.version)) {
      return [200, domainWorkflows[domain].activityTypes[i].describe()];
    }
  }
  return [400, 'Sender', 'UnknownResourceFault', 'Unknown activity type  ' +
    activityType.name + ' version ' + activityType.version,];
};
module.exports.ListActivityTypes = function ListActivityTypes(aws) {
  var maximumPageSize = aws.params.maximumPageSize /* Integer */;
  var reverseOrder = aws.params.reverseOrder /* Boolean */;
  var nextPageToken = aws.paramsnextPageToken;
  var domain = aws.params.domain;
  var name = aws.params.name;
  var registrationStatus = aws.params.registrationStatus;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!registrationStatus) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter registrationStatus'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var infos = [];
  for (var i = 0; i < domainWorkflows[domain].activityTypes.length; i++) {
    var activityType = domainWorkflows[domain].activityTypes[i];
    if (activityType.status === registrationStatus) {
      infos.push({
        status: activityType.status,
        deprecationDate: (!activityType.deprecationDate ? null : ('' + activityType.deprecationDate)),
        activityType: {
          version: activityType.version,
          name: activityType.name,
        },
        description: activityType.description,
        creationDate: '' + activityType.creationDate,
      });
    }
  }

  return [200, awsCommon.pageResults({
    reverseOrder: reverseOrder,
    maximumPageSize: maximumPageSize,
    nextPageToken: nextPageToken,
    key: 'typeInfos',
    resultList: infos,
  }),];
};



// -----------------------------------------------------------------------------
// Workflow Execution Queries

module.exports.DescribeWorkflowExecution = function DescribeWorkflowExecution(aws) {
  var domain = aws.params.domain;
  var execution = aws.params.execution;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!execution) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter execution'];
  }
  if (!execution.runId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter execution.runId'];
  }
  if (!execution.workflowId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter execution.workflowId'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
    var wrun = domainWorkflows[domain].workflowRuns[i];
    if (wrun.matches(execution.workflowId, execution.runId)) {
      return [200, wrun.describe()];
    }
  }
  return [400, 'Sender', 'UnknownResourceFault', 'unknown workflow execution ' +
    execution.workflowId + ' run ' + execution.runId,];
};
module.exports.GetWorkflowExecutionHistory = function GetWorkflowExecutionHistory(aws) {
  var maximumPageSize = aws.params.maximumPageSize /* Integer */;
  var reverseOrder = aws.params.reverseOrder /* Boolean */;
  var nextPageToken = aws.params.nextPageToken;
  var domain = aws.params.domain;
  var execution = aws.params.execution;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!execution) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter execution'];
  }
  if (!execution.runId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter execution.runId'];
  }
  if (!execution.workflowId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter execution.workflowId'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
    var wrun = domainWorkflows[domain].workflowRuns[i];
    if (wrun.matches(execution.workflowId, execution.runId)) {
      var events = wrun.describeEvents();
      return [200, awsCommon.pageResults({
        reverseOrder: reverseOrder,
        maximumPageSize: maximumPageSize,
        nextPageToken: nextPageToken,
        key: 'events',
        resultList: events,
      }),];
    }
  }
  return [400, 'Sender', 'UnknownResourceFault', 'unknown workflow execution ' +
    execution.workflowId + ' run ' + execution.runId,];
};
module.exports.ListOpenWorkflowExecutions = function ListOpenWorkflowExecutions(aws) {
  var maximumPageSize = aws.params.maximumPageSize /* Integer */;
  var reverseOrder = aws.params.reverseOrder /* Boolean */;
  var typeFilter = aws.params.typeFilter;
  var executionFilter = aws.params.executionFilter;
  var startTimeFilter = aws.params.startTimeFilter;
  var nextPageToken = aws.params.nextPageToken;
  var domain = aws.params.domain;
  var tagFilter = aws.params.tagFilter;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!startTimeFilter) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter startTimeFilter'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var infos = [];
  var wrun;
  for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
    wrun = domainWorkflows[domain].workflowRuns[i];
    if (!wrun.isClosed() && wrun.matchesFilter(aws.params)) {
      infos.push(wrun.describe().executionInfo);
    }
  }

  return [200, awsCommon.pageResults({
    reverseOrder: reverseOrder,
    maximumPageSize: maximumPageSize,
    nextPageToken: nextPageToken,
    key: 'executionInfos',
    resultList: infos,
  }),];
};
module.exports.ListClosedWorkflowExecutions = function ListClosedWorkflowExecutions(aws) {
  var tagFilter = aws.params.tagFilter;
  var executionFilter = aws.params.executionFilter;
  var closeStatusFilter = aws.params.closeStatusFilter;
  var closeTimeFilter = aws.params.closeTimeFilter;
  var maximumPageSize = aws.params.maximumPageSize /* Integer */;
  var reverseOrder = aws.params.reverseOrder /* Boolean */;
  var startTimeFilter = aws.params.startTimeFilter;
  var nextPageToken = aws.params.nextPageToken;
  var domain = aws.params.domain;
  var typeFilter = aws.params.typeFilter;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var infos = [];
  var wrun;
  for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
    wrun = domainWorkflows[domain].workflowRuns[i];
    if (wrun.isClosed() && wrun.matchesFilter(aws.params)) {
      infos.push(wrun.describe().executionInfo);
    }
  }

  return [200, awsCommon.pageResults({
    reverseOrder: reverseOrder,
    maximumPageSize: maximumPageSize,
    nextPageToken: nextPageToken,
    key: 'executionInfos',
    resultList: infos,
  }),];
};
module.exports.CountClosedWorkflowExecutions = function CountClosedWorkflowExecutions(aws) {
  var tagFilter = aws.params.tagFilter;
  var executionFilter = aws.params.executionFilter;
  var closeStatusFilter = aws.params.closeStatusFilter;
  var closeTimeFilter = aws.params.closeTimeFilter;
  var startTimeFilter = aws.params.startTimeFilter;
  var domain = aws.params.domain;
  var typeFilter = aws.params.typeFilter;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
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
    truncated: false,
  };
  return [200, ret];
};
module.exports.CountOpenWorkflowExecutions = function CountOpenWorkflowExecutions(aws) {
  var startTimeFilter = aws.params.startTimeFilter;
  var executionFilter = aws.params.executionFilter;
  var domain = aws.params.domain;
  var tagFilter = aws.params.tagFilter;
  var typeFilter = aws.params.typeFilter;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!startTimeFilter) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter startTimeFilter'];
  }

  var wrun;
  var count = 0;
  for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
    wrun = domainWorkflows[domain].workflowRuns[i];
    if (!wrun.isClosed() && wrun.matchesFilter(aws.params)) {
      count++;
    }
  }

  var ret = {
    count: count,
    truncated: false,
  };
  return [200, ret];
};
module.exports.CountPendingDecisionTasks = function CountPendingDecisionTasks(aws) {
  var domain = aws.params.domain;
  var taskList = aws.params.taskList;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!taskList) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskList'];
  }
  if (!taskList.name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskList.name'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }


  if (!!domainWorkflows[domain].decisionsTaskLists[taskList.name]) {
    return [200, {
      count: domainWorkflows[domain].decisionsTaskLists[taskList.name].countLiveMessages(),
      truncated: false,
    },];
  }
  return [200, {count: 0, truncated: false}];
};
module.exports.CountPendingActivityTasks = function CountPendingActivityTasks(aws) {
  var domain = aws.params.domain;
  var taskList = aws.params.taskList;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!taskList) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskList'];
  }
  if (!taskList.name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskList.name'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  if (!!domainWorkflows[domain].activityTaskLists[taskList.name]) {
    return [200, {
      count: domainWorkflows[domain].activityTaskLists[taskList.name].
        countLiveMessages(),
      truncated: false,
    },];
  }
  return [200, {count: 0, truncated: false}];
};



// -----------------------------------------------------------------------------
// Workflow Execution Controls

module.exports.StartWorkflowExecution = function StartWorkflowExecution(aws) {
  var lambdaRole = aws.params.lambdaRole;
  var workflowId = aws.params.workflowId;
  var executionStartToCloseTimeout = aws.params.executionStartToCloseTimeout;
  var tagList = aws.params.tagList;
  var taskStartToCloseTimeout = aws.params.taskStartToCloseTimeout;
  var taskPriority = aws.params.taskPriority;
  var workflowType = aws.params.workflowType;
  var domain = aws.params.domain;
  var input = aws.params.input;
  var taskList = aws.params.taskList;
  var childPolicy = aws.params.childPolicy;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!workflowId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter workflowId'];
  }
  if (!workflowType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter workflowType'];
  }

  // Validate workflow id - it has the same format as task list names
  if (!isValidTaskListName(workflowId)) {
    return [400, 'Sender', 'InvalidParameterValue', 'Invalid workflow id ' + workflowId];
  }

  // Validate task list name, if given
  if (!!taskList && !isValidTaskListName(taskList.name)) {
    return [400, 'Sender', 'InvalidParameterValue', 'Invalid task list name ' + taskList.name];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var wtype = getWorkflowType(domain, workflowType.name, workflowType.version);
  if (!wtype) {
    return [400, 'Sender', 'UnknownResourceFault', 'Invalid workflow type ' +
      workflowType.name + ' version ' + workflowType.version,];
  }

  // Ensure we don't have an existing open workflow with the same id
  for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
    if (!domainWorkflows[domain].workflowRuns[i].isClosed() &&
        domainWorkflows[domain].workflowRuns[i].workflowId === workflowId) {
      return [400, 'Sender', 'WorkflowExecutionAlreadyStartedFault',
        'Workflow id ' + workflowId + ' is already running',];
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
  if (!!missingDefault) {
    return [400, 'Sender', 'DefaultUndefinedFault', 'Missing parameter ' + missingDefault,];
  }

  // Other creation-time settings, loaded from
  run.executionContext = input;
  run.tagList = tagList;

  run.start();
  var tlist = getDecisionTaskList(domain, run.executionConfiguration.taskList.name);
  tlist.addWorkflowExecution(run);
  domainWorkflows[domain].workflowRuns.push(run);

  var ret = { runId: run.runId };
  return [200, ret];
};
module.exports.TerminateWorkflowExecution = function TerminateWorkflowExecution(aws) {
  var workflowId = aws.params.workflowId;
  var reason = aws.params.reason;
  var runId = aws.params.runId;
  var details = aws.params.details;
  var domain = aws.params.domain;
  var childPolicy = aws.params.childPolicy;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!workflowId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter workflowId'];
  }
  if (!!childPolicy &&
          !(childPolicy === 'TERMINATE' || childPolicy === 'REQUEST_CANCEL' || childPolicy === 'ABANDON')) {
    return [400, 'Sender', 'ValidationError', 'child policy incorrect'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var workflowRun = getWorkflowRun(domain, workflowId, runId);
  if (!workflowRun) {
    return [400, 'Sender', 'UnknownResourceFault', 'unknown workflow ' + workflowId];
  }
  if (workflowRun.isClosed()) {
    return [400, 'Sender', 'OperationNotPermittedFault', 'workflow already closed'];
  }

  workflowRun.terminate(reason, details, childPolicy, null);

  var ret = {};
  return [200, ret];
};
module.exports.RequestCancelWorkflowExecution = function RequestCancelWorkflowExecution(aws) {
  var workflowId = aws.params.workflowId;
  var domain = aws.params.domain;
  var runId = aws.params.runId;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!workflowId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter workflowId'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var workflowRun = getWorkflowRun(domain, workflowId, runId);
  if (!workflowRun) {
    return [400, 'Sender', 'UnknownResourceFault', 'unknown workflow ' + workflowId];
  }
  if (workflowRun.isClosed()) {
    return [400, 'Sender', 'OperationNotPermittedFault', 'workflow already closed'];
  }

  workflowRun.requestCancel();

  var ret = {};
  return [200, ret];
};


// ----------------------------------------------------------------------------------------
// Decision tasks



module.exports.PollForDecisionTask = function PollForDecisionTask(aws) {
  var maximumPageSize = aws.params.maximumPageSize /* Integer */;
  var reverseOrder = aws.params.reverseOrder /* Boolean */;
  var identity = aws.params.identity;
  var nextPageToken = aws.params.nextPageToken;
  var domain = aws.params.domain;
  var taskList = aws.params.taskList;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!taskList) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskList'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  // Really should check if it exists in domainWorkflows[domain].decisionsTaskLists[taskList]
  // UnknownResourceFault
  var tlist = getDecisionTaskList(domain, taskList);

  console.log('polling on ' + taskList.name + '; ' + tlist.size() + ' pending messages');
  return tlist.pull(nextPageToken, maximumPageSize, reverseOrder)
    .then(function t1(val) {
      if (!val) {
        return [400, 'UnknownResourceFault', 'no such page token ' + nextPageToken];
      }
      return [200, val];
    });
};






















var isValidTaskListName = function isValidTaskListName(name) {
  // The specified string must not start or end with whitespace. It must not contain a  : (colon),  / (slash),
  // | (vertical bar), or any control characters (\u0000-\u001f | \u007f - \u009f). Also, it must not contain
  // the literal string "arn".

  // Note: this return value must be wrapped in parenthesis, otherwise
  // order of operations says that the return is returning an object that evaluates to false.

  return (
    // Must be non-null
    (!!name) &&

    // Must not start or end with whitespace
    (name.trim() === name) &&

    // Must not contain a colon, slash, vertical bar, or any
    // control characters, or the literal string "arn"
    (!name.match(/:|\/|\||[\u0000-\u001f]|[\u007f-\u009f]|arn/))
  );
};

var getWorkflowType = function getWorkflowType(domain, name, version) {
  for (var i = 0; i < domainWorkflows[domain].workflowTypes.length; i++) {
    if (domainWorkflows[domain].workflowTypes[i].matches(name, version)) {
      return domainWorkflows[domain].workflowTypes[i];
    }
  }
  return null;
};

var getDecisionTaskList = function getDecisionTaskList(domain, name) {
  if (!domainWorkflows[domain].decisionsTaskLists[name]) {
    domainWorkflows[domain].decisionsTaskLists[name] = new tasklist.Decider(domain, name);
  }
  return domainWorkflows[domain].decisionsTaskLists[name];
};

var getActivityTaskList = function getActivityTaskList(domain, name) {
  if (!domainWorkflows[domain].activityTaskLists[name]) {
    domainWorkflows[domain].activityTaskLists[name] = new tasklist.Activity(domain, name);
  }
  return domainWorkflows[domain].activityTaskLists[name];
};

var getWorkflowRun = function getWorkflowRun(domain, workflowId, runId) {
  if (!domainWorkflows[domain]) {
    return null;
  }

  for (var i = 0; i < domainWorkflows[domain].workflowRuns.length; i++) {
    var wrun = domainWorkflows[domain].workflowRuns[i];
    if (!!runId && !!workflowId && wrun.matches(workflowId, runId)) {
      return wrun;
    }
    if (!workflowId && wrun.runId === runId) {
      return wrun;
    }
    if (!runId && wrun.workflowId === workflowId) {
      return wrun;
    }
  }
  return null;
};


// -----------------------------------------------------------------------------
// TODO to sort









module.exports.RespondActivityTaskCanceled = function RespondActivityTaskCanceled(aws) {
  var details = aws.params.details;
  var taskToken = aws.params.taskToken;
  if (!taskToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskToken'];
  }

  // TODO implement code

  var ret = {};
  return [200, ret];
};

module.exports.RespondActivityTaskCompleted = function RespondActivityTaskCompleted(aws) {
  var taskToken = aws.params.taskToken;
  var result = aws.params.result;
  if (!taskToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskToken'];
  }

  // TODO implement code

  var ret = {};
  return [200, ret];
};
module.exports.SignalWorkflowExecution = function SignalWorkflowExecution(aws) {
  var workflowId = aws.params.workflowId;
  var domain = aws.params.domain;
  var signalName = aws.params.signalName;
  var input = aws.params.input;
  var runId = aws.params.runId;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!workflowId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter workflowId'];
  }
  if (!signalName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter signalName'];
  }

  // TODO implement code

  var ret = {};
  return [200, ret];
};

module.exports.RecordActivityTaskHeartbeat = function RecordActivityTaskHeartbeat(aws) {
  var details = aws.params.details;
  var taskToken = aws.params.taskToken;
  if (!taskToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskToken'];
  }

  // TODO implement code

  var ret = {
    cancelRequested: false,
  };
  return [200, ret];
};
module.exports.PollForActivityTask = function PollForActivityTask(aws) {
  var domain = aws.params.domain;
  var identity = aws.params.identity;
  var taskList = aws.params.taskList;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!taskList) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskList'];
  }

  // TODO implement code

  var ret = {
    input: '',
    workflowExecution: /*S16*/{
      workflowId: '',
      runId: '',
    },
    activityType: /*Sn*/{
      version: '',
      name: '',
    },
    startedEventId: 0 /*Long*/,
    taskToken: '',
    activityId: '',
  };
  return [200, ret];
};

module.exports.RespondDecisionTaskCompleted = function RespondDecisionTaskCompleted(aws) {
  var decisions = aws.params.decisions /* List */;
  var taskToken = aws.params.taskToken;
  var executionContext = aws.params.executionContext;
  if (!taskToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskToken'];
  }

  // TODO implement code

  var ret = {};
  return [200, ret];
};

module.exports.RespondActivityTaskFailed = function RespondActivityTaskFailed(aws) {
  var details = aws.params.details;
  var reason = aws.params.reason;
  var taskToken = aws.params.taskToken;
  if (!taskToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskToken'];
  }

  // TODO implement code

  var ret = {};
  return [200, ret];
};




// --------------------------------------------------------------------------
// TODO
// Not implemented features.
module.exports.DeprecateDomain = function DeprecateDomain(aws) {
  var name = aws.params.name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter name'];
  }

  // TODO implement code

  var ret = {};
  return [200, ret];
};
module.exports.DeprecateWorkflowType = function DeprecateWorkflowType(aws) {
  var workflowType = aws.params.workflowType;
  var domain = aws.params.domain;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!workflowType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter workflowType'];
  }

  // TODO implement code

  var ret = {};
  return [200, ret];
};
module.exports.DeprecateActivityType = function DeprecateActivityType(aws) {
  var activityType = aws.params.activityType;
  var domain = aws.params.domain;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter domain'];
  }
  if (!activityType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter activityType'];
  }

  // TODO implement code

  var ret = {};
  return [200, ret];
};
