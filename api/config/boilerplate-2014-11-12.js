'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * AWS Config version 2014-11-12
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);
// -----------------------------------
module.exports.StartConfigurationRecorder = function StartConfigurationRecorder(aws) {
  var configurationRecorderName = aws.params.ConfigurationRecorderName;
  if (!configurationRecorderName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ConfigurationRecorderName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.PutDeliveryChannel = function PutDeliveryChannel(aws) {
  var deliveryChannel = aws.params.DeliveryChannel;
  if (!deliveryChannel) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DeliveryChannel'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.GetComplianceSummaryByResourceType = function GetComplianceSummaryByResourceType(aws) {
  var resourceTypes = aws.params.ResourceTypes /* Type list */;


  // TODO implement code

  var ret = {
    ComplianceSummariesByResourceType: [ {
      ResourceType: '',
      ComplianceSummary: /*S2d*/{
        CompliantResourceCount: /*Sg*/{
          CapExceeded: false,
          CappedCount: 0,
        },
        NonCompliantResourceCount: /*Sg*/{
          CapExceeded: false,
          CappedCount: 0,
        },
        ComplianceSummaryTimestamp: awsCommon.timestamp(),
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutConfigurationRecorder = function PutConfigurationRecorder(aws) {
  var configurationRecorder = aws.params.ConfigurationRecorder;
  if (!configurationRecorder) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ConfigurationRecorder'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.GetComplianceDetailsByConfigRule = function GetComplianceDetailsByConfigRule(aws) {
  var complianceTypes = aws.params.ComplianceTypes;
  var nextToken = aws.params.NextToken;
  var configRuleName = aws.params.ConfigRuleName;
  var limit = aws.params.Limit /* Type integer */;
  if (!configRuleName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ConfigRuleName'];
  }


  // TODO implement code

  var ret = {
    NextToken: '',
    EvaluationResults: /*S26*/[ {
      EvaluationResultIdentifier: {
        OrderingTimestamp: awsCommon.timestamp(),
        EvaluationResultQualifier: {
          ResourceId: '',
          ResourceType: '',
          ConfigRuleName: '',
        },
      },
      ResultToken: '',
      ComplianceType: '',
      ResultRecordedTime: awsCommon.timestamp(),
      Annotation: '',
      ConfigRuleInvokedTime: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetComplianceDetailsByResource = function GetComplianceDetailsByResource(aws) {
  var resourceId = aws.params.ResourceId;
  var resourceType = aws.params.ResourceType;
  var complianceTypes = aws.params.ComplianceTypes;
  var nextToken = aws.params.NextToken;
  if (!resourceType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ResourceType'];
  }
  if (!resourceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ResourceId'];
  }


  // TODO implement code

  var ret = {
    NextToken: '',
    EvaluationResults: /*S26*/[ {
      EvaluationResultIdentifier: {
        OrderingTimestamp: awsCommon.timestamp(),
        EvaluationResultQualifier: {
          ResourceId: '',
          ResourceType: '',
          ConfigRuleName: '',
        },
      },
      ResultToken: '',
      ComplianceType: '',
      ResultRecordedTime: awsCommon.timestamp(),
      Annotation: '',
      ConfigRuleInvokedTime: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeDeliveryChannelStatus = function DescribeDeliveryChannelStatus(aws) {
  var deliveryChannelNames = aws.params.DeliveryChannelNames;


  // TODO implement code

  var ret = {
    DeliveryChannelsStatus: [ {
      name: '',
      configStreamDeliveryInfo: {
        lastStatus: '',
        lastStatusChangeTime: awsCommon.timestamp(),
        lastErrorMessage: '',
        lastErrorCode: '',
      },
      configSnapshotDeliveryInfo: /*S1w*/{
        lastStatus: '',
        nextDeliveryTime: awsCommon.timestamp(),
        lastErrorMessage: '',
        lastErrorCode: '',
        lastAttemptTime: awsCommon.timestamp(),
        lastSuccessfulTime: awsCommon.timestamp(),
      },
      configHistoryDeliveryInfo: /*S1w*/{
        lastStatus: '',
        nextDeliveryTime: awsCommon.timestamp(),
        lastErrorMessage: '',
        lastErrorCode: '',
        lastAttemptTime: awsCommon.timestamp(),
        lastSuccessfulTime: awsCommon.timestamp(),
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeConfigurationRecorderStatus = function DescribeConfigurationRecorderStatus(aws) {
  var configurationRecorderNames = aws.params.ConfigurationRecorderNames;


  // TODO implement code

  var ret = {
    ConfigurationRecordersStatus: [ {
      lastStatus: '',
      lastStatusChangeTime: awsCommon.timestamp(),
      lastErrorMessage: '',
      lastErrorCode: '',
      name: '',
      lastStopTime: awsCommon.timestamp(),
      recording: false,
      lastStartTime: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeConfigRules = function DescribeConfigRules(aws) {
  var nextToken = aws.params.NextToken;
  var configRuleNames = aws.params.ConfigRuleNames;


  // TODO implement code

  var ret = {
    NextToken: '',
    ConfigRules: [ /*Sy*/{
      Source: {
        SourceIdentifier: '',
        Owner: '',
        SourceDetails: [ {
          MessageType: '',
          EventSource: '',
        }, /* ...*/ ],
      },
      Description: '',
      ConfigRuleArn: '',
      ConfigRuleState: '',
      MaximumExecutionFrequency: '',
      InputParameters: '',
      ConfigRuleId: '',
      ConfigRuleName: '',
      Scope: {
        TagKey: '',
        ComplianceResourceId: '',
        TagValue: '',
        ComplianceResourceTypes: [ '', /* ...*/ ],
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetComplianceSummaryByConfigRule = function GetComplianceSummaryByConfigRule(aws) {


  // TODO implement code

  var ret = {
    ComplianceSummary: /*S2d*/{
      CompliantResourceCount: /*Sg*/{
        CapExceeded: false,
        CappedCount: 0,
      },
      NonCompliantResourceCount: /*Sg*/{
        CapExceeded: false,
        CappedCount: 0,
      },
      ComplianceSummaryTimestamp: awsCommon.timestamp(),
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeliverConfigSnapshot = function DeliverConfigSnapshot(aws) {
  var deliveryChannelName = aws.params.deliveryChannelName;
  if (!deliveryChannelName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter deliveryChannelName'];
  }


  // TODO implement code

  var ret = {
    configSnapshotId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeComplianceByResource = function DescribeComplianceByResource(aws) {
  var resourceId = aws.params.ResourceId;
  var resourceType = aws.params.ResourceType;
  var limit = aws.params.Limit /* Type integer */;
  var complianceTypes = aws.params.ComplianceTypes;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    ComplianceByResources: [ {
      ResourceId: '',
      ResourceType: '',
      Compliance: /*Sf*/{
        ComplianceType: '',
        ComplianceContributorCount: /*Sg*/{
          CapExceeded: false,
          CappedCount: 0,
        },
      },
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutEvaluations = function PutEvaluations(aws) {
  var evaluations = aws.params.Evaluations;
  var resultToken = aws.params.ResultToken;
  if (!resultToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ResultToken'];
  }


  // TODO implement code

  var ret = {
    FailedEvaluations: /*S3l*/[ {
      ComplianceType: '',
      OrderingTimestamp: awsCommon.timestamp(),
      ComplianceResourceId: '',
      Annotation: '',
      ComplianceResourceType: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutConfigRule = function PutConfigRule(aws) {
  var configRule = aws.params.ConfigRule;
  if (!configRule) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ConfigRule'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteConfigRule = function DeleteConfigRule(aws) {
  var configRuleName = aws.params.ConfigRuleName;
  if (!configRuleName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ConfigRuleName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.StopConfigurationRecorder = function StopConfigurationRecorder(aws) {
  var configurationRecorderName = aws.params.ConfigurationRecorderName;
  if (!configurationRecorderName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ConfigurationRecorderName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.ListDiscoveredResources = function ListDiscoveredResources(aws) {
  var limit = aws.params.limit /* Type integer */;
  var resourceName = aws.params.resourceName;
  var resourceType = aws.params.resourceType;
  var resourceIds = aws.params.resourceIds /* Type list */;
  var includeDeletedResources = aws.params.includeDeletedResources /* Type boolean */;
  var nextToken = aws.params.nextToken;
  if (!resourceType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter resourceType'];
  }


  // TODO implement code

  var ret = {
    resourceIdentifiers: [ {
      resourceName: '',
      resourceId: '',
      resourceDeletionTime: awsCommon.timestamp(),
      resourceType: '',
    }, /* ...*/ ],
    nextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeComplianceByConfigRule = function DescribeComplianceByConfigRule(aws) {
  var complianceTypes = aws.params.ComplianceTypes;
  var nextToken = aws.params.NextToken;
  var configRuleNames = aws.params.ConfigRuleNames;


  // TODO implement code

  var ret = {
    NextToken: '',
    ComplianceByConfigRules: [ {
      ConfigRuleName: '',
      Compliance: /*Sf*/{
        ComplianceType: '',
        ComplianceContributorCount: /*Sg*/{
          CapExceeded: false,
          CappedCount: 0,
        },
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeConfigurationRecorders = function DescribeConfigurationRecorders(aws) {
  var configurationRecorderNames = aws.params.ConfigurationRecorderNames;


  // TODO implement code

  var ret = {
    ConfigurationRecorders: [ /*S1l*/{
      name: '',
      roleARN: '',
      recordingGroup: {
        allSupported: false,
        resourceTypes: [ '', /* ...*/ ],
        includeGlobalResourceTypes: false,
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetResourceConfigHistory = function GetResourceConfigHistory(aws) {
  var limit = aws.params.limit /* Type integer */;
  var laterTime = aws.params.laterTime /* Type timestamp */;
  var resourceType = aws.params.resourceType;
  var earlierTime = aws.params.earlierTime /* Type timestamp */;
  var resourceId = aws.params.resourceId;
  var chronologicalOrder = aws.params.chronologicalOrder;
  var nextToken = aws.params.nextToken;
  if (!resourceType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter resourceType'];
  }
  if (!resourceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter resourceId'];
  }


  // TODO implement code

  var ret = {
    configurationItems: [ {
      resourceId: '',
      relatedEvents: [ '', /* ...*/ ],
      version: '',
      resourceType: '',
      resourceName: '',
      resourceCreationTime: awsCommon.timestamp(),
      availabilityZone: '',
      configurationItemCaptureTime: awsCommon.timestamp(),
      accountId: '',
      arn: '',
      configurationStateId: '',
      tags: {} /*Map*/,
      configurationItemMD5Hash: '',
      configuration: '',
      awsRegion: '',
      configurationItemStatus: '',
      relationships: [ {
        resourceName: '',
        relationshipName: '',
        resourceId: '',
        resourceType: '',
      }, /* ...*/ ],
    }, /* ...*/ ],
    nextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeDeliveryChannels = function DescribeDeliveryChannels(aws) {
  var deliveryChannelNames = aws.params.DeliveryChannelNames;


  // TODO implement code

  var ret = {
    DeliveryChannels: [ /*S22*/{
      name: '',
      s3BucketName: '',
      configSnapshotDeliveryProperties: {
        deliveryFrequency: '',
      },
      s3KeyPrefix: '',
      snsTopicARN: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteDeliveryChannel = function DeleteDeliveryChannel(aws) {
  var deliveryChannelName = aws.params.DeliveryChannelName;
  if (!deliveryChannelName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DeliveryChannelName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeConfigRuleEvaluationStatus = function DescribeConfigRuleEvaluationStatus(aws) {
  var configRuleNames = aws.params.ConfigRuleNames;


  // TODO implement code

  var ret = {
    ConfigRulesEvaluationStatus: [ {
      LastFailedEvaluationTime: awsCommon.timestamp(),
      ConfigRuleArn: '',
      LastSuccessfulInvocationTime: awsCommon.timestamp(),
      FirstActivatedTime: awsCommon.timestamp(),
      FirstEvaluationStarted: false,
      LastSuccessfulEvaluationTime: awsCommon.timestamp(),
      LastFailedInvocationTime: awsCommon.timestamp(),
      ConfigRuleId: '',
      LastErrorCode: '',
      ConfigRuleName: '',
      LastErrorMessage: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
