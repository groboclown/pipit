'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon CloudWatch Events version 2015-10-07
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);
// -----------------------------------
module.exports.DeleteRule = function DeleteRule(aws) {
  var name = aws.params.Name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeRule = function DescribeRule(aws) {
  var name = aws.params.Name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {
    Arn: '',
    Description: '',
    EventPattern: '',
    Name: '',
    RoleArn: '',
    ScheduleExpression: '',
    State: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DisableRule = function DisableRule(aws) {
  var name = aws.params.Name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.EnableRule = function EnableRule(aws) {
  var name = aws.params.Name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.ListRuleNamesByTarget = function ListRuleNamesByTarget(aws) {
  var limit = aws.params.Limit /* Type integer */;
  var nextToken = aws.params.NextToken;
  var targetArn = aws.params.TargetArn;
  if (!targetArn) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TargetArn'];
  }


  // TODO implement code

  var ret = {
    NextToken: '',
    RuleNames: [ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListRules = function ListRules(aws) {
  var limit = aws.params.Limit /* Type integer */;
  var namePrefix = aws.params.NamePrefix;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    NextToken: '',
    Rules: [ {
      Arn: '',
      Description: '',
      EventPattern: '',
      Name: '',
      RoleArn: '',
      ScheduleExpression: '',
      State: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListTargetsByRule = function ListTargetsByRule(aws) {
  var limit = aws.params.Limit /* Type integer */;
  var nextToken = aws.params.NextToken;
  var rule = aws.params.Rule;
  if (!rule) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Rule'];
  }


  // TODO implement code

  var ret = {
    NextToken: '',
    Targets: /*Sp*/[ {
      Arn: '',
      Id: '',
      Input: '',
      InputPath: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutEvents = function PutEvents(aws) {
  var entries = aws.params.Entries /* Type list */;
  if (!entries) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Entries'];
  }


  // TODO implement code

  var ret = {
    Entries: [ {
      ErrorCode: '',
      ErrorMessage: '',
      EventId: '',
    }, /* ...*/ ],
    FailedEntryCount: 0,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutRule = function PutRule(aws) {
  var description = aws.params.Description;
  var eventPattern = aws.params.EventPattern;
  var name = aws.params.Name;
  var roleArn = aws.params.RoleArn;
  var scheduleExpression = aws.params.ScheduleExpression;
  var state = aws.params.State;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {
    RuleArn: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutTargets = function PutTargets(aws) {
  var rule = aws.params.Rule;
  var targets = aws.params.Targets;
  if (!rule) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Rule'];
  }
  if (!targets) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Targets'];
  }


  // TODO implement code

  var ret = {
    FailedEntries: [ {
      ErrorCode: '',
      ErrorMessage: '',
      TargetId: '',
    }, /* ...*/ ],
    FailedEntryCount: 0,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RemoveTargets = function RemoveTargets(aws) {
  var ids = aws.params.Ids /* Type list */;
  var rule = aws.params.Rule;
  if (!ids) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Ids'];
  }
  if (!rule) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Rule'];
  }


  // TODO implement code

  var ret = {
    FailedEntries: [ {
      ErrorCode: '',
      ErrorMessage: '',
      TargetId: '',
    }, /* ...*/ ],
    FailedEntryCount: 0,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.TestEventPattern = function TestEventPattern(aws) {
  var event = aws.params.Event;
  var eventPattern = aws.params.EventPattern;
  if (!event) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Event'];
  }
  if (!eventPattern) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter EventPattern'];
  }


  // TODO implement code

  var ret = {
    Result: false,
  };
  return [200, ret];
};