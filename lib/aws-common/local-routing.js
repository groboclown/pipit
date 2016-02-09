'use strict';

/**
 * Calls into the AWS action map based on the API invoked
 */
module.exports = function(actionMap) {
    return function(awsSrc, params, callback) {
        // FIXME call the right function off of the action map.
        // The action map return value should be a promise.

        // if (actionMap[])

        var ret = null;

        if (ret[0] >= 400) {
            // return the error object
            return {
                code: ret[2], message: ret[3]
            };
        } else {
            // return the data
            return ret[1];
        }
    };
};
