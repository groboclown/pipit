'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon CloudWatch Logs version 2014-03-28
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.CreateExportTask = function CreateExportTask(aws) {
        var logGroupName = aws.params['logGroupName'];
        var from = aws.params['from'] /* long */;
        var destination = aws.params['destination'];
        var logStreamNamePrefix = aws.params['logStreamNamePrefix'];
        var to = aws.params['to'] /* long */;
        var destinationPrefix = aws.params['destinationPrefix'];
        var taskName = aws.params['taskName'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! from) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter from"];
        }        if (! to) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter to"];
        }        if (! destination) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter destination"];
        }

        // TODO implement code

        var ret = {
            taskId: ""
        };
        return [200, ret];
    }
module.exports.TestMetricFilter = function TestMetricFilter(aws) {
        var logEventMessages = aws.params['logEventMessages'] /* list */;
        var filterPattern = aws.params['filterPattern'];
        if (! filterPattern) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterPattern"];
        }        if (! logEventMessages) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logEventMessages"];
        }

        // TODO implement code

        var ret = {
            matches: [ {
                extractedValues: {} /* map */,
                eventMessage: "",
                eventNumber: 0 /*long*/
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.PutRetentionPolicy = function PutRetentionPolicy(aws) {
        var logGroupName = aws.params['logGroupName'];
        var retentionInDays = aws.params['retentionInDays'] /* integer */;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! retentionInDays) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter retentionInDays"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutMetricFilter = function PutMetricFilter(aws) {
        var metricTransformations = aws.params['metricTransformations'];
        var logGroupName = aws.params['logGroupName'];
        var filterName = aws.params['filterName'];
        var filterPattern = aws.params['filterPattern'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! filterName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterName"];
        }        if (! filterPattern) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterPattern"];
        }        if (! metricTransformations) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter metricTransformations"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeleteSubscriptionFilter = function DeleteSubscriptionFilter(aws) {
        var logGroupName = aws.params['logGroupName'];
        var filterName = aws.params['filterName'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! filterName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeMetricFilters = function DescribeMetricFilters(aws) {
        var limit = aws.params['limit'] /* integer */;
        var logGroupName = aws.params['logGroupName'];
        var filterNamePrefix = aws.params['filterNamePrefix'];
        var nextToken = aws.params['nextToken'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {
            metricFilters: [ {
                creationTime: 0 /*long*/,
                metricTransformations: /*S1m*/[ {
                    metricNamespace: "",
                    metricName: "",
                    metricValue: ""
                } /*, ...*/ ],
                filterName: "",
                filterPattern: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.DeleteLogGroup = function DeleteLogGroup(aws) {
        var logGroupName = aws.params['logGroupName'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutSubscriptionFilter = function PutSubscriptionFilter(aws) {
        var destinationArn = aws.params['destinationArn'];
        var logGroupName = aws.params['logGroupName'];
        var filterName = aws.params['filterName'];
        var filterPattern = aws.params['filterPattern'];
        var roleArn = aws.params['roleArn'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! filterName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterName"];
        }        if (! filterPattern) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterPattern"];
        }        if (! destinationArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter destinationArn"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeleteLogStream = function DeleteLogStream(aws) {
        var logGroupName = aws.params['logGroupName'];
        var logStreamName = aws.params['logStreamName'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! logStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logStreamName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeleteMetricFilter = function DeleteMetricFilter(aws) {
        var logGroupName = aws.params['logGroupName'];
        var filterName = aws.params['filterName'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! filterName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeDestinations = function DescribeDestinations(aws) {
        var DestinationNamePrefix = aws.params['DestinationNamePrefix'];
        var limit = aws.params['limit'] /* integer */;
        var nextToken = aws.params['nextToken'];


        // TODO implement code

        var ret = {
            destinations: [ /*Sq*/{
                targetArn: "",
                creationTime: 0 /*long*/,
                destinationName: "",
                accessPolicy: "",
                roleArn: "",
                arn: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.PutLogEvents = function PutLogEvents(aws) {
        var logGroupName = aws.params['logGroupName'];
        var logStreamName = aws.params['logStreamName'];
        var logEvents = aws.params['logEvents'] /* list */;
        var sequenceToken = aws.params['sequenceToken'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! logStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logStreamName"];
        }        if (! logEvents) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logEvents"];
        }

        // TODO implement code

        var ret = {
            rejectedLogEventsInfo: {
                expiredLogEventEndIndex: 0,
                tooOldLogEventEndIndex: 0,
                tooNewLogEventStartIndex: 0
            },
            nextSequenceToken: ""
        };
        return [200, ret];
    }
module.exports.GetLogEvents = function GetLogEvents(aws) {
        var startTime = aws.params['startTime'] /* long */;
        var endTime = aws.params['endTime'] /* long */;
        var logGroupName = aws.params['logGroupName'];
        var startFromHead = aws.params['startFromHead'] /* boolean */;
        var limit = aws.params['limit'] /* integer */;
        var logStreamName = aws.params['logStreamName'];
        var nextToken = aws.params['nextToken'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! logStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logStreamName"];
        }

        // TODO implement code

        var ret = {
            events: [ {
                timestamp: 0 /*long*/,
                message: "",
                ingestionTime: 0 /*long*/
            } /*, ...*/ ],
            nextBackwardToken: "",
            nextForwardToken: ""
        };
        return [200, ret];
    }
module.exports.CancelExportTask = function CancelExportTask(aws) {
        var taskId = aws.params['taskId'];
        if (! taskId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskId"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeSubscriptionFilters = function DescribeSubscriptionFilters(aws) {
        var limit = aws.params['limit'] /* integer */;
        var logGroupName = aws.params['logGroupName'];
        var filterNamePrefix = aws.params['filterNamePrefix'];
        var nextToken = aws.params['nextToken'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {
            subscriptionFilters: [ {
                logGroupName: "",
                creationTime: 0 /*long*/,
                filterPattern: "",
                filterName: "",
                roleArn: "",
                destinationArn: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.CreateLogGroup = function CreateLogGroup(aws) {
        var logGroupName = aws.params['logGroupName'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.FilterLogEvents = function FilterLogEvents(aws) {
        var startTime = aws.params['startTime'] /* long */;
        var endTime = aws.params['endTime'] /* long */;
        var logGroupName = aws.params['logGroupName'];
        var limit = aws.params['limit'] /* integer */;
        var filterPattern = aws.params['filterPattern'];
        var interleaved = aws.params['interleaved'] /* boolean */;
        var logStreamNames = aws.params['logStreamNames'] /* list */;
        var nextToken = aws.params['nextToken'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {
            events: [ {
                timestamp: 0 /*long*/,
                eventId: "",
                logStreamName: "",
                message: "",
                ingestionTime: 0 /*long*/
            } /*, ...*/ ],
            nextToken: "",
            searchedLogStreams: [ {
                logStreamName: "",
                searchedCompletely: false
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteDestination = function DeleteDestination(aws) {
        var destinationName = aws.params['destinationName'];
        if (! destinationName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter destinationName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeLogGroups = function DescribeLogGroups(aws) {
        var logGroupNamePrefix = aws.params['logGroupNamePrefix'];
        var limit = aws.params['limit'] /* integer */;
        var nextToken = aws.params['nextToken'];


        // TODO implement code

        var ret = {
            logGroups: [ {
                storedBytes: 0 /*long*/,
                logGroupName: "",
                retentionInDays: 0,
                creationTime: 0 /*long*/,
                arn: "",
                metricFilterCount: 0
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.PutDestination = function PutDestination(aws) {
        var destinationName = aws.params['destinationName'];
        var roleArn = aws.params['roleArn'];
        var targetArn = aws.params['targetArn'];
        if (! destinationName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter destinationName"];
        }        if (! targetArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter targetArn"];
        }        if (! roleArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter roleArn"];
        }

        // TODO implement code

        var ret = {
            destination: /*Sq*/{
                targetArn: "",
                creationTime: 0 /*long*/,
                destinationName: "",
                accessPolicy: "",
                roleArn: "",
                arn: ""
            }
        };
        return [200, ret];
    }
module.exports.DeleteRetentionPolicy = function DeleteRetentionPolicy(aws) {
        var logGroupName = aws.params['logGroupName'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeLogStreams = function DescribeLogStreams(aws) {
        var descending = aws.params['descending'] /* boolean */;
        var logGroupName = aws.params['logGroupName'];
        var orderBy = aws.params['orderBy'];
        var logStreamNamePrefix = aws.params['logStreamNamePrefix'];
        var limit = aws.params['limit'] /* integer */;
        var nextToken = aws.params['nextToken'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {
            nextToken: "",
            logStreams: [ {
                storedBytes: 0 /*long*/,
                uploadSequenceToken: "",
                logStreamName: "",
                creationTime: 0 /*long*/,
                lastIngestionTime: 0 /*long*/,
                firstEventTimestamp: 0 /*long*/,
                lastEventTimestamp: 0 /*long*/,
                arn: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.PutDestinationPolicy = function PutDestinationPolicy(aws) {
        var destinationName = aws.params['destinationName'];
        var accessPolicy = aws.params['accessPolicy'];
        if (! destinationName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter destinationName"];
        }        if (! accessPolicy) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter accessPolicy"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.CreateLogStream = function CreateLogStream(aws) {
        var logGroupName = aws.params['logGroupName'];
        var logStreamName = aws.params['logStreamName'];
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! logStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logStreamName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeExportTasks = function DescribeExportTasks(aws) {
        var nextToken = aws.params['nextToken'];
        var limit = aws.params['limit'] /* integer */;
        var taskId = aws.params['taskId'];
        var statusCode = aws.params['statusCode'];


        // TODO implement code

        var ret = {
            exportTasks: [ {
                status: {
                    code: "",
                    message: ""
                },
                executionInfo: {
                    completionTime: 0 /*long*/,
                    creationTime: 0 /*long*/
                },
                logGroupName: "",
                from: 0 /*long*/,
                destination: "",
                to: 0 /*long*/,
                destinationPrefix: "",
                taskId: "",
                taskName: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
