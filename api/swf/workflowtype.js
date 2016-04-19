'use strict';

const awsCommon = require('../../lib/aws-common');
const createWorkflowRun = require('./workflowrun');

module.exports = function createWorkflowType(p) {
  return new WorkflowType(p);
};

var WorkflowType = function(p) {
  this.name = p.name;
  this.version = p.version;
  this.description = p.description || '';
  this.status = 'REGISTERED';
  this.creationDate = awsCommon.timestamp();
  this.deprecationDate = null;
  var taskList = null;
  if (!!p.defaultTaskList) {
    taskList = { name: p.defaultTaskList.name || '' };
  }
  this.configuration = {
    defaultChildPolicy: p.defaultChildPolicy || '',
    defaultTaskStartToCloseTimeout: p.defaultTaskStartToCloseTimeout || '',
    defaultExecutionStartToCloseTimeout: p.defaultExecutionStartToCloseTimeout || '',
    defaultLambdaRole: p.defaultLambdaRole || '',
    defaultTaskList: taskList,
    defaultTaskPriority: p.defaultTaskPriority || '',
  };
};
WorkflowType.prototype.describe = function describe() {
  return {
    configuration: {
      defaultChildPolicy: this.configuration.defaultChildPolicy,
      defaultTaskStartToCloseTimeout: this.configuration.defaultTaskStartToCloseTimeout,
      defaultExecutionStartToCloseTimeout: this.configuration.defaultExecutionStartToCloseTimeout,
      defaultLambdaRole: this.configuration.defaultLambdaRole,
      defaultTaskList: (!this.configuration.defaultTaskList ? null : {
        name: this.configuration.defaultTaskList.name,
      }),
      defaultTaskPriority: this.configuration.defaultTaskPriority,
    },
    typeInfo: /*S1m*/{
      status: this.status,
      workflowType: /*Sr*/{
        version: this.version,
        name: this.name,
      },
      creationDate: this.creationDate,
      description: this.description,
      deprecationDate: (!this.deprecationDate ? null : ('' + this.deprecationDate)),
    },
  };
};
WorkflowType.prototype.summary = function summary() {
  return {
    status: this.status,
    workflowType: /*Sr*/{
      version: this.version,
      name: this.name,
    },
    creationDate: this.creationDate,
    description: this.description,
    deprecationDate: (!this.deprecationDate ? null : ('' + this.deprecationDate)),
  };
};
WorkflowType.prototype.matches = function matches(name, version) {
  return this.name === name && this.version === version;
};
WorkflowType.prototype.createRun = function createRun(p) {
  p.workflowType = this;
  return createWorkflowRun(p);
};
