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
const EventEmitter = require('events');
const util = require('util');
const chokidar = require('chokidar');

var jsonWatch = {
    createJsonDirEmitter: function(dirname, params) {
        return new JsonWatcher(dirname, params);
    },
    watchJsFile: function(filename, params) {
        if (! jsFilesUnderWatch[filename]) {
            jsFilesUnderWatch[filename] = new JsWatcher(filename, params);
        }
        return jsFilesUnderWatch[filename].watch();
    },
    unwatchJsFile: function(filename) {
        if (!! jsFilesUnderWatch[filename]) {
            jsFilesUnderWatch[filename].unwatch();
        }
    }
};


/** A mapping between the file path and the JsWatcher.  These are in a global
space, to reduce overhead if multiple Json files reference the same Javascript file. */
var jsFilesUnderWatch = {};

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
    EventEmitter.call(this);
    if (! params) {
        params = {};
    }
    this.params = params;
    this.onNetwork = !! params.onNetwork;
    this.ext = params.hasOwnProperty('ext') ? params.ext : 'json';
    this.dirname = dirname;
    this.watcher = null;
    this.watchingJs = [];
}
util.inherits(JsonWatcher, EventEmitter);
JsonWatcher.prototype.start = function() {
    if (this.watcher !== null) {
        // ignore
        return;
    }
    var t = this;
    // Gather the initial set of files
    fs.readdir(t.dirname, function(err, files) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].endsWith('.' + t.ext)) {
                // console.log("[JsonWatcher] found " + path.join(t.dirname, files[i]))
                t.emit('add', path.join(t.dirname, files[i]));
            }
        }
    });

    t.watcher = chokidar.watch(t.dirname, {
        // ignore everything that isn't a .json file
        ignored: new RegExp("/^(?!.*\\." + t.ext + "$).+$"),
        persistent: true,
        usePolling: !! t.onNetwork,
        awaitWriteFinish: true,
        followSymlinks: true
    });

    t.watcher
        .on('add', function(path) {
            // ignore doesn't seem to always work.
            if (path.endsWith(t.ext)) {
                // console.log("[JsonWatcher] add " + path);
                t.emit('add', path);
            }
        })
        .on('change', function(path) {
            if (path.endsWith(t.ext)) {
                // console.log("[JsonWatcher] change " + path);
                t.emit('change', path);
            }
        })
        .on('unlink', function(path) {
            if (path.endsWith(t.ext)) {
                // console.log("[JsonWatcher] unlink " + path);
                t.emit('unlink', path);
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
/**
 * Given a JavaScript file name, this returns the [module, update emitter] pair
 * to monitor the activity of the file.  The module may be null if the file doesn't
 * yet exist.  The update emitter will emit an 'update' event when the file is either
 * added (created, or recreated if it was deleted), or the contents are changed;
 * no update event will be sent if the file is deleted.  The update event will pass
 * the parameters (filename, module).
 */
JsonWatcher.prototype.watchJs = function(filename) {
    return jsonWatch.watchJsFile(filename, this.params);
};



/**
 * Watches a single Javascript file.  When changed, it is reloaded.
 * Delete notices are ignored (it isn't reloaded, and the listener's aren't
 * alerted).
 */
function JsWatcher(filename, params) {
    if (!! jsFilesUnderWatch[filename]) {
        throw new Exception("already registered a watcher for " + filename);
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



module.exports = jsonWatch;
