'use strict';

const createWorkflowType = require('../../../api/swf/workflowtype.js');
const assert = require('chai').assert;

describe('All workflow tests', function() {
  var allRuns = [];
  afterEach(function() {
    for (var i = 0; i < allRuns.length; i++) {
      // Explicitly prevent the timeout from causing problems.
      // DEBUG console.log(`[test] closing run ${allRuns[i].workflowId}`);
      allRuns[i].runState = 100;
    }
    allRuns.splice(0, allRuns.length);
  });


  describe('WorkflowType and default parameters', function() {
    it('No type defaults', function() {
      var wtype = createWorkflowType({
        name: 'w',
        version: '1',
        outOfBandEventFunc: function() {},
      });
      assert.strictEqual(wtype.description, '', 'description defaults to empty string');
      var wrun = wtype.createRun({
        workflowId: 'w',
      });
      allRuns.push(wrun);

      // Default workflow run values
      assert.deepEqual(wrun.tagList, [], 'tag list');
      assert.strictEqual(wrun.executionContext, '', 'default execution context');

      var missing = [
        'lambdaRole', 'taskStartToCloseTimeout', 'executionStartToCloseTimeout',
        'taskPriority', 'childPolicy', 'taskList',
      ];
      var missingDefault;
      while (missing.length > 0) {
        missingDefault = wrun.getMissingDefault();
        assert.isOk(isIn(missingDefault, missing), 'report of missing default value');
        var key = missing.pop();
        wrun.executionConfiguration[key] = 'yes';
      }
      missingDefault = wrun.getMissingDefault();
      assert.isNull(missingDefault, 'should have no missing defaults');
    });


  });

  describe('WorkflowRun event actions', function() {
    var wtype = createWorkflowType({
      name: 'wt 2',
      version: '2',
      defaultTaskList: { name: 'tl 2' },
      // Not setting defaultChildPolicy
      defaultTaskStartToCloseTimeout: '5',
      defaultExecutionStartToCloseTimeout: '5',
      defaultLambdaRole: 'NA',
      defaultTaskPriority: '10',
      outOfBandEventFunc: null, // Individual tests will replace this.
    });

    it('Timeout', function() {
      // DEBUG console.log('---------------------------------------------------------');
      var events = [];
      function OOBFunc(e) {
        for (var i = 0; i < e.length; i++) {
          events.push(e[i]);
        }
      }
      var wrun = wtype.createRun({ workflowId: '1-timeout', childPolicy: 'TERMINATE' });
      allRuns.push(wrun);
      wrun.outOfBandEventFunc = OOBFunc;
      var wrunChild = wtype.createRun({ workflowId: '1-timeout-child', childPolicy: 'None'});
      allRuns.push(wrunChild);
      wrunChild.outOfBandEventFunc = OOBFunc;
      wrun.addChild({
        childWorkflow: wrunChild,
        childWorkflowExecutionStartedEvent: { id: 1 },
        startChildWorkflowEvent: { id: 2 },
      });
      var wrunParent = wtype.createRun({ workflowId: '1-timeout-parent', childPolicy: 'None'});
      allRuns.push(wrunParent);
      wrunParent.outOfBandEventFunc = OOBFunc;
      wrunParent.addChild({
        childWorkflow: wrun,
        childWorkflowExecutionStartedEvent: { id: 3 },
        startChildWorkflowEvent: { id: 4 },
      });
      wrun.__timeOut();

      assert.equal(wrunChild.getCloseStatus(), 'TERMINATED',
        'Child workflow state is not as expected');
      assert.equal(wrun.getCloseStatus(), 'TIMED_OUT',
        'Workflow state is not as expected');
      assert.isNull(wrunParent.getCloseStatus(), 'parent state is not open');

      // Event 0: wrunChild termination event.
      // Event 1: wrunChild announcement to parent (wrun)
      // Event 2: wrun termination event.
      // Event 3: wrun announcement to parent (wrunParent)
      assert.equal(events.length, 4, 'expected correct number of close events');

      // First event should be the child termination.
      assert.equal(events[0].workflow.workflowId, wrunChild.workflowId, 'child workflow termination event (workflow id)')
      assert.equal(events[0].name, 'WorkflowExecutionTerminated', 'child workflow termination event (event name)');

      assert.equal(events[1].runId, wrun.runId, 'child workflow announcement to parent event (run id)')
      assert.equal(events[1].name, 'ChildWorkflowExecutionTerminated', 'child workflow termination event (event name)');

      assert.equal(events[2].workflow.workflowId, wrun.workflowId, 'child workflow termination event (workflow id)')
      assert.equal(events[2].name, 'WorkflowExecutionTimedOut', 'child workflow termination event (event name)');

      assert.equal(events[3].runId, wrunParent.runId, 'child workflow announcement to parent event (run id)')
      assert.equal(events[3].name, 'ChildWorkflowExecutionTimedOut', 'child workflow termination event (event name)');
    });
  });

  function isIn(key, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] === key) {
        return true;
      }
    }
    return false;
  }
});
