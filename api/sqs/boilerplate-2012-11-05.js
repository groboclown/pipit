'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon Simple Queue Service version 2012-11-05
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol query
require('../../lib/aws-common/shape_http')('query', module.exports, 'http://queue.amazonaws.com/doc/2012-11-05/')
module.exports.DeleteQueue = function DeleteQueue(aws) {
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeleteMessage = function DeleteMessage(aws) {
        var ReceiptHandle = aws.params['ReceiptHandle'];
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }
        if (! ReceiptHandle) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ReceiptHandle"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.SendMessageBatch = function SendMessageBatch(aws) {
        var Entries = aws.params['Entries'] /* list */;
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }
        if (! Entries) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Entries"];
        }


        // TODO implement code

        var ret = {
            Successful: [ {
                MD5OfMessageBody: "",
                MessageId: "",
                MD5OfMessageAttributes: "",
                Id: ""
            } /*, ...*/ ],
            Failed: /*Sd*/[ {
                Message: "",
                SenderFault: false,
                Id: "",
                Code: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.AddPermission = function AddPermission(aws) {
        var AWSAccountIds = aws.params['AWSAccountIds'] /* list */;
        var Label = aws.params['Label'];
        var Actions = aws.params['Actions'] /* list */;
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }
        if (! Label) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Label"];
        }
        if (! AWSAccountIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter AWSAccountIds"];
        }
        if (! Actions) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Actions"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PurgeQueue = function PurgeQueue(aws) {
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.ChangeMessageVisibility = function ChangeMessageVisibility(aws) {
        var VisibilityTimeout = aws.params['VisibilityTimeout'] /* integer */;
        var ReceiptHandle = aws.params['ReceiptHandle'];
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }
        if (! ReceiptHandle) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ReceiptHandle"];
        }
        if (! VisibilityTimeout) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VisibilityTimeout"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.ChangeMessageVisibilityBatch = function ChangeMessageVisibilityBatch(aws) {
        var Entries = aws.params['Entries'] /* list */;
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }
        if (! Entries) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Entries"];
        }


        // TODO implement code

        var ret = {
            Successful: [ {
                Id: ""
            } /*, ...*/ ],
            Failed: /*Sd*/[ {
                Message: "",
                SenderFault: false,
                Id: "",
                Code: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.RemovePermission = function RemovePermission(aws) {
        var Label = aws.params['Label'];
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }
        if (! Label) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Label"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.ListQueues = function ListQueues(aws) {
        var QueueNamePrefix = aws.params['QueueNamePrefix'];


        // TODO implement code

        var ret = {
            QueueUrls: /*Sz*/[ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.SendMessage = function SendMessage(aws) {
        var DelaySeconds = aws.params['DelaySeconds'] /* integer */;
        var MessageBody = aws.params['MessageBody'];
        var MessageAttributes = aws.params['MessageAttributes'];
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }
        if (! MessageBody) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter MessageBody"];
        }


        // TODO implement code

        var ret = {
            MD5OfMessageBody: "",
            MessageId: "",
            MD5OfMessageAttributes: ""
        };
        return [200, ret];
    }
module.exports.ReceiveMessage = function ReceiveMessage(aws) {
        var VisibilityTimeout = aws.params['VisibilityTimeout'] /* integer */;
        var MessageAttributeNames = aws.params['MessageAttributeNames'] /* list */;
        var WaitTimeSeconds = aws.params['WaitTimeSeconds'] /* integer */;
        var MaxNumberOfMessages = aws.params['MaxNumberOfMessages'] /* integer */;
        var AttributeNames = aws.params['AttributeNames'];
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }


        // TODO implement code

        var ret = {
            Messages: [ {
                Attributes: /*Sh*/{} /* map */,
                ReceiptHandle: "",
                MD5OfBody: "",
                Body: "",
                MessageId: "",
                MessageAttributes: /*S19*/{} /* map */,
                MD5OfMessageAttributes: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.CreateQueue = function CreateQueue(aws) {
        var Attributes = aws.params['Attributes'];
        var QueueName = aws.params['QueueName'];
        if (! QueueName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueName"];
        }


        // TODO implement code

        var ret = {
            QueueUrl: ""
        };
        return [200, ret];
    }
module.exports.SetQueueAttributes = function SetQueueAttributes(aws) {
        var Attributes = aws.params['Attributes'];
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }
        if (! Attributes) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Attributes"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeleteMessageBatch = function DeleteMessageBatch(aws) {
        var Entries = aws.params['Entries'] /* list */;
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }
        if (! Entries) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Entries"];
        }


        // TODO implement code

        var ret = {
            Successful: [ {
                Id: ""
            } /*, ...*/ ],
            Failed: /*Sd*/[ {
                Message: "",
                SenderFault: false,
                Id: "",
                Code: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListDeadLetterSourceQueues = function ListDeadLetterSourceQueues(aws) {
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }


        // TODO implement code

        var ret = {
            queueUrls: /*Sz*/[ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.GetQueueUrl = function GetQueueUrl(aws) {
        var QueueName = aws.params['QueueName'];
        var QueueOwnerAWSAccountId = aws.params['QueueOwnerAWSAccountId'];
        if (! QueueName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueName"];
        }


        // TODO implement code

        var ret = {
            QueueUrl: ""
        };
        return [200, ret];
    }
module.exports.GetQueueAttributes = function GetQueueAttributes(aws) {
        var AttributeNames = aws.params['AttributeNames'];
        var QueueUrl = aws.params['QueueUrl'];
        if (! QueueUrl) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter QueueUrl"];
        }


        // TODO implement code

        var ret = {
            Attributes: /*Sh*/{} /* map */
        };
        return [200, ret];
    }
