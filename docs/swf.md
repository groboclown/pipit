# Pipit's SWF Implementation

**Server endpoint: http://(servername):(port)/swf/**

The SWF implementation is missing these APIs

* Deprecate APIs are not implemented.
* ContinueAsNewWorkflowExecution is not implemented

The implementation has these shortcomings:

* Timeouts cannot be 'NONE' (this will need to be fixed).
* Activity processors **must** specify an activity task list;
  if not, it will not receive any tasks.
* If a client is disconnected during a long poll, there is a
  chance that the next event to process will be lost.
* Scheduling lambdas default to 5 minute timeouts.

It has these primary differences:

* IAM roles and related security is not supported.
* There are no restrictions to the rate of task or workflow creation.
