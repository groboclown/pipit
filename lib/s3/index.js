'use strict';

/**
 * Common API for the AWS emulation to translate local paths to and from the
 * mocked AWS s3 path.
 */

const path = require('path');
const jsonWatch = require('../json-watch');
const lambdas = require('../lambdas');
const yauzl = require('yauzl');
const mkdirp = require('mkdirp');
const fs = require('fs');
const Q = require('q');

module.exports.defaultS3Dir = path.join(jsonWatch.jsonExtensionDir, 's3');

var S3Bucket = function(bucketName, localDir) {
  this.bucketName = bucketName;
  this.localDir = localDir;
  this.monitor = null;
};
S3Bucket.prototype.getLocalPath = function getLocalPath(subdir) {
  return path.join(this.localDir, subdir);
};


module.exports.s3Buckets = {};

/**
 * @return 1 if the bucket already exists, 2 if the bucket name is invalid,
 *      0 if there is no problem.
 */
module.exports.addBucket = function addBucket(bucketName, localDirName) {
  if (!!module.exports.s3Buckets[bucketName]) {
    return 1;
  }
  // TODO check bucket name format.

  if (!localDirName) {
    localDirName = path.join(module.exports.defaultS3Dir, bucketName);
  }
  module.exports.s3Buckets[bucketName] = new S3Bucket(bucketName, localDirName);
  return 0;
};

module.exports.removeBucket = function removeBucket(bucketName) {
  if (!module.exports.s3Buckets[bucketName]) {
    return 1;
  }
  delete module.exports.s3Buckets[bucketName];
  return 0;
};


/**
 * @return the local file path of the s3 path, or null if the bucket
 *  doesn't exist.
 */
module.exports.toLocalPath = function toLocalPath(s3Path) {
  if (s3Path.startsWith('file:')) {
    return s3Path.substr(5);
  }
  if (s3Path.startsWith('s3://')) {
    s3Path = s3Path.substr(5);
  }
  while (s3Path.startsWith('/')) {
    s3Path = s3Path.substr(1);
  }
  if (!s3Path || s3Path.length <= 0) {
    return null;
  }
  var pos = s3Path.indexOf('/');
  var bucket;
  var path;
  if (pos < 0) {
    bucket = module.exports.s3Buckets[s3Path];
    path = '.';
  } else {
    bucket = module.exports.s3Buckets[s3Path.substr(0, pos)];
    path = s3Path.substr(pos + 1);
  }
  if (!bucket) {
    // Unknown bucket
    return null;
  }
  return bucket.getLocalPath(path);
};


/**
 * @return a Q promise.  The value will be the local directory it
 *      was extracted into.
 */
module.exports.unzip = function unzip(s3Path) {
  var localPath = module.exports.toLocalPath(s3Path);
  if (!localPath) {
    return Q.reject(new Error('invalid s3 path ' + s3Path));
  }
  var outdir = localPath + '.tmp-unzipped.d';
  var deferred = Q.defer();
  yauzl.open(localPath, {lazyEntries: true}, function o1(err, zipfile) {
    if (!!err) {
      console.log(`[s3] unzip open file: ${err.message}\n${err.stack}`);
      deferred.reject(err);
      return;
    }
    zipfile.readEntry();
    zipfile.on('entry', function o2(entry) {
      if (/\/$/.test(entry.fileName)) {
        // Directory file names end with '/'
        mkdirp(path.join(outdir, entry.fileName), function(err) {
          if (!!err) {
            console.log(`[s3] unzip mkdirp: ${err.message}\n${err.stack}`);
            deferred.reject(err);
          } else {
            zipfile.readEntry();
          }
        });
      } else {
        // File entry
        zipfile.openReadStream(entry, function(err, readStream) {
          if (!!err) {
            console.log(`[s3] unzip reading stream: ${err.message}\n${err.stack}`);
            deferred.reject(err);
            return;
          }
          // Ensure parent directory exists
          mkdirp(path.join(outdir, path.dirname(entry.fileName)), function(err) {
            if (!!err) {
              console.log(`[s3] unzip mkdirp: ${err.message}\n${err.stack}`);
              deferred.reject(err);
              return;
            }
            readStream.pipe(fs.createWriteStream(path.join(outdir, entry.fileName)));
            readStream.on('end', function() {
              zipfile.readEntry();
            });
            readStream.on('error', function(err) {
              console.log(`[s3] unzip reading stream: ${err.message}\n${err.stack}`);
              deferred.reject(err);
            });
          });
        });
      }
    });
    zipfile.on('error', function(err) {
      console.log(`[s3] unzip: ${err.message}\n${err.stack}`);
      deferred.reject(err);
    });
    zipfile.on('end', function() {
      deferred.resolve(outdir);
    });
  });
  return deferred.promise;
};


module.exports.monitorExtensionsDir = function monitorExtensionsDir(localDir) {
  if (!!watchedDirs[localDir]) {
    return;
  }
  var dirWatcher = jsonWatch.createJsonEmitter(localDir);
  dirWatcher
    .on('add', function(filepath) {
      module.exports.updateJsonExtension(filepath);
    })
    .on('change', function(filepath) {
      module.exports.updateJsonExtension(filepath);
    })
    .on('unlink', function(filepath) {
      module.exports.removeJsonExtension(filepath);
    });
  watchedDirs[localDir] = dirWatcher;
};

var watchedDirs = {};

module.exports.updateJsonExtension = function updateJsonExtension(filepath) {
  if (!jsonWatched[filepath]) {
    var text = '';
    fs.createReadStream(filepath)
      .on('data', function(chunk) {
        text += chunk;
      })
      .on('end', function() {
        var obj = null;
        try {
          obj = JSON.parse(text);
        } catch (e) {
          // Ignore
          obj = null;
        }
        if (!!obj && !!obj.lambdas && obj.s3.length > 0) {
          jsonWatched[filepath] = obj.s3;
          for (var i = 0; i < obj.s3.length; i++) {
            var name = obj.s3[i].name;
            var path = obj.s3[i].path;
            module.exports.addBucket(name, path);
          }
        }
      });
  }
};

module.exports.removeJsonExtension = function removeJsonExtension(filepath) {
  if (!!jsonWatched[filepath]) {
    for (var i = 0; i < jsonWatched[filepath].length; i++) {
      module.exports.removeBucket(jsonWatched[filepath][i].name);
    }
    delete jsonWatched[filepath];
  }
};

var jsonWatched = {};
