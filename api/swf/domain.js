'use strict';

const createEventBus = require('./eventbus');
const createWorkflowType = require('./workflowtype');
const createActivityType = require('./activitytype');
const taskListSrc = require('./tasklist');

module.exports = function createDomain(p) {
  return new Domain(p);
};

/**
 * The domain and all the associated executions, activities, and types.
 *
 * @param {Object} p parameters
 * @param {string} p.name domain name
 * @param {string} p.description domain description
 * @param {string} p.workflowExecutionRetentionPeriodInDays how long to keep a
 *    completed workflow execution.
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

  this.eventBus = createEventBus({
    domain: this,
  });
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
  p.outOfBandEventFunc = this.eventBus.createOutOfBandEventFunc();
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
Domain.prototype.registerActivityType = function registerActivityType(p) {
  for (var i = 0; i < this.activityTypes.length; i++) {
    if (this.activityTypes[i].matches(p.name, p.version)) {
      // Already registered
      return null;
    }
  }
  p.outOfBandEventFunc = this.eventBus.createOutOfBandEventFunc();
  p.queueActivityTaskFunc = this.eventBus.createQueueActivityTaskFunc();
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
  return ret;
};


/**
 * @param {Object} p - parameters
 * @param {string} p.name - name
 * @param {string} p.version - version
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
 * @param {Object} p parameters
 * @param {string} p.workflowId workflow ID to find.
 * @param {string} p.runId workflow run ID.
 */
Domain.prototype.getWorkflowRun = function getWorkflowRun(p) {
  var workflowId = p.workflowId;
  var runId = p.runId;
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
Domain.prototype.hasOpenWorkflowId = function hasOpenWorkflowId(workflowId) {
  for (var i = 0; i < this.workflowRuns.length; i++) {
    var wrun = this.workflowRuns[i];
    if (!wrun.isClosed() && wrun.workflowId === workflowId) {
      return true;
    }
  }
  return false;
};


/**
 * `taskList` must be the TaskList type (it must be an object with the `name`
 * attribute).
 *
 * @param {Object} taskList - the task list object
 * @param {string} taskList.name - task list name
 */
Domain.prototype.getDecisionTaskList = function getDecisionTaskList(taskList) {
  if (!!taskList && !!taskList.name) {
    return this.decisionsTaskLists[taskList.name] || null;
  }
  return null;
};


/**
 *
 *
 * @param {Object} taskList - the task list object
 * @param {string} taskList.name - task list name
 */
Domain.prototype.getOrCreateDecisionTaskList = function getOrCreateDecisionTaskList(taskList) {
  if (!!taskList && !!taskList.name) {
    if (!!this.decisionsTaskLists[taskList.name]) {
      return this.decisionsTaskLists[taskList.name];
    }
    var t = this;
    this.decisionsTaskLists[taskList.name] = taskListSrc.createDecider({
      name: taskList.name,
      handleStartDecisionEventFunc: function handleStartDecisionEvent(p) {
        return t.eventBus.handleStartDecisionEvent(p);
      },
      outOfBandEventFunc: t.eventBus.createOutOfBandEventFunc(),
    });
    return this.decisionsTaskLists[taskList.name];
  }
  return null;
};


/**
 * @param {Object} p - parameters
 * @param {Object} p.taskList - task list object
 * @param {string} p.taskList.name - task list name
 * @param {string} p.deciderId - decider identity
 * @param {string} p.nextPageToken - next page token
 * @param {string} p.maximumPageSize - max page size
 * @param {boolean} p.reverseOrder - reverse page order
 */
Domain.prototype.pollForDecisionTask = function pollForDecisionTask(p) {
  var taskList = p.taskList;
  var deciderId = p.deciderId;
  var nextPageToken = p.nextPageToken;
  var maximumPageSize = p.maximumPageSize;
  var reverseOrder = p.reverseOrder;
  var tlist = this.getOrCreateDecisionTaskList(taskList);
  return tlist.pull(deciderId, nextPageToken, maximumPageSize, reverseOrder);
};


/**
 *
 *
 * @param {Object} taskList - the task list object
 * @param {string} taskList.name - task list name
 */
Domain.prototype.getActivityTaskList = function getActivityTaskList(taskList) {
  if (!!taskList && !!taskList.name) {
    return this.activityTaskLists[taskList.name] || null;
  }
  return null;
};


/**
 *
 *
 * @param {Object} taskList - the task list object
 * @param {string} taskList.name - task list name
 */
Domain.prototype.getOrCreateActivityTaskList = function getOrCreateActivityTaskList(taskList) {
  if (!!taskList && !!taskList.name) {
    if (!!this.activityTaskLists[taskList.name]) {
      return this.activityTaskLists[taskList.name];
    }
    var t = this;
    this.activityTaskLists[taskList.name] = taskListSrc.createActivity({
      name: taskList.name,
      outOfBandEventFunc: t.eventBus.createOutOfBandEventFunc(),
    });
    console.log(`[DOMAIN ${this.name}] created activity task list ${taskList.name}`);
    return this.activityTaskLists[taskList.name];
  }
  return null;
};


Domain.prototype.getDecisionTaskByToken = function getDecisionTaskByToken(taskToken) {
  for (var i = 0; i < this.workflowRuns.length; i++) {
    var task = this.workflowRuns[i].getDecisionTaskByToken(taskToken);
    if (!!task) {
      return task;
    }
  }
  return null;
};


Domain.prototype.getActivityTaskByToken = function getActivityTaskByToken(taskToken) {
  for (var i = 0; i < this.workflowRuns.length; i++) {
    var task = this.workflowRuns[i].getActivityTaskByToken(taskToken);
    if (!!task) {
      return task;
    }
  }
  return null;
};


/**
 * Handles the completion of the decision task.
 *
 * @param {Object} p - parameters
 * @param {DecisionTask} p.decisionTask - decision task being closed
 * @param {string} [p.executionContext] - new execution context
 */
Domain.prototype.completeDecisionTask = function completeDecisionTask(p) {
  var decisionTask = p.decisionTask;
  var decisions = p.decisions;
  var workflowRun = decisionTask.workflowRun;
  if (!p.executionContext) {
    workflowRun.executionContext = p.executionContext;
  }

  // First, we need the closed decision task event, because most of the
  // generated events reference it.  This is, unfortunately, awful.
  var event = decisionTask.complete();
  event.workflow = workflowRun;
  var decisionTaskCompletedEvent = this.eventBus._createEvent(event);
  decisionTask.setCompletedEvent(event);

  // TODO DEBUG
  console.log(`[DOMAIN ${this.name}] complete decision task with ${JSON.stringify(decisions)}`);

  var events = [event];
  var decision, j, genEvents;
  for (var i = 0; i < decisions.length; i++) {
    decision = decisions[i];
    genEvents = workflowRun.handleDecision({
      decision: decision,
      decisionTaskCompletedEvent: decisionTaskCompletedEvent,
      domain: this,
    });
    if (typeof genEvents === 'string') {
      // Error - bad parameter
      return [400, 'Sender', 'MissingParameter', `decisions[${i}].` + genEvents];
    }
    if (!!genEvents) {
      for (j = 0; j < genEvents.length; j++) {
        if (!!genEvents[j]) {
          if (!!genEvents[j].ERROR) {
            return genEvents[j].result;
          }
          events.push(genEvents[j]);
        }
      }
    }
  }

  this.eventBus.sendDecisionEvents({
    eventList: events,
    sourceWorkflow: workflowRun,
  });

  return null;
};


/**
 * The workflow run has been created, and all the settings have been validated.
 * Now, the workflow needs to have the events placed correctly, and it needs
 * to be added to the right data structures.
 *
 * Must not be called when spawning a child process!
 *
 * @param {Object} p - parameters
 * @param {WorkflowRun} p.workflow - workflow run that's being started
 */
Domain.prototype.startWorkflowExecution = function startWorkflowExecution(p) {
  var run = p.workflow;
  this.eventBus.startWorkflowExecution(p);
  this.workflowRuns.push(run);
};


/**
 * @param {Object} p - parameters
 * @param {WorkflowRun} p.workflow - workflow to terminate
 * @param {string} p.reason - termination reason
 * @param {string} p.details - details
 * @param {string} [p.cause] - cause for termination
 * @param {string} [p.childPolicy] - child termination policy
 */
Domain.prototype.terminateWorkflowRun = function terminateWorkflowRun(p) {
  var workflow = p.workflow;
  var reason = p.reason || null;
  var details = p.details || null;
  var cause = p.cause || null;
  var childPolicy = p.childPolicy || null;

  this.eventBus.sendExternalEvents(workflow.terminate({
    reason: reason,
    details: details,
    cause: cause,
    requestedChildPolicy: childPolicy,
  }));
};


/**
 * Explicit operator request to cancel a workflow.
 *
 * @param {Object} p - parameters
 * @param {WorkflowRun} p.workflow - workflow to cancel
 */
Domain.prototype.requestWorkflowRunCancel = function requestWorkflowRunCancel(p) {
  var workflow = p.workflow;

  // Nothing is done directly to the workflow; instead, we add a new event
  // for the workflow decisions.
  this.eventBus.sendExternalEvents(workflow.createRequestCancelEvents({
    forChild: false,
  }));
};


/**
 * @param {Object} p - parameters
 * @param {WorkflowRun} p.workflow - workflow to signal
 * @param {string} p.signalName - signal name
 * @param {string} p.input - context data
 */
Domain.prototype.signalWorkflow = function signalWorkflow(p) {
  var workflow = p.workflow;
  var signalName = p.signalName;
  var input = p.input;

  console.log(`[Domain ${this.name}] sending signal ${signalName} to ${workflow.workflowId}`);
  this.eventBus.sendExternalEvents([workflow.createSignalWorkflowEvent(p)]);
};
