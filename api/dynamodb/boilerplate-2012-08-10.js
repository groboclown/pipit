'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon DynamoDB version 2012-08-10
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null)
// -----------------------------------
module.exports.Scan = function Scan(aws) {
  var ExclusiveStartKey = aws.params['ExclusiveStartKey'];
  var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
  var Select = aws.params['Select'];
  var Limit = aws.params['Limit'] /* Type integer */;
  var AttributesToGet = aws.params['AttributesToGet'];
  var ConditionalOperator = aws.params['ConditionalOperator'];
  var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
  var ConsistentRead = aws.params['ConsistentRead'] /* Type boolean */;
  var IndexName = aws.params['IndexName'];
  var ScanFilter = aws.params['ScanFilter'];
  var ProjectionExpression = aws.params['ProjectionExpression'];
  var TotalSegments = aws.params['TotalSegments'] /* Type integer */;
  var FilterExpression = aws.params['FilterExpression'];
  var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
  var Segment = aws.params['Segment'] /* Type integer */;
  var TableName = aws.params['TableName'];
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }


  // TODO implement code

  var ret = {
    ConsumedCapacity: /*Su*/{
      GlobalSecondaryIndexes: /*Sx*/{} /*Map*/,
      CapacityUnits: 0.0 /*Double*/,
      Table: /*Sw*/{
        CapacityUnits: 0.0 /*Double*/,
      },
      LocalSecondaryIndexes: /*Sx*/{} /*Map*/,
      TableName: '',
    },
    LastEvaluatedKey: /*S6*/{} /*Map*/,
    ScannedCount: 0,
    Items: /*Sr*/[ /*Ss*/{} /*Map*/, /* ...*/ ],
    Count: 0,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListTables = function ListTables(aws) {
  var ExclusiveStartTableName = aws.params['ExclusiveStartTableName'];
  var Limit = aws.params['Limit'] /* Type integer */;


  // TODO implement code

  var ret = {
    LastEvaluatedTableName: '',
    TableNames: [ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteItem = function DeleteItem(aws) {
  var ConditionalOperator = aws.params['ConditionalOperator'];
  var Expected = aws.params['Expected'];
  var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
  var ConditionExpression = aws.params['ConditionExpression'];
  var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
  var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
  var Key = aws.params['Key'];
  var ReturnItemCollectionMetrics = aws.params['ReturnItemCollectionMetrics'];
  var ReturnValues = aws.params['ReturnValues'];
  var TableName = aws.params['TableName'];
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }
  if (!Key) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Key'];
  }


  // TODO implement code

  var ret = {
    ItemCollectionMetrics: /*S1a*/{
      SizeEstimateRangeGB: [ 0.0 /*Double*/, /* ...*/ ],
      ItemCollectionKey: {} /*Map*/,
    },
    ConsumedCapacity: /*Su*/{
      GlobalSecondaryIndexes: /*Sx*/{} /*Map*/,
      CapacityUnits: 0.0 /*Double*/,
      Table: /*Sw*/{
        CapacityUnits: 0.0 /*Double*/,
      },
      LocalSecondaryIndexes: /*Sx*/{} /*Map*/,
      TableName: '',
    },
    Attributes: /*Ss*/{} /*Map*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeTable = function DescribeTable(aws) {
  var TableName = aws.params['TableName'];
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }


  // TODO implement code

  var ret = {
    Table: /*S20*/{
      KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
      CreationDateTime: awsCommon.timestamp(),
      ProvisionedThroughput: /*S23*/{
        LastDecreaseDateTime: awsCommon.timestamp(),
        LastIncreaseDateTime: awsCommon.timestamp(),
        WriteCapacityUnits: 0 /*Long*/,
        ReadCapacityUnits: 0 /*Long*/,
        NumberOfDecreasesToday: 0 /*Long*/,
      },
      LatestStreamArn: '',
      StreamSpecification: /*S1w*/{
        StreamViewType: '',
        StreamEnabled: false,
      },
      TableSizeBytes: 0 /*Long*/,
      AttributeDefinitions: /*S1f*/[ {
        AttributeType: '',
        AttributeName: '',
      }, /* ...*/ ],
      GlobalSecondaryIndexes: [ {
        IndexName: '',
        KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
        Backfilling: false,
        ProvisionedThroughput: /*S23*/{
        LastDecreaseDateTime: awsCommon.timestamp(),
        LastIncreaseDateTime: awsCommon.timestamp(),
        WriteCapacityUnits: 0 /*Long*/,
        ReadCapacityUnits: 0 /*Long*/,
        NumberOfDecreasesToday: 0 /*Long*/,
      },
        ItemCount: 0 /*Long*/,
        IndexStatus: '',
        IndexArn: '',
        Projection: /*S1o*/{
          NonKeyAttributes: [ '', /* ...*/ ],
          ProjectionType: '',
        },
        IndexSizeBytes: 0 /*Long*/,
      }, /* ...*/ ],
      ItemCount: 0 /*Long*/,
      LatestStreamLabel: '',
      LocalSecondaryIndexes: [ {
        IndexName: '',
        KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
        IndexSizeBytes: 0 /*Long*/,
        ItemCount: 0 /*Long*/,
        IndexArn: '',
        Projection: /*S1o*/{
          NonKeyAttributes: [ '', /* ...*/ ],
          ProjectionType: '',
        },
      }, /* ...*/ ],
      TableArn: '',
      TableStatus: '',
      TableName: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutItem = function PutItem(aws) {
  var ConditionExpression = aws.params['ConditionExpression'];
  var ConditionalOperator = aws.params['ConditionalOperator'];
  var Expected = aws.params['Expected'];
  var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
  var Item = aws.params['Item'];
  var ReturnValues = aws.params['ReturnValues'];
  var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
  var ReturnItemCollectionMetrics = aws.params['ReturnItemCollectionMetrics'];
  var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
  var TableName = aws.params['TableName'];
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }
  if (!Item) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Item'];
  }


  // TODO implement code

  var ret = {
    ItemCollectionMetrics: /*S1a*/{
      SizeEstimateRangeGB: [ 0.0 /*Double*/, /* ...*/ ],
      ItemCollectionKey: {} /*Map*/,
    },
    ConsumedCapacity: /*Su*/{
      GlobalSecondaryIndexes: /*Sx*/{} /*Map*/,
      CapacityUnits: 0.0 /*Double*/,
      Table: /*Sw*/{
        CapacityUnits: 0.0 /*Double*/,
      },
      LocalSecondaryIndexes: /*Sx*/{} /*Map*/,
      TableName: '',
    },
    Attributes: /*Ss*/{} /*Map*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateTable = function CreateTable(aws) {
  var GlobalSecondaryIndexes = aws.params['GlobalSecondaryIndexes'] /* Type list */;
  var KeySchema = aws.params['KeySchema'];
  var ProvisionedThroughput = aws.params['ProvisionedThroughput'];
  var LocalSecondaryIndexes = aws.params['LocalSecondaryIndexes'] /* Type list */;
  var StreamSpecification = aws.params['StreamSpecification'];
  var AttributeDefinitions = aws.params['AttributeDefinitions'];
  var TableName = aws.params['TableName'];
  if (!AttributeDefinitions) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AttributeDefinitions'];
  }
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }
  if (!KeySchema) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeySchema'];
  }
  if (!ProvisionedThroughput) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ProvisionedThroughput'];
  }


  // TODO implement code

  var ret = {
    TableDescription: /*S20*/{
      KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
      CreationDateTime: awsCommon.timestamp(),
      ProvisionedThroughput: /*S23*/{
        LastDecreaseDateTime: awsCommon.timestamp(),
        LastIncreaseDateTime: awsCommon.timestamp(),
        WriteCapacityUnits: 0 /*Long*/,
        ReadCapacityUnits: 0 /*Long*/,
        NumberOfDecreasesToday: 0 /*Long*/,
      },
      LatestStreamArn: '',
      StreamSpecification: /*S1w*/{
        StreamViewType: '',
        StreamEnabled: false,
      },
      TableSizeBytes: 0 /*Long*/,
      AttributeDefinitions: /*S1f*/[ {
        AttributeType: '',
        AttributeName: '',
      }, /* ...*/ ],
      GlobalSecondaryIndexes: [ {
        IndexName: '',
        KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
        Backfilling: false,
        ProvisionedThroughput: /*S23*/{
        LastDecreaseDateTime: awsCommon.timestamp(),
        LastIncreaseDateTime: awsCommon.timestamp(),
        WriteCapacityUnits: 0 /*Long*/,
        ReadCapacityUnits: 0 /*Long*/,
        NumberOfDecreasesToday: 0 /*Long*/,
      },
        ItemCount: 0 /*Long*/,
        IndexStatus: '',
        IndexArn: '',
        Projection: /*S1o*/{
          NonKeyAttributes: [ '', /* ...*/ ],
          ProjectionType: '',
        },
        IndexSizeBytes: 0 /*Long*/,
      }, /* ...*/ ],
      ItemCount: 0 /*Long*/,
      LatestStreamLabel: '',
      LocalSecondaryIndexes: [ {
        IndexName: '',
        KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
        IndexSizeBytes: 0 /*Long*/,
        ItemCount: 0 /*Long*/,
        IndexArn: '',
        Projection: /*S1o*/{
          NonKeyAttributes: [ '', /* ...*/ ],
          ProjectionType: '',
        },
      }, /* ...*/ ],
      TableArn: '',
      TableStatus: '',
      TableName: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateTable = function UpdateTable(aws) {
  var StreamSpecification = aws.params['StreamSpecification'];
  var ProvisionedThroughput = aws.params['ProvisionedThroughput'];
  var GlobalSecondaryIndexUpdates = aws.params['GlobalSecondaryIndexUpdates'] /* Type list */;
  var AttributeDefinitions = aws.params['AttributeDefinitions'];
  var TableName = aws.params['TableName'];
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }


  // TODO implement code

  var ret = {
    TableDescription: /*S20*/{
      KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
      CreationDateTime: awsCommon.timestamp(),
      ProvisionedThroughput: /*S23*/{
        LastDecreaseDateTime: awsCommon.timestamp(),
        LastIncreaseDateTime: awsCommon.timestamp(),
        WriteCapacityUnits: 0 /*Long*/,
        ReadCapacityUnits: 0 /*Long*/,
        NumberOfDecreasesToday: 0 /*Long*/,
      },
      LatestStreamArn: '',
      StreamSpecification: /*S1w*/{
        StreamViewType: '',
        StreamEnabled: false,
      },
      TableSizeBytes: 0 /*Long*/,
      AttributeDefinitions: /*S1f*/[ {
        AttributeType: '',
        AttributeName: '',
      }, /* ...*/ ],
      GlobalSecondaryIndexes: [ {
        IndexName: '',
        KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
        Backfilling: false,
        ProvisionedThroughput: /*S23*/{
        LastDecreaseDateTime: awsCommon.timestamp(),
        LastIncreaseDateTime: awsCommon.timestamp(),
        WriteCapacityUnits: 0 /*Long*/,
        ReadCapacityUnits: 0 /*Long*/,
        NumberOfDecreasesToday: 0 /*Long*/,
      },
        ItemCount: 0 /*Long*/,
        IndexStatus: '',
        IndexArn: '',
        Projection: /*S1o*/{
          NonKeyAttributes: [ '', /* ...*/ ],
          ProjectionType: '',
        },
        IndexSizeBytes: 0 /*Long*/,
      }, /* ...*/ ],
      ItemCount: 0 /*Long*/,
      LatestStreamLabel: '',
      LocalSecondaryIndexes: [ {
        IndexName: '',
        KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
        IndexSizeBytes: 0 /*Long*/,
        ItemCount: 0 /*Long*/,
        IndexArn: '',
        Projection: /*S1o*/{
          NonKeyAttributes: [ '', /* ...*/ ],
          ProjectionType: '',
        },
      }, /* ...*/ ],
      TableArn: '',
      TableStatus: '',
      TableName: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.Query = function Query(aws) {
  var ExclusiveStartKey = aws.params['ExclusiveStartKey'];
  var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
  var Select = aws.params['Select'];
  var Limit = aws.params['Limit'] /* Type integer */;
  var AttributesToGet = aws.params['AttributesToGet'];
  var ConditionalOperator = aws.params['ConditionalOperator'];
  var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
  var KeyConditionExpression = aws.params['KeyConditionExpression'];
  var ProjectionExpression = aws.params['ProjectionExpression'];
  var ConsistentRead = aws.params['ConsistentRead'] /* Type boolean */;
  var IndexName = aws.params['IndexName'];
  var ScanIndexForward = aws.params['ScanIndexForward'] /* Type boolean */;
  var QueryFilter = aws.params['QueryFilter'];
  var KeyConditions = aws.params['KeyConditions'] /* Type map */;
  var FilterExpression = aws.params['FilterExpression'];
  var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
  var TableName = aws.params['TableName'];
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }


  // TODO implement code

  var ret = {
    ConsumedCapacity: /*Su*/{
      GlobalSecondaryIndexes: /*Sx*/{} /*Map*/,
      CapacityUnits: 0.0 /*Double*/,
      Table: /*Sw*/{
        CapacityUnits: 0.0 /*Double*/,
      },
      LocalSecondaryIndexes: /*Sx*/{} /*Map*/,
      TableName: '',
    },
    LastEvaluatedKey: /*S6*/{} /*Map*/,
    ScannedCount: 0,
    Items: /*Sr*/[ /*Ss*/{} /*Map*/, /* ...*/ ],
    Count: 0,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateItem = function UpdateItem(aws) {
  var ConditionalOperator = aws.params['ConditionalOperator'];
  var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
  var AttributeUpdates = aws.params['AttributeUpdates'] /* Type map */;
  var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
  var Key = aws.params['Key'];
  var ReturnItemCollectionMetrics = aws.params['ReturnItemCollectionMetrics'];
  var ReturnValues = aws.params['ReturnValues'];
  var Expected = aws.params['Expected'];
  var ConditionExpression = aws.params['ConditionExpression'];
  var UpdateExpression = aws.params['UpdateExpression'];
  var ExpressionAttributeValues = aws.params['ExpressionAttributeValues'];
  var TableName = aws.params['TableName'];
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }
  if (!Key) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Key'];
  }


  // TODO implement code

  var ret = {
    ItemCollectionMetrics: /*S1a*/{
      SizeEstimateRangeGB: [ 0.0 /*Double*/, /* ...*/ ],
      ItemCollectionKey: {} /*Map*/,
    },
    ConsumedCapacity: /*Su*/{
      GlobalSecondaryIndexes: /*Sx*/{} /*Map*/,
      CapacityUnits: 0.0 /*Double*/,
      Table: /*Sw*/{
        CapacityUnits: 0.0 /*Double*/,
      },
      LocalSecondaryIndexes: /*Sx*/{} /*Map*/,
      TableName: '',
    },
    Attributes: /*Ss*/{} /*Map*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.BatchGetItem = function BatchGetItem(aws) {
  var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
  var RequestItems = aws.params['RequestItems'];
  if (!RequestItems) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RequestItems'];
  }


  // TODO implement code

  var ret = {
    Responses: {} /*Map*/,
    UnprocessedKeys: /*S2*/{} /*Map*/,
    ConsumedCapacity: /*St*/[ /*Su*/{
      GlobalSecondaryIndexes: /*Sx*/{} /*Map*/,
      CapacityUnits: 0.0 /*Double*/,
      Table: /*Sw*/{
        CapacityUnits: 0.0 /*Double*/,
      },
      LocalSecondaryIndexes: /*Sx*/{} /*Map*/,
      TableName: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.BatchWriteItem = function BatchWriteItem(aws) {
  var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
  var ReturnItemCollectionMetrics = aws.params['ReturnItemCollectionMetrics'];
  var RequestItems = aws.params['RequestItems'];
  if (!RequestItems) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RequestItems'];
  }


  // TODO implement code

  var ret = {
    UnprocessedItems: /*S10*/{} /*Map*/,
    ItemCollectionMetrics: {} /*Map*/,
    ConsumedCapacity: /*St*/[ /*Su*/{
      GlobalSecondaryIndexes: /*Sx*/{} /*Map*/,
      CapacityUnits: 0.0 /*Double*/,
      Table: /*Sw*/{
        CapacityUnits: 0.0 /*Double*/,
      },
      LocalSecondaryIndexes: /*Sx*/{} /*Map*/,
      TableName: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteTable = function DeleteTable(aws) {
  var TableName = aws.params['TableName'];
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }


  // TODO implement code

  var ret = {
    TableDescription: /*S20*/{
      KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
      CreationDateTime: awsCommon.timestamp(),
      ProvisionedThroughput: /*S23*/{
        LastDecreaseDateTime: awsCommon.timestamp(),
        LastIncreaseDateTime: awsCommon.timestamp(),
        WriteCapacityUnits: 0 /*Long*/,
        ReadCapacityUnits: 0 /*Long*/,
        NumberOfDecreasesToday: 0 /*Long*/,
      },
      LatestStreamArn: '',
      StreamSpecification: /*S1w*/{
        StreamViewType: '',
        StreamEnabled: false,
      },
      TableSizeBytes: 0 /*Long*/,
      AttributeDefinitions: /*S1f*/[ {
        AttributeType: '',
        AttributeName: '',
      }, /* ...*/ ],
      GlobalSecondaryIndexes: [ {
        IndexName: '',
        KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
        Backfilling: false,
        ProvisionedThroughput: /*S23*/{
        LastDecreaseDateTime: awsCommon.timestamp(),
        LastIncreaseDateTime: awsCommon.timestamp(),
        WriteCapacityUnits: 0 /*Long*/,
        ReadCapacityUnits: 0 /*Long*/,
        NumberOfDecreasesToday: 0 /*Long*/,
      },
        ItemCount: 0 /*Long*/,
        IndexStatus: '',
        IndexArn: '',
        Projection: /*S1o*/{
          NonKeyAttributes: [ '', /* ...*/ ],
          ProjectionType: '',
        },
        IndexSizeBytes: 0 /*Long*/,
      }, /* ...*/ ],
      ItemCount: 0 /*Long*/,
      LatestStreamLabel: '',
      LocalSecondaryIndexes: [ {
        IndexName: '',
        KeySchema: /*S1j*/[ {
        KeyType: '',
        AttributeName: '',
      }, /* ...*/ ],
        IndexSizeBytes: 0 /*Long*/,
        ItemCount: 0 /*Long*/,
        IndexArn: '',
        Projection: /*S1o*/{
          NonKeyAttributes: [ '', /* ...*/ ],
          ProjectionType: '',
        },
      }, /* ...*/ ],
      TableArn: '',
      TableStatus: '',
      TableName: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetItem = function GetItem(aws) {
  var ReturnConsumedCapacity = aws.params['ReturnConsumedCapacity'];
  var ProjectionExpression = aws.params['ProjectionExpression'];
  var AttributesToGet = aws.params['AttributesToGet'];
  var ExpressionAttributeNames = aws.params['ExpressionAttributeNames'];
  var Key = aws.params['Key'];
  var TableName = aws.params['TableName'];
  var ConsistentRead = aws.params['ConsistentRead'] /* Type boolean */;
  if (!TableName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TableName'];
  }
  if (!Key) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Key'];
  }


  // TODO implement code

  var ret = {
    ConsumedCapacity: /*Su*/{
      GlobalSecondaryIndexes: /*Sx*/{} /*Map*/,
      CapacityUnits: 0.0 /*Double*/,
      Table: /*Sw*/{
        CapacityUnits: 0.0 /*Double*/,
      },
      LocalSecondaryIndexes: /*Sx*/{} /*Map*/,
      TableName: '',
    },
    Item: /*Ss*/{} /*Map*/,
  };
  return [200, ret];
};
