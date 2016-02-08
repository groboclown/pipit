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

            // Allow for long poll in the mockup; it's a special object
            // that returns a promise.
            if (!! actionMap[aws.action].LongPoll) {
                return actionMap[aws.action].LongPoll(aws)
                    .then(actionResponseHandler);
            }

            // Return a promise that is the immediate call.
            response = actionMap[aws.action](aws);
            return Q(actionResponseHandler(response));
        }
    }
};
