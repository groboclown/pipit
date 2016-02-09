'use strict';

const injections = require('./injections');
const Q = require('q');

/**
 * Returns a promise that is called with the response from the action.
 */
module.exports = function(actionMap, aws) {
    if (! actionMap[aws.action]) {
        return [400, 'Sender', 'InvalidAction', 'Unsupported action ' + aws.action];
    } else {
        var actionResponseHandler = function(responseList) {
            if (!! responseList) {
                // allow for after-operation injection, even if the before
                // injector returned a value.
                responseList = injections.invokeAfterFor(aws.serviceName, aws.action, aws, responseList);
            }
            return responseList;
        };

        console.log(":: Running action " + aws.action);
        var response = injections.invokeBeforeFor(aws.serviceName, aws.action, aws);
        if (!! response) {
            // short-circuit the action and the after-invoker.
            return Q(response);
        } else {
            // Not injected before action, so perform the API mockup.

            // The API mockup function should always return a promise.
            // For hysterical raisons, this is called 'LongPoll', though any
            // kind of function can be here.
            if (typeof actionMap[aws.action].LongPoll !== 'function') {
                throw new Error('No LongPoll function on ' + aws.action);
            }
            return actionMap[aws.action].LongPoll(aws)
                .then(actionResponseHandler);
        }
    }
};
