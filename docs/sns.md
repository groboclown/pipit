# Pipit's SNS Implementation

**Server endpoint: http://(servername):(port)/sns/**

The SNS implementation is not written yet.

Limitations with the SNS implementation:

* The service is limited to these push targets:
    * Lambdas (registered through the Pipit lambda service)
    * SQS queues (via the Pipit sqs service)
    * HTTP or HTTPS endpoints.
