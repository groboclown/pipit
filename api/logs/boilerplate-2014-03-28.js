'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon CloudWatch Logs version 2014-03-28
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.DescribeExportTasks = function DescribeExportTasks(aws) {
        var limit = aws.params.limit /* integer */;
        var nextToken = aws.params.nextToken;
        var taskId = aws.params.taskId;
        var statusCode = aws.params.statusCode;


        // TODO implement code

        var ret = {
            exportTasks: [ {
                status: {
                    code: "",
                    message: ""
                },
                taskName: "",
                to: 0 /*long*/,
                taskId: "",
                executionInfo: {
                    completionTime: 0 /*long*/,
                    creationTime: 0 /*long*/
                },
                destination: "",
                logGroupName: "",
                from: 0 /*long*/,
                destinationPrefix: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.PutRetentionPolicy = function PutRetentionPolicy(aws) {
        var retentionInDays = aws.params.retentionInDays /* integer */;
        var logGroupName = aws.params.logGroupName;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! retentionInDays) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter retentionInDays"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.CreateExportTask = function CreateExportTask(aws) {
        var taskName = aws.params.taskName;
        var to = aws.params.to /* long */;
        var logStreamNamePrefix = aws.params.logStreamNamePrefix;
        var destination = aws.params.destination;
        var logGroupName = aws.params.logGroupName;
        var from = aws.params.from /* long */;
        var destinationPrefix = aws.params.destinationPrefix;
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
module.exports.DeleteLogGroup = function DeleteLogGroup(aws) {
        var logGroupName = aws.params.logGroupName;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeleteDestination = function DeleteDestination(aws) {
        var destinationName = aws.params.destinationName;
        if (! destinationName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter destinationName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeleteRetentionPolicy = function DeleteRetentionPolicy(aws) {
        var logGroupName = aws.params.logGroupName;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutLogEvents = function PutLogEvents(aws) {
        var logEvents = aws.params.logEvents /* list */;
        var logStreamName = aws.params.logStreamName;
        var logGroupName = aws.params.logGroupName;
        var sequenceToken = aws.params.sequenceToken;
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
                tooNewLogEventStartIndex: 0,
                tooOldLogEventEndIndex: 0
            },
            nextSequenceToken: ""
        };
        return [200, ret];
    }
module.exports.DeleteLogStream = function DeleteLogStream(aws) {
        var logStreamName = aws.params.logStreamName;
        var logGroupName = aws.params.logGroupName;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! logStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logStreamName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.CancelExportTask = function CancelExportTask(aws) {
        var taskId = aws.params.taskId;
        if (! taskId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskId"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeLogStreams = function DescribeLogStreams(aws) {
        var descending = aws.params.descending /* boolean */;
        var logStreamNamePrefix = aws.params.logStreamNamePrefix;
        var limit = aws.params.limit /* integer */;
        var logGroupName = aws.params.logGroupName;
        var orderBy = aws.params.orderBy;
        var nextToken = aws.params.nextToken;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {
            logStreams: [ {
                arn: "",
                logStreamName: "",
                firstEventTimestamp: 0 /*long*/,
                lastEventTimestamp: 0 /*long*/,
                uploadSequenceToken: "",
                lastIngestionTime: 0 /*long*/,
                storedBytes: 0 /*long*/,
                creationTime: 0 /*long*/
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.DescribeDestinations = function DescribeDestinations(aws) {
        var limit = aws.params.limit /* integer */;
        var DestinationNamePrefix = aws.params.DestinationNamePrefix;
        var nextToken = aws.params.nextToken;


        // TODO implement code

        var ret = {
            destinations: [ /*Sq*/{
                arn: "",
                accessPolicy: "",
                targetArn: "",
                destinationName: "",
                roleArn: "",
                creationTime: 0 /*long*/
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.DescribeMetricFilters = function DescribeMetricFilters(aws) {
        var limit = aws.params.limit /* integer */;
        var logGroupName = aws.params.logGroupName;
        var filterNamePrefix = aws.params.filterNamePrefix;
        var nextToken = aws.params.nextToken;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {
            nextToken: "",
            metricFilters: [ {
                filterPattern: "",
                creationTime: 0 /*long*/,
                filterName: "",
                metricTransformations: /*S1m*/[ {
                    metricNamespace: "",
                    metricValue: "",
                    metricName: ""
                } /*, ...*/ ]
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DescribeSubscriptionFilters = function DescribeSubscriptionFilters(aws) {
        var limit = aws.params.limit /* integer */;
        var logGroupName = aws.params.logGroupName;
        var filterNamePrefix = aws.params.filterNamePrefix;
        var nextToken = aws.params.nextToken;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {
            subscriptionFilters: [ {
                filterPattern: "",
                logGroupName: "",
                creationTime: 0 /*long*/,
                roleArn: "",
                filterName: "",
                destinationArn: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.FilterLogEvents = function FilterLogEvents(aws) {
        var filterPattern = aws.params.filterPattern;
        var interleaved = aws.params.interleaved /* boolean */;
        var endTime = aws.params.endTime /* long */;
        var limit = aws.params.limit /* integer */;
        var logGroupName = aws.params.logGroupName;
        var startTime = aws.params.startTime /* long */;
        var logStreamNames = aws.params.logStreamNames /* list */;
        var nextToken = aws.params.nextToken;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {
            events: [ {
                timestamp: 0 /*long*/,
                logStreamName: "",
                eventId: "",
                ingestionTime: 0 /*long*/,
                message: ""
            } /*, ...*/ ],
            nextToken: "",
            searchedLogStreams: [ {
                logStreamName: "",
                searchedCompletely: false
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteSubscriptionFilter = function DeleteSubscriptionFilter(aws) {
        var logGroupName = aws.params.logGroupName;
        var filterName = aws.params.filterName;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! filterName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutDestinationPolicy = function PutDestinationPolicy(aws) {
        var destinationName = aws.params.destinationName;
        var accessPolicy = aws.params.accessPolicy;
        if (! destinationName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter destinationName"];
        }        if (! accessPolicy) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter accessPolicy"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutMetricFilter = function PutMetricFilter(aws) {
        var filterPattern = aws.params.filterPattern;
        var logGroupName = aws.params.logGroupName;
        var filterName = aws.params.filterName;
        var metricTransformations = aws.params.metricTransformations;
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
module.exports.TestMetricFilter = function TestMetricFilter(aws) {
        var filterPattern = aws.params.filterPattern;
        var logEventMessages = aws.params.logEventMessages /* list */;
        if (! filterPattern) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterPattern"];
        }        if (! logEventMessages) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logEventMessages"];
        }

        // TODO implement code

        var ret = {
            matches: [ {
                eventMessage: "",
                extractedValues: {} /* map */,
                eventNumber: 0 /*long*/
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteMetricFilter = function DeleteMetricFilter(aws) {
        var logGroupName = aws.params.logGroupName;
        var filterName = aws.params.filterName;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! filterName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter filterName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeLogGroups = function DescribeLogGroups(aws) {
        var limit = aws.params.limit /* integer */;
        var nextToken = aws.params.nextToken;
        var logGroupNamePrefix = aws.params.logGroupNamePrefix;


        // TODO implement code

        var ret = {
            logGroups: [ {
                retentionInDays: 0,
                arn: "",
                metricFilterCount: 0,
                storedBytes: 0 /*long*/,
                logGroupName: "",
                creationTime: 0 /*long*/
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.PutDestination = function PutDestination(aws) {
        var destinationName = aws.params.destinationName;
        var roleArn = aws.params.roleArn;
        var targetArn = aws.params.targetArn;
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
                arn: "",
                accessPolicy: "",
                targetArn: "",
                destinationName: "",
                roleArn: "",
                creationTime: 0 /*long*/
            }
        };
        return [200, ret];
    }
module.exports.CreateLogGroup = function CreateLogGroup(aws) {
        var logGroupName = aws.params.logGroupName;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutSubscriptionFilter = function PutSubscriptionFilter(aws) {
        var roleArn = aws.params.roleArn;
        var filterPattern = aws.params.filterPattern;
        var logGroupName = aws.params.logGroupName;
        var filterName = aws.params.filterName;
        var destinationArn = aws.params.destinationArn;
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
module.exports.CreateLogStream = function CreateLogStream(aws) {
        var logStreamName = aws.params.logStreamName;
        var logGroupName = aws.params.logGroupName;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! logStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logStreamName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.GetLogEvents = function GetLogEvents(aws) {
        var logStreamName = aws.params.logStreamName;
        var startFromHead = aws.params.startFromHead /* boolean */;
        var limit = aws.params.limit /* integer */;
        var endTime = aws.params.endTime /* long */;
        var startTime = aws.params.startTime /* long */;
        var logGroupName = aws.params.logGroupName;
        var nextToken = aws.params.nextToken;
        if (! logGroupName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logGroupName"];
        }        if (! logStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter logStreamName"];
        }

        // TODO implement code

        var ret = {
            events: [ {
                timestamp: 0 /*long*/,
                ingestionTime: 0 /*long*/,
                message: ""
            } /*, ...*/ ],
            nextBackwardToken: "",
            nextForwardToken: ""
        };
        return [200, ret];
    }
