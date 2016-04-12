'use strict';

/**
 * Parameter splitting functions.
 *
 * These work off of a map that is passed in (usually `req.aws.params`).
 * They are used for splitting up inputs like "a.1.name.value=x" into a map
 * { a: { 1: { name: { value: "x" } } } }
 */

/** Splits the parameters into the aformentioned map. */
module.exports.split = function split(params) {
  var ret = {};
  var keys, cm, i;
  for (var k in params) {
    if (params.hasOwnProperty(k)) {
      keys = k.split(/\./);
      cm = ret;
      i = 0;
      for (; i < keys.length - 1; i++) {
        if (!cm[keys[i]]) {
          cm[keys[i]] = {};
        }
        cm = cm[keys[i]];
      }
      cm[keys[i]] = params[k];
    }
  }
  return ret;
};

/** Returns the parameter 'key', or if not defined, the default value */
// NOTE: cannot use "with" as the named function because it's a key word
module.exports.with = function(params, key, defaultValue) {
  return !!params.hasOwnProperty(key) ? params[key] : defaultValue;
};

/** Call the function with key, value for each parameter. */
module.exports.forEach = function forEach(params, func) {
  Object.keys(params).forEach(function callbackCaller(k) {
    func(k, params[k]);
  });
};

/** Returns the parameters "key.N", where N is an index starting with 1
(which will be transposed to index 0 in the returned array) */
module.exports.asKeyArray = function asKeyArray(params, key) {
  var ret = [];
  for (var i = 1; params.hasOwnProperty(key + '.' + i); i++) {
    ret.push(params[key + '.' + i]);
  }
  return ret;
};

module.exports.keyArrayForEach = function keyArrayForEach(params, key, func) {
  for (var i = 1; params.hasOwnProperty(key + '.' + i); i++) {
    func(params[key + '.' + i]);
  }
};

/** Simple "key.N.Name", "key.N.Value" translation into a map. */
module.exports.asKeyMap = function asKeyMap(params, key) {
  var ret = {};
  for (var i = 1; params.hasOwnProperty(key + '.' + i + '.Name'); i++) {
    ret[params[key + '.' + i + '.Name']] =
      params[key + '.' + i + '.Value'];
  }
  return ret;
};

module.exports.keyMapForEach = function keyMapForEach(params, key, func) {
  for (var i = 1; params.hasOwnProperty(key + '.' + i + '.Name'); i++) {
    func(params[key + '.' + i + '.Name'], params[key + '.' + i + '.Value']);
  }
};

// Base 1 index mapped to 0 in the returned array
module.exports.mapAsArray = function mapAsArray(map) {
  var ret = [];
  if (!!map) {
    for (var i = 1; !!map['' + i]; i++) {
      ret.push(map['' + i]);
    }
  }
  return ret;
};

module.exports.mapAsArrayForEach = function mapAsArrayForEach(map, func) {
  if (!!map) {
    for (var i = 1; !!map['' + i]; i++) {
      func(map['' + i]);
    }
  }
};
