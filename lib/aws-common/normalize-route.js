'use strict';

const Q = require('q');

/**
 * Make all entries in the action map behave according to
 * the standard.  This allows for future optimizations to
 * API creation, without needing to rewrite all the old
 * APIs.
 */
module.exports = function NormalizeRoute(actionMap) {
    var ret = {};
    for (var p in actionMap) {
        if (actionMap.hasOwnProperty(p)) {
            var action = actionMap[p];
            if (typeof action === 'function') {
                ret[p] = module.exports.normalizeAction(action);
            } else if (!! action.UrlPath && !! action.Method && !! action.LongPoll) {
                ret[p] = action;
            } else {
                throw new Error('Invalid action for ' + p + ': ' + action);
            }
            ret[p].UrlPath = normalizeUrl(ret[p].UrlPath);
            ret[p].Method = ret[p].Method.toUpperCase();
            ret[p].Action = p;
        }
    }
    return ret;
};


/**
 * Normalizes several actionMaps, stripping off the first path of the URL if it
 * is a version path.  This will only map the API calls that have the given version
 * number.  The last items in the actionMapList will overwrite the earlier
 * entries in the actionMapList (those with the same operation name).
 */
module.exports.normalizeVersions = function NormalizeVersions(version, actionMapList) {
    var versionPrefix = '/' + version + '/';
    var ret = {};
    var version = null;
    var actionMap = null;
    for (var i = 0; i < actionMapList.length; i++) {
        actionMap = module.exports(actionMapList[i]);
        for (var p in actionMap) {
            if (actionMap.hasOwnProperty(p)) {
                // Only move over the URLs that are in this specific version.
                if (actionMap[p].UrlPath && actionMap[p].UrlPath.startsWith(versionPrefix)) {
                    ret[p] = {
                        UrlPath: normalizeUrl(actionMap[p].UrlPath.substr(versionPrefix.length)),
                        Method: actionMap[p].Method,
                        LongPoll: actionMap[p].LongPoll,
                        Action: p,
                        defer: actionMap[p].defer
                    };
                }
            }
        }
    }
    return ret;
}


/**
 * Generate a LongPoll invocation target.  This ensures that the
 * returned object is a promise.  It also provides the function's "this" with
 * a method called "defer", which creates a deferred promise.
 *
 * This function has 3 argument forms, either (func), (path, func), or
 * (method, path, func).
 */
module.exports.normalizeAction = function NormalizeAction() {
    var args = parseRestArguments(arguments.length, arguments[0], arguments[1], arguments[2]);
    var ret = {
        UrlPath: args[1],
        Method: args[0],
        defer: function() {
            return Q.defer();
        },
        Action: null
    };
    ret.LongPoll = function(aws) {
        var f = args[2].bind(ret);
        var r = f(aws);
        if (! r.then || ! r.catch) {
            r = Q(r);
        }
        // console.log(aws.action + ": returning ", r);
        return r;
    };

    return ret;
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
