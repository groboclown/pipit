# Pipit's SQS Implementation

**Server endpoint: http://(servername):(port)/sqs/**

The SQS implementation conforms to most of the web service specification.


The implementation has these shortcomings:

* If a client is disconnected during a long poll, there is a
  chance that the next event to process will be lost.

It has these primary differences:

* There is no restriction to how frequently a queue can be created or deleted;
  Normally, about 60 seconds must pass before a deleted queue can be recreated.
* ChangeMessageVisibilityBatch is not implemented.  Calls to it are currently
  ignored.
* Queue permissions are ignored.  All users can perform any action on any
  queue.
* Message attributes are only partially implemented.  The MD5 of the attributes
  are not correctly calculated, and the attributes and their MD5 may be returned
  when there are no attributes.
* ReceiveMessage with a specified attribute list or message attribute list
  will be ignored; all available messages will be sent (up to the limit).
