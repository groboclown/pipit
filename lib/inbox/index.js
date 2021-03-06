'use strict';

const Q = require('q');
const testParse = require('../test-parse');
const awsCommon = require('../../lib/aws-common');

// ===========================================================

/*
A simple inbox capability for storing and delivering messages.
Messages are retained until explicitly removed.
It follows the SQS execution flow.
The values pushed are message values, but the pulled values
and queried values are the message objects that wrap the passed-in
value.
*/

var Inbox = function() {
  this.listeners = [];
  this.messages = [];
};
module.exports = Inbox;

Inbox.prototype.countLiveMessages = function countLiveMessages() {
  var ret = 0;
  for (var i = 0; i < this.messages.length; i++) {
    if (this.messages[i].canReceive()) {
      ret++;
    }
  }
  return ret;
};


/*
 Listening API
 Returns at most maxCount messages in a promise.
 */
Inbox.prototype.pull = function pull(maxCount, waitTimeout, visibilityTimeout) {
  // First, find if there are any existing messages for this listener
  // that have not yet been delivered.
  var ret = [];
  for (var i = 0; i < this.messages.length; i++) {
    var message = this.messages[i];
    if (message.canReceive()) {
      message.onReceive();
      ret.push(message);
      if (ret.length >= maxCount) {
        return Q(ret);
      }
    }
  }
  if (ret.length > 0 || waitTimeout <= 0) {
    return Q(ret);
  }

  // Put ourself into a wait queue.  Long poll!
  var q = Q.defer();
  // Q.timeout doesn't work quite right.  Not only that, but we want
  // a level of control over what it means to time out.
  setTimeout(function() {
    q.resolve([]);
  }, waitTimeout * 1000);
  this.listeners.push(q);
  return q.promise;
};


/**
 * Pushes a message onto the queue.
 * Returns the message object (which wraps the value)
 */
Inbox.prototype.push = function push(messageValue, delaySeconds, visiblityTimeout) {
  if (delaySeconds === null || delaySeconds === undefined || delaySeconds < 0) {
    delaySeconds = 0;
  }

  var msg = new InboxMessage(messageValue, visiblityTimeout);
  var t = this;
  var doPush = function() {
    t.messages.push(msg);

    // Check if there are any polling promises.  Always use the first
    // listener (it's been waiting the longest).  If the first one is
    // expired, remove it.  It should, really, search the whole list
    // and remove all expired promises to prevent memory leaks.
    while (t.listeners.length > 0) {
      if (t.listeners[0].promise.isPending()) {
        msg.onReceive();
        console.log('INBOX: received message (when posted) ' + msg.messageId);
        t.listeners[0].resolve([msg]);
        t.listeners.splice(0, 1);
        break;
      } else {
        t.listeners.splice(0, 1);
      }
    }
  };

  if (delaySeconds > 0) {
    setTimeout(
      function() {
        doPush();
      },
      delaySeconds * 1000
    );
  } else {
    doPush();
  }
  return msg;
};



/**
 * Iterate over each message.
 */
Inbox.prototype.each = function each(onlyReceivable, handler) {
  for (var i = 0; i < this.messages.length; i++) {
    if (!!this.messages[i] &&
            (!onlyReceivable || this.messages[i].canReceive())) {
      handler(this.messages[i]);
    }
  }
};


/**
 * Return the first message's value where the checkHandler returns true.
 * Returns `null` if no match.
 */
Inbox.prototype.matchBy = function matchBy(onlyReceivable, checkHandler) {
  for (var i = 0; i < this.messages.length; i++) {
    if (!!this.messages[i] &&
        (!onlyReceivable || this.messages[i].canReceive()) &&
        checkHandler(this.messages[i])) {
      return this.messages[i];
    }
  }
  return null;
};

/**
 * Delete the first message where the checkHandler returns true.
 */
Inbox.prototype.deleteBy = function deleteBy(onlyReceivable, checkHandler) {
  for (var i = 0; i < this.messages.length; i++) {
    if (!!this.messages[i] &&
        (!onlyReceivable || this.messages[i].canReceive()) &&
        checkHandler(this.messages[i])) {
      this.messages.splice(i, 1);
      return true;
    }
  }
  return false;
};

Inbox.prototype.deleteByMessageId = function deleteByMessageId(messageId) {
  return this.deleteBy(false, function db(msg) {
    return msg.messageId === messageId;
  });
};

var InboxMessage = function(messageObj, visiblityTimeout) {
  this.messageId = awsCommon.genRequestId();
  this.visiblityTimeout = visiblityTimeout;
  this.sentTime = awsCommon.timestamp();
  this.lastReceivedTime = 0;
  this.visibleAgainAt = 0;
  this.firstReceivedTime = 0;
  this.receivedCount = 0;
  this.value = messageObj;
};
InboxMessage.prototype.setVisibilityTimeout = function(timeout) {
  // Extends the timeout to timeout + right now, not additional time
  // for the original expiration time.
  var now = awsCommon.timestamp();
  if (this.firstReceivedTime !== 0 && this.visibleAgainAt <= now) {
    this.visibleAgainAt = now + timeout;
  }
};
InboxMessage.prototype.canReceive = function() {
  return this.firstReceivedTime === 0 ||
    this.visibleAgainAt < awsCommon.timestamp();
};
InboxMessage.prototype.onReceive = function() {
  var now = awsCommon.timestamp();
  if (this.firstReceivedTime === 0) {
    this.firstReceivedTime = now;
  }
  this.lastReceivedTime = now;
  this.visibleAgainAt = this.visibilityTimeout + now;
  this.receivedCount++;
};
