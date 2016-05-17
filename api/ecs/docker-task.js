'use strict';

const docker = require('../../lib/docker');
const Q = require('q');
const createComposeFile = require('./gen-compose');
const awsCommon = require('../../lib/aws-common');

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
  this.id = awsCommon.genRequestId();
  this.composeFile = null;
  this.name = this.taskDef.family + '_' + this.index;
  this.error = null;
  this.running = false;

  this.containers = [];
  var mappedOverrides = mapifyOverrides(this.overrides);
  var container, name;
  for (var i = 0; i < this.taskDef.containerDefinitions.length; i++) {
    name = this.taskDef.containerDefinitions[i].name;
    container = {
      id: awsCommon.genRequestId(),
      containerDefinition: this.taskDef.containerDefinitions[i],
      containerParams: this.taskDef.containerDefinitions[i].originalDef,
      override: mappedOverrides[name] || null,
      keepAlive: this.keepAlive,
      index: this.index,
      name: name,
    };
    this.containers.push(container);
  }
}


DockerTask.prototype.start = function start() {
  var ret = createComposeFile({
    taskDef: this.taskDef,
    containers: this.containers,
  })
  .then(function(path) {
    this.composeFile = path;
    this.running = true;
    return docker.composeUp({
      name: this.name,
      file: path,
    });
  })
  .then(function(stdout) {
    this.running = true;
  })
  .catch(function(err) {
    this.error = err.message;
    throw err;
  });
};


DockerTask.prototype.status = function status() {
  var containersByName = this.getContainersByName();
  var containerStatus = docker.ps();
  // Assume that the "names" column has just one value.
  var failures = [];
  var tasks = [];

  for (var i = 0; i < containerStatus.length; i++) {
    if (!!containerStatus[i] && !!containersByName[containerStatus.names]) {


      // After we use a named container, remove it from our list.
      delete containersByName[containerStatus.names];
    }
  }
};


DockerTask.prototype.__getContainerById = function __getContainerById(id) {
  for (var i = 0; i < this.containers.length; i++) {
    if (this.containers[i].id === id) {
      return this.containers[i];
    }
  }
  return null;
};


function mapifyOverrides(overrides) {
  // Put the overrides into per-container name mapping.
  var ret = {};
  for (var i = 0; i < overrides.length; i++) {
    if (!!overrides[i].name && (!!overrides[i].command || !!overrides[i].environment)) {
      ret[overrides[i].name] = overrides[i];
    }
  }
  return ret;
}
