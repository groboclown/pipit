'use strict';

const assert = require('chai').assert;
const createDockerController = require('../../../lib/docker');

describe('Column read', function() {
  var dockerController = createDockerController();

  it('spaces', function() {
    var input =
      'REPOSITORY                        TAG                 IMAGE ID            CREATED             SIZE\n' +
      '<none>                            <none>              3bfdb24c1a0a        7 weeks ago         196.6 MB\n' +
      'elk                               latest              06f8983a09b8        7 weeks ago         622.5 MB\n' +
      't1                                latest              3081284a70e2        7 weeks ago         11.59 MB\n' +
      '<none>                            <none>              e92064012e1a        7 weeks ago         11.59 MB\n';
    var data = createDockerController.__parseColumnarData(input);
    assert.deepEqual(data,
      [
        {
          REPOSITORY: '<none>',
          TAG: '<none>',
          'IMAGE ID': '3bfdb24c1a0a',
          CREATED: '7 weeks ago',
          SIZE: '196.6 MB',
        },
        {
          REPOSITORY: 'elk',
          TAG: 'latest',
          'IMAGE ID': '06f8983a09b8',
          CREATED: '7 weeks ago',
          SIZE: '622.5 MB',
        },
        {
          REPOSITORY: 't1',
          TAG: 'latest',
          'IMAGE ID': '3081284a70e2',
          CREATED: '7 weeks ago',
          SIZE: '11.59 MB',
        },
        {
          REPOSITORY: '<none>',
          TAG: '<none>',
          'IMAGE ID': 'e92064012e1a',
          CREATED: '7 weeks ago',
          SIZE: '11.59 MB',
        },
      ]);
  });

  it('images', function(done) {
    var q = dockerController._runDockerColumns(['images']);
    q.then(function(rows) {
      console.log(`result: ${JSON.stringify(rows)}`);
      done();
    })
    .catch(function(err) {
      console.log(`error: ${err.message}\n${err.stack}`);
      throw err;
    });
  });
});
