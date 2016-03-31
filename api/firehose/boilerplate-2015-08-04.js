'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * 0 version 2015-08-04
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null)
module.exports.ListDeliveryStreams = function ListDeliveryStreams(aws) {
        var ExclusiveStartDeliveryStreamName = aws.params['ExclusiveStartDeliveryStreamName'];
        var Limit = aws.params['Limit'] /* integer */;


        // TODO implement code

        var ret = {
            HasMoreDeliveryStreams: false,
            DeliveryStreamNames: [ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteDeliveryStream = function DeleteDeliveryStream(aws) {
        var DeliveryStreamName = aws.params['DeliveryStreamName'];
        if (! DeliveryStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DeliveryStreamName"];
        }


        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.CreateDeliveryStream = function CreateDeliveryStream(aws) {
        var RedshiftDestinationConfiguration = aws.params['RedshiftDestinationConfiguration'] /* structure */;
        var S3DestinationConfiguration = aws.params['S3DestinationConfiguration'];
        var DeliveryStreamName = aws.params['DeliveryStreamName'];
        if (! DeliveryStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DeliveryStreamName"];
        }


        // TODO implement code

        var ret = {
            DeliveryStreamARN: ""
        };
        return [200, ret];
    }
module.exports.PutRecord = function PutRecord(aws) {
        var Record = aws.params['Record'];
        var DeliveryStreamName = aws.params['DeliveryStreamName'];
        if (! DeliveryStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DeliveryStreamName"];
        }
        if (! Record) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Record"];
        }


        // TODO implement code

        var ret = {
            RecordId: ""
        };
        return [200, ret];
    }
module.exports.UpdateDestination = function UpdateDestination(aws) {
        var CurrentDeliveryStreamVersionId = aws.params['CurrentDeliveryStreamVersionId'];
        var S3DestinationUpdate = aws.params['S3DestinationUpdate'];
        var RedshiftDestinationUpdate = aws.params['RedshiftDestinationUpdate'] /* structure */;
        var DeliveryStreamName = aws.params['DeliveryStreamName'];
        var DestinationId = aws.params['DestinationId'];
        if (! DeliveryStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DeliveryStreamName"];
        }
        if (! CurrentDeliveryStreamVersionId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter CurrentDeliveryStreamVersionId"];
        }
        if (! DestinationId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DestinationId"];
        }


        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.DescribeDeliveryStream = function DescribeDeliveryStream(aws) {
        var Limit = aws.params['Limit'] /* integer */;
        var ExclusiveStartDestinationId = aws.params['ExclusiveStartDestinationId'];
        var DeliveryStreamName = aws.params['DeliveryStreamName'];
        if (! DeliveryStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DeliveryStreamName"];
        }


        // TODO implement code

        var ret = {
            DeliveryStreamDescription: {
                VersionId: "",
                DeliveryStreamStatus: "",
                LastUpdateTimestamp: now(),
                CreateTimestamp: now(),
                DeliveryStreamName: "",
                DeliveryStreamARN: "",
                Destinations: [ {
                    RedshiftDestinationDescription: {
                        RoleARN: "",
                        CopyCommand: /*Sh*/{
                            DataTableColumns: "",
                            CopyOptions: "",
                            DataTableName: ""
                        },
                        S3DestinationDescription: /*S11*/{
                            BufferingHints: /*S7*/{
                                SizeInMBs: 0,
                                IntervalInSeconds: 0
                            },
                            RoleARN: "",
                            BucketARN: "",
                            Prefix: "",
                            CompressionFormat: "",
                            EncryptionConfiguration: /*Sb*/{
                                KMSEncryptionConfig: {
                                    AWSKMSKeyARN: ""
                                },
                                NoEncryptionConfig: ""
                            }
                        },
                        Username: /*Sl*/"",
                        ClusterJDBCURL: ""
                    },
                    S3DestinationDescription: /*S11*/{
                            BufferingHints: /*S7*/{
                                SizeInMBs: 0,
                                IntervalInSeconds: 0
                            },
                            RoleARN: "",
                            BucketARN: "",
                            Prefix: "",
                            CompressionFormat: "",
                            EncryptionConfiguration: /*Sb*/{
                                KMSEncryptionConfig: {
                                    AWSKMSKeyARN: ""
                                },
                                NoEncryptionConfig: ""
                            }
                        },
                    DestinationId: ""
                } /*, ...*/ ],
                HasMoreDestinations: false
            }
        };
        return [200, ret];
    }
module.exports.PutRecordBatch = function PutRecordBatch(aws) {
        var DeliveryStreamName = aws.params['DeliveryStreamName'];
        var Records = aws.params['Records'] /* list */;
        if (! DeliveryStreamName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DeliveryStreamName"];
        }
        if (! Records) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Records"];
        }


        // TODO implement code

        var ret = {
            RequestResponses: [ {
                RecordId: "",
                ErrorCode: "",
                ErrorMessage: ""
            } /*, ...*/ ],
            FailedPutCount: 0
        };
        return [200, ret];
    }