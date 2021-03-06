'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon DynamoDB Streams version 2012-08-10
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);
// -----------------------------------
module.exports.DescribeStream = function DescribeStream(aws) {
  var exclusiveStartShardId = aws.params.ExclusiveStartShardId;
  var limit = aws.params.Limit /* Type integer */;
  var streamArn = aws.params.StreamArn;
  if (!streamArn) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StreamArn'];
  }


  // TODO implement code

  var ret = {
    StreamDescription: {
      CreationRequestDateTime: awsCommon.timestamp(),
      KeySchema: [ {
        AttributeName: '',
        KeyType: '',
      }, /* ...*/ ],
      LastEvaluatedShardId: '',
      Shards: [ {
        ParentShardId: '',
        SequenceNumberRange: {
          EndingSequenceNumber: '',
          StartingSequenceNumber: '',
        },
        ShardId: '',
      }, /* ...*/ ],
      StreamArn: '',
      StreamLabel: '',
      StreamStatus: '',
      StreamViewType: '',
      TableName: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetRecords = function GetRecords(aws) {
  var limit = aws.params.Limit /* Type integer */;
  var shardIterator = aws.params.ShardIterator;
  if (!shardIterator) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ShardIterator'];
  }


  // TODO implement code

  var ret = {
    NextShardIterator: '',
    Records: [ {
      awsRegion: '',
      dynamodb: {
        Keys: /*Sr*/{} /*Map*/,
        NewImage: /*Sr*/{} /*Map*/,
        OldImage: /*Sr*/{} /*Map*/,
        SequenceNumber: '',
        SizeBytes: 0 /*Long*/,
        StreamViewType: '',
      },
      eventID: '',
      eventName: '',
      eventSource: '',
      eventVersion: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetShardIterator = function GetShardIterator(aws) {
  var sequenceNumber = aws.params.SequenceNumber;
  var shardId = aws.params.ShardId;
  var shardIteratorType = aws.params.ShardIteratorType;
  var streamArn = aws.params.StreamArn;
  if (!shardId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ShardId'];
  }
  if (!shardIteratorType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ShardIteratorType'];
  }
  if (!streamArn) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StreamArn'];
  }


  // TODO implement code

  var ret = {
    ShardIterator: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListStreams = function ListStreams(aws) {
  var exclusiveStartStreamArn = aws.params.ExclusiveStartStreamArn;
  var limit = aws.params.Limit /* Type integer */;
  var tableName = aws.params.TableName;


  // TODO implement code

  var ret = {
    LastEvaluatedStreamArn: '',
    Streams: [ {
      StreamArn: '',
      StreamLabel: '',
      TableName: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
