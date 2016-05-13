'use strict';

const awsCommon = require('../../lib/aws-common');

module.exports = function createTaskDef(p) {
  return new TaskDef(p);
}

function TaskDef(aws, p) {
  this.family = p.family;
  this.version = -1; // Set when registered.
  this.arn = awsCommon.getArn(p.aws);
  var i;
  this.volumes = [];
  if (!!p.volumes) {
    for (i = 0; i < p.volumes.length; i++) {
      this.volumes.push({
        name: p.volumes[i].name,
        host: {
          sourcePath: p.volumes[i].host.sourcePath,
        },
      });
    }
  }
  this.containerDefinitions = [];
  for (i = 0; i < p.containerDefinitions.length; i++) {
    this.containerDefinitions.push(
      new ContainerDef(p.containerDefinitions[i], this.volumes));
  }
}

TaskDef.prototype.describe = function describe() {
  var containerDefs = [];
  for (var i = 0; i < this.containerDefinitions.length; i++) {
    containerDefs.push(this.containerDefinitions[i].describe());
  }
  return {
    taskDefinition: /*S12*/{
      containerDefinitions: containerDefs,
      family: this.family,
      requiresAttributes: [/*{
        name: '',
        value: '',
      },*/],
      revision: this.version,
      status: 'ACTIVE',
      taskDefinitionArn: this.arn,
      volumes: this.volumes,
    },
  };
};

// ===========================================================================

/**
 * Stores the ContainerDefinition and allows it to
 * be used for creating a docker-compose.yml file.
 */
function ContainerDef(def, volumes) {
  this.originalDef = {
    command: def.command || null, // List of strings
    cpu: def.cpu || 1,
    disableNetworking: def.disableNetworking || false,
    dnsSearchDomains: /*Sv*/[ '', /* ...*/ ],
    dnsServers: /*Sv*/[ '', /* ...*/ ],
    dockerLabels: {} /*Map*/,
    dockerSecurityOptions: /*Sv*/[ '', /* ...*/ ],
    entryPoint: /*Sv*/[ '', /* ...*/ ],
    environment: /*S18*/[ {
      name: '',
      value: '',
    }, /* ...*/ ],
    essential: false,
    extraHosts: [ {
      hostname: '',
      ipAddress: '',
    }, /* ...*/ ],
    hostname: '',
    image: '',
    links: /*Sv*/[ '', /* ...*/ ],
    logConfiguration: {
      logDriver: '',
      options: {} /*Map*/,
    },
    memory: 0,
    mountPoints: [ {
      containerPath: '',
      readOnly: false,
      sourceVolume: '',
    }, /* ...*/ ],
    name: '',
    portMappings: [ {
      containerPort: 0,
      hostPort: 0,
      protocol: '',
    }, /* ...*/ ],
    privileged: false,
    readonlyRootFilesystem: false,
    ulimits: [ {
      hardLimit: 0,
      name: '',
      softLimit: 0,
    }, /* ...*/ ],
    user: '',
    volumesFrom: [ {
      readOnly: false,
      sourceContainer: '',
    }, /* ...*/ ],
    workingDirectory: '',
  };
  this.volumes = volumes;
}
ContainerDef.prototype.describe = function describe() {
  return this.originalDef;
};
