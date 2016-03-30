'use strict';

const Q = require('q');
const test_parse = require('../test-parse');
const aws_common = require('../../lib/aws-common');

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

Inbox.prototype.countLiveMessages = function() {
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
Inbox.prototype.pull = function(maxCount, waitTimeout, visibilityTimeout) {
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
    var q = Q.defer().timeout(waitTimeout * 1000);
    this.listeners.push(q);
    return q;
};


/**
 * Pushes a message onto the queue.
 * Returns the message object (which wraps the value)
 */
Inbox.prototype.push = function(messageValue, delaySeconds, visiblityTimeout) {
    if (delaySeconds === null || delaySeconds === undefined || delaySeconds < 0) {
        delaySeconds = 0;
    }

    var msg = new InboxMessage(messageValue, visiblityTimeout);
    var t = this;
    var doPush = function() {
        t.messages.push(msg);

        // check if there are any polling promises.  Always use the first
        // listener (it's been waiting the longest).  If the first one is
        // expired, remove it.  It should, really, search the whole list
        // and remove all expired promises to prevent memory leaks.
        while (t.listeners.length > 0) {
            if (t.listeners[i].promise.isPending()) {
                msg.onReceive();
                t.listeners[i].resolve(msg);
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



/**
 * Iterate over each message.
 */
Inbox.prototype.each = function(onlyReceivable, handler) {
    for (var i = 0; i < this.messages.length; i++) {
        if (!! this.messages[i] &&
                (! onlyReceivable || this.messages[i].canReceive())) {
            handler(this.messages[i]);
        }
    }
};


/**
 * Return the first message's value where the checkHandler returns true.  Returns
 * null if no match.
 */
Inbox.prototype.matchBy = function(onlyReceivable, checkHandler) {
    for (var i = 0; i < this.messages.length; i++) {
        if (!! this.messages[i] &&
                (! onlyReceivable || this.messages[i].canReceive()) &&
                checkHandler(this.messages[i])) {
            return this.messages[i];
        }
    }
    return null;
};

/**
 * Delete the first message where the checkHandler returns true.
 */
Inbox.prototype.deleteBy = function(onlyReceivable, checkHandler) {
    for (var i = 0; i < this.messages.length; i++) {
        if (!! this.messages[i] &&
                (! onlyReceivable || this.messages[i].canReceive()) &&
                checkHandler(this.messages[i])) {
            this.messages.splice(i, 1);
            return true;
        }
    }
    return false;
};

var InboxMessage = function(messageObj, visiblityTimeout) {
    this.messageId = aws_common.gen_request_id();
    this.visiblityTimeout = visiblityTimeout;
    this.sentTime = aws_common.timestamp();
    this.lastReceivedTime = 0;
    this.visibleAgainAt = 0;
    this.firstReceivedTime = 0;
    this.receivedCount = 0;
    this.value = messageObj;
};
InboxMessage.prototype.setVisibilityTimeout = function(timeout) {
    // extends the timeout to timeout + right now, not additional time
    // for the original expiration time.
    var now = aws_common.timestamp();
    if (this.firstReceivedTime !== 0 && this.visibleAgainAt <= now) {
        this.visibleAgainAt = now + timeout;
    }
};
InboxMessage.prototype.canReceive = function() {
    return this.firstReceivedTime === 0 || this.visibleAgainAt < aws_common.timestamp();
};
InboxMessage.prototype.onReceive = function() {
    var now = aws_common.timestamp();
    if (this.firstReceivedTime === 0) {
        this.firstReceivedTime = now;
    }
    this.lastReceivedTime = now;
    this.visibleAgainAt = this.visibilityTimeout + now;
    this.receivedCount++;
}
