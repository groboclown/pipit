'use strict';

const createTaskDef = require('./task-def');
const textParse = require('../../lib/test-parse.js');

module.exports = function createTaskDefRegistry() {
  return new TaskDefRegistry();
};

function TaskDefRegistry() {
  this.families = {};
}

TaskDefRegistry.prototype.registerTaskDef = function registerTaskDef(p) {
  var taskDef = createTaskDef(p);
  if (!this.families[taskDef.family]) {
    this.families[taskDef.family] = new TaskDefFamily({
      name: taskDef.family,
    });
  }
  this.families[taskDef.family].addTaskDef(taskDef);
  return taskDef;
};


TaskDefRegistry.prototype.getFamily = function getFamily(name) {
  if (!name) {
    return null;
  }
  var colonPos = name.lastIndexOf(':');
  var taskDef;
  if (colonPos > 0) {
    var family = name.substr(0, colonPos);
    var revision = textParse.parseInteger(name.substr(colonPos + 1));
    var familyObj = this.families[family];
    if (!!familyObj) {
      taskDef = familyObj.getRevision(revision);
      if (!!taskDef) {
        return taskDef;
      }
    }
  }
  if (!!this.families[name]) {
    return this.families[name].getLatest();
  }
  // Could be an arn.
  if (name.startsWith('arn:aws:')) {
    for (var familyName in this.families) {
      if (this.families.hasOwnProperty(familyName)) {
        taskDef = this.families[familyName].getByArn(name);
        if (!!taskDef) {
          return taskDef;
        }
      }
    }
  }
  return null;
};


// ===========================================================================


function TaskDefFamily(p) {
  this.name = p.name;
  this.versions = [];
}

TaskDefFamily.prototype.getByArn = function getByArn(arn) {
  for (var i = 0; i < this.versions.length; i++) {
    if (arn === this.versions[i].arn) {
      return this.versions[i];
    }
  }
  return null;
};

TaskDefFamily.prototype.getLatest = function getLatest() {
  // TODO return latest ACTIVE revision
  return this.versions[this.versions.length - 1];
};

TaskDefFamily.prototype.getRevision = function getRevision(revision) {
  if (revision >= 0 && revision < this.versions.length) {
    return this.versions[revision];
  }
  return null;
};

TaskDefFamily.prototype.addTaskDef = function addTaskDef(taskDef) {
  if (taskDef.family !== this.name) {
    throw new Error(`wrong family registration: ${this.name} and ${taskDef.family}`);
  }
  this.versions.push(taskDef);
  // First entry is version 1.
  taskDef.setVersion(this.versions.length);
};
