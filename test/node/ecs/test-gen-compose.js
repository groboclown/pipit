'use strict';

const assert = require('chai').assert;
const createComposeFile = require('../../../api/ecs/gen-compose.js');
const createTaskDef = require('../../../api/ecs/task-def.js');
const createDockerTask = require('../../../api/ecs/docker-task.js');

describe('gen-compose', function() {


  it('#createComposeText', function() {
    var taskDef = createTaskDef({
      family: 'TestFamily',
      genArnFunc: function() { return 'arn:' + arguments[0] + ':' + arguments[1]; },
      containerDefinitions: [
        {
          name: 'Web',
          command: ['a', 'b'],
          cpu: 10,
          disableNetworking: false,
          dnsSearchDomains: ['a.b.c'],
          dnsServers: ['8.8.8.8'],
          dockerLabels: {'web.com': 'Web'},
          dockerSecurityOptions: [],
          entryPoint: [],
          environment: [],
          essential: false,
          extraHosts: [{ hostname: 'abc', ipAddress: '1.2.3.4' }],
          hostname: 'c.d.e',
          image: 'my/image:latest',
          links: ['Web'],
          logConfiguration: {
            logDriver: 'ldd',
            options: {
              a: 'b',
            },
          },
          memory: 20,
          mountPoints: [],
          portMappings: [],
          privileged: false,
          readonlyRootFilesystem: false,
          ulimits: null,
          user: null,
          volumesFrom: null,
          workingDirectory: '/my/work/dir',
        },
      ],
    });
    var dockerTask = createDockerTask({
      taskDef: taskDef,
      overrides: [],
      index: '2_3',
      keepAlive: false,
    });
    var text = createComposeFile.__createComposeText({
      taskDef: dockerTask.taskDef,
      containers: dockerTask.containers,
    });
    assert.equal(
      text,
      'version: "2"\n' +
      'services:\n' +
      '  "' + dockerTask.containers[0].id + '":\n' +
      '    container_name: "' + dockerTask.containers[0].id + '"\n' +
      '    command: ["a","b"]\n' +
      '    dns_search:\n' +
      '      - "a.b.c"\n' +
      '    dns:\n' +
      '      - "8.8.8.8"\n' +
      '    labels:\n' +
      '      web.com: "' + dockerTask.containers[0].id + '"\n' +
      '    hostname: "c.d.e"\n' +
      '    image: "my/image:latest"\n' +
      '    links:\n' +
      '      - "' + dockerTask.containers[0].id + '"\n' +
      '    logging:\n' +
      '      driver: ldd\n' +
      '      options:\n' +
      '        a: "b"\n' +
      '    mem_limit: 20m\n' +
      '    working_dir: "/my/work/dir"\n' +
      '    restart: "no"\n');
  });
});
