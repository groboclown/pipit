'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon DynamoDB version 2012-08-10
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.UpdateItem = function UpdateItem(aws) {
        var TableName = aws.params['TableName'];
        var Key = aws.params['Key'];
        var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
        var ConditionalOperator = aws.params['ConditionalOperator'];
        var ReturnValues = aws.params['ReturnValues'];
        var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
        var AttributeUpdates = aws.params['AttributeUpdates'] /* map */;
        var UpdateExpression = aws.params['UpdateExpression'];
        var ReturnItemCollectionMetrics = aws.params['ReturnItemCollectionMetrics'];
        var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
        var ConditionExpression = aws.params['ConditionExpression'];
        var Expected = aws.params['Expected'];
        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }        if (! Key) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Key"];
        }

        // TODO implement code

        var ret = {
            Attributes: /*Ss*/{} /* map */,
            ItemCollectionMetrics: /*S1a*/{
                ItemCollectionKey: {} /* map */,
                SizeEstimateRangeGB: [ 0.0 /*double*/ /*, ...*/ ]
            },
            ConsumedCapacity: /*Su*/{
                GlobalSecondaryIndexes: /*Sx*/{} /* map */,
                TableName: "",
                Table: /*Sw*/{
                    CapacityUnits: 0.0 /*double*/
                },
                CapacityUnits: 0.0 /*double*/,
                LocalSecondaryIndexes: /*Sx*/{} /* map */
            }
        };
        return [200, ret];
    }
module.exports.Query = function Query(aws) {
        var TableName = aws.params['TableName'];
        var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
        var Select = aws.params['Select'];
        var Limit = aws.params['Limit'] /* integer */;
        var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
        var ConditionalOperator = aws.params['ConditionalOperator'];
        var QueryFilter = aws.params['QueryFilter'];
        var KeyConditionExpression = aws.params['KeyConditionExpression'];
        var IndexName = aws.params['IndexName'];
        var ExclusiveStartKey = aws.params['ExclusiveStartKey'];
        var KeyConditions = aws.params['KeyConditions'] /* map */;
        var AttributesToGet = aws.params['AttributesToGet'];
        var ScanIndexForward = aws.params['ScanIndexForward'] /* boolean */;
        var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
        var ConsistentRead = aws.params['ConsistentRead'] /* boolean */;
        var ProjectionExpression = aws.params['ProjectionExpression'];
        var FilterExpression = aws.params['FilterExpression'];
        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }

        // TODO implement code

        var ret = {
            ScannedCount: 0,
            Items: /*Sr*/[ /*Ss*/{} /* map */ /*, ...*/ ],
            Count: 0,
            ConsumedCapacity: /*Su*/{
                GlobalSecondaryIndexes: /*Sx*/{} /* map */,
                TableName: "",
                Table: /*Sw*/{
                    CapacityUnits: 0.0 /*double*/
                },
                CapacityUnits: 0.0 /*double*/,
                LocalSecondaryIndexes: /*Sx*/{} /* map */
            },
            LastEvaluatedKey: /*S6*/{} /* map */
        };
        return [200, ret];
    }
module.exports.UpdateTable = function UpdateTable(aws) {
        var AttributeDefinitions = aws.params['AttributeDefinitions'];
        var TableName = aws.params['TableName'];
        var ProvisionedThroughput = aws.params['ProvisionedThroughput'];
        var GlobalSecondaryIndexUpdates = aws.params['GlobalSecondaryIndexUpdates'] /* list */;
        var StreamSpecification = aws.params['StreamSpecification'];
        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }

        // TODO implement code

        var ret = {
            TableDescription: /*S20*/{
                AttributeDefinitions: /*S1f*/[ {
                    AttributeType: "",
                    AttributeName: ""
                } /*, ...*/ ],
                TableName: "",
                LatestStreamLabel: "",
                StreamSpecification: /*S1w*/{
                    StreamEnabled: false,
                    StreamViewType: ""
                },
                LocalSecondaryIndexes: [ {
                    KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                    IndexName: "",
                    IndexArn: "",
                    Projection: /*S1o*/{
                        ProjectionType: "",
                        NonKeyAttributes: [ "" /*, ...*/ ]
                    },
                    ItemCount: 0 /*long*/,
                    IndexSizeBytes: 0 /*long*/
                } /*, ...*/ ],
                ProvisionedThroughput: /*S23*/{
                    LastIncreaseDateTime: now(),
                    LastDecreaseDateTime: now(),
                    ReadCapacityUnits: 0 /*long*/,
                    NumberOfDecreasesToday: 0 /*long*/,
                    WriteCapacityUnits: 0 /*long*/
                },
                TableArn: "",
                GlobalSecondaryIndexes: [ {
                    KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                    IndexName: "",
                    IndexArn: "",
                    ItemCount: 0 /*long*/,
                    Projection: /*S1o*/{
                        ProjectionType: "",
                        NonKeyAttributes: [ "" /*, ...*/ ]
                    },
                    ProvisionedThroughput: /*S23*/{
                    LastIncreaseDateTime: now(),
                    LastDecreaseDateTime: now(),
                    ReadCapacityUnits: 0 /*long*/,
                    NumberOfDecreasesToday: 0 /*long*/,
                    WriteCapacityUnits: 0 /*long*/
                },
                    IndexSizeBytes: 0 /*long*/,
                    Backfilling: false,
                    IndexStatus: ""
                } /*, ...*/ ],
                KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                TableSizeBytes: 0 /*long*/,
                ItemCount: 0 /*long*/,
                CreationDateTime: now(),
                LatestStreamArn: "",
                TableStatus: ""
            }
        };
        return [200, ret];
    }
module.exports.PutItem = function PutItem(aws) {
        var Item = aws.params['Item'];
        var TableName = aws.params['TableName'];
        var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
        var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
        var ReturnItemCollectionMetrics = aws.params['ReturnItemCollectionMetrics'];
        var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
        var ConditionalOperator = aws.params['ConditionalOperator'];
        var ConditionExpression = aws.params['ConditionExpression'];
        var Expected = aws.params['Expected'];
        var ReturnValues = aws.params['ReturnValues'];
        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }        if (! Item) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Item"];
        }

        // TODO implement code

        var ret = {
            Attributes: /*Ss*/{} /* map */,
            ItemCollectionMetrics: /*S1a*/{
                ItemCollectionKey: {} /* map */,
                SizeEstimateRangeGB: [ 0.0 /*double*/ /*, ...*/ ]
            },
            ConsumedCapacity: /*Su*/{
                GlobalSecondaryIndexes: /*Sx*/{} /* map */,
                TableName: "",
                Table: /*Sw*/{
                    CapacityUnits: 0.0 /*double*/
                },
                CapacityUnits: 0.0 /*double*/,
                LocalSecondaryIndexes: /*Sx*/{} /* map */
            }
        };
        return [200, ret];
    }
module.exports.GetItem = function GetItem(aws) {
        var TableName = aws.params['TableName'];
        var ConsistentRead = aws.params['ConsistentRead'] /* boolean */;
        var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
        var AttributesToGet = aws.params['AttributesToGet'];
        var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
        var Key = aws.params['Key'];
        var ProjectionExpression = aws.params['ProjectionExpression'];
        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }        if (! Key) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Key"];
        }

        // TODO implement code

        var ret = {
            Item: /*Ss*/{} /* map */,
            ConsumedCapacity: /*Su*/{
                GlobalSecondaryIndexes: /*Sx*/{} /* map */,
                TableName: "",
                Table: /*Sw*/{
                    CapacityUnits: 0.0 /*double*/
                },
                CapacityUnits: 0.0 /*double*/,
                LocalSecondaryIndexes: /*Sx*/{} /* map */
            }
        };
        return [200, ret];
    }
module.exports.BatchWriteItem = function BatchWriteItem(aws) {
        var ReturnItemCollectionMetrics = aws.params['ReturnItemCollectionMetrics'];
        var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
        var RequestItems = aws.params['RequestItems'];
        if (! RequestItems) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter RequestItems"];
        }

        // TODO implement code

        var ret = {
            ItemCollectionMetrics: {} /* map */,
            UnprocessedItems: /*S10*/{} /* map */,
            ConsumedCapacity: /*St*/[ /*Su*/{
                GlobalSecondaryIndexes: /*Sx*/{} /* map */,
                TableName: "",
                Table: /*Sw*/{
                    CapacityUnits: 0.0 /*double*/
                },
                CapacityUnits: 0.0 /*double*/,
                LocalSecondaryIndexes: /*Sx*/{} /* map */
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteTable = function DeleteTable(aws) {
        var TableName = aws.params['TableName'];
        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }

        // TODO implement code

        var ret = {
            TableDescription: /*S20*/{
                AttributeDefinitions: /*S1f*/[ {
                    AttributeType: "",
                    AttributeName: ""
                } /*, ...*/ ],
                TableName: "",
                LatestStreamLabel: "",
                StreamSpecification: /*S1w*/{
                    StreamEnabled: false,
                    StreamViewType: ""
                },
                LocalSecondaryIndexes: [ {
                    KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                    IndexName: "",
                    IndexArn: "",
                    Projection: /*S1o*/{
                        ProjectionType: "",
                        NonKeyAttributes: [ "" /*, ...*/ ]
                    },
                    ItemCount: 0 /*long*/,
                    IndexSizeBytes: 0 /*long*/
                } /*, ...*/ ],
                ProvisionedThroughput: /*S23*/{
                    LastIncreaseDateTime: now(),
                    LastDecreaseDateTime: now(),
                    ReadCapacityUnits: 0 /*long*/,
                    NumberOfDecreasesToday: 0 /*long*/,
                    WriteCapacityUnits: 0 /*long*/
                },
                TableArn: "",
                GlobalSecondaryIndexes: [ {
                    KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                    IndexName: "",
                    IndexArn: "",
                    ItemCount: 0 /*long*/,
                    Projection: /*S1o*/{
                        ProjectionType: "",
                        NonKeyAttributes: [ "" /*, ...*/ ]
                    },
                    ProvisionedThroughput: /*S23*/{
                    LastIncreaseDateTime: now(),
                    LastDecreaseDateTime: now(),
                    ReadCapacityUnits: 0 /*long*/,
                    NumberOfDecreasesToday: 0 /*long*/,
                    WriteCapacityUnits: 0 /*long*/
                },
                    IndexSizeBytes: 0 /*long*/,
                    Backfilling: false,
                    IndexStatus: ""
                } /*, ...*/ ],
                KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                TableSizeBytes: 0 /*long*/,
                ItemCount: 0 /*long*/,
                CreationDateTime: now(),
                LatestStreamArn: "",
                TableStatus: ""
            }
        };
        return [200, ret];
    }
module.exports.CreateTable = function CreateTable(aws) {
        var AttributeDefinitions = aws.params['AttributeDefinitions'];
        var KeySchema = aws.params['KeySchema'];
        var TableName = aws.params['TableName'];
        var LocalSecondaryIndexes = aws.params['LocalSecondaryIndexes'] /* list */;
        var StreamSpecification = aws.params['StreamSpecification'];
        var ProvisionedThroughput = aws.params['ProvisionedThroughput'];
        var GlobalSecondaryIndexes = aws.params['GlobalSecondaryIndexes'] /* list */;
        if (! AttributeDefinitions) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter AttributeDefinitions"];
        }        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }        if (! KeySchema) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter KeySchema"];
        }        if (! ProvisionedThroughput) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ProvisionedThroughput"];
        }

        // TODO implement code

        var ret = {
            TableDescription: /*S20*/{
                AttributeDefinitions: /*S1f*/[ {
                    AttributeType: "",
                    AttributeName: ""
                } /*, ...*/ ],
                TableName: "",
                LatestStreamLabel: "",
                StreamSpecification: /*S1w*/{
                    StreamEnabled: false,
                    StreamViewType: ""
                },
                LocalSecondaryIndexes: [ {
                    KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                    IndexName: "",
                    IndexArn: "",
                    Projection: /*S1o*/{
                        ProjectionType: "",
                        NonKeyAttributes: [ "" /*, ...*/ ]
                    },
                    ItemCount: 0 /*long*/,
                    IndexSizeBytes: 0 /*long*/
                } /*, ...*/ ],
                ProvisionedThroughput: /*S23*/{
                    LastIncreaseDateTime: now(),
                    LastDecreaseDateTime: now(),
                    ReadCapacityUnits: 0 /*long*/,
                    NumberOfDecreasesToday: 0 /*long*/,
                    WriteCapacityUnits: 0 /*long*/
                },
                TableArn: "",
                GlobalSecondaryIndexes: [ {
                    KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                    IndexName: "",
                    IndexArn: "",
                    ItemCount: 0 /*long*/,
                    Projection: /*S1o*/{
                        ProjectionType: "",
                        NonKeyAttributes: [ "" /*, ...*/ ]
                    },
                    ProvisionedThroughput: /*S23*/{
                    LastIncreaseDateTime: now(),
                    LastDecreaseDateTime: now(),
                    ReadCapacityUnits: 0 /*long*/,
                    NumberOfDecreasesToday: 0 /*long*/,
                    WriteCapacityUnits: 0 /*long*/
                },
                    IndexSizeBytes: 0 /*long*/,
                    Backfilling: false,
                    IndexStatus: ""
                } /*, ...*/ ],
                KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                TableSizeBytes: 0 /*long*/,
                ItemCount: 0 /*long*/,
                CreationDateTime: now(),
                LatestStreamArn: "",
                TableStatus: ""
            }
        };
        return [200, ret];
    }
module.exports.BatchGetItem = function BatchGetItem(aws) {
        var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
        var RequestItems = aws.params['RequestItems'];
        if (! RequestItems) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter RequestItems"];
        }

        // TODO implement code

        var ret = {
            ConsumedCapacity: /*St*/[ /*Su*/{
                GlobalSecondaryIndexes: /*Sx*/{} /* map */,
                TableName: "",
                Table: /*Sw*/{
                    CapacityUnits: 0.0 /*double*/
                },
                CapacityUnits: 0.0 /*double*/,
                LocalSecondaryIndexes: /*Sx*/{} /* map */
            } /*, ...*/ ],
            Responses: {} /* map */,
            UnprocessedKeys: /*S2*/{} /* map */
        };
        return [200, ret];
    }
module.exports.ListTables = function ListTables(aws) {
        var ExclusiveStartTableName = aws.params['ExclusiveStartTableName'];
        var Limit = aws.params['Limit'] /* integer */;


        // TODO implement code

        var ret = {
            LastEvaluatedTableName: "",
            TableNames: [ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DescribeTable = function DescribeTable(aws) {
        var TableName = aws.params['TableName'];
        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }

        // TODO implement code

        var ret = {
            Table: /*S20*/{
                AttributeDefinitions: /*S1f*/[ {
                    AttributeType: "",
                    AttributeName: ""
                } /*, ...*/ ],
                TableName: "",
                LatestStreamLabel: "",
                StreamSpecification: /*S1w*/{
                    StreamEnabled: false,
                    StreamViewType: ""
                },
                LocalSecondaryIndexes: [ {
                    KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                    IndexName: "",
                    IndexArn: "",
                    Projection: /*S1o*/{
                        ProjectionType: "",
                        NonKeyAttributes: [ "" /*, ...*/ ]
                    },
                    ItemCount: 0 /*long*/,
                    IndexSizeBytes: 0 /*long*/
                } /*, ...*/ ],
                ProvisionedThroughput: /*S23*/{
                    LastIncreaseDateTime: now(),
                    LastDecreaseDateTime: now(),
                    ReadCapacityUnits: 0 /*long*/,
                    NumberOfDecreasesToday: 0 /*long*/,
                    WriteCapacityUnits: 0 /*long*/
                },
                TableArn: "",
                GlobalSecondaryIndexes: [ {
                    KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                    IndexName: "",
                    IndexArn: "",
                    ItemCount: 0 /*long*/,
                    Projection: /*S1o*/{
                        ProjectionType: "",
                        NonKeyAttributes: [ "" /*, ...*/ ]
                    },
                    ProvisionedThroughput: /*S23*/{
                    LastIncreaseDateTime: now(),
                    LastDecreaseDateTime: now(),
                    ReadCapacityUnits: 0 /*long*/,
                    NumberOfDecreasesToday: 0 /*long*/,
                    WriteCapacityUnits: 0 /*long*/
                },
                    IndexSizeBytes: 0 /*long*/,
                    Backfilling: false,
                    IndexStatus: ""
                } /*, ...*/ ],
                KeySchema: /*S1j*/[ {
                        KeyType: "",
                        AttributeName: ""
                    } /*, ...*/ ],
                TableSizeBytes: 0 /*long*/,
                ItemCount: 0 /*long*/,
                CreationDateTime: now(),
                LatestStreamArn: "",
                TableStatus: ""
            }
        };
        return [200, ret];
    }
module.exports.DeleteItem = function DeleteItem(aws) {
        var TableName = aws.params['TableName'];
        var ConditionalOperator = aws.params['ConditionalOperator'];
        var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
        var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
        var ReturnItemCollectionMetrics = aws.params['ReturnItemCollectionMetrics'];
        var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
        var Key = aws.params['Key'];
        var ConditionExpression = aws.params['ConditionExpression'];
        var Expected = aws.params['Expected'];
        var ReturnValues = aws.params['ReturnValues'];
        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }        if (! Key) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Key"];
        }

        // TODO implement code

        var ret = {
            Attributes: /*Ss*/{} /* map */,
            ItemCollectionMetrics: /*S1a*/{
                ItemCollectionKey: {} /* map */,
                SizeEstimateRangeGB: [ 0.0 /*double*/ /*, ...*/ ]
            },
            ConsumedCapacity: /*Su*/{
                GlobalSecondaryIndexes: /*Sx*/{} /* map */,
                TableName: "",
                Table: /*Sw*/{
                    CapacityUnits: 0.0 /*double*/
                },
                CapacityUnits: 0.0 /*double*/,
                LocalSecondaryIndexes: /*Sx*/{} /* map */
            }
        };
        return [200, ret];
    }
module.exports.Scan = function Scan(aws) {
        var TableName = aws.params['TableName'];
        var FilterExpression = aws.params['FilterExpression'];
        var Select = aws.params['Select'];
        var Limit = aws.params['Limit'] /* integer */;
        var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
        var ConditionalOperator = aws.params['ConditionalOperator'];
        var ScanFilter = aws.params['ScanFilter'];
        var IndexName = aws.params['IndexName'];
        var ExclusiveStartKey = aws.params['ExclusiveStartKey'];
        var Segment = aws.params['Segment'] /* integer */;
        var TotalSegments = aws.params['TotalSegments'] /* integer */;
        var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
        var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
        var ConsistentRead = aws.params['ConsistentRead'] /* boolean */;
        var ProjectionExpression = aws.params['ProjectionExpression'];
        var AttributesToGet = aws.params['AttributesToGet'];
        if (! TableName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TableName"];
        }

        // TODO implement code

        var ret = {
            ScannedCount: 0,
            Items: /*Sr*/[ /*Ss*/{} /* map */ /*, ...*/ ],
            Count: 0,
            ConsumedCapacity: /*Su*/{
                GlobalSecondaryIndexes: /*Sx*/{} /* map */,
                TableName: "",
                Table: /*Sw*/{
                    CapacityUnits: 0.0 /*double*/
                },
                CapacityUnits: 0.0 /*double*/,
                LocalSecondaryIndexes: /*Sx*/{} /* map */
            },
            LastEvaluatedKey: /*S6*/{} /* map */
        };
        return [200, ret];
    }
