
'use strict';

var express = require('express');
var router = express.Router();
var aws_common = require('../../lib/aws-common');

// TODO add the url dependency
//const url = require('url');

const DEFAULT_SQS_VERSION = '';

var queueStore = {
    // Really, the "user id" for the queue should be a new value
    // per account key, but for simplicity it's easier to make it
    // a one-to-one mapping.

    get: function(userId, queueId) {
        if (this.has(userId, queueId)) {
            return _data[userId + '/' + queueId];
        }
        return null;
    },
    getByUrl: function(req, url) {
        if (url.startsWith(req.aws.baseUrl)) {
            return this._data[url.substr(req.aws.baseUrl.length)];
        }
        return null;
    },
    list: function() {
        var ret = [];
        for (var property in this._data) {
            if (this._data.hasOwnProperty(property) && !! this._data[property]) {
                ret.push(this._data[property]);
            }
        }
        return ret;
    },
    has: function(userId, queueId) {
        return !! this._data[userId + '/' + queueId];
    },
    create: function(userId, queueId) {
        this._data[userId + '/' + queueId] = new AwsQueue(userId, queueId);
        return this._data[userId + '/' + queueId];
    },
    delete: function(userId, queueId) {
        if (! this.has(userId, queueId)) {
            return false;
        }
        this._data[userId + '/' + queueId] = null;
        return true;
    },

    _data: {}
};

var AwsQueue = function(userId, queueId) {
    this.permissionLabels = {};
    this.userId = userId;
    this.queueId = queueId;
    this.attributes = {
        // TODO find actual defaults
        DelaySeconds: 0,
        MaximumMessageSize: 1024,
        MessageRetentionPeriod: 1000,
        Policy: {},
        ReceiveMessageWaitTimeSeconds: 20,
        VisibilityTimeout: 10
    };
};
AwsQueue.prototype.addPermission = function(label, action, accountId) {
    /* just ignore this for now
    if (! permissionLabels[label]) {
        permissionLabels[label] = {};
    }
    if (! permissionLabels[label][action]) {
        permissionLabels[label][action] = []
    }
    permissionLabels[label][action].push(accountId);
    */
};
AwsQueue.prototype.url = function(req) {
    return req.aws.baseUrl + this.userId + '/' + this.queueId;
};
AwsQueue.prototype.setAttribute = function(name, value) {
    if (this.attributes.hasOwnProperty(name)) {
        this.attributes[name] = value;
        return true;
    } else {
        return false;
    }
};

router.post('/', aws_common.do({
    GetQueueUrl: function(req, res, next) {
        var queueName = req.aws.param('QueueName', '');
        var accountOwner = req.aws.param('', req.aws.accessKey);
        var queue = queueStore.get(accountOwner, queueName);
        if (queue !== null) {
            return [200, { 'QueueUrl': queue.url(req) }];
        }
        return [404, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue',
            'Could not find queue ' + accountOwner + '/' + queueName];
    },


    ListQueues: function(req, res, next) {
        var prefix = req.aws.param('QueueNamePrefix', '');
        var ret = [];
        queueStore.list().forEach(function(queue) {
            if (queue.queueId.startsWith(prefix)) {
                ret.push(queue.url(req));
            }
        });
        return [200, { 'QueueUrl': ret }];
    },


    CreateQueue: function(req, res, next) {
        var name = req.aws.param('QueueName');
        if (queueStore.has(req.aws.accessKey, name)) {
            return [400, 'Sender', 'QueueAlreadyExists', 'Queue already exists ' +
                req.aws.accessKey + "/" + name];
        }
        // No check for "queue deleted recently": "You must wait 60 seconds after
        // deleting a queue before you can create another with the same name."

        var queue = queueStore.create(req.aws.accessKey, name);
        req.aws.paramMap('Attribute', function(key, value) {
            queue.setAttribute(key, value);
        });
        return [200, { 'QueueUrl': queue.url(req) }];
    },


    DeleteQueue: function(req, res, next) {
        // New API that passes the queue URL as a query string.
        var url = req.aws.param('QueueUrl');
        var queue = queueStore.getByUrl(req, url);
        if (!! queue) {
            if (queueStore.delete(queue.userId, queue.queueId)) {
                return [200, {}];
            }
        }
        return [404, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist ' +
            req.params.userid + '/' + req.params.queueid];
    }
}));

router.post('/:userid/:queueid', aws_common.do({
    AddPermission: function(req, res, next) {
        /* just ignore this for now
        var label = req.aws.param('Label', '');
        var accountIndex = 1;
        var accounts = [];
        while (!! req.query['AWSAccountId.' + accountIndex]) {
            accounts.push(req.query['AWSAccountId.' + accountIndex]);
            accountIndex++;
        }
        var actionIndex = 1;
        var actions = [];
        while (!! req.query(['ActionName.' + actionIndex])) {
            actions.push(req.query['ActionName.' + actionIndex]);
            actionIndex++;
        }
        ... set the permissions ...
        */
        return [200, {}];
    },

    DeleteQueue: function(req, res, next) {
        if (queueStore.delete(req.params.userid, req.params.queueid)) {
            return [200, {}];
        } else {
            return [404, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist ' +
                req.params.userid + '/' + req.params.queueid];
        }
    }
}));

/*
router.get('/:userid/:queueid', aws_common.do({

}));
function(req, res, next) {
    if (! queueStore[req.params.userid + '/' + req.params.queueid]) {
        return aws_common.with_error(req, res, 404, 'Sender',
            'AWS.SimpleQueueService.NonExistentQueue',
            'Could not find queue ' + req.params.userid + '/' + req.params.queueid);
    }

});
*/

module.exports = router;
