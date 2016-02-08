'use strict';

var express = require('express');
var router = express.Router();
var aws_common = require('../../lib/aws-common');
var psplit = require('../../lib/psplit');

// --------------------------------------------------------------
// The power

module.exports.Publish = function(aws) {};

// --------------------------------------------------------------
// Topic management

module.exports.CreateTopic = function(aws) {};

module.exports.DeleteTopic = function(aws) {};

module.exports.GetTopicAttributes = function(aws) {};

module.exports.ListTopics = function(aws) {};

module.exports.SetTopicAttributes = function(aws) {};

// --------------------------------------------------------------
// Topic subscriptions

module.exports.Subscribe = function(aws) {};

module.exports.ConfirmSubscription = function(aws) {};

module.exports.Unsubscribe = function(aws) {};

module.exports.SetSubscriptionAttributes = function(aws) {};

module.exports.GetSubscriptionAttributes = function(aws) {};

module.exports.ListSubscriptions = function(aws) {};

module.exports.ListSubscriptionsByTopic = function(aws) {};

// --------------------------------------------------------------
// Permissions: ignored

module.exports.AddPermission = function(aws) {
    // ignored
    return [200, {}];
};

module.exports.RemovePermission = function(aws) {
    // Ignore permissions
    return [200, {}];
};

// ------------------------------------------------------------
// Platform Application support
// Summary: not supported
// TODO: allow for mock support, with injectible behavior per protocol type.

module.exports.CreatePlatformApplication = function(aws) {
    // Platform applications are not supported
    return [500, 'Service', 'InternalFailure', 'applications not supported'];
};

module.exports.CreatePlatformEndpoint = function(aws) {
    // Platform applications are not supported
    return [500, 'Service', 'InternalFailure', 'applications not supported'];
};

module.exports.GetPlatformApplicationAttributes = function(aws) {
    // Platform applications are not supported.
    return [404, 'Sender', 'NotFound', 'applications not supported'];
};

module.exports.ListEndpointsByPlatformApplication = function(aws) {
    // Platform applications are not supported.
    return [404, 'Sender', 'NotFound', 'applications not supported'];
};

module.exports.ListPlatformApplications = function(aws) {
    // Platform applications are not supported.
    return [200, { PlatformApplications: null }];
};

module.exports.SetPlatformApplicationAttributes = function(aws) {
    // Platform applications are not supported.
    return [404, 'Sender', 'NotFound', 'applications not supported'];
};

module.exports.DeleteEndpoint = function(aws) {
    // Platform applications are not supported
    return [500, 'Service', 'InternalFailure', 'applications not supported'];
};

module.exports.DeletePlatformApplication = function(aws) {
    // Platform applications are not supported
    return [500, 'Service', 'InternalFailure', 'applications not supported'];
};


module.exports.GetEndpointAttributes = function(aws) {
    // Platform applications are not supported.
    return [404, 'Sender', 'NotFound', 'applications not supported'];
};

module.exports.SetEndpointAttributes = function(aws) {
    // Platform applications are not supported.
    return [404, 'Sender', 'NotFound', 'applications not supported'];
};
