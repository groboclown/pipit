# Pipit's Lambda Implementation

**Server endpoint: http://(servername):(port)/lambda/**

The Lambda implementation has only the `create_function` method implemented.
This will, though, register a function into the lambda system for invocation through
other services.

The lambda functions supported are only node instances.  They can be registered either
through the S3 functionality - stored as an S3 zip file, or passed in as a
base 64 encoded string.
