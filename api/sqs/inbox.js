'use strict';

var Q = require('q');
var aws_common = require('../../lib/aws-common');

// ===========================================================

/*
A simple inbox capability for storing and delivering messages.
Messages are retained until explicitly removed.
*/

var Inbox = function(userId, queueId) {
    this.listeners = [];
    this.messages = [];

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

    // First, find if there are any existing messages for this listener
    // that have not yet been delivered.
    var ret = [];
    for (var i = 0; i < this.messages.length; i++) {
        var message = this.messages[i];
        if (message.canReceive()) {
            ret.push(message.receive());
            if (ret.length >= maxCount) {
                return Q(ret);
            }
        }
    }
    if (ret.length > 0 || waitTimeout <= 0) {
        return Q(ret);
    }

    // Put ourself into a wait queue.  Long poll!
    var q = Q.defer().timeout(waitTimeout * 1000);
    this.listeners.push(q);
    return q;
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

    var msg = new AwsMessage(body, attributes, senderId, this.attributes.VisibilityTimeout);
    var t = this;
    var doPush = function() {
        t.messages.push(msg);

        // check if there are any polling promises.  Always use the first
        // listener (it's been waiting the longest).  If the first one is
        // expired, remove it.  It should, really, search the whole list
        // and remove all expired promises to prevent memory leaks.
        while (t.listeners.length > 0) {
            if (t.listeners[i].promise.isPending()) {
                t.listeners[i].resolve(msg.receive());
                t.listeners.splice(0, 1);
                break;
            } else {
                t.listeners.splice(0, 1);
            }
        }
    };

    if (delaySeconds > 0) {
        setTimeout(function() {
            doPush();
        }, delaySeconds * 1000);
    } else {
        doPush();
    }
    return msg;
};



// General Paperwork API
Inbox.prototype.addPermission = function(label, action, accountId) {
    /* just ignore this for now */
    this.attributes.LastModifiedTimestamp = aws_common.timestamp();
};
Inbox.prototype.url = function(req) {
    return req.aws.baseUrl + this.userId + '/' + this.queueId;
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
Inbox.prototype.getMessageByReceiptHandle = function(receiptHandle) {
    for (var i = 0; i < this.messages.length; i++) {
        if (!! this.messages[i] && this.messages[i].isReceiptHandle(receiptHandle)) {
            return this.messages[i];
        }
    }
    return null;
};
Inbox.prototype.deleteMessageByReceiptHandle = function(receiptHandle) {
    for (var i = 0; i < this.messages.length; i++) {
        if (!! this.messages[i] && this.messages[i].isReceiptHandle(receiptHandle)) {
            this.messages.splice(i, 1);
            return true;
        }
    }
    return false;
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
*/
var AwsMessage = function(body, attributes, senderId, visibilityTimeout) {
    this.messageId = aws_common.gen_request_id();

    this.body = body;
    this.attributes = (!! attributes ? attributes : {});
    this.senderId = senderId;
    this.visibilityTimeout = visibilityTimeout;
    this.bodyMd5 = aws_common.md5(body);
    // need to figure out the right way to encode the attributes
    this.attributesMd5 = aws_common.md5('1234'); // ???
    this.sentTime = aws_common.timestamp();
    this.receiptHandles = [];

    this.lastReceivedTime = 0;
    this.visibleAgainAt = 0;
    this.firstReceivedTime = 0;
    this.receivedCount = 0;
};
AwsMessage.prototype.sentReceipt = function() {
    return {
        MD5OfMessageBody: this.bodyMd5,
        MD5OfMessageAttributes: this.attributesMd5,
        MessageId: this.messageId
    };
};
AwsMessage.prototype.setVisibilityTimeout = function(timeout) {
    // extends the timeout to timeout + right now, not additional time
    // for the original expiration time.
    var now = aws_common.timestamp();
    if (this.firstReceivedTime !== 0 && this.visibleAgainAt <= now) {
        this.visibleAgainAt = now + timeout;
    }
};
AwsMessage.prototype.canReceive = function() {
    return this.firstReceivedTime === 0 || this.visibleAgainAt < aws_common.timestamp();
};
AwsMessage.prototype.isReceiptHandle = function(handle) {
    for (var i = 0; i < this.receiptHandles.length; i++) {
        if (this.receiptHandles[i] === handle) {
            return true;
        }
    }
    return false;
};
AwsMessage.prototype.getActiveReceiptHandle = function() {
    return aws_common.encodeBase64(this.messageId + '-' + this.lastReceivedTime);
};
AwsMessage.prototype.createReceiptHandle = function() {
    var ret = this.getActiveReceiptHandle();
    this.receiptHandles.push(ret);
    return ret;
};
/** canReceive MUST always be called before this function. */
AwsMessage.prototype.receive = function() {
    var now = aws_common.timestamp();
    if (this.firstReceivedTime === 0) {
        this.firstReceivedTime = now;
    }
    this.lastReceivedTime = now;
    this.visibleAgainAt = this.visibilityTimeout + now;
    this.receivedCount++;
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
        ReceiptHandle: this.createReceiptHandle(),
        MD5OfBody: this.bodyMd5,
        Body: this.body,
        Attribute: [
            { Name: 'SenderId', Value: this.senderId },
            { Name: 'SentTimestamp', Value: this.sentTime },
            { Name: 'ApproximateReceiveCount', Value: this.receivedCount },
            { Name: 'ApproximateFirstReceiveTimestamp', Value: this.firstReceivedTime }
        ],
        MD5OfMessageAttributes: this.attributesMd5,
        MessageAttributes: messageAttributes
    };

    // FIXME if no attributes are provided, then don't include
    // MessageAttributes or MD5OfMD5OfMessageAttributes

    return ret;
};


module.exports = Inbox;
