'use strict';

const awsCommon = require('../../lib/aws-common');
const Q = require('q');
const createDockerTask = require('./docker-task');

module.exports = function createCluster(p) {
  return new Cluster(p);
};


function Cluster(p) {
  this.arn = awsCommon.genArn(p.aws);
  this.containerInstanceArn = awsCommon.genArn(p.aws);
  this.name = p.clusterName || 'default';
  this.runningTaskGroups = [];
  this.runningServiceGroups = [];
  this.taskCount = 0;

  // TODO give a cluster a vCPU count (*1024 for cpu segments)
  // and memory, so that it can be split up and checked against for
  // the running tasks.
}


/**
 * @return {Q} a promise with the task response.
 */
Cluster.prototype.runTask = function runTask(p) {
  var taskDef = p.taskDef;
  var count = p.count;
  var overrides = p.overrides;
  var startedBy = p.startedBy;
  var aws = p.aws;

  var taskGroup = this.__createTaskGroup({
    aws: aws,
    startedBy: startedBy,
    taskDef: taskDef,
    clusterArn: this.arn,
    containerInstanceArn: this.containerInstanceArn,
    taskIndex: this.taskCount++,
  });

  taskGroup.start()
  .then(function(p) {
    var tasks = p.tasks;
    var failures = p.failures;
    /* RunTask failures:
    RESOURCE:* (container instance ID)
      The resource or resources requested by the task are unavailable on the
      given container instance.  If the resource is CPU or memory, you may need
      to add container instances to your cluster.
    AGENT (container instance ID)
      The container instance that you attempted to launch a task onto has an
      agent which is currently disconnected. In order to prevent extended wait
      times for task placement, the request was rejected.
    ATTRIBUTE (container instance ID)
      Your task definition contains a parameter that requires a specific
      container instance attribute that is not available on your container
      instances. For more information on which attributes are required
      for specific task definition parameters and agent configuration
      variables, see Task Definition Parameters (p. 76) and Amazon ECS
      Container Agent Configuration (p. 63).
    */
    var i;
    var failureList = [];
    if (!!failures) {
      for (i = 0; i < failures.length; i++) {
        failureList.push({
          arn: this.containerInstanceArn,
          reason: failures[i],
        });
      }
    }

    return {
      failures: failureList,
      tasks,
    }
  });
};

Cluster.prototype.__createTaskGroup = function __createTaskGroup(p) {
  p.keepAlive = false;
  return new DockerProcessGroup(p);
};

Cluster.prototype.__createServiceGroup = function __createServiceGroup(p) {
  p.keepAlive = true;
  return new DockerProcessGroup(p);
};

// ==========================================================================

function DockerProcessGroup(p) {
  this.keepAlive = p.keepAlive;
  this.taskDef = p.taskDef;
  this.count = p.count,
  this.overrides = p.overrides;
  this.startedBy = p.startedBy;
  this.dockerTasks = [];
  this.taskIndex = p.taskIndex;
}


DockerProcessGroup.prototype.start = function start() {
  // Start each task as a combined docker-compose file.

  var ret = null;
  var index = 0;
  for (var i = 0; i < this.count; i++) {
    var dockerTask = createDockerTask({
      taskDef: this.taskDef,
      overrides: this.overrides,
      index: this.taskIndex + '_' + i,
      keepAlive: this.keepAlive,
    });
    this.dockerTasks.push(dockerTask);
    var q = dockerTask.start();
    if (!ret) {
      ret = q;
    } else {
      ret.then(function() { return q; });
    }
  }
  return ret.then(function() {
    // FIXME load the per-dockerTask state into a single object.
    return {
      failures: [],
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
    }
  });
};
