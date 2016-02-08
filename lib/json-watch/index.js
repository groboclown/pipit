'use strict';

// TODO:
//   This needs to be the general extensions library.
// TO FIX:
//   The `createJsonDirEmitter` needs to return just an emitter.  It
//   needs to keep just a single JsonDirEmitter, and not take any parameters.
//   When called, it will have the "start", "close", and "on" methods.  The
//   Emitter needs to keep track of what active JSon files are being monitored,
//   and pass those to the "on" when "start" is called.


const fs = require('fs');
const path = require('path');
const util = require('util');
const chokidar = require('chokidar');
const CachedEmitter = require('../cachedEmitter');
const EventEmitter = require('events');


/**
 * Returns a JSON file event emitter for the extensions directory.
 * This emits the 'add', 'change', and 'unlink' events with the
 * json file name as the argument.
 */
exports.createJsonEmitter = function(dirname) {
    for (var d in jsonDirsUnderWatch) {
        if (jsonDirsUnderWatch.hasOwnProperty(d) &&
                // if the relative path between d and dirname starts with '..',
                // then that means that to go from d to dirname requires going
                // up a directory, so therefore dirname is not a subdirectory
                // of d.  If the opposite is true (it does not start with '..'),
                // then dirname is a subdirectory, and is also being watched.
                ! path.relative(d, dirname).startsWith('..')) {
            return jsonDirsUnderWatch[d].watchDir(dirname);
        }
    }
    // No match.  Note that this means that if a future directory which is a
    // parent to dirname is registered, then there's that overlap and waste
    // of resources.  But there's not much to do in this situation; we don't
    // want to monitor the world.
    // However, we know that the extensions dir is commonly used, so watch
    // that if possible.
    if (! path.relative(exports.jsonExtensionDir, dirname).startsWith('..')) {
        // watch the extensions dir instead of the sub directory.
        var ret = new JsonWatcher(exports.jsonExtensionDir, exports.watchParams);
        jsonDirsUnderWatch[exports.jsonExtensionDir] = ret;
        return ret.watchDir(dirname);
    }
    // use the passed-in directory as the directory to watch.
    var ret = new JsonWatcher(dirname, exports.watchParams);
    jsonDirsUnderWatch[exports.jsonExtensionDir] = ret;
    return ret.watchDir(dirname);
};

exports.watchJsFile = function(filename, params) {
    if (! jsFilesUnderWatch[filename]) {
        jsFilesUnderWatch[filename] = new JsWatcher(filename, params);
    }
    return jsFilesUnderWatch[filename].watch();
};

exports.unwatchJsFile = function(filename) {
    if (!! jsFilesUnderWatch[filename]) {
        jsFilesUnderWatch[filename].unwatch();
    }
};

exports.watchParams = {
    onNetwork: false
};

exports.jsonExtensionDir = !! process.env.PIPIT_EXTENSIONS
    ? process.env.PIPIT_EXTENSIONS
    : './extensions';


/** A mapping between the file path and the JsWatcher.  These are in a global
space, to reduce overhead if multiple Json files reference the same Javascript file. */
var jsFilesUnderWatch = {};

var jsonDirsUnderWatch = {};


/**
 * Watches for JSON files to be updated or added or removed.  This allows
 * for keeping track of registration of extension points that can be
 * dynamically updated.  Each json file may describe a javascript file
 * that it uses as an extension point code.  Those javascript files themselves
 * can be monitored, which will generate an event when the file is updated.
 *
 * This emits events ('add', 'change', 'unlink') that
 * correspond to json files being added or removed.
 *
 * Once the watcher is constructed in your code, you
 * need to run the "start" method, which will begin processing
 * existing files (sending "add" events).
 *
 * When you want to start monitoring a .js file,
 */
function JsonWatcher(dirname, params) {
    if (! params) {
        params = {};
    }
    this.params = params;
    this.onNetwork = !! params.onNetwork;
    this.ext = params.hasOwnProperty('ext') ? params.ext : 'json';
    this.dirname = dirname;
    this.watchingJs = [];
    this.emitter = new CachedEmitter({
        // by default, all events will update the cache.
        updateCache: function(cacheList, eventId, filepath) {
            if (eventId === 'unlink') {
                // remove the filepath from the cache list
                for (var i = 0; i < cacheList.length; i++) {
                    if (cacheList[i] === filepath) {
                        cacheList[i].splice(i, 1);
                        break;
                    }
                }
            } else if (eventId === 'add' || eventId === 'change') {
                // add to the filepath list.
                cacheList.push(filepath);
            }
        }
    });

    var t = this;

    // Gather the initial set of files.  Deep, deep callback recursion here.
    function onDirList(baseDir) {
        fs.readdir(baseDir, function(err, files) {
            if (!! err) {
                // this is usually a "directory not found" error.
                console.log("[JsonWatch] " + err);
                return;
            }
            // this is called async.
            for (var i = 0; i < files.length; i++) {
                var filepath = path.resolve(path.join(baseDir, files[i]));
                fs.stat(filepath, function(err, stats) {
                    if (!! err) {
                        // FIXME elegantly handle the error
                        throw err;
                    }
                    if (stats.isDirectory()) {
                        onDirList(filepath);
                    } else if (stats.isFile() && filepath.endsWith('.' + t.ext)) {
                        // console.log("[JsonWatch] initializing emitter with " + filepath);
                        t.emitter.emit('add', filepath);
                    }
                });
            }
        });
    }
    onDirList(t.dirname);
    t.watcher = chokidar.watch(t.dirname, {
        persistent: true,
        usePolling: !! t.onNetwork,
        awaitWriteFinish: true,
        followSymlinks: true
    });
    t.watcher
        .on('add', function(filepath) {
            // "ignore" parameter doesn't seem to always work.
            if (filepath.endsWith(t.ext)) {
                // console.log('[JsonWatch] add ' + filepath);
                t.emitter.emit('add', path.resolve(filepath));
            }
        })
        .on('change', function(path) {
            if (filepath.endsWith(t.ext)) {
                // console.log('[JsonWatch] change ' + filepath);
                t.emitter.emit('change', path.resolve(filepath));
            }
        })
        .on('unlink', function(path) {
            if (filepath.endsWith(t.ext)) {
                // console.log('[JsonWatch] unlink ' + filepath);
                t.emitter.emit('unlink', path.resolve(filepath));
            }
        });
};
JsonWatcher.prototype.close = function() {
    if (this.watcher === null) {
        return;
    }
    this.watcher.close();
    for (var i = 0; i < this.watchingJs.length; i++) {
        jsonWatch.unwatchJsFile(this.watchingJs[i]);
    }
    this.watchingJs = [];
    this.watcher = null;
};
JsonWatcher.prototype.watchDir = function(dirname) {
    if (path.relative(this.dirname, dirname).startsWith('..')) {
        throw dirname + " is not a subdirectory of " + this.dirname;
    }
    return new JsonFileWatcher(dirname, this.emitter);
};


function JsonFileWatcher(dirname, realEmitter) {
    this.dirname = dirname;
    this.emitter = realEmitter;
}
JsonFileWatcher.prototype.on = function(eventId, callback) {
    var t = this;
    this.emitter.on(eventId, function(filepath) {
        if (! path.relative(t.dirname, filepath).startsWith('..')) {
            // the filepath is under this directory
            callback(filepath);
        }
    });
    return this;
}


/**
 * Watches a single Javascript file.  When changed, it is reloaded.
 * Delete notices are ignored (it isn't reloaded, and the listener's aren't
 * alerted).
 */
function JsWatcher(filename, params) {
    if (!! jsFilesUnderWatch[filename]) {
        throw "already registered a watcher for " + filename;
    }
    // console.log("[JsWatcher] monitoring " + filename);
    this.monitoredFile = filename;
    this.referenceCount = 0;
    if (! params) {
        params = {};
    }
    this.params = params;
    this.watcher = null;
    this.emitter = new JsWatcherEmitter();
    this.module = null;

    // preload the module, if the file already exists
    var t = this;
    // console.log("[JsWatcher] Monitoring JS file " + filename);
    fs.access(filename, fs.R_OK, function(err) {
        if (! err) {
            t.module = require(filename);
        }
    });
};
JsWatcher.prototype.watch = function() {
    this.referenceCount++;
    if (this.watcher === null) {
        var t = this;
        t.watcher = chokidar.watch(t.monitoredFile, {
            // ignore everything that isn't a .json file
            persistent: true,
            usePolling: !! t.params.onNetwork,
            awaitWriteFinish: true,
            followSymlinks: true
        });

        t.watcher.on('add', function(path) {
                // reload the module.
                delete require.cache[require.resolve(t.monitoredFile)]
                t.module = require(t.monitoredFile);
                // console.log("[JsWatcher] add " + path);
                t.emitter.emit('update', t.monitoredFile, t.module);
            })
            .on('change', function(path) {
                // reload the module.
                delete require.cache[require.resolve(t.monitoredFile)]
                t.module = require(t.monitoredFile);
                // console.log("[JsWatcher] change " + path);
                t.emitter.emit('update', t.monitoredFile, t.module);
            });
            // do not monitor "unlink"
    }
    return [ this.module, this.emitter ];
};
JsWatcher.prototype.unwatch = function() {
    this.referenceCount--;
    if (this.referenceCount <= 0) {
        this.close();
    }
};
JsWatcher.prototype.close = function() {
    this.referenceCount = 0;
    delete jsFilesUnderWatch[this.monitoredFile];
    if (this.watcher !== null) {
        this.watcher.close();
        this.watcher = null;
    }
};

function JsWatcherEmitter() {
    EventEmitter.call(this);
}
util.inherits(JsWatcherEmitter, EventEmitter);
