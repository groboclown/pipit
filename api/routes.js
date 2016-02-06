var express = require('express');

module.exports = {
    '/sqs': require('./sqs'),
    '/sns': require('./sns'),
    '/admin/injections': require('./admin/injections')
};

/* TODO add special "connector" services
 * that connect different AWS services together.
 * These would be representative of what you can
 * do through the AWS console, such as substribing
 * an SQS queue to SNS messages:
 * http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqssubscribe.html
 */
