'use strict';

const awsCommon = require('../../lib/aws-common');
const textParse = require('../../lib/test-parse');

module.exports = function createTaskDef(p) {
  return new TaskDef(p);
}

function TaskDef(p) {
  this.family = p.family;
  this.version = -1; // Set when registered.
  this.genArnFunc = p.genArnFunc;
  this.arn = p.genArnFunc('taskdef', p.family);
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
      new ContainerDef(p.containerDefinitions[i]));
  }
}

TaskDef.prototype.describe = function describe() {
  var containerDefs = [];
  for (var i = 0; i < this.containerDefinitions.length; i++) {
    containerDefs.push(this.containerDefinitions[i].describe());
  }
  return {
    taskDefinition: {
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

TaskDef.prototype.getHostPathForSourceVolume = function getHostPathForSourceVolume(sourceVolume) {
  if (!!this.volumes) {
    for (var i = 0; i < this.volumes.length; i++) {
      if (!!this.volumes[i].host && !!this.volumes[i].host.sourcePath &&
          sourceVolume === this.volumes[i].name) {
        return this.volumes[i].host.sourcePath;
      }
    }
  }
  return null;
};

// ===========================================================================

/**
 * Stores the ContainerDefinition and allows it to
 * be used for creating a docker-compose.yml file.
 */
function ContainerDef(def) {
  this.name = def.name;
  var cpu = textParse.parseInteger(def.cpu, 2);
  if (cpu <= 1) {
    cpu = 2;
  }
  this.environment = {};
  for (var i = 0; !!def.environment && i < def.environment[i]; i++) {
    var keyPair = def.environment[i];
    if (!!keyPair && !!keyPair.name && !!keyPair.value) {
      this.environment[keyPair.name] = keyPair.value;
    }
  }
  var extraHosts = [];
  for (var i = 0; !!def.extraHosts && i < def.extraHosts[i]; i++) {
    var keyPair = def.extraHosts[i];
    if (!!keyPair && !!keyPair.hostname && !!keyPair.ipAddress) {
      extraHosts.push({ hostname: keyPair.hostname, ipAddress: keyPair.ipAddress });
    }
  }
  this.originalDef = {
    command: textParse.asListOfStrings(def.command, null),
    cpu: cpu, // 1024 CPU units per vCPU
    disableNetworking: textParse.parseBoolean(def.disableNetworking, false),
    dnsSearchDomains: textParse.asListOfStrings(def.dnsSearchDomains, []),
    dnsServers: textParse.asListOfStrings(def.dnsServers, []),
    dockerLabels: textParse.asStringToStringMap(def.dockerLabels),
    dockerSecurityOptions: textParse.asListOfStrings(def.dockerSecurityOptions, []),
    entryPoint: textParse.asListOfStrings(def.entryPoint, []),
    environment: def.environment,
    essential: textParse.parseBoolean(def.essential, false),
    extraHosts: extraHosts,
    hostname: def.hostname || null,
    image: def.image || null,
    links: textParse.asListOfStrings(def.links, []),
    logConfiguration: def.logConfiguration || {}, // Complcated mapping...
    memory: textParse.parseInteger(def.memory, 4),
    mountPoints: def.mountPoints || [],
    name: def.name || null,
    portMappings: def.portMappings || [],
    privileged: textParse.parseBoolean(def.privileged, false),
    readonlyRootFilesystem: textParse.parseBoolean(def.readonlyRootFilesystem, false),
    ulimits: def.ulimits || null,
    user: def.user || null,
    volumesFrom: def.volumesFrom || [],
    workingDirectory: def.workingDirectory || null,
  };
}
ContainerDef.prototype.describe = function describe() {
  return this.originalDef;
};
