'use strict';

const eventbus = require('./eventbus');
const createWorkflowType = require('./workflowtype');
const createActivityType = require('./activitytype');
const taskListSrc = require('./tasklist');

module.exports = function createDomain(p) {
  return new Domain(p);
};

/**
 * The domain and all the associated executions, activities, and types.
 */
function Domain(p) {
  this.name = p.name;
  this.description = p.description;
  this.workflowExecutionRetentionPeriodInDays =
    p.workflowExecutionRetentionPeriodInDays;
  this.status = 'REGISTERED';
  this.workflowTypes = [];
  this.activityTypes = [];
  this.workflowRuns = [];

  // Queues to listen to
  this.activityTaskLists = {};
  this.decisionsTaskLists = {};
}

/**
 * Summary object used in listing domains.
 */
Domain.prototype.summary = function summary() {
  return {
    name: this.name,
    description: this.description,
    status: this.status,
  };
};

/**
 *
 */
Domain.prototype.describe = function describe() {
  return {
    configuration: {
      workflowExecutionRetentionPeriodInDays: this.workflowExecutionRetentionPeriodInDays,
    },
    domainInfo: this.summary(),
  };
};

/**
 *
 */
Domain.prototype.listWorkflowTypeInfos = function listWorkflowTypeInfos(filter) {
  var ret = [];
  for (var i = 0; i < this.workflowTypes.length; i++) {
    if (!filter || filter(this.workflowTypes[i])) {
      ret.push(this.workflowTypes[i].summary());
    }
  }
  return ret;
};

/**
 *
 */
Domain.prototype.registerWorkflowType = function registerWorkflowType(p) {
  for (var i = 0; i < this.workflowTypes.length; i++) {
    if (this.workflowTypes[i].matches(p.name, p.version)) {
      // Already registered
      return null;
    }
  }
  var workflowType = createWorkflowType(p);
  if (!!workflowType) {
    this.workflowTypes.push(workflowType);
  }
  return workflowType;
};

/**
 *
 */
Domain.prototype.getWorkflowType = function getWorkflowType(p) {
  var name = p.name;
  var version = p.version;
  for (var i = 0; i < this.workflowTypes.length; i++) {
    if (this.workflowTypes[i].matches(name, version)) {
      return this.workflowTypes[i];
    }
  }
  return null;
};


/**
 *
 */
Domain.prototype.regsiterActivityType = function regsiterActivityType(p) {
  for (var i = 0; i < this.activityTypes.length; i++) {
    if (this.activityTypes[i].matches(p.name, p.version)) {
      // Already registered
      return null;
    }
  }
  var activityType = createActivityType(p);
  if (!!activityType) {
    this.activityTypes.push(activityType);
  }
  return activityType;
};


/**
 *
 */
Domain.prototype.listActivityTypeInfos = function listActivityTypeInfos(filter) {
  var ret = [];
  for (var i = 0; i < this.activityTypes.length; i++) {
    if (!filter || filter(this.activityTypes[i])) {
      ret.push(this.activityTypes[i].summary());
    }
  }
};


/**
 *
 */
Domain.prototype.getActivityType = function getActivityType(p) {
  var name = p.name;
  var version = p.version;
  for (var i = 0; i < this.activityTypes.length; i++) {
    if (this.activityTypes[i].matches(name, version)) {
      return this.activityTypes[i];
    }
  }
  return null;
};


/**
 *
 */
Domain.prototype.getWorkflowRun = function getWorkflowRun(p) {
  var workflowId = p.workflowId; // Required
  var runId = p.runId; // Optional
  for (var i = 0; i < this.workflowRuns.length; i++) {
    var wrun = this.workflowRuns[i];
    if (wrun.matches(workflowId, runId)) {
      return wrun;
    }
  }
  return null;
};


/**
 *
 */
Domain.prototype.forEachWorkflowRun = function forEachWorkflowRun(f) {
  for (var i = 0; i < this.workflowRuns.length; i++) {
    f(this.workflowRuns[i]);
  }
};


/**
 *
 */
Domain.prototype.hasOpenWorkflowRunId = function hasOpenWorkflowRunId(workflowId) {
  for (var i = 0; i < this.workflowRuns.length; i++) {
    var wrun = this.workflowRuns[i];
    if (!wrun.isClosed() && wrun.workflowId === workflowId) {
      return true;
    }
  }
  return false;
};


/**
 *
 */
Domain.prototype.getDecisionTaskList = function getDecisionTaskList(taskList) {
  if (!!taskList && !!taskList.name) {
    return this.decisionsTaskLists[taskList.name];
  }
  return this.decisionsTaskLists[taskList];
};


/**
 *
 */
Domain.prototype.getOrCreateDecisionTaskList = function getOrCreateDecisionTaskList(taskList) {
  if (!!taskList && !!taskList.name) {
    if (!!this.decisionsTaskLists[taskList.name]) {
      return this.decisionsTaskLists[taskList.name];
    }
    this.decisionsTaskLists[taskList.name] = taskListSrc.createDecider(this.name, taskList.name);
    return this.decisionsTaskLists[taskList.name];
  }
  return null;
};


/**
 *
 */
Domain.prototype.getActivityTaskList = function getActivityTaskList(taskList) {
  if (!!taskList && !!taskList.name) {
    return this.activityTaskLists[taskList.name];
  }
  return this.activityTaskLists[taskList];
};
