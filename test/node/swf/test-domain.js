'use strict';

const createDomain = require('../../../api/swf/domain.js');
const assert = require('chai').assert;

describe('simple Domain', function() {
  var dm = createDomain({
    name: 'test domain',
    description: 'test desc',
    workflowExecutionRetentionPeriodInDays: 60,
  });

  it('hasOpenWorkflowRunId with no open workflows', function() {
    assert.equal(dm.hasOpenWorkflowRunId('n/a'), false, 'open workflow run id');
  });

  it('summary', function() {
    var summary = dm.summary();
    assert.equal(summary.name, 'test domain', 'name');
    assert.equal(summary.description, 'test desc', 'description');
    assert.equal(summary.status, 'REGISTERED', 'status');
  });
});
