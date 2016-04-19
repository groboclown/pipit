'use strict';

const awsCommon = require('../../lib/aws-common');

module.exports.createActivityType = function createActivityType(p) {
  return new ActivityType(p);
};

function ActivityType(p) {
  this.configuration = {
    defaultTaskScheduleToStartTimeout: p.defaultTaskScheduleToStartTimeout || '',
    defaultTaskScheduleToCloseTimeout: p.defaultTaskScheduleToCloseTimeout || '',
    defaultTaskStartToCloseTimeout: p.defaultTaskStartToCloseTimeout || '',
    defaultTaskHeartbeatTimeout: p.defaultTaskHeartbeatTimeout || '',
    defaultTaskList: (!p.defaultTaskList ? null : {
      name: p.defaultTaskList.name,
    }),
    defaultTaskPriority: p.defaultTaskPriority || '',
  };
  this.status = 'REGISTERED';
  this.deprecationDate = null;
  this.name = p.name;
  this.version = p.version;
  this.description = p.description || '';
  this.creationDate = awsCommon.timestamp();
}
ActivityType.prototype.describe = function describe() {
  return {
    configuration: this.configuration,
    typeInfo: this.summary(),
  };
};
ActivityType.prototype.matches = function matches(name, version) {
  return this.name === name && this.version === version;
};
ActivityType.prototype.summary = function summary() {
  return {
    status: this.status,
    deprecationDate: this.deprecationDate,
    activityType: {
      name: this.name,
      version: this.version,
    },
    description: this.description,
    creationDate: '' + this.creationDate,
  };
};
