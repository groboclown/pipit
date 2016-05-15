'use strict';

const Q = require('q');
const fs = require('fs');
const tmp = require('tmp');

module.exports = function createComposeFile(p) {
  return createFile(module.exports.__createComposeText(p));
};


module.exports.__createComposeText = function __createComposeText(p) {
  var taskDef = p.taskDef;
  var overrides = sortOverrides(p.override);
  var index = p.index;
  var keepAlive = p.keepAlive;

  var ret = 'version: "2"\nservices:\n';
  for (var ci = 0; ci < taskDef.containerDefinitions.length; ci++) {
    var containerDef = taskDef.containerDefinitions[ci];
    var override = overrides[containerDef.name];
    ret += createContainerText({
      taskDef: taskDef,
      index: index,
      containerDef: containerDef,
      override: override,
      keepAlive: keepAlive,
    });
  }
  return ret;
}


function createContainerText(p) {
  var taskDef = p.taskDef;
  var index = p.index;
  var containerDef = p.containerDef;
  var override = p.override;
  var keepAlive = p.keepAlive;
  var containerParams = containerDef.originalDef;

  var i;

  var environment = {};
  if (!!containerDef.environment) {
    for (i in containerDef.environment) {
      if (containerDef.environment.hasOwnProperty(i)) {
        environment[i] = containerDef.environment[i];
      }
    }
  }
  if (!!override && !!override.environment && override.environment.length > 0) {
    for (i = 0; i < override.environment.length; i++) {
      if (!!override.environment[i].name && !!override.environment[i].value) {
        environment[override.environment[i].name] = override.environment[i].value;
      }
    }
  }
  if (!!override && Object.keys(override).length <= 0) {
    override = null;
  }

  var ret = '  ' + escapeString(containerDef.name + '_' + index) + ':\n';
  ret += mkString('container_name', containerDef.name + '_' + index);
  if (!!override && !!override.command && override.command.length > 0) {
    ret += `    command: ${JSON.stringify(override.command)}\n`;
  } else if (!!containerParams.command && containerParams.command.length > 0) {
    ret += `    command: ${JSON.stringify(containerParams.command)}\n`;
  }


  if (!!containerParams.disableNetworking) {
    ret += mkString('network_mode', 'none');
  }
  ret += mkStringList('dns_search', containerParams.dnsSearchDomains);
  ret += mkStringList('dns', containerParams.dnsServers);
  ret += mkStringMap('labels', containerParams.dockerLabels, '    ', '_' + index);
  ret += mkStringList('security_opt', containerParams.dockerSecurityOptions);
  if (!!containerParams.entryPoint && containerParams.entryPoint.length > 0) {
    ret += `    entrypoint: ${JSON.stringify(containerParams.entryPoint)}\n`;
  }
  ret += mkStringMap('environment', environment);
  // TODO "taskDef.essential" is not used.
  if (!!containerParams.extraHosts && containerParams.extraHosts.length > 0) {
    ret += '    extra_hosts:\n';
    for (i = 0; i < containerParams.extraHosts.length; i++) {
      ret += `      - "${containerParams.extraHosts[i].hostname}:${containerParams.extraHosts[i].ipAddress}"\n`;
    }
  }
  ret += mkString('hostname', containerParams.hostname);
  ret += mkString('image', containerParams.image);
  ret += mkStringList('links', containerParams.links, '    ', '_' + index);
  if (!!containerParams.logConfiguration && !!containerParams.logConfiguration.logDriver) {
    ret += `    logging:\n      driver: ${containerParams.logConfiguration.logDriver}\n`;
    ret += mkStringMap('options', containerParams.logConfiguration.options, '      ');
  }
  if (!!containerParams.memory) {
    ret += `    mem_limit: ${containerParams.memory}m\n`;
  }
  ret += mkMountPoints(taskDef, containerParams.mountPoints);
  ret += mkPortMappings(containerParams.portMappings);
  if (!!containerParams.privileged) {
    ret += '    privileged: true\n';
  }
  if (!!containerParams.readonlyRootFilesystem) {
    ret += '    read_only: true\n';
  }
  ret += mkUlimits(containerParams.ulimits);
  if (!!containerParams.user) {
    ret += mkString('user', containerParams.user);
  }
  ret += mkVolumesFrom(taskDef, containerParams.volumesFrom);
  if (!!containerParams.workingDirectory) {
    ret += mkString('working_dir', containerParams.workingDirectory);
  }

  if (keepAlive) {
    ret += '    restart: unless-stopped\n';
  } else {
    ret += '    restart: "no"\n';
  }

  return ret;
}


function createFile(text) {
  var text = this.__createComposeText();
  var deferred = Q.defer();
  tmp.file(function(err, path, fd, cleanupCallback) {
    if (err) {
      return deferred.reject(err);
    }
    fs.writeFile(path, text, function(err) {
      if (err) {
        return deferred.reject(err);
      }
      deferred.resolve(path);
    });
  });
  return deferred.promise;
};


function sortOverrides(overrides) {
  // Put the overrides into per-container name mapping.
  var ret = {};
  for (var i = 0; i < overrides.length; i++) {
    if (!!overrides[i].name && (!!overrides[i].command || !!overrides[i].environment)) {
      ret[overrides[i].name] = overrides[i];
    }
  }
  return ret;
}


function mkStringList(listName, list, prefix, valueSuffix) {
  prefix = prefix || '    ';
  valueSuffix = valueSuffix || '';
  var ret = '';
  var value;
  if (!!list && list.length > 0) {
    ret = prefix + listName + ':\n';
    for (var i = 0; i < list.length; i++) {
      value = list[i] + valueSuffix;
      ret += `${prefix}  - ${escapeString(value)}\n`;
    }
  }
  return ret;
}


function mkStringMap(mapName, map, prefix, valueSuffix) {
  prefix = prefix || '    ';
  valueSuffix = valueSuffix || '';
  var ret = '';
  var value;
  if (!!map && Object.keys(map).length > 0) {
    ret = prefix + mapName + ':\n';
    for (var k in map) {
      if (map.hasOwnProperty(k)) {
        value = escapeString(map[k] + valueSuffix);
        ret += `${prefix}  ${k}: ${value}\n`;
      }
    }
  }
  return ret;
}


function mkMountPoints(taskDef, mountPoints) {
  var ret = '';
  var value;
  if (!!mountPoints && mountPoints.length > 0) {
    ret = '    volumes:\n';
    for (var i = 0; i < mountPoints.length; i++) {
      value = mountPoints[i].containerPath;
      if (!!mountPoints[i].sourceVolume) {
        value += ':' + taskDef.getHostPathForSourceVolume(mountPoints[i].sourceVolume);
      }
      ret += `      - ${escapeString(value)}\n`;
    }
  }
  return ret;
}


function mkPortMappings(portMappings) {
  var ret = '';
  var value;
  if (!!portMappings && portMappings.length > 0) {
    ret = '    ports:\n';
    for (var i = 0; i < portMappings.length; i++) {
      if (portMappings[i].protocol === 'udp') {
        throw new Error('Does not support udp port mappings');
      }
      value = portMappings[i].containerPort;
      if (!!portMappings[i].hostPort) {
        value += ':' + portMappings[i].hostPort;
      }
      ret += `      - ${escapeString(value)}"\n`;
    }
  }
  return ret;
}


function mkUlimits(ulimits) {
  var ret = '';
  if (!!ulimits && ulimits.length > 0) {
    ret = '    ulimits:\n';
    for (var i = 0; i < ulimits.length; i++) {
      ret += `      ${ulimits[i].name}:\n        soft: ${ulimits[i].softLimit}\n        hard: ${ulimits[i].hardLimit}\n`;
    }
  }
  return ret;
}


function mkVolumesFrom(taskDef, volumesFrom) {
  var ret = '';
  var ro, value;
  if (!!volumesFrom && volumesFrom.length > 0) {
    ret = `    volumes_from:\n`;
    for (var i = 0; i < volumesFrom.length; i++) {
      ro = '';
      if (!!volumesFrom[i].readOnly) {
        ro = ':ro';
      }
      value = escapeString(taskDef.getHostPathForSourceVolume(volumesFrom[i].sourceContainer) + ro);
      ret += `      - ${value}\n`;
    }
  }
  return ret;
}


function mkString(key, value, prefix) {
  prefix = prefix || '    ';
  var ret = '';
  if (!!value) {
    value = escapeString(value);
    ret = `${prefix}${key}: ${value}\n`;
  }
  return ret;
}


function escapeString(value) {
  if (!value) {
    return 'null';
  }
  return '"' + value.replace('"', '\\"') + '"';
}
