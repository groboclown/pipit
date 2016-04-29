'use strict';

const createDomain = require('../../../api/swf/domain.js');
const assert = require('chai').assert;

describe('simple Domain', function() {
  var dm = createDomain({
    name: 'test domain',
    description: 'test desc',
    workflowExecutionRetentionPeriodInDays: 60,
  });

  it('hasOpenWorkflowId with no open workflows', function() {
    assert.equal(dm.hasOpenWorkflowId('n/a'), false, 'open workflow run id');
  });

  it('summary', function() {
    var summary = dm.summary();
    assert.equal(summary.name, 'test domain', 'name');
    assert.equal(summary.description, 'test desc', 'description');
    assert.equal(summary.status, 'REGISTERED', 'status');
  });

  it('getDecisionTaskList with empty decider task list set', function() {
    assert.isNull(dm.getDecisionTaskList({name: 'x'}), 'non-existent name');
    assert.isNull(dm.getDecisionTaskList(null), 'null value');
    assert.isNull(dm.getDecisionTaskList({name: null}), 'null name');
    assert.isNull(dm.getDecisionTaskList({}), 'no name key');
  });

  it('getWorkflowRun with no runs', function() {
    assert.isNull(dm.getWorkflowRun({}), 'empty object');
    assert.isNull(dm.getWorkflowRun({workflowId: 1, runId: 2}), 'both args');
    assert.isNull(dm.getWorkflowRun({workflowId: 1}), 'one arg');
  });

  it('listWorkflowTypeInfos with empty types', function() {
    assert.deepEqual(dm.listWorkflowTypeInfos(null), [], 'null filter');
    assert.deepEqual(dm.listWorkflowTypeInfos(function() { return true; }), [], 'true filter');
    assert.deepEqual(dm.listWorkflowTypeInfos(function() { return false; }), [], 'false filter');
  });
});

describe('Domain with data', function() {
  after(function() {
    // Explicitly prevent the timeout from causing problems.
    // DEBUG console.log('[test after]');
    // DEBUG console.log(`[test] closing run ${wrOpen.workflowId}`);
    wrOpen.runState = 100;
    // DEBUG console.log(`[test] closing run ${wrClosed.workflowId}`);
    wrClosed.runState = 100;
  });


  var dm = createDomain({
    name: 'test domain 1',
    description: 'test desc 1',
    workflowExecutionRetentionPeriodInDays: 0,
  });
  var tl = dm.getOrCreateDecisionTaskList({ name: 'tl 1' });
  var wt = dm.registerWorkflowType({
    name: 'wt',
    version: 'new',
    defaultTaskList: { name: 'tl 1' },
    defaultChildPolicy: 'TERMINATE',
    defaultTaskStartToCloseTimeout: 10,
    defaultExecutionStartToCloseTimeout: 10,
    defaultLambdaRole: 'lr 1',
    defaultTaskPriority: '60',
  });
  var wrOpen = wt.createRun({
    workflowId: 'wf 1',
  });
  dm.workflowRuns.push(wrOpen);
  var wrClosed = wt.createRun({
    workflowId: 'wf 2',
  });
  dm.workflowRuns.push(wrClosed);
  wrClosed.runState = 10; // Completed


  it('listWorkflowTypeInfos', function() {
    var info = wt.summary();
    assert.deepEqual(dm.listWorkflowTypeInfos(null), [info], 'null filter');
    assert.deepEqual(dm.listWorkflowTypeInfos(function() { return true; }), [info], 'true filter');
    assert.deepEqual(dm.listWorkflowTypeInfos(function() { return false; }), [], 'false filter');
  });

  it('forEachWorkflowRun', function() {
    var remaining = { 'wf 1': true, 'wf 2': true };
    var c = 0;
    dm.forEachWorkflowRun(function f(wr) {
      remaining[wr.workflowId] = false;
      c++;
    });
    assert.strictEqual(remaining['wf 1'], false, 'wf 1 not found');
    assert.strictEqual(remaining['wf 2'], false, 'wf 2 not found');
    assert.strictEqual(c, 2, 'did not loop over right count');
  });

  it('getDecisionTaskList with empty decider task list set', function() {
    assert.isNull(dm.getDecisionTaskList({name: 'x'}), 'non-existent name');
    assert.isNull(dm.getDecisionTaskList(null), 'null value');
    assert.isNull(dm.getDecisionTaskList({name: null}), 'null name');
    assert.isNull(dm.getDecisionTaskList({}), 'no name key');
  });

  it('hasOpenWorkflowId with one open workflow', function() {
    assert.equal(dm.hasOpenWorkflowId('n/a'), false, 'non-existent workflow');
    assert.equal(dm.hasOpenWorkflowId('wf 1'), true, 'open workflow');
    assert.equal(dm.hasOpenWorkflowId('wf 2'), false, 'closed workflow');
  });

  it('getDecisionTaskList', function() {
    assert.deepEqual(dm.getDecisionTaskList({ name: 'tl 1' }), tl, 'task list 1');
    assert.deepEqual(dm.getDecisionTaskList({ name: 'tl 0' }), null, 'non-existent task list');
  });
});
