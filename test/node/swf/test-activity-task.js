'use strict';

const createActivityTask = require('../../../api/swf/activity-task.js');
const createActivityType = require('../../../api/swf/activitytype.js');
const assert = require('chai').assert;

describe('Activity task defaults', function() {
  it('No defaults in activity type', function() {
    var aType = createActivityType({
      name: 'Activity Type 1',
      version: 'asdf',
    });
    var activityRegistration = [];
    var aTask = aType.createActivityTask({
      activityId: 'Activity Task 1',
      workflowRun: {
        registerActivity: function(a) {
          activityRegistration.push(a);
        },
      },
    });
    // TODO check results assert.equal();
  });
});
