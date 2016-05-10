'use strict';

const Q = require('q');

/**
 * Make all entries in the action map behave according to
 * the standard.  This allows for future optimizations to
 * API creation, without needing to rewrite all the old
 * APIs.
 */
module.exports = function NormalizeRoute(actionMap) {
  var ret = new RouteMap();
  for (var p in actionMap) {
    if (actionMap.hasOwnProperty(p)) {
      ret.addAction(p, actionMap[p], null);
    }
  }
  return ret;
};


/**
 * Normalizes several actionMaps, stripping off the first path of the URL if it
 * is a version path.  This will only map the API calls that have the given
 * version number.  The last items in the actionMapList will overwrite the
 * earlier entries in the actionMapList (those with the same operation name).
 */
module.exports.normalizeVersions = function NormalizeVersions(version, actionMapList) {
  var versionPrefix = '/' + version + '/';
  var ret = new RouteMap();
  for (var i = 0; i < actionMapList.length; i++) {
    var actionMap = actionMapList[i];
    for (var p in actionMap) {
      if (actionMap.hasOwnProperty(p)) {
        // Only move over the URLs that are in this specific version.
        ret.addAction(p, actionMap[p], versionPrefix);
      }
    }
  }
  return ret;
};


/**
* Generate a LongPoll invocation target.  This ensures that the
* returned object is a promise.  It also provides the function's "this" with
* a method called "defer", which creates a deferred promise.
*
* This function has 3 argument forms, either (func), (path, func), or
* (method, path, func).
*/
module.exports.normalizeAction = function NormalizeAction() {
  var args = parseRestArguments(arguments.length,
    arguments[0], arguments[1], arguments[2]);
  var ret = {
    UrlPath: args[1],
    Method: args[0],
    defer: function defer() {
      return Q.defer();
    },
    Action: null,
  };
  ret.LongPoll = function(aws) {
    var f = args[2].bind(ret);
    var r = f(aws);
    if (!r.then || !r.catch) {
      r = Q(r);
    }
    // DEBUG console.log(aws.action + ": returning ", r);
    return r;
  };

  return ret;
};


function RouteMap() {
  this.routes = [];
  this.actions = {};
  this.pre = [];
  this.split = {};
  this.errOutput = null;
  this.output = null;
}

RouteMap.prototype.addAction = function addAction(actionName, action, versionPrefix) {
  if ('processInput' === actionName) {
    if (typeof action === 'function') {
      this.pre = [ action ];
    } else {
      this.pre = action;
    }
  } else if ('processError' === actionName) {
    this.errOutput = action;
  } else if ('processOutput' === actionName) {
    this.output = action;
  } else {
    this.addRoute(actionName, action, versionPrefix);
  }
};

RouteMap.prototype.addRoute = function addRoute(actionName, action, versionPrefix) {
  var route;
  if (typeof action === 'function') {
    route = module.exports.normalizeAction(action);
  } else if (!!action.UrlPath && !!action.Method && !!action.LongPoll) {
    route = action;
  } else {
    throw new Error('Invalid action for ' + actionName + ': ' + action);
  }
  route.UrlPath = normalizeUrl(route.UrlPath);
  route.Method = route.Method.toUpperCase();
  route.Action = actionName;
  if (!!versionPrefix) {
    if (route.UrlPath.startsWith(versionPrefix)) {
      route.UrlPath = normalizeUrl(route.UrlPath.substr(versionPrefix.length));
    } else {
      // Invalid route: path is not in the version.
      return;
    }
  }
  this.routes.push(route);
  this.actions[actionName] = route;

  /*
   * Split the action map into [method] -> [path] -> [ActionName] = object,
   * so that each of the (method, path) pairs maps to an actionMap.
   *
   * The REST based actions are handled differently.  They
   * should be a 1-to-1 mapping between (method, urlpath)
   * and the action.
   */
  var lcm = route.Method.toLowerCase();
  if (!this.split[lcm]) {
    this.split[lcm] = {};
  }
  if (!this.split[lcm][route.UrlPath]) {
    this.split[lcm][route.UrlPath] = {};
    this.split[lcm][route.UrlPath][route.Action] = route;
    this.split[lcm][route.UrlPath].__REST__ = route;
  } else {
    this.split[lcm][route.UrlPath][route.Action] = route;
    // Not a possible REST api
    var p = this.split[lcm][route.UrlPath];
    delete p.__REST__;
  }
};


RouteMap.prototype.forEachMethodUrl = function forEachMethodUrl(func) {
  for (var method in this.split) {
    if (this.split.hasOwnProperty(method)) {
      for (var url in this.split[method]) {
        if (this.split[method].hasOwnProperty(url)) {
          func(method, url, this.split[method][url]);
        }
      }
    }
  }
};


function parseRestArguments(len, a0, a1, a2) {
  var pathForm = '/';
  var func = null;
  var method = 'POST';
  if (len === 1) {
    func = a0;
  } else if (len === 2) {
    pathForm = a0;
    func = a1;
  } else if (len === 3) {
    method = a0;
    pathForm = a1;
    func = a2;
  } else {
    throw new Error('Usage: takes 1, 2, or 3 arguments');
  }
  return [method, pathForm, func];
}


function normalizeUrl(url) {
  if (url === '/') {
    return url;
  }
  while (url.startsWith('/')) {
    url = url.substr(1);
  }
  url = '/' + url;
  while (url !== '/' && url.endsWith('/')) {
    url = url.substr(0, url.length - 1);
  }
  return url;
}
