'use strict';

const awsCommon = require('../../lib/aws-common');
const textParse = require('../../lib/test-parse');
const tasklist = require('./tasklist.js');
const createDomain = require('./domain');

/**
 * Amazon Simple Workflow Service version 2012-01-25
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);

/*
 * NOTE
 * This file should contain as little logic as possible.  It should only
 * verify the input values, then call out to the specific data objects
 * or other functions.
 */


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

  domainWorkflows[name] = createDomain({
    name: name,
    description: description,
    workflowExecutionRetentionPeriodInDays: workflowExecutionRetentionPeriodInDays,
  });

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
        domains.push(domain.summary());
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
  var ret = domain.describe();
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
  if (!!defaultTaskList) {
    if (!defaultTaskList.name) {
      return [400, 'Sender',
        'InvalidParameterValue',
        'Task list name not given',
      ];
    }
    if (!isValidTaskListName(defaultTaskList.name)) {
      // DEBUG console.log('Invalid default task list name [' + defaultTaskList.name +
      //  ']: ' + (!!defaultTaskList) + ' && ' +
      //  (!isValidTaskListName(defaultTaskList.name)) + ' = ' +
      //  (!!defaultTaskList && !isValidTaskListName(defaultTaskList.name)));
      return [400, 'Sender',
        'InvalidParameterValue',
        'Invalid task list name ' + defaultTaskList.name,
      ];
    }
  }

  var workflowType = domainWorkflows[domain].registerWorkflowType({
    name: name,
    version: version,
    description: description,
    defaultChildPolicy: defaultChildPolicy,
    defaultTaskStartToCloseTimeout: defaultTaskStartToCloseTimeout,
    defaultExecutionStartToCloseTimeout: defaultExecutionStartToCloseTimeout,
    defaultLambdaRole: defaultLambdaRole,
    defaultTaskList: defaultTaskList,
    defaultTaskPriority: defaultTaskPriority,
  });
  if (!workflowType) {
    return [400, 'Sender', 'TypeAlreadyExistsFault', 'Workflow type already exists ' + name + ' version ' + version];
  }

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

  var workflow = domainWorkflows[domain].getWorkflowType({
    name: workflowType.name,
    version: workflowType.version,
  });
  if (!!workflow) {
    return [200, workflow.describe()];
  }
  return [400, 'Sender', 'UnknownResourceFault',
    `unknown workflow type '${workflowType.name}' version '${workflowType.version}'`,
  ];
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

  var infos = domainWorkflows[domain].listWorkflowTypeInfos(function(wt) {
    return wt.status === registrationStatus;
  });

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

  var activityType = domainWorkflows[domain].registerActivityType({
    name: name,
    version: version,
    description: description,
    defaultTaskScheduleToStartTimeout: defaultTaskScheduleToStartTimeout,
    defaultTaskScheduleToCloseTimeout: defaultTaskScheduleToCloseTimeout,
    defaultTaskStartToCloseTimeout: defaultTaskStartToCloseTimeout,
    defaultTaskHeartbeatTimeout: defaultTaskHeartbeatTimeout,
    defaultTaskList: defaultTaskList,
    defaultTaskPriority: defaultTaskPriority,
  });
  if (!activityType) {
    return [400, 'Sender',
      'TypeAlreadyExistsFault',
      `activity type already exists ${name} ${version}`,
    ];
  }

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
  var activityTypeObj = domainWorkflows[domain].getActivityType({
    name: activityType.name,
    version: activityType.version,
  });
  if (!activityTypeObj) {
    return [400, 'Sender', 'UnknownResourceFault', 'Unknown activity type  ' +
      activityType.name + ' version ' + activityType.version,];
  }
  return [200, activityTypeObj.describe()];
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

  var infos = domainWorkflows[domain].listActivityTypeInfos(function(activityType) {
    return activityType.status === registrationStatus;
  });

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

  var wrun = domainWorkflows[domain].getWorkflowRun({
    runId: execution.runId,
    workflowId: execution.workflowId,
  });
  if (!wrun) {
    return [400, 'Sender', 'UnknownResourceFault',
     `unknown workflow execution ${execution.workflowId} run ${execution.runId}`,];
  }
  return [200, wrun.describe()];
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

  var wrun = domainWorkflows[domain].getWorkflowRun({
    runId: execution.runId,
    workflowId: execution.workflowId,
  });
  if (!wrun) {
    return [400, 'Sender', 'UnknownResourceFault',
     `unknown workflow execution ${execution.workflowId} run ${execution.runId}`,];
  }
  var events = wrun.describeEvents();
  return [200, awsCommon.pageResults({
    reverseOrder: reverseOrder,
    maximumPageSize: maximumPageSize,
    nextPageToken: nextPageToken,
    key: 'events',
    resultList: events,
  }),];
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
  domainWorkflows[domain].forEachWorkflowRun(function(wrun) {
    if (!wrun.isClosed() && wrun.matchesFilter(aws.params)) {
      infos.push(wrun.summary());
    }
  });

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
  domainWorkflows[domain].forEachWorkflowRun(function(wrun) {
    if (wrun.isClosed() && wrun.matchesFilter(aws.params)) {
      infos.push(wrun.summary());
    }
  });

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

  var count = 0;
  domainWorkflows[domain].forEachWorkflowRun(function(wrun) {
    if (wrun.isClosed() && wrun.matchesFilter(aws.params)) {
      count++;
    }
  });

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

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var count = 0;
  domainWorkflows[domain].forEachWorkflowRun(function(wrun) {
    if (!wrun.isClosed() && wrun.matchesFilter(aws.params)) {
      count++;
    }
  });

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

  var dTaskList = domainWorkflows[domain].getDecisionTaskList(taskList);
  if (!dTaskList) {
    return [200, {count: 0, truncated: false}];
  }
  return [200, {
    count: dTaskList.countLiveMessages(),
    truncated: false,
  },];
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

  var aTaskList = domainWorkflows[domain].getActivityTaskList(taskList);
  if (!aTaskList) {
    return [200, {count: 0, truncated: false}];
  }
  return [200, {
    count: aTaskList.countLiveMessages(),
    truncated: false,
  },];
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

  // TODO validate tag list count and values

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  var wtype = domainWorkflows[domain].getWorkflowType(workflowType);
  if (!wtype) {
    return [400, 'Sender', 'UnknownResourceFault',
      `Invalid workflow type ${workflowType.name} ${workflowType.version}`,];
  }

  // Ensure we don't have an existing open workflow with the same id
  if (domainWorkflows[domain].hasOpenWorkflowId(workflowId)) {
    return [400, 'Sender', 'WorkflowExecutionAlreadyStartedFault',
      `Workflow id ${workflowId} is already running`,];
  }

  var run = wtype.createRun({
    workflowId: workflowId,
    tagList: tagList,
    input: input,

    // Set the actual values for the parameters; the passed-in parameters
    // override the default values.
    // If any parameter is not specified (no default, and not passed in),
    // it generates a DefaultUndefinedFault error.

    lambdaRole: lambdaRole,
    executionStartToCloseTimeout: executionStartToCloseTimeout,
    taskStartToCloseTimeout: taskStartToCloseTimeout,
    taskPriority: taskPriority,
    childPolicy: childPolicy,
    taskList: taskList,
  });

  var missingDefault = run.getMissingDefault();
  if (!!missingDefault) {
    // Don't let a timeout happen.
    run.runState = 100;
    return [400, 'Sender', 'DefaultUndefinedFault', missingDefault,];
  }

  domainWorkflows[domain].startWorkflowExecution({ workflow: run });

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

  var workflowRun = domainWorkflows[domain].getWorkflowRun({
    workflowId: workflowId,
    runId: runId,
  });
  if (!workflowRun) {
    return [400, 'Sender', 'UnknownResourceFault', 'unknown workflow ' + workflowId];
  }
  if (workflowRun.isClosed()) {
    return [400, 'Sender', 'OperationNotPermittedFault', 'workflow already closed'];
  }

  // Do not directly call the workflowRun's terminate.  Use the domain's
  // instead.
  domainWorkflows[domain].terminateWorkflowRun({
    workflow: workflowRun,
    reason: reason,
    details: details,
    childPolicy: childPolicy,
  });
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

  var workflowRun = domainWorkflows[domain].getWorkflowRun({
    workflowId: workflowId,
    runId: runId,
  });
  if (!workflowRun) {
    return [400, 'Sender', 'UnknownResourceFault', 'unknown workflow ' + workflowId];
  }
  if (workflowRun.isClosed()) {
    return [400, 'Sender', 'OperationNotPermittedFault', 'workflow already closed'];
  }

  // Do not call the workflow's request cancel directly.
  // Instead, go through the domain's.
  domainWorkflows[domain].requestWorkflowRunCancel({
    workflow: workflowRun,
  });

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

  var workflow = domainWorkflows[domain].getWorkflowRun({
    workflowId: workflowId,
    runId: runId,
  });

  if (!workflow) {
    return [400, 'Sender', 'UnknownResourceFault', `Unknown workflow ${workflowId} / ${runId}`];
  }

  domainWorkflows[domain].signalWorkflow({
    workflow: workflow,
    signalName: signalName,
    input: input,
  });

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
  if (!taskList.name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskList.name'];
  }

  if (!domainWorkflows[domain]) {
    return [400, 'Sender', 'UnknownResourceFault', 'No such domain ' + domain];
  }

  // Really should check if the task list exists, rather than just creating it
  // (returns UnknownResourceFault error); however, there can be a use case
  // for polling on a yet-to-be-created workflow.

  console.log('polling on ' + taskList.name);
  return domainWorkflows[domain].pollForDecisionTask({
    taskList: { name: taskList.name },
    deciderId: identity,
    nextPageToken: nextPageToken,
    maximumPageSize: maximumPageSize,
    reverseOrder: reverseOrder,
  }).then(function t1(val) {
    if (!val) {
      return [400, 'UnknownResourceFault', 'no such page token ' + nextPageToken];
    }
    return [200, val];
  });
};


module.exports.RespondDecisionTaskCompleted = function RespondDecisionTaskCompleted(aws) {
  var decisions = aws.params.decisions; // List
  var taskToken = aws.params.taskToken;
  var executionContext = aws.params.executionContext;
  if (!taskToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskToken'];
  }

  // The domain, workflow run, and everything else is dictated by the taskToken.
  var domainDecisionTask = getDecisionTaskByToken(taskToken);

  if (!domainDecisionTask) {
    return [400, 'UnknownResourceFault', `no such task token ${taskToken}`];
  }

  // Ensure the decision tasks have the decision type value and the
  // corresponding attribute key.
  // However, this isn't an in-depth check.  Just a quick check.
  for (var i = 0; i < decisions.length; i++) {
    var decision = decisions[i];
    if (!decision.decisionType) {
      return [400, 'Sender', 'MissingParameter', `decisions[${i}].decisionType`];
    }
    var key = decision.decisionType;
    key = key[0].toLowerCase() + key.substr(1) + 'DecisionAttributes';
    if (!decision[key]) {
      return [400, 'Sender', 'MissingParameter', `decisions[${i}].${key}`];
    }
  }

  var domainObj = domainDecisionTask[0];
  var decisionTask = domainDecisionTask[1];

  var results = domainObj.completeDecisionTask({
    decisionTask: decisionTask,
    decisions: decisions,
    executionContext: executionContext,
  });

  if (!!results) {
    return results;
  }

  // Return an empty set due to no error.
  var ret = {};
  return [200, ret];
};

// --------------------------------------------------------------------------
// Activity Task

module.exports.RespondActivityTaskCanceled = function RespondActivityTaskCanceled(aws) {
  var details = aws.params.details;
  var taskToken = aws.params.taskToken;
  if (!taskToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskToken'];
  }

  var activityData = getActivityTaskByToken(taskToken);
  if (!activityData) {
    return [400, 'Sender', 'UnknownResourceFault', `Unknown activity task token ${taskToken}`];
  }
  var domainObj = activityData[0];
  var activityTask = activityData[1];

  if (!activityTask.isRunning()) {
    // What is the right response here?
    return [400, 'Sender', 'ValidationError', `Activity Task (${taskToken}) is not running.`];
  }

  // Handles its own event sending.
  activityTask.canceled({
    details: details,
  });

  var ret = {};
  return [200, ret];
};

module.exports.RespondActivityTaskCompleted = function RespondActivityTaskCompleted(aws) {
  var taskToken = aws.params.taskToken;
  var result = aws.params.result;
  if (!taskToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskToken'];
  }

  var activityData = getActivityTaskByToken(taskToken);
  if (!activityData) {
    return [400, 'Sender', 'UnknownResourceFault', `Unknown activity task token ${taskToken}`];
  }
  var domainObj = activityData[0];
  var activityTask = activityData[1];

  if (!activityTask.isRunning()) {
    // What is the right response here?
    return [400, 'Sender', 'ValidationError', `Activity Task (${taskToken}) is not running.`];
  }

  // Handles its own event sending
  activityTask.completed({
    result: result,
  });

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

  var activityData = getActivityTaskByToken(taskToken);
  if (!activityData) {
    return [400, 'Sender', 'UnknownResourceFault', `Unknown activity task token ${taskToken}`];
  }
  var domainObj = activityData[0];
  var activityTask = activityData[1];

  if (!activityTask.isRunning()) {
    // What is the right response here?
    return [400, 'Sender', 'ValidationError', `Activity Task (${taskToken}) is not running.`];
  }

  // Handles its own event sending
  activityTask.failed({
    details: details,
    reason: reason,
  });

  var ret = {};
  return [200, ret];
};

module.exports.RecordActivityTaskHeartbeat = function RecordActivityTaskHeartbeat(aws) {
  var details = aws.params.details;
  var taskToken = aws.params.taskToken;
  if (!taskToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskToken'];
  }

  var activityData = getActivityTaskByToken(taskToken);
  if (!activityData) {
    return [400, 'Sender', 'UnknownResourceFault', `Unknown activity task token ${taskToken}`];
  }
  var domainObj = activityData[0];
  var activityTask = activityData[1];

  if (!activityTask.isRunning()) {
    // What is the right response here?
    return [400, 'Sender', 'ValidationError', `Activity Task (${taskToken}) is not running.`];
  }

  return activityTask.heartbeatStatus({
    details: details,
  });
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

  var taskListObj = domainWorkflows[domain].getOrCreateActivityTaskList(taskList);
  return taskListObj.pull({
    workerId: identity,
  }).then(function(val) {
    return [200, val];
  });
};


// --------------------------------------------------------------------------
// Utility Functions




function isValidTaskListName(name) {
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
}



function getDecisionTaskByToken(taskToken) {
  for (var domain in domainWorkflows) {
    if (domainWorkflows.hasOwnProperty(domain)) {
      var task = domainWorkflows[domain].getDecisionTaskByToken(taskToken);
      if (!!task) {
        return [domainWorkflows[domain], task];
      }
    }
  }
  return null;
}


function getActivityTaskByToken(taskToken) {
  for (var domain in domainWorkflows) {
    if (domainWorkflows.hasOwnProperty(domain)) {
      var task = domainWorkflows[domain].getActivityTaskByToken(taskToken);
      if (!!task) {
        return [domainWorkflows[domain], task];
      }
    }
  }
  return null;
}





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
