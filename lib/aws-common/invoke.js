'use strict';

const injections = require('./injections');
const Q = require('q');

/**
 * Returns a promise that is called with the response from the action.
 */
module.exports = function(actionMap, aws) {
    // Support for REST style calls - they have a custom action '__REST__'
    var actionName = aws.action || '__REST__';
    var action = actionMap[actionName];
    if (! action) {
        actionName = aws.action || aws.requestUrl;
        return Q([400, 'Sender', 'InvalidAction', 'Unsupported action ' + actionName]);
    } else {
        aws.action = action.Action;
        var actionResponseHandler = function(responseList) {
            if (!! responseList) {
                // allow for after-operation injection, even if the before
                // injector returned a value.
                responseList = injections.invokeAfterFor(aws.serviceName, action.Action, aws, responseList);
            }
            return responseList;
        };

        console.log(":: Running action " + aws.action);
        var response = injections.invokeBeforeFor(aws.serviceName, action.Action, aws);
        if (!! response) {
            // short-circuit the action and the after-invoker.
            return Q(response);
        } else {
            // Not injected before action, so perform the API mockup.

            // The API mockup function should always return a promise.
            // For hysterical raisons, this is called 'LongPoll', though any
            // kind of function can be here.
            if (typeof action.LongPoll !== 'function') {
                throw new Error('No LongPoll function on ' + action.Action);
            }
            return action.LongPoll(aws)
                .then(actionResponseHandler);
        }
    }
};
