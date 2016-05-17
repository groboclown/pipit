'use strict';

const awsCommon = require('../../lib/aws-common');

/*
 * Object that controls the flow of events through a domain.  This ties
 * the task list and workflow run objects.
 */

module.exports = function createEventBus(p) {
  return new EventBus(p);
};


function EventBus(p) {
  // The actual Domain object
  this.domain = p.domain;

  // Maps the workflow run ID to the next event ID (int).
  this.workflowEventIds = {};
}


/**
 * Creates a function that can be used to send an event to a workflow
 * outside of the normal call/request API.  This has its primary use with
 * time out calls.
 */
EventBus.prototype.createOutOfBandEventFunc = function createOutOfBandEventFunc() {
  var t = this;
  return function outOfBandEventFunc(eventList) {
    t.sendExternalEvents(eventList);
  };
};


/**
 * Creates a function that adds an activity task to an activity task list.
 */
EventBus.prototype.createQueueActivityTaskFunc = function createQueueActivityTaskFunc() {
  var t = this;
  return function queueActivityTaskFunc(activityTask) {
    t.queueActivityTask(activityTask);
  };
};


/**
 * Used to create the start event for the decision task.  The task is
 * correctly routed.
 */
EventBus.prototype.handleStartDecisionEvent = function handleStartDecisionEvent(p) {
  var decisionTask = p.decisionTask;
  var deciderId = p.deciderId;

  var eventObj = decisionTask.createStartedEvent({ deciderId: deciderId });

  // Do not make a new decision task for the workflow's task list, because,
  // well, this is a decision task we're already handling.

  var event = this._createEvent(eventObj);
  if (!event) {
    throw new Error(`Bad event object - generated null event (${JSON.stringify(eventObj)})`);
  }
  decisionTask.workflowRun.eventHistory.push(event);

  // Starting the decision task is handled by the caller.

  return event;
};


/**
 * Routes a list of external events calling into workflows.  These events
 * will most probably generate a decision task.  The list of events
 * do not need to be associated with just a single workflow run.
 * Note that these are workflow events as generated by an outside
 * service, so the range of events should be very limited.  However,
 * this method does no checking of correctness for the event type.
 *
 * @param {Object[]} eventList list of simple data objects that will be
 *    constructed into workflow events and possibly a decision task.
 * @param {string} eventList[].runId destination workflow run ID.
 *    Required if the workflow ID and workflow are not given.
 *    May be used with the workflow ID.
 * @param {string} eventList[].workflowId destination workflow ID.
 *    Required if the workflow run ID and workflow are nto given.
 *    May be used with the workflow Run ID.
 * @param {WorkflowRun} eventList[].workflow destination workflow object.
 *    Not required if the workflow ID or workflow Run ID are given,
 *    but will be used instead of the other two if this is used, even
 *    if the other two are specified.
 * @param {string} eventList[].name the event name.
 * @param {Object} eventList[].data the event object's data.
 */
EventBus.prototype.sendExternalEvents = function sendExternalEvents(eventList) {
  // Create events and sort them by workflow.
  var workflows = {};
  var debugEventsById = {};
  this.__handleAllEvents({
    eventList: eventList,
  }).forEach(function fe(event) {
    // ` console.log(`[EVENTBUS] queueing event ${event.name} for ${event.destination.workflowId}`);
    workflows[event.destination.runId] = event.destination;
    if (!debugEventsById[event.destination.runId]) {
      debugEventsById[event.destination.runId] = [];
    }
    debugEventsById[event.destination.runId].push(event.describe());
    event.destination._addEvent(event);
  });

  for (var runId in workflows) {
    if (workflows.hasOwnProperty(runId)) {
      var workflow = workflows[runId];

      // Only send the decision if the workflow execution is still alive.
      if (workflow.isClosed()) {
        continue;
      }

      var taskList = this.domain.getOrCreateDecisionTaskList(workflow.executionConfiguration.taskList);
      var scheduledEvent = this._createEvent(workflow.createDecisionTaskScheduledEvent());
      console.log(`[EVENTBUS] ${workflow.workflowId} adding decision task scheduled ${JSON.stringify(debugEventsById[runId])} events`);
      workflow._addEvent(scheduledEvent);
      // ` console.log(`[EVENTBUS] adding decision task for ${workflow.workflowId}`);
      var task = taskList.addDecisionTaskFor({
        workflow: workflow,
        scheduledEvent: scheduledEvent,
      });
      // The task is started when the task is pulled off the inbox.
    }
  }
};


/**
 * Handles the response to a decision task (RespondDecisionTaskCompleted).
 * The events that do not belong to the calling workflow will instead be
 * sent as out-of-band events.
 */
EventBus.prototype.sendDecisionEvents = function sendDecisionEvents(p) {
  var eventList = p.eventList;
  var sourceWorkflow = p.sourceWorkflow;

  // Create events and sort them by workflow.
  var externalEvents = [];
  var localEvents = [];
  var hasTriggeredEvent = false;
  var t = this;
  this.__handleAllEvents({
    eventList: eventList,
    preEventFunc: function preEventFunc(event) {
      event.sourceWorkflow = sourceWorkflow;
    },
  }).forEach(function fe(event) {
    // ` console.log(`[EVENTBUS] queueing event ${event.name} for ${event.destination.workflowId}`);
    if (event.destination !== sourceWorkflow) {
      externalEvents.push(event);
    } else {
      localEvents.push(event);
      hasTriggeredEvent |= t.__isImmediateEvent(event);
    }
  });

  if (hasTriggeredEvent) {
    this.sendExternalEvents(localEvents);
  }

  this.sendExternalEvents(eventList);
};


EventBus.prototype.__isImmediateEvent = function __isImmediateEvent(event) {
  // TODO see what other conditions to ignore.
  return (!event.name.startsWith('DecisionTask'));
};

/**
 * Create the events for starting a workflow, send them to the right destination
 * listeners, and wire up the workflow with these events.
 *
 * Do not call this for child workflows launched from a parent.  That requires
 * a lot of other events and logic.
 *
 * @param {Object} p - parameters
 * @param {WorkflowRun} p.workflow - workflow run that's being started
 */
EventBus.prototype.startWorkflowExecution = function startWorkflowExecution(p) {
  var run = p.workflow;
  var startEvent = this._createEvent(run.createWorkflowExecutionStartedEvent());

  // Do not need to tell the workflow execution about this, because it
  // already should be in the right state, and it doesn't care about what
  // event spawned it - event IDs are for the actions triggered within
  // a workflow.

  // The workflow needs the event added to its history, though, and that's
  // handled by the sendExternalEvents call.

  this.sendExternalEvents([startEvent]);
};


EventBus.prototype.queueActivityTask = function queueActivityTask(activityTask) {
  var activityTaskList = this.domain.getOrCreateActivityTaskList(activityTask.taskList);
  if (!activityTaskList) {
    throw new Error(`Bad activity ${JSON.stringify(activityTask)}`);
  }
  activityTaskList.addActivityTask(activityTask);
};



/**
 * @private
 * @param {Object} p parameters
 * @param {string} p.runId destination workflow run ID.
 *    Required if the workflow ID and workflow are not given.
 *    May be used with the workflow ID.
 * @param {string} p.workflowId destination workflow ID.
 *    Required if the workflow run ID and workflow are nto given.
 *    May be used with the workflow Run ID.
 * @param {WorkflowRun} p.workflow destination workflow object.
 *    Not required if the workflow ID or workflow Run ID are given,
 *    but will be used instead of the other two if this is used, even
 *    if the other two are specified.
 * @param {WorkflowRun} [p.sourceWorkflow] the source that generated the
 *    event; if the above workflow settings above aren't set, then
 *    the workflow is this.
 * @param {string} p.name the event name.
 * @param {Object} p.data the event object's data.
 * @return {WorkflowEvent} generated workflow event, or null if there
 *    was a problem.
 */
EventBus.prototype._createEvent = function _createEvent(p) {
  if (!p || p instanceof WorkflowEvent) {
    return p;
  }
  if (!p.name) {
    // This is a valid state - some things can return an object
    // that is supposed to be parsed outside the standard flow,
    // but is not itself an event.
    return null;
  }
  var workflow = p.workflow;
  if (!workflow && !p.workflowId && !p.runId) {
    workflow = p.sourceWorkflow;
  }
  if (!workflow) {
    workflow = this.domain.getWorkflowRun({
      workflowId: p.workflowId,
      runId: p.runId,
    });
  }
  if (!workflow) {
    console.error(`[EVENTBUS] no such workflow object ${p.workflowId}/${p.runId}`);
    return null;
  }
  if (!this.workflowEventIds[workflow.runId]) {
    this.workflowEventIds[workflow.runId] = 0;
  }
  var eventId = this.workflowEventIds[workflow.runId]++;
  var event = new WorkflowEvent({
    name: p.name,
    details: p.data,
    id: eventId,
    dest: workflow,
  });
  return event;
};


/**
 * Handle the created events, by allowing an event object to include a
 * method, `postEventCreation`, that can in turn create more events.
 * This allows the proper chaining of "event A -> event B which links to
 * event A".
 *
 * @param {Object} p - parameters
 * @param {Object|Object[]} p.eventList - list of events, or a single event.
 * @param {function} [p.preEventFunc] - processes the event object before it
 *    is created.
 */
EventBus.prototype.__handleAllEvents = function __handleAllEvents(p) {
  var eventList = p.eventList;
  var preEventFunc = p.preEventFunc;

  if (!eventList) {
    return [];
  }
  if (!Array.isArray(eventList)) {
    eventList = [eventList];
  }

  var t = this;

  // Don't make the functions in the loop; define them here.
  function getWorkflowRun(p) {
    return t.domain.getWorkflowRun(p);
  }
  function getWorkflowType(p) {
    return t.domain.getWorkflowType(p);
  }
  function hasOpenWorkflowId(p) {
    return t.domain.hasOpenWorkflowId(p);
  }
  function registerChildWorkflowRun(run) {
    // TODO use a more formal way to add this.
    t.domain.workflowRuns.push(run);
  }
  function getActivityType(p) {
    return t.domain.getActivityType(p);
  }

  var srcEvent, event, newEvents;
  var ret = [];
  while (eventList.length > 0) {
    srcEvent = eventList.pop();
    if (!!preEventFunc) {
      preEventFunc(srcEvent);
    }
    event = this._createEvent(srcEvent);
    if (!!srcEvent.postEventCreation) {
      // If any objects are returned, these are new events to process.
      // This happens even if there is no event generated.
      newEvents = srcEvent.postEventCreation({
        sourceEvent: event,
        getWorkflowRun: getWorkflowRun,
        getWorkflowType: getWorkflowType,
        hasOpenWorkflowId: hasOpenWorkflowId,
        registerChildWorkflowRun: registerChildWorkflowRun,
        getActivityType: getActivityType,
      });
      if (!!newEvents) {
        for (var i = 0; i < newEvents.length; i++) {
          eventList.push(newEvents[i]);
        }
      }
    }
    if (!!event) {
      ret.push(event);
    }
  }
  return ret;
};



// ---------------------------------------------------------------------

function WorkflowEvent(p) {
  var name = p.name;
  var details = p.details;
  var id = p.id;
  var dest = p.dest;

  if (name.endsWith('Event') || name.endsWith('Attributes')) {
    throw new Error('bad event name: ' + name);
  }
  this.id = id;
  this.created = awsCommon.timestamp();
  this.name = name;
  this.details = details;
  this.destination = dest;
}
WorkflowEvent.prototype.describe = function describe() {
  var ret = {
    eventType: this.name,
    eventId: this.id,
    eventTimestamp: '' + this.created,
  };
  var attrName = this.name.charAt(0).toLowerCase() + this.name.substr(1) + 'EventAttributes';
  ret[attrName] = {};
  // Shallow copy
  for (var p in this.details) {
    if (this.details.hasOwnProperty(p)) {
      ret[attrName][p] = this.details[p];
    }
  }
  return ret;
};
