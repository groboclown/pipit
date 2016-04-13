'use strict';

const Q = require('q');
const awsCommon = require('../../lib/aws-common');
const CommonInbox = require('../../lib/inbox');

// ===========================================================

/*
A simple inbox capability for storing and delivering messages.
Messages are retained until explicitly removed.
*/

var Inbox = function Inbox(userId, queueId) {
  this.inbox = new CommonInbox();

  this.permissionLabels = {};
  this.userId = userId;
  this.queueId = queueId;
  this.attributes = {
    CreatedTimestamp: awsCommon.timestamp(),
    LastModifiedTimestamp: awsCommon.timestamp(),
    ApproximateNumberOfMessages: 0,
    ApproximateNumberOfMessagesNotVisible: 0,
    QueueArn: 'arn:aws:sqs:MOCK-REGION:' + userId + ':' + queueId,

    // These should be the actual defaults
    DelaySeconds: 0, // Seconds
    MaximumMessageSize: 262144, // 256k
    MessageRetentionPeriod: 4 * 24 * 60 * 60, // Seconds
    ReceiveMessageWaitTimeSeconds: 0, // Duration in seconds
    VisibilityTimeout: 30, // Seconds
  };
  this.policy = {};
};
module.exports = Inbox;


// Listening API
// Returns at most maxCount messages in a promise.
Inbox.prototype.pull = function pull(maxCount, waitTimeout, visibilityTimeout) {
  if (maxCount === null || maxCount === undefined) {
    maxCount = 1;
  }
  if (waitTimeout === null || waitTimeout === undefined || waitTimeout < 0) {
    waitTimeout = this.attributes.ReceiveMessageWaitTimeSeconds;
  }
  if (visibilityTimeout === null ||
      visibilityTimeout === undefined ||
      visibilityTimeout < 0) {
    visibilityTimeout = this.attributes.VisibilityTimeout;
  }
  /*
  // Range is 1 to 10
  if (typeof maxCount !== 'number' || maxCount < 1 || maxCount > 10) {
    return ReadCountOutOfRange error
  }
  */
  return this.inbox.pull(maxCount, waitTimeout, visibilityTimeout)
    .then(function pullThen(messages) {
      var ret = [];
      for (var i = 0; i < messages.length; i++) {
        ret.push(messages[i].value.toReceiveForm(messages[i]));
      }
      return ret;
    });
};

/** Returns false if the message body size is too big */
Inbox.prototype.push = function push(body, attributes, senderId, delaySeconds) {
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
  if (!!ret) {
    console.log('::: inbox push: returning value');
    return ret.value;
  }
  return null;
};



// General Paperwork API
Inbox.prototype.addPermission = function addPermission(label, action, accountId) {
  /* Just ignore this for now */
  this.attributes.LastModifiedTimestamp = awsCommon.timestamp();
};
Inbox.prototype.url = function url(aws) {
  return aws.baseUrl + this.userId + '/' + this.queueId;
};
Inbox.prototype.setAttribute = function setAttribute(name, value) {
  if (this.attributes.hasOwnProperty(name)) {
    this.attributes[name] = value;
    this.attributes.LastModifiedTimestamp = awsCommon.timestamp();
    return true;
  }
  if (name === 'Policy') {
    // Ignored for now
    // The value, though, is usually a json encoded string.
    this.attributes.LastModifiedTimestamp = awsCommon.timestamp();
    return true;
  }
  if (name === 'RedrivePolicy') {
    // Dead letter policy - ignore for now.
    // The value, though, is usually a json encoded string.
    this.attributes.LastModifiedTimestamp = awsCommon.timestamp();
    return true;
  }
  return false;
};
Inbox.prototype.reqGetAttributes = function reqGetAttributes() {
  var attributes = [];
  var t = this;
  Object.keys(this.attributes).forEach(function atttr(p) {
    attributes.push({ Name: p, Value: t.attributes[p] });
  });
  return attributes;
};
Inbox.prototype.changeMessageVisibilityByReceiptHandle = function changeMessageVisibilityByReceiptHandle(receiptHandle, visibilityTimeout) {
  var ret = this.inbox.matchBy(false, function mb(msg) {
    return msg.value.isReceiptHandle(receiptHandle);
  });
  if (!!ret) {
    ret.setVisibilityTimeout(visibilityTimeout);
    return true;
  }
  return false;
};
Inbox.prototype.deleteMessageByReceiptHandle = function deleteMessageByReceiptHandle(receiptHandle) {
  return this.inbox.deleteBy(false, function db(msg) {
    return msg.value.isReceiptHandle(receiptHandle);
  });
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
function AwsMessage(body, attributes, senderId) {
  this.messageId = awsCommon.genRequestId();
  this.body = body;
  this.attributes = (!!attributes ? attributes : {});
  this.senderId = senderId;
  this.bodyMd5 = awsCommon.md5(body);
  // Need to figure out the right way to encode the attributes
  this.attributesMd5 = awsCommon.md5('1234'); // ???
  this.receiptHandles = [];
}
AwsMessage.prototype.sentReceipt = function sentReceipt() {
  return {
    MD5OfMessageBody: this.bodyMd5,
    MD5OfMessageAttributes: this.attributesMd5,
    MessageId: this.messageId,
  };
};
AwsMessage.prototype.isReceiptHandle = function isReceiptHandle(handle) {
  for (var i = 0; i < this.receiptHandles.length; i++) {
    if (this.receiptHandles[i] === handle) {
      return true;
    }
  }
  return false;
};
AwsMessage.prototype.getActiveReceiptHandle = function getActiveReceiptHandle(parentMsg) {
  return awsCommon.encodeBase64(
    this.messageId + '-' + parentMsg.lastReceivedTime);
};
AwsMessage.prototype.createReceiptHandle = function createReceiptHandle(parentMsg) {
  var ret = this.getActiveReceiptHandle(parentMsg);
  this.receiptHandles.push(ret);
  return ret;
};
/** Note: canReceive MUST always be called before this function. */
AwsMessage.prototype.toReceiveForm = function toReceiveForm(parentMsg) {
  var messageAttributes = [];
  var tattr = this.attributes;
  Object.keys(tattr).forEach(function fe(p) {
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
      { Name: 'ApproximateFirstReceiveTimestamp', Value: parentMsg.firstReceivedTime },
    ],
    MD5OfMessageAttributes: this.attributesMd5,
    MessageAttributes: messageAttributes,
  };

  // If no attributes are provided, then don't include
  // MessageAttributes or MD5OfMD5OfMessageAttributes
  if (!this.attributesMd5) {
    delete ret.MD5OfMessageAttributes;
    delete ret.MessageAttributes;
  }

  return ret;
};
