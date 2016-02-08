var express = require('express');

/**
 * Maps the route from the URL path to the service's ActionMap.
 */
module.exports = {
    '/sqs': require('./sqs'),
    '/sns': require('./sns')
};
