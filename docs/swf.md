# Pipit's SWF Implementation

**Server endpoint: http://(servername):(port)/swf/**

The SWF implementation is missing these APIs

* Deprecate APIs are not implemented.
* Tasks (lambda and activities) are not supported yet.

The implementation has these shortcomings:

* Timeouts cannot be 'NONE' (this will need to be fixed).

It has these primary differences:

* IAM roles and related security is not supported.
* There are no restrictions to the rate of task or workflow creation.
