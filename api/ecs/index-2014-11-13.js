'use strict';

const awsCommon = require('../../lib/aws-common');
const textParse = require('../../lib/test-parse');

/**
 * Amazon EC2 Container Service version 2014-11-13
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);


// ========================================================================
// Implemented


const clusterRegistry = require('./cluster-registry')();
const taskDefRegistry = require('./task-def-registry')();


// -----------------------------------
module.exports.RegisterTaskDefinition = function RegisterTaskDefinition(aws) {
  var containerDefinitions = aws.params.containerDefinitions;
  var family = aws.params.family;
  var volumes = aws.params.volumes;
  if (!containerDefinitions) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter containerDefinitions'];
  }
  if (!family) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter family'];
  }

  var taskDef = taskDefRegistry.registerTaskDef({
    genArnFunc: awsCommon.createGenArnFunction(aws),
    family: family,
    volumes: volumes,
    containerDefinitions: containerDefinitions,
  });

  var ret = taskDef.describe();

  return [200, ret];
};


// -----------------------------------
module.exports.RunTask = function RunTask(aws) {
  var cluster = aws.params.cluster;
  var count = aws.params.count /* Type integer */;
  var overrides = aws.params.overrides;
  var startedBy = aws.params.startedBy;
  var taskDefinition = aws.params.taskDefinition;
  if (!taskDefinition) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskDefinition'];
  }

  clusterRegistry.setupDefault({ genArnFunc: awsCommon.createGenArnFunction(aws) });

  var clusterObj = clusterRegistry.getCluster(cluster);
  if (!clusterObj) {
    return [400, 'Sender', 'ClusterNotFoundException', cluster];
  }

  var taskDefObj = taskDefRegistry.getFamily(taskDefinition);
  if (!taskDefObj) {
    return [400, 'Sender', 'InvalidParameterValue', `unknown task def ${taskDefinition}`];
  }

  if (!!count && textParse.parseInteger(count, 1) > 10) {
    return [400, 'Sender', 'InvalidParameterValue', `count too big (${count})`];
  }

  return clusterObj.runTask({
    taskDef: taskDefObj,
    count: textParse.parseInteger(count, 1),
    overrides: overrides,
    startedBy: startedBy,
    genArnFunc: awsCommon.createGenArnFunction(aws),
  }).then(function(ret) {
    return [200, ret];
  });
};

// -----------------------------------
module.exports.StartTask = function StartTask(aws) {
  var cluster = aws.params.cluster;
  var containerInstances = aws.params.containerInstances;
  var overrides = aws.params.overrides;
  var startedBy = aws.params.startedBy;
  var taskDefinition = aws.params.taskDefinition;
  if (!containerInstances) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter containerInstances'];
  }
  if (!taskDefinition) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskDefinition'];
  }

  clusterRegistry.setupDefault({ genArnFunc: awsCommon.createGenArnFunction(aws) });

  var clusterObj = clusterRegistry.getCluster(cluster);
  if (!clusterObj) {
    return [400, 'Sender', 'ClusterNotFoundException', cluster];
  }

  var taskDefObj = taskDefRegistry.getFamily(taskDefinition);
  if (!taskDefObj) {
    return [400, 'Sender', 'InvalidParameterValue', `unknown task def ${taskDefinition}`];
  }

  return clusterObj.startTask({
    containerInstances: containerInstances,
    taskDef: taskDefObj,
    overrides: overrides,
    startedBy: startedBy,
    genArnFunc: awsCommon.createGenArnFunction(aws),
  }).then(function(ret) {
    return [200, ret];
  });
};

// =========================================================================
// To be implemented

// -----------------------------------
module.exports.CreateCluster = function CreateCluster(aws) {
  var clusterName = aws.params.clusterName;


  // TODO implement code

  var ret = {
    cluster: /*S4*/{
      activeServicesCount: 0,
      clusterArn: '',
      clusterName: '',
      pendingTasksCount: 0,
      registeredContainerInstancesCount: 0,
      runningTasksCount: 0,
      status: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateService = function CreateService(aws) {
  var clientToken = aws.params.clientToken;
  var cluster = aws.params.cluster;
  var deploymentConfiguration = aws.params.deploymentConfiguration;
  var desiredCount = aws.params.desiredCount /* Type integer */;
  var loadBalancers = aws.params.loadBalancers;
  var role = aws.params.role;
  var serviceName = aws.params.serviceName;
  var taskDefinition = aws.params.taskDefinition;
  if (!desiredCount) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter desiredCount'];
  }
  if (!serviceName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter serviceName'];
  }
  if (!taskDefinition) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskDefinition'];
  }


  // TODO implement code

  var ret = {
    service: /*Sc*/{
      clusterArn: '',
      createdAt: awsCommon.timestamp(),
      deploymentConfiguration: /*Sa*/{
        maximumPercent: 0,
        minimumHealthyPercent: 0,
      },
      deployments: [ {
        createdAt: awsCommon.timestamp(),
        desiredCount: 0,
        id: '',
        pendingCount: 0,
        runningCount: 0,
        status: '',
        taskDefinition: '',
        updatedAt: awsCommon.timestamp(),
      }, /* ...*/ ],
      desiredCount: 0,
      events: [ {
        createdAt: awsCommon.timestamp(),
        id: '',
        message: '',
      }, /* ...*/ ],
      loadBalancers: /*S7*/[ {
        containerName: '',
        containerPort: 0,
        loadBalancerName: '',
      }, /* ...*/ ],
      pendingCount: 0,
      roleArn: '',
      runningCount: 0,
      serviceArn: '',
      serviceName: '',
      status: '',
      taskDefinition: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteCluster = function DeleteCluster(aws) {
  var cluster = aws.params.cluster;
  if (!cluster) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter cluster'];
  }


  // TODO implement code

  var ret = {
    cluster: /*S4*/{
      activeServicesCount: 0,
      clusterArn: '',
      clusterName: '',
      pendingTasksCount: 0,
      registeredContainerInstancesCount: 0,
      runningTasksCount: 0,
      status: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteService = function DeleteService(aws) {
  var cluster = aws.params.cluster;
  var service = aws.params.service;
  if (!service) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter service'];
  }


  // TODO implement code

  var ret = {
    service: /*Sc*/{
      clusterArn: '',
      createdAt: awsCommon.timestamp(),
      deploymentConfiguration: /*Sa*/{
        maximumPercent: 0,
        minimumHealthyPercent: 0,
      },
      deployments: [ {
        createdAt: awsCommon.timestamp(),
        desiredCount: 0,
        id: '',
        pendingCount: 0,
        runningCount: 0,
        status: '',
        taskDefinition: '',
        updatedAt: awsCommon.timestamp(),
      }, /* ...*/ ],
      desiredCount: 0,
      events: [ {
        createdAt: awsCommon.timestamp(),
        id: '',
        message: '',
      }, /* ...*/ ],
      loadBalancers: /*S7*/[ {
        containerName: '',
        containerPort: 0,
        loadBalancerName: '',
      }, /* ...*/ ],
      pendingCount: 0,
      roleArn: '',
      runningCount: 0,
      serviceArn: '',
      serviceName: '',
      status: '',
      taskDefinition: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeregisterContainerInstance = function DeregisterContainerInstance(aws) {
  var cluster = aws.params.cluster;
  var containerInstance = aws.params.containerInstance;
  var force = aws.params.force /* Type boolean */;
  if (!containerInstance) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter containerInstance'];
  }


  // TODO implement code

  var ret = {
    containerInstance: /*Sp*/{
      agentConnected: false,
      agentUpdateStatus: '',
      attributes: /*Sy*/[ /*Sz*/{
        name: '',
        value: '',
      }, /* ...*/ ],
      containerInstanceArn: '',
      ec2InstanceId: '',
      pendingTasksCount: 0,
      registeredResources: /*Sr*/[ {
        doubleValue: 0.0 /*Double*/,
        integerValue: 0,
        longValue: 0 /*Long*/,
        name: '',
        stringSetValue: /*Sv*/[ '', /* ...*/ ],
        type: '',
      }, /* ...*/ ],
      remainingResources: /*Sr*/[ {
        doubleValue: 0.0 /*Double*/,
        integerValue: 0,
        longValue: 0 /*Long*/,
        name: '',
        stringSetValue: /*Sv*/[ '', /* ...*/ ],
        type: '',
      }, /* ...*/ ],
      runningTasksCount: 0,
      status: '',
      versionInfo: /*Sq*/{
        agentHash: '',
        agentVersion: '',
        dockerVersion: '',
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeregisterTaskDefinition = function DeregisterTaskDefinition(aws) {
  var taskDefinition = aws.params.taskDefinition;
  if (!taskDefinition) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskDefinition'];
  }


  // TODO implement code

  var ret = {
    taskDefinition: /*S12*/{
      containerDefinitions: /*S13*/[ {
        command: /*Sv*/[ '', /* ...*/ ],
        cpu: 0,
        disableNetworking: false,
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
      }, /* ...*/ ],
      family: '',
      requiresAttributes: [ /*Sz*/{
        name: '',
        value: '',
      }, /* ...*/ ],
      revision: 0,
      status: '',
      taskDefinitionArn: '',
      volumes: /*S1n*/[ {
        host: {
          sourcePath: '',
        },
        name: '',
      }, /* ...*/ ],
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeClusters = function DescribeClusters(aws) {
  var clusters = aws.params.clusters;


  // TODO implement code

  var ret = {
    clusters: [ /*S4*/{
      activeServicesCount: 0,
      clusterArn: '',
      clusterName: '',
      pendingTasksCount: 0,
      registeredContainerInstancesCount: 0,
      runningTasksCount: 0,
      status: '',
    }, /* ...*/ ],
    failures: /*S1v*/[ {
      arn: '',
      reason: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeContainerInstances = function DescribeContainerInstances(aws) {
  var cluster = aws.params.cluster;
  var containerInstances = aws.params.containerInstances;
  if (!containerInstances) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter containerInstances'];
  }


  // TODO implement code

  var ret = {
    containerInstances: [ /*Sp*/{
      agentConnected: false,
      agentUpdateStatus: '',
      attributes: /*Sy*/[ /*Sz*/{
        name: '',
        value: '',
      }, /* ...*/ ],
      containerInstanceArn: '',
      ec2InstanceId: '',
      pendingTasksCount: 0,
      registeredResources: /*Sr*/[ {
        doubleValue: 0.0 /*Double*/,
        integerValue: 0,
        longValue: 0 /*Long*/,
        name: '',
        stringSetValue: /*Sv*/[ '', /* ...*/ ],
        type: '',
      }, /* ...*/ ],
      remainingResources: /*Sr*/[ {
        doubleValue: 0.0 /*Double*/,
        integerValue: 0,
        longValue: 0 /*Long*/,
        name: '',
        stringSetValue: /*Sv*/[ '', /* ...*/ ],
        type: '',
      }, /* ...*/ ],
      runningTasksCount: 0,
      status: '',
      versionInfo: /*Sq*/{
        agentHash: '',
        agentVersion: '',
        dockerVersion: '',
      },
    }, /* ...*/ ],
    failures: /*S1v*/[ {
      arn: '',
      reason: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeServices = function DescribeServices(aws) {
  var cluster = aws.params.cluster;
  var services = aws.params.services;
  if (!services) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter services'];
  }


  // TODO implement code

  var ret = {
    failures: /*S1v*/[ {
      arn: '',
      reason: '',
    }, /* ...*/ ],
    services: [ /*Sc*/{
      clusterArn: '',
      createdAt: awsCommon.timestamp(),
      deploymentConfiguration: /*Sa*/{
        maximumPercent: 0,
        minimumHealthyPercent: 0,
      },
      deployments: [ {
        createdAt: awsCommon.timestamp(),
        desiredCount: 0,
        id: '',
        pendingCount: 0,
        runningCount: 0,
        status: '',
        taskDefinition: '',
        updatedAt: awsCommon.timestamp(),
      }, /* ...*/ ],
      desiredCount: 0,
      events: [ {
        createdAt: awsCommon.timestamp(),
        id: '',
        message: '',
      }, /* ...*/ ],
      loadBalancers: /*S7*/[ {
        containerName: '',
        containerPort: 0,
        loadBalancerName: '',
      }, /* ...*/ ],
      pendingCount: 0,
      roleArn: '',
      runningCount: 0,
      serviceArn: '',
      serviceName: '',
      status: '',
      taskDefinition: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeTaskDefinition = function DescribeTaskDefinition(aws) {
  var taskDefinition = aws.params.taskDefinition;
  if (!taskDefinition) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskDefinition'];
  }


  // TODO implement code

  var ret = {
    taskDefinition: /*S12*/{
      containerDefinitions: /*S13*/[ {
        command: /*Sv*/[ '', /* ...*/ ],
        cpu: 0,
        disableNetworking: false,
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
      }, /* ...*/ ],
      family: '',
      requiresAttributes: [ /*Sz*/{
        name: '',
        value: '',
      }, /* ...*/ ],
      revision: 0,
      status: '',
      taskDefinitionArn: '',
      volumes: /*S1n*/[ {
        host: {
          sourcePath: '',
        },
        name: '',
      }, /* ...*/ ],
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeTasks = function DescribeTasks(aws) {
  var cluster = aws.params.cluster;
  var tasks = aws.params.tasks;
  if (!tasks) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter tasks'];
  }


  // TODO implement code

  var ret = {
    failures: /*S1v*/[ {
      arn: '',
      reason: '',
    }, /* ...*/ ],
    tasks: /*S27*/[ /*S28*/{
      clusterArn: '',
      containerInstanceArn: '',
      containers: [ {
        containerArn: '',
        exitCode: 0,
        lastStatus: '',
        name: '',
        networkBindings: /*S2e*/[ {
          bindIP: '',
          containerPort: 0,
          hostPort: 0,
          protocol: '',
        }, /* ...*/ ],
        reason: '',
        taskArn: '',
      }, /* ...*/ ],
      createdAt: awsCommon.timestamp(),
      desiredStatus: '',
      lastStatus: '',
      overrides: /*S29*/{
        containerOverrides: [ {
          command: /*Sv*/[ '', /* ...*/ ],
          environment: /*S18*/[ {
            name: '',
            value: '',
          }, /* ...*/ ],
          name: '',
        }, /* ...*/ ],
      },
      startedAt: awsCommon.timestamp(),
      startedBy: '',
      stoppedAt: awsCommon.timestamp(),
      stoppedReason: '',
      taskArn: '',
      taskDefinitionArn: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DiscoverPollEndpoint = function DiscoverPollEndpoint(aws) {
  var cluster = aws.params.cluster;
  var containerInstance = aws.params.containerInstance;


  // TODO implement code

  var ret = {
    endpoint: '',
    telemetryEndpoint: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListClusters = function ListClusters(aws) {
  var maxResults = aws.params.maxResults /* Type integer */;
  var nextToken = aws.params.nextToken;


  // TODO implement code

  var ret = {
    clusterArns: /*Sv*/[ '', /* ...*/ ],
    nextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListContainerInstances = function ListContainerInstances(aws) {
  var cluster = aws.params.cluster;
  var maxResults = aws.params.maxResults /* Type integer */;
  var nextToken = aws.params.nextToken;


  // TODO implement code

  var ret = {
    containerInstanceArns: /*Sv*/[ '', /* ...*/ ],
    nextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListServices = function ListServices(aws) {
  var cluster = aws.params.cluster;
  var maxResults = aws.params.maxResults /* Type integer */;
  var nextToken = aws.params.nextToken;


  // TODO implement code

  var ret = {
    nextToken: '',
    serviceArns: /*Sv*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListTaskDefinitionFamilies = function ListTaskDefinitionFamilies(aws) {
  var familyPrefix = aws.params.familyPrefix;
  var maxResults = aws.params.maxResults /* Type integer */;
  var nextToken = aws.params.nextToken;

  // TODO implement code

  var families = [];
  var paged = awsCommon.pageResults({
    reverseOrder: false,
    maximumPageSize: maxResults,
    nextPageToken: nextToken,
    key: 'families',
    resultList: families,
  });
  var ret = {
    families: paged.families,
    nextToken: paged.nextPageToken,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListTaskDefinitions = function ListTaskDefinitions(aws) {
  var familyPrefix = aws.params.familyPrefix;
  var maxResults = aws.params.maxResults /* Type integer */;
  var nextToken = aws.params.nextToken;
  var sort = aws.params.sort;
  var status = aws.params.status;


  // TODO implement code

  var ret = {
    nextToken: '',
    taskDefinitionArns: [], // List of strings
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListTasks = function ListTasks(aws) {
  var cluster = aws.params.cluster;
  var containerInstance = aws.params.containerInstance;
  var desiredStatus = aws.params.desiredStatus;
  var family = aws.params.family;
  var maxResults = aws.params.maxResults /* Type integer */;
  var nextToken = aws.params.nextToken;
  var serviceName = aws.params.serviceName;
  var startedBy = aws.params.startedBy;


  // TODO implement code

  var ret = {
    nextToken: '',
    taskArns: /*Sv*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RegisterContainerInstance = function RegisterContainerInstance(aws) {
  var attributes = aws.params.attributes;
  var cluster = aws.params.cluster;
  var containerInstanceArn = aws.params.containerInstanceArn;
  var instanceIdentityDocument = aws.params.instanceIdentityDocument;
  var instanceIdentityDocumentSignature = aws.params.instanceIdentityDocumentSignature;
  var totalResources = aws.params.totalResources;
  var versionInfo = aws.params.versionInfo;


  // TODO implement code

  var ret = {
    containerInstance: /*Sp*/{
      agentConnected: false,
      agentUpdateStatus: '',
      attributes: /*Sy*/[ /*Sz*/{
        name: '',
        value: '',
      }, /* ...*/ ],
      containerInstanceArn: '',
      ec2InstanceId: '',
      pendingTasksCount: 0,
      registeredResources: /*Sr*/[ {
        doubleValue: 0.0 /*Double*/,
        integerValue: 0,
        longValue: 0 /*Long*/,
        name: '',
        stringSetValue: /*Sv*/[ '', /* ...*/ ],
        type: '',
      }, /* ...*/ ],
      remainingResources: /*Sr*/[ {
        doubleValue: 0.0 /*Double*/,
        integerValue: 0,
        longValue: 0 /*Long*/,
        name: '',
        stringSetValue: /*Sv*/[ '', /* ...*/ ],
        type: '',
      }, /* ...*/ ],
      runningTasksCount: 0,
      status: '',
      versionInfo: /*Sq*/{
        agentHash: '',
        agentVersion: '',
        dockerVersion: '',
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.StopTask = function StopTask(aws) {
  var cluster = aws.params.cluster;
  var reason = aws.params.reason;
  var task = aws.params.task;
  if (!task) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter task'];
  }


  // TODO implement code

  var ret = {
    task: /*S28*/{
      clusterArn: '',
      containerInstanceArn: '',
      containers: [ {
        containerArn: '',
        exitCode: 0,
        lastStatus: '',
        name: '',
        networkBindings: /*S2e*/[ {
          bindIP: '',
          containerPort: 0,
          hostPort: 0,
          protocol: '',
        }, /* ...*/ ],
        reason: '',
        taskArn: '',
      }, /* ...*/ ],
      createdAt: awsCommon.timestamp(),
      desiredStatus: '',
      lastStatus: '',
      overrides: /*S29*/{
        containerOverrides: [ {
          command: /*Sv*/[ '', /* ...*/ ],
          environment: /*S18*/[ {
            name: '',
            value: '',
          }, /* ...*/ ],
          name: '',
        }, /* ...*/ ],
      },
      startedAt: awsCommon.timestamp(),
      startedBy: '',
      stoppedAt: awsCommon.timestamp(),
      stoppedReason: '',
      taskArn: '',
      taskDefinitionArn: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SubmitContainerStateChange = function SubmitContainerStateChange(aws) {
  var cluster = aws.params.cluster;
  var containerName = aws.params.containerName;
  var exitCode = aws.params.exitCode /* Type integer */;
  var networkBindings = aws.params.networkBindings;
  var reason = aws.params.reason;
  var status = aws.params.status;
  var task = aws.params.task;


  // TODO implement code

  var ret = {
    acknowledgment: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SubmitTaskStateChange = function SubmitTaskStateChange(aws) {
  var cluster = aws.params.cluster;
  var reason = aws.params.reason;
  var status = aws.params.status;
  var task = aws.params.task;


  // TODO implement code

  var ret = {
    acknowledgment: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateContainerAgent = function UpdateContainerAgent(aws) {
  var cluster = aws.params.cluster;
  var containerInstance = aws.params.containerInstance;
  if (!containerInstance) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter containerInstance'];
  }


  // TODO implement code

  var ret = {
    containerInstance: /*Sp*/{
      agentConnected: false,
      agentUpdateStatus: '',
      attributes: /*Sy*/[ /*Sz*/{
        name: '',
        value: '',
      }, /* ...*/ ],
      containerInstanceArn: '',
      ec2InstanceId: '',
      pendingTasksCount: 0,
      registeredResources: /*Sr*/[ {
        doubleValue: 0.0 /*Double*/,
        integerValue: 0,
        longValue: 0 /*Long*/,
        name: '',
        stringSetValue: /*Sv*/[ '', /* ...*/ ],
        type: '',
      }, /* ...*/ ],
      remainingResources: /*Sr*/[ {
        doubleValue: 0.0 /*Double*/,
        integerValue: 0,
        longValue: 0 /*Long*/,
        name: '',
        stringSetValue: /*Sv*/[ '', /* ...*/ ],
        type: '',
      }, /* ...*/ ],
      runningTasksCount: 0,
      status: '',
      versionInfo: /*Sq*/{
        agentHash: '',
        agentVersion: '',
        dockerVersion: '',
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateService = function UpdateService(aws) {
  var cluster = aws.params.cluster;
  var deploymentConfiguration = aws.params.deploymentConfiguration;
  var desiredCount = aws.params.desiredCount /* Type integer */;
  var service = aws.params.service;
  var taskDefinition = aws.params.taskDefinition;
  if (!service) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter service'];
  }


  // TODO implement code

  var ret = {
    service: /*Sc*/{
      clusterArn: '',
      createdAt: awsCommon.timestamp(),
      deploymentConfiguration: /*Sa*/{
        maximumPercent: 0,
        minimumHealthyPercent: 0,
      },
      deployments: [ {
        createdAt: awsCommon.timestamp(),
        desiredCount: 0,
        id: '',
        pendingCount: 0,
        runningCount: 0,
        status: '',
        taskDefinition: '',
        updatedAt: awsCommon.timestamp(),
      }, /* ...*/ ],
      desiredCount: 0,
      events: [ {
        createdAt: awsCommon.timestamp(),
        id: '',
        message: '',
      }, /* ...*/ ],
      loadBalancers: /*S7*/[ {
        containerName: '',
        containerPort: 0,
        loadBalancerName: '',
      }, /* ...*/ ],
      pendingCount: 0,
      roleArn: '',
      runningCount: 0,
      serviceArn: '',
      serviceName: '',
      status: '',
      taskDefinition: '',
    },
  };
  return [200, ret];
};
