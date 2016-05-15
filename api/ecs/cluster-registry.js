'use strict';

const createCluster = require('./cluster');

module.exports = function createClusterRegistry() {
  return new ClusterRegistry();
};


function ClusterRegistry(p) {
  var aws = p.aws;
  this.defaultClusterName = 'default';
  this.clusters = {};
  this.registerCluster({
    clusterName: this.defaultClusterName,
    aws: aws,
  });
}


ClusterRegistry.prototype.getCluster = function getCluster(name) {
  if (!name) {
    name = this.defaultClusterName;
  }
  return this.clusters[name];
};


ClusterRegistry.prototype.registerCluster = function registerCluster(p) {
  var clusterName = p.clusterName;
  var aws = p.aws;

  if (!!this.getCluster(clusterName)) {
    throw new Error(`already registered ${clusterName}`);
  }
  this.clusters[clusterName] = createCluster({
    clusterName: clusterName,
    aws: aws,
  });
}
