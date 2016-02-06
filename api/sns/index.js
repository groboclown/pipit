'use strict';

var express = require('express');
var router = express.Router();
var aws_common = require('../../lib/aws-common');
var psplit = require('../../lib/psplit');

router.post('/', aws_common.do({
    // --------------------------------------------------------------
    // The power
    
    Publish: function(req) {},

    // --------------------------------------------------------------
    // Topic management

    CreateTopic: function(req) {},

    DeleteTopic: function(req) {},

    GetTopicAttributes: function(req) {},

    ListTopics: function(req) {},

    SetTopicAttributes: function(req) {},

    // --------------------------------------------------------------
    // Topic subscriptions

    Subscribe: function(req) {},

    ConfirmSubscription: function(req) {},

    Unsubscribe: function(req) {},

    SetSubscriptionAttributes: function(req) {},

    GetSubscriptionAttributes: function(req) {},

    ListSubscriptions: function(req) {},

    ListSubscriptionsByTopic: function(req) {},

    // --------------------------------------------------------------
    // Permissions: ignored

    AddPermission: function(req) {
        // ignored
        return [200, {}];
    },

    RemovePermission: function(req) {
        // Ignore permissions
        return [200, {}];
    },

    // ------------------------------------------------------------
    // Platform Application support
    // Summary: not supported
    // TODO: allow for mock support, with injectible behavior per protocol type.

    CreatePlatformApplication: function(req) {
        // Platform applications are not supported
        return [500, 'Service', 'InternalFailure', 'applications not supported'];
    },

    CreatePlatformEndpoint: function(req) {
        // Platform applications are not supported
        return [500, 'Service', 'InternalFailure', 'applications not supported'];
    },

    GetPlatformApplicationAttributes: function(req) {
        // Platform applications are not supported.
        return [404, 'Sender', 'NotFound', 'applications not supported'];
    },

    ListEndpointsByPlatformApplication: function(req) {
        // Platform applications are not supported.
        return [404, 'Sender', 'NotFound', 'applications not supported'];
    },

    ListPlatformApplications: function(req) {
        // Platform applications are not supported.
        return [200, { PlatformApplications: null }];
    },

    SetPlatformApplicationAttributes: function(req) {
        // Platform applications are not supported.
        return [404, 'Sender', 'NotFound', 'applications not supported'];
    },

    DeleteEndpoint: function(req) {
        // Platform applications are not supported
        return [500, 'Service', 'InternalFailure', 'applications not supported'];
    },

    DeletePlatformApplication: function(req) {
        // Platform applications are not supported
        return [500, 'Service', 'InternalFailure', 'applications not supported'];
    },


    GetEndpointAttributes: function(req) {
        // Platform applications are not supported.
        return [404, 'Sender', 'NotFound', 'applications not supported'];
    },

    SetEndpointAttributes: function(req) {
        // Platform applications are not supported.
        return [404, 'Sender', 'NotFound', 'applications not supported'];
    }
}));



module.exports = router;
