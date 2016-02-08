'use strict';

const EventEmitter = require('events');
const util = require('util');


/**
 * A variation on an EventEmitter, but where it has a cache of
 * events that it stores for startup time.  Each time an "on" is registered,
 * the cached events are passed to it.
 *
 * Additionally, each "emit" will query whether it should be cached.
 */
function CachedEmitter(callbackMap) {
    EventEmitter.call(this);
    if (! callbackMap) {
        throw "must supply a callback map, otherwise this is just an expensive emitter";
    }
    this._callbackMap = callbackMap;
    this._cached = {};
}
util.inherits(CachedEmitter, EventEmitter);
module.exports = CachedEmitter;

CachedEmitter.prototype.emit = function() {
    var eventId = arguments[0];
    var values = [];
    for (var i = 0; i < arguments.length; i++) {
        values.push(arguments[i]);
    }
    if (this._shouldCache(eventId, values)) {
        this._updateCache(eventId, values);
    }
    this.constructor.super_.prototype.emit.apply(this, arguments);
};

CachedEmitter.prototype.on = function(eventId, cb) {
    if (!! this._cached[eventId]) {
        // pass all cached values to the callback.
        for (var i = 0; i < this._cached[eventId].length; i++) {
            console.log("[CachedEmitter] forced emit of " + this._cached[eventId][i]);
            cb.apply(this, this._cached[eventId][i]);
        }
    }
    this.constructor.super_.prototype.on.call(this, eventId, cb);
};

CachedEmitter.prototype._shouldCache = function(eventId, values) {
    if (!! this._callbackMap.shouldCache) {
        return this._callbackMap.shouldCache(eventId, values);
    }
    return true;
};

CachedEmitter.prototype._updateCache = function(eventId, values) {
    if (! this._cached[eventId]) {
        this._cached[eventId] = [];
    }
    if (!! this._callbackMap.updateCache) {
        return this._callbackMap.updateCache(this._cached[eventId], eventId, values);
    }
    this._cached[eventId].push(values);
};
