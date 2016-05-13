'use strict';

const Q = require('q');
const childProcess = require('child_process');
const stream = require('stream');
const util = require('util');

module.exports = function createDockerController() {
  return new DockerController();
};


function DockerController() {
  this.dockerExec = process.env.DOCKER_EXEC || 'docker';
  this.dockerExecOptions = {
    // ` shell: null,
  };
  this.dockerComposeExec = process.env.DOCKER_COMPOSE_EXEC || 'docker-compose';
}


DockerController.prototype._runDockerComposeColumns = function _runDockerComposeColumns(args) {
  return this._runDockerCompose(args, module.exports.__parseColumnarData);
}


DockerController.prototype._runDockerColumns = function _runDockerColumns(args) {
  return this._runDocker(args, module.exports.__parseColumnarData);
};


/**
 * @return {Q} promise with the result data from outputParser.
 */
DockerController.prototype._runDockerCompose = function _runDockerCompose(args, outputParser) {
  return this.__runCmd(this.dockerComposeExec, args, outputParser);
};


/**
 * @return {Q} promise with the result data from outputParser.
 */
DockerController.prototype._runDocker = function _runDocker(args, outputParser) {
  return this.__runCmd(this.dockerExec, args, outputParser);
};

/**
 * @return {Q} promise with the result data from outputParser.
 */
DockerController.prototype.__runCmd = function _runCmd(cmd, args, outputParser) {
  // Create the cmd forked job (execFile)
  // then send the stdout to outputParser.
  // If there is a problem with the execution (non-zero exit code), then
  // the stderr is sent in an error to the returned promise.

  var stderrStr = '';
  var stdoutStr = '';
  var ret = Q.defer();

  var child = childProcess.spawn(cmd, args, this.dockerExecOptions);
  child.stdout.on('data', function(data) {
    // ` console.log(`stdout: ${data}`);
    stdoutStr += data;
  });
  child.stderr.on('data', function(data) {
    // ` console.log(`stderr: ${data}`);
    stderrStr += data;
  });
  child.on('close', function(code) {
    try {
      // ` console.log(`${args}: ${code} -> [${stdoutStr}], [${stderrStr}]`);
      if (code !== 0) {
        return ret.reject(new Error(stderrStr));
      }
      var out = stdoutStr;
      if (!!outputParser) {
        out = outputParser(out);
      }
      ret.resolve(out);
    } catch (err) {
      ret.reject(err);
    }
  });
  return ret.promise;
};

/**
 * Split the data into each row having an object of the column -> value.
 * The name of the column is read from the first row.
 */
module.exports.__parseColumnarData = function __parseColumnarData(data) {
  data = data.replace('\r\n', '\n').replace('\r', '\n').replace('\n\n', '\n');
  var rows = data.split('\n');
  var ret = [];
  var headers = null;
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (!row || row.length <= 0) {
      continue;
    }
    if (!headers) {
      // Split by columns.  These are split appart by multiple spaces (more than 1).
      var start = 0;
      headers = [];
      var spaceCount = 0;
      var tabstop = false;
      for (var pos = 0; pos < row.length; pos++) {
        var c = row[pos];
        if (c === '\t') {
          // Tab counts as a column break
          spaceCount = 2;
          tabstop = true;
        } else if (c === ' ') {
          spaceCount++;
        } else if (c === '\n' || c === '\r') {
          // Shouldn't happen, but you know.
          throw new Error(`invalid character in row: ${c}`);
        } else {
          // Not a space character.
          if (spaceCount >= 2) {
            // More than one space between columns.
            headers.push({
              start: start,
              len: pos - start,
              name: row.substr(start, pos - start).trim(),
              tabstop: tabstop,
            });
            start = pos;
            tabstop = false;
          }
          spaceCount = 0;
        }
      }
      // Ended the row
      if (start < row.length && row.substr(start).trim().length > 0) {
        // End is an extra column
        headers.push({
          start: start,
          len: -1,
          tabstop: tabstop,
          name: row.substr(start).trim(),
        });
      }
    } else {
      // A normal row; we have the headers.
      var rowData = {};
      for (var col = 0; col < headers.length; col++) {
        var val = null;
        if (headers[col].tabstop) {
          rowData[headers[col].name] = row.split('\t')[col].trim();
        } else if (headers[col].len < 0) {
          rowData[headers[col].name] = row.substr(headers[col].start).trim();
        } else {
          rowData[headers[col].name] = row.substr(headers[col].start, headers[col].len).trim();
        }
      }
      ret.push(rowData);
    }
  }
  return ret;
};
