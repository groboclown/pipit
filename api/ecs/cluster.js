'use strict';

module.exports = function createCluster(p) {
  return new Cluster(p);
};


function Cluster(p) {
  this.name = p.clusterName || 'default';
}
