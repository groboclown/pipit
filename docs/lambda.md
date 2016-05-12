# Pipit's Lambda Implementation

**Server endpoint: http://(servername):(port)/lambda/**

The Lambda implementation has only the `create_function` and `delete_function`
methods implemented.  This will, though, register a function into the lambda
system for invocation through other services (specifically, SWF and the
lambda activities).

The lambda functions will only run in the nodejs runtime.  They can be
registered either through the S3 functionality - stored as an S3 zip file, or
passed in as a base 64 encoded string.

Limitations of the implementation:

* Does not allow for choosing functions based on just the account id and
  function name.
