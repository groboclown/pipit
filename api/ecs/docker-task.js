'use strict';

const docker = require('../../lib/docker');
const Q = require('q');
const createComposeFile = require('./gen-compose');

/**
 * Represents a single task running in docker.
 */
module.exports = function createDockerTask(p) {
  return new DockerTask(p);
};


function DockerTask(p) {
  this.index = p.index; // String
  this.taskDef = p.taskDef;
  this.overrides = p.overrides;
  this.keepAlive = p.keepAlive;
  this.composeFile = null;
  this.name = this.taskDef.family + '_' + this.index;
}


DockerTask.prototype.start = function start() {
  var ret = createComposeFile({
    taskDef: this.taskDef,
    overrides: this.overrides,
    index: this.index,
    keepAlive: this.keepAlive,
  })
  .then(function(path) {
    this.composeFile = path;
    return docker.composeUp({
      name: this.name,
      file: path,
    });
  })
  .then(function(stdout) {
    // FIXME set the internal state.
  });
};
