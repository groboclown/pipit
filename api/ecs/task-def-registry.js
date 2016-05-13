'use strict';

const createTaskDef = require('./task-def');

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


TaskDefRegistry.prototype.getLatestFamily = function getLatestFamily(name) {
  if (!this.families[name]) {
    return null;
  }
  return this.families[name].getLatest();
};


// ===========================================================================


function TaskDefFamily(p) {
  this.name = p.name;
  this.versions = [];
}


TaskDefFamily.prototype.getLatest = function getLatest() {
  return this.versions[this.versions.length - 1];
};

TaskDefFamily.prototype.addTaskDef = function addTaskDef(taskDef) {
  if (taskDef.family !== this.name) {
    throw new Error(`wrong family registration: ${this.name} and ${taskDef.family}`);
  }
  this.versions.push(taskDef);
  // First entry is version 1.
  taskDef.version = this.versions.length;
};
