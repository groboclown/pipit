'use strict';

const assert = require('chai').assert;
const createComposeFile = require('../../../api/ecs/gen-compose.js');
const createTaskDef = require('../../../api/ecs/task-def.js');

describe('gen-compose', function() {


  it('#createComposeText', function() {
    var taskDef = createTaskDef({
      family: 'TestFamily',
      genArnFunc: function() { return 'arn:' + arguments[0] + ':' + arguments[1]; },
      containerDefinitions: [
        {
          name: 'Web 1',
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
          links: ['DB'],
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
    var text = createComposeFile.__createComposeText({
      taskDef: taskDef,
      override: {},
      index: 1,
      keepAlive: false,
    });
    assert.equal(
      text,
      'version: "2"\n' +
      'services:\n' +
      '  "Web 1_1"\n' +
      '    container_name: "Web 1_1"\n' +
      '    command: ["a","b"]\n' +
      '    dns_search:\n' +
      '      - "a.b.c"\n' +
      '    dns:\n' +
      '      - "8.8.8.8"\n' +
      '    labels:\n' +
      '      web.com: "Web_1"\n' +
      '    hostname: "c.d.e"\n' +
      '    image: "my/image:latest"\n' +
      '    links:\n' +
      '      - "DB_1"\n' +
      '    logging:\n' +
      '      driver: ldd\n' +
      '      options:\n' +
      '        a: "b"\n' +
      '    mem_limit: 20m\n' +
      '    working_dir: "/my/work/dir"\n' +
      '    restart: no\n');
  });
});
