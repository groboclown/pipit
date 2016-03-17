'use strict';

const Q = require('q');
const aws_common = require('../../lib/aws-common');
const common_inbox = require('../../lib/inbox');

// ===========================================================

/*
A simple inbox capability for storing and delivering messages.
Messages are retained until explicitly removed.
*/

var Inbox = function(userId, queueId) {
    this.inbox = new common_inbox();

    this.permissionLabels = {};
    this.userId = userId;
    this.queueId = queueId;
    this.attributes = {
        CreatedTimestamp: aws_common.timestamp(),
        LastModifiedTimestamp: aws_common.timestamp(),
        ApproximateNumberOfMessages: 0,
        ApproximateNumberOfMessagesNotVisible: 0,
        QueueArn: 'arn:aws:sqs:MOCK-REGION:' + userId + ':' + queueId,

        // These should be the actual defaults
        DelaySeconds: 0, // seconds
        MaximumMessageSize: 262144, // 256k
        MessageRetentionPeriod: 4 * 24 * 60 * 60, // seconds
        ReceiveMessageWaitTimeSeconds: 0, // duration in seconds
        VisibilityTimeout: 30 // seconds
    };
    this.policy = {};
};
module.exports = Inbox;


// Listening API
// Returns at most maxCount messages in a promise.
Inbox.prototype.pull = function(maxCount, waitTimeout, visibilityTimeout) {
    if (maxCount === null || maxCount === undefined) {
        maxCount = 1;
    }
    if (waitTimeout === null || waitTimeout === undefined || waitTimeout < 0) {
        waitTimeout = this.attributes.ReceiveMessageWaitTimeSeconds;
    }
    if (visibilityTimeout === null || visibilityTimeout === undefined || visibilityTimeout < 0) {
        visibilityTimeout = this.attributes.VisibilityTimeout;
    }
    /*
    // Range is 1 to 10
    if (typeof maxCount !== 'number' || maxCount < 1 || maxCount > 10) {
        return ReadCountOutOfRange error
    }
    */
    return this.inbox.pull(maxCount, waitTimeout, visibilityTimeout)
        .then(function (messages) {
            var ret = [];
            for (var i = 0; i < messages.length; i++) {
                ret.push(messages[i].value.toReceiveForm(messages[i]));
            }
            return ret;
        });
};

/** returns false if the message body size is too big */
Inbox.prototype.push = function(body, attributes, senderId, delaySeconds) {
    if (delaySeconds === null || delaySeconds === undefined || delaySeconds < 0) {
        delaySeconds = 0;
    }
    if (body.length > this.attributes.MaximumMessageSize) {
        // MessageTooLong
        return null;
    }
    var messageObj = new AwsMessage(body, attributes, senderId);
    var ret = this.inbox.push(messageObj, delaySeconds,
        this.attributes.VisibilityTimeout);
    if (!! ret) {
        console.log("::: inbox push: returning value");
        return ret.value;
    }
    return null;
};



// General Paperwork API
Inbox.prototype.addPermission = function(label, action, accountId) {
    /* just ignore this for now */
    this.attributes.LastModifiedTimestamp = aws_common.timestamp();
};
Inbox.prototype.url = function(aws) {
    return aws.baseUrl + this.userId + '/' + this.queueId;
};
Inbox.prototype.setAttribute = function(name, value) {
    if (this.attributes.hasOwnProperty(name)) {
        this.attributes[name] = value;
        this.attributes.LastModifiedTimestamp = aws_common.timestamp();
        return true;
    } else if (name === 'Policy') {
        // Ignored for now
        // the value, though, is usually a json encoded string.
        this.attributes.LastModifiedTimestamp = aws_common.timestamp();
        return true;
    } else if (name === 'RedrivePolicy') {
        // dead letter policy - ignore for now.
        // the value, though, is usually a json encoded string.
        this.attributes.LastModifiedTimestamp = aws_common.timestamp();
        return true;
    } else {
        return false;
    }
};
Inbox.prototype.reqGetAttributes = function() {
    var attributes = [];
    var t = this;
    Object.keys(this.attributes).forEach(function (p) {
        attributes.push({ Name: p, Value: t.attributes[p] });
    });
    return attributes;
};
Inbox.prototype.changeMessageVisibilityByReceiptHandle = function(receiptHandle, visibilityTimeout) {
    var ret = this.inbox.matchBy(false, function(msg) { return msg.value.isReceiptHandle(receiptHandle) });
    if (!! ret) {
        ret.setVisibilityTimeout(visibilityTimeout);
        return true;
    }
    return false;
};
Inbox.prototype.deleteMessageByReceiptHandle = function(receiptHandle) {
    return this.inbox.deleteBy(false, function(msg) { return msg.value.isReceiptHandle(receiptHandle) });
};


// ===========================================================
/*
Messages are retained in the queue until they are explicitly deleted.
Actual AWS will auto delete messages after like 4 days, but for mock
testing, we don't need that.

After a message is received, it will be invisible for the visibility timeout
period (future requests for messages will not return this message); after
the timeout period, if it is not deleted, then the message will be visible
to future pull requests.

Straight-up SQS messages.
*/
var AwsMessage = function(body, attributes, senderId) {
    this.messageId = aws_common.gen_request_id();
    this.body = body;
    this.attributes = (!! attributes ? attributes : {});
    this.senderId = senderId;
    this.bodyMd5 = aws_common.md5(body);
    // need to figure out the right way to encode the attributes
    this.attributesMd5 = aws_common.md5('1234'); // ???
    this.receiptHandles = [];
};
AwsMessage.prototype.sentReceipt = function() {
    return {
        MD5OfMessageBody: this.bodyMd5,
        MD5OfMessageAttributes: this.attributesMd5,
        MessageId: this.messageId
    };
};
AwsMessage.prototype.isReceiptHandle = function(handle) {
    for (var i = 0; i < this.receiptHandles.length; i++) {
        if (this.receiptHandles[i] === handle) {
            return true;
        }
    }
    return false;
};
AwsMessage.prototype.getActiveReceiptHandle = function(parentMsg) {
    return aws_common.encodeBase64(this.messageId + '-' + parentMsg.lastReceivedTime);
};
AwsMessage.prototype.createReceiptHandle = function(parentMsg) {
    var ret = this.getActiveReceiptHandle(parentMsg);
    this.receiptHandles.push(ret);
    return ret;
};
/** canReceive MUST always be called before this function. */
AwsMessage.prototype.toReceiveForm = function(parentMsg) {
    var messageAttributes = [];
    var tattr = this.attributes;
    Object.keys(tattr).forEach(function (p) {
        var value = { DataType: tattr[p].DataType };
        var validKeys = ['BinaryListValues', 'BinaryValue', 'StringListValues', 'StringValue'];
        for (var j = 0; j < validKeys.length; j++) {
            if (tattr[p].hasOwnProperty(validKeys[j])) {
                value[validKeys[j]] = tattr[p][validKeys[j]];
            }
        }
        messageAttributes.push({ Name: p, Value: value });
    });

    var ret = {
        MessageId: this.messageId,
        ReceiptHandle: this.createReceiptHandle(parentMsg),
        MD5OfBody: this.bodyMd5,
        Body: this.body,
        Attribute: [
            { Name: 'SenderId', Value: this.senderId },
            { Name: 'SentTimestamp', Value: parentMsg.sentTime },
            { Name: 'ApproximateReceiveCount', Value: parentMsg.receivedCount },
            { Name: 'ApproximateFirstReceiveTimestamp', Value: parentMsg.firstReceivedTime }
        ],
        MD5OfMessageAttributes: this.attributesMd5,
        MessageAttributes: messageAttributes
    };

    // if no attributes are provided, then don't include
    // MessageAttributes or MD5OfMD5OfMessageAttributes
    if (! this.attributesMd5) {
        delete ret['MD5OfMessageAttributes'];
        delete ret['MessageAttributes'];
    }

    return ret;
};
