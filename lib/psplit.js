'use strict';

/**
 * Parameter splitting functions.
 *
 * These work off of a map that is passed in (usually `req.aws.params`).
 * They are used for splitting up inputs like "a.1.name.value=x" into a map
 * { a: { 1: { name: { value: "x" } } } }
 */

var psplit = {
    /** splits the parameters into the aformentioned map. */
    split: function(params) {
        var ret = {};
        var keys, cm, i;
        for (var k in params) {
            if (params.hasOwnProperty(k)) {
                keys = k.split(/\./);
                cm = ret;
                i = 0;
                for (; i < keys.length - 1; i++) {
                    if (! cm[keys[i]]) {
                        cm[keys[i]] = {};
                    }
                    cm = cm[keys[i]];
                }
                cm[keys[i]] = params[k];
            }
        }
        return ret;
    },

    /** returns the parameter 'key', or if not defined, the default value */
    with: function(params, key, defaultValue) {
        return !! params.hasOwnProperty(key) ? params[key] : defaultValue;
    },

    /** call the function with key, value for each parameter. */
    forEach: function(params, func) {
        Object.keys(params).forEach(function (k) {
            func(k, params[k]);
        });
    },

    /** returns the parameters "key.N", where N is an index starting with 1
    (which will be transposed to index 0 in the returned array) */
    asKeyArray: function(params, key) {
        var ret = [];
        for (var i = 1; params.hasOwnProperty(key + '.' + i); i++) {
            ret.push(params[key + '.' + i]);
        }
        return ret;
    },

    keyArrayForEach: function(params, key, func) {
        for (var i = 1; params.hasOwnProperty(key + '.' + i); i++) {
            func(params[key + '.' + i]);
        }
    },

    /** Simple "key.N.Name", "key.N.Value" translation into a map. */
    asKeyMap: function(params, key) {
        var ret = {};
        for (var i = 1; params.hasOwnProperty(key + '.' + i + '.Name'); i++) {
            ret[params[key + '.' + i + '.Name']] =
                params[key + '.' + i + '.Value'];
        }
        return ret;
    },

    keyMapForEach: function(params, key, func) {
        for (var i = 1; params.hasOwnProperty(key + '.' + i + '.Name'); i++) {
            func(params[key + '.' + i + '.Name'], params[key + '.' + i + '.Value']);
        }
    },

    // base 1 index mapped to 0 in the returned array
    mapAsArray: function(map) {
        var ret = [];
        if (!! map) {
            for (var i = 1; !! map['' + i]; i++) {
                ret.push(map['' + i]);
            }
        }
        return ret;
    },

    mapAsArrayForEach: function(map, func) {
        if (!! map) {
            for (var i = 1; !! map['' + i]; i++) {
                func(map['' + i]);
            }
        }
    }

};


module.exports = psplit;
