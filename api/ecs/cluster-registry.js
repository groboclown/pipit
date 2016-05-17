'use strict';

const createCluster = require('./cluster');

module.exports = function createClusterRegistry() {
  return new ClusterRegistry();
};


function ClusterRegistry() {
  this.defaultClusterName = 'default';
  this.clusters = {};
}


ClusterRegistry.prototype.setupDefault = function setupDefault(p) {
  if (!this.clusters[this.defaultClusterName]) {
    this.registerCluster({
      clusterName: this.defaultClusterName,
      genArnFunc: p.genArnFunc,
    });
  }
};


ClusterRegistry.prototype.getCluster = function getCluster(name) {
  if (!name) {
    name = this.defaultClusterName;
  }
  return this.clusters[name];
};


ClusterRegistry.prototype.registerCluster = function registerCluster(p) {
  var clusterName = p.clusterName || this.defaultClusterName;
  var genArnFunc = p.genArnFunc;

  if (!!this.getCluster(clusterName)) {
    throw new Error(`already registered ${clusterName}`);
  }
  this.clusters[clusterName] = createCluster({
    clusterName: clusterName,
    genArnFunc: genArnFunc,
  });
};
