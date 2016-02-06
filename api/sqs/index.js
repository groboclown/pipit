'use strict';

var express = require('express');
var router = express.Router();
var aws_common = require('../../lib/aws-common');
var uuid = require('uuid'); // FIXME eliminate this extra dependency
var psplit = require('../../lib/psplit');
var AWSQueue = require('./inbox');
var Q = require('q');

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
        this._data[userId + '/' + queueId] = new AWSQueue(userId, queueId);
        return this._data[userId + '/' + queueId];
    },
    delete: function(userId, queueId) {
        if (! this.has(userId, queueId)) {
            return false;
        }
        delete this._data[userId + '/' + queueId];
        return true;
    },
    deleteByUrl: function(req, url) {
        if (url.startsWith(req.aws.baseUrl)) {
            if (!! this._data[url.substr(req.aws.baseUrl.length)]) {
                delete this._data[url.substr(req.aws.baseUrl.length)];
                return true;
            }
        }
        return false;
    },

    _data: {}
};


router.post('/', aws_common.do({
    GetQueueUrl: function(req) {
        var queueName = req.aws.params.QueueName;
        var accountOwner = psplit(req.aws.params, 'QueueOwnerAWSAccountId', req.aws.accessKey);
        var queue = queueStore.get(accountOwner, queueName);
        if (queue !== null) {
            return [200, { 'QueueUrl': queue.url(req) }];
        }
        return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue',
            'Could not find queue ' + accountOwner + '/' + queueName];
    },


    ListQueues: function(req) {
        var prefix = psplit.with(req.aws.params, 'QueueNamePrefix', '');
        var ret = [];
        queueStore.list().forEach(function(queue) {
            if (queue.queueId.startsWith(prefix)) {
                ret.push(queue.url(req));
            }
        });
        return [200, { 'QueueUrl': ret }];
    },


    CreateQueue: function(req) {
        var name = req.aws.params.QueueName;
        if (queueStore.has(req.aws.accessKey, name)) {
            return [400, 'Sender', 'QueueAlreadyExists', 'Queue already exists ' +
                req.aws.accessKey + "/" + name];
        }
        // No check for "queue deleted recently": "You must wait 60 seconds after
        // deleting a queue before you can create another with the same name."

        var queue = queueStore.create(req.aws.accessKey, name);
        psplit.keyMapForEach(req.aws.params, 'Attribute', function(key, value) {
            queue.setAttribute(key, value);
        });
        return [200, { 'QueueUrl': queue.url(req) }];
    },


    DeleteQueue: function(req) {
        // New API that passes the queue URL as a query string.
        var url = req.aws.params.QueueUrl;
        if (queueStore.deleteByUrl(req, url)) {
            return [200, {}];
        } else {
            return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist ' + url];
        }
    },


    AddPermission: function(req) {
        // ignore permissions
        return [200, {}];
    },


    RemovePermission: function(req) {
        // ignore permissions
        return [200, {}];
    },


    GetQueueAttributes: function(req) {
        // New API that passes the queue URL as a query string.
        var url = req.aws.params.QueueUrl;
        var queue = queueStore.getByUrl(req, url);
        if (!! queue) {
            return [200, { Attribute: queue.reqGetAttributes() }];
        }
        return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist ' + url];
    },


    SetQueueAttributes: function(req) {
        // New API that passes the queue URL as a query string.
        var url = req.aws.params.QueueUrl;
        var queue = queueStore.getByUrl(req, url);
        if (!! queue) {
            // old api only allows one attribute to be set.
            var name = req.aws.params['Attribute.Name'];
            var value = req.aws.params['Attribute.Value'];
            var invalid = null;
            if (!! name && !! value) {
                if (! queue.setAttribute(name, value)) {
                    invalid = name;
                }
            }
            psplit.keyMapForEach(req.aws.params, 'Attribute', function(k, v) {
                if (! queue.setAttribute(k, v)) {
                    invalid = k;
                }
            });
            if (! invalid) {
                return [200, {}];
            }
            return [400, 'Sender', 'InvalidAttributeName', 'Unknown attribute name ' + invalid];
        }
        return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist ' + url];
    },

    SendMessage: function(req) {
        var url = req.aws.params.QueueUrl;
        var queue = queueStore.getByUrl(req, url);
        return sendMessage(queue, req);
    },


    SendMessageBatch: function(req) {
        var url = req.aws.params.QueueUrl;
        var queue = queueStore.getByUrl(req, url);
        return sendMessageBatch(queue, req);
    },


    ChangeMessageVisibility: function(req) {
        var url = req.aws.params.QueueUrl;
        var queue = queueStore.getByUrl(req, url);
        if (! queue) {
            return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist ' + url];
        }
        var receiptHandle = req.aws.params.ReceiptHandle;
        var visibilityTimeout = req.aws.params.VisibilityTimeout;
        if (visibilityTimeout === null || visibilityTimeout === undefined ||
                visibilityTimeout < 0 || visibilityTimeout > 43200) {
            return [400, 'Sender', 'InvalidParameterValue', 'Invalid visibility timeout ' + visibilityTimeout];
        }
        var message = queue.getMessageByReceiptHandle(receiptHandle);
        if (! message) {
            return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentMessage', 'Message does not exist ' + receiptHandle];
        }
        message.setVisibilityTimeout(visibilityTimeout);
        return [200, {}];
    },


    DeleteMessage: function(req) {
        var url = req.aws.params.QueueUrl;
        var queue = queueStore.getByUrl(req, url);
        if (! queue) {
            return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist ' + url];
        }
        var receiptHandle = req.aws.params.ReceiptHandle;
        // "The request doesn't fail unless the  ReceiptHandle is malformed. Even if the specified
        // ReceiptHandle doesn't exist or isn't the most recently returned receipt handle for that
        // message, the action returns Success."
        queue.deleteMessageByReceiptHandle(receiptHandle);
        return [200, {}];
    },


    DeleteMessageBatch: function(req) {
        var url = req.aws.params.QueueUrl;
        var queue = queueStore.getByUrl(req, url);
        if (! queue) {
            return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist ' + url];
        }
        var entries = psplit.mapAsArray(
            psplit.split(req.aws.params).DeleteMessageBatchRequestEntry);
        var ret = {DeleteMessageBatchResultEntry: [], BatchResultErrorEntry: []};
        for (var i = 0; i < entries.length; i++) {
            var id = entries[i].Id;
            var receiptHandle = entries[i].ReceiptHandle;
            queue.deleteMessageByReceiptHandle(receiptHandle);
            ret.DeleteMessageBatchResultEntry.push({Id: id});
        }
        return [200, ret];
    },






    // Long poll: returns a promise
    ReceiveMessage: {
        LongPoll: function(req) {
            var url = req.aws.params.QueueUrl;
            var queue = queueStore.getByUrl(req, url);
            return receiveMessages(queue, req);
        }
    }

}));





var sendMessage = function(queue, req) {
    if (!! queue) {
        return sendOneMessage(queue, req, psplit.split(req.aws.params));
    }
    return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist'];
};


var sendMessageBatch = function(queue, req) {
    if (!! queue) {
        var messages = psplit.split(req.aws.params).SendMessageBatchRequestEntry;
        var results = { SendMessageBatchResultEntry: [], BatchResultErrorEntry: [] };

        // Basic setup checks.
        var resultCount = 0;
        var totalMessageLength = 0;
        psplit.mapAsArrayForEach(messages, function(m) {
            resultCount++;
            totalMessageLength += (!! m.MessageBody ? m.MessageBody.length : 0);
        });
        if (resultCount <= 0) {
            return [400, 'Sender', 'EmptyBatchRequest', 'No messages sent'];
        }
        if (resultCount > 10) {
            return [400, 'Sender', 'TooManyEntriesInBatchRequest', 'More than 10 messages sent'];
        }
        if (totalMessageLength > 262144) {
            return [400, 'Sender', 'BatchRequestTooLong', 'Total batch message body size > 256k'];
        }


        var messageIds = {};
        psplit.mapAsArrayForEach(messages, function(m) {
            var id = m.Id;

            if (!! messageIds[id]) {
                results.BatchResultErrorEntry.push({
                    Id: id,
                    SenderFault: "true",
                    Code: "BatchEntryIdsNotDistinct",
                    Message: "Duplicate message Id " + id
                });
                return;
            }
            messageIds[id] = true;
            if (! isValidBatchId(id)) {
                results.BatchResultErrorEntry.push({
                    Id: id,
                    SenderFault: "true",
                    Code: "InvalidBatchEntryId",
                    Message: "bad message Id " + id
                });
                return;
            }

            var res = sendOneMessage(queue, req, m);
            if (res[0] >= 400) {
                results.BatchResultErrorEntry.push({
                    Id: id,
                    SenderFault: "true",
                    Code: res[2],
                    Message: res[3]
                })
            } else {
                res[1].Id = id;
                results.SendMessageBatchResultEntry.push(res[1]);
            }
        });
        return [200, results];
    }
    return [400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist'];
};



var sendOneMessage = function(queue, req, messageMap) {
    var body = messageMap.MessageBody;
    if (! isValidMessageBodyText(body)) {
        return [400, 'Sender', 'InvalidMessageContents', 'Invalid character range'];
    }
    var attributes = {};
    psplit.mapAsArrayForEach(messageMap.MessageAttribute, function(m) {
        if (! isValidMessageAttributeName(m.Name)) {
            // FIXME check error name
            return [400, 'Sender', 'InvalidMessageAttributeContents', 'Incorrect message attribute name: ' + m.Name];
        }
        if (! m.Value || ! m.Value.DataType) {
            // FIXME check error name
            return [400, 'Sender', 'InvalidMessageAttributeDataType', 'Incorrect data type for attribute ' + m.Name];
        }
        attributes[m.Name] = m.Value;
    });
    var delaySeconds = messageMap.DelaySeconds;
    var msg = queue.push(body, attributes, req.aws.accessKey, delaySeconds);
    if (!! msg) {
        return [200, msg.sentReceipt()];
    }
    return [400, 'Sender', 'MessageTooLong', 'Message too long'];
};


var isValidMessageBodyText = function(text) {
    if (text === null || text === undefined) {
        return false;
    }
    // valid message character ranges:
    // #x9 | #xA | #xD | [#x20 to #xD7FF] | [#xE000 to #xFFFD] | [#x10000 to #x10FFFF]
    if (/^([\u0009]|[\u000a]|[\u000d]|[\u0020-\ud7ff]|[\ue000-\ufffd]|[\u10000-\u10ffff])*$/.test(text)) {
        return true;
    }
    return false;
};


var isValidMessageAttributeName = function(name) {
    if (name === null || name === undefined || name.length <= 0) {
        return false;
    }
    // valid message character ranges:
    // #x9 | #xA | #xD | [#x20 to #xD7FF] | [#xE000 to #xFFFD] | [#x10000 to #x10FFFF]
    // Also, cannot include a '.'
    if (name.indexOf('.') >= 0) {
        return false;
    }
    if (/^([\u0009]|[\u000a]|[\u000d]|[\u0020-\ud7ff]|[\ue000-\ufffd]|[\u10000-\u10ffff])*$/.test(name)) {
        return true;
    }
    return false;
};


var isValidBatchId = function(id) {
    if (name === null || name === undefined || name.length <= 0) {
        return false;
    }

    // FIXME better validation

    return true;
};


// A Long Poll method, so must return a promise.
var receiveMessages = function(queue, req) {
    if (!! queue) {
        var fetchedAttributes = psplit.asKeyArray(req.aws.params, 'AttributeName');
        var maxMessageCount = psplit.with(req.aws.params, 'MaxNumberOfMessages', 1);
        var visibilityTimeout = req.aws.params.VisibilityTimeout;
        var waitTimeSeconds = req.aws.params.WaitTimeSeconds;
        if (maxMessageCount <= 0 || maxMessageCount > 10) {
            return Q([400, 'Sender', 'ReadCountOutOfRange', 'Bad MaxNumberOfMessages value']);
        }
        return queue.pull(maxMessageCount, waitTimeSeconds, visibilityTimeout)
            .then(function (msgs) {
                return [200, {Message: msgs}];
            })
            .catch(function (err) {
                // Generally a timeout
                return [200, {}];
            });
    }
    return Q([400, 'Sender', 'AWS.SimpleQueueService.NonExistentQueue', 'Queue does not exist']);
};




module.exports = router;
