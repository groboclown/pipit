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
module.exports.DescribeComplianceByConfigRule = function DescribeComplianceByConfigRule(aws) {
  var complianceTypes = aws.params.ComplianceTypes;
  var configRuleNames = aws.params.ConfigRuleNames;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    ComplianceByConfigRules: [ {
      Compliance: /*Sf*/{
        ComplianceContributorCount: /*Sg*/{
          CapExceeded: false,
          CappedCount: 0,
        },
        ComplianceType: '',
      },
      ConfigRuleName: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeComplianceByResource = function DescribeComplianceByResource(aws) {
  var complianceTypes = aws.params.ComplianceTypes;
  var limit = aws.params.Limit /* Type integer */;
  var nextToken = aws.params.NextToken;
  var resourceId = aws.params.ResourceId;
  var resourceType = aws.params.ResourceType;


  // TODO implement code

  var ret = {
    ComplianceByResources: [ {
      Compliance: /*Sf*/{
        ComplianceContributorCount: /*Sg*/{
          CapExceeded: false,
          CappedCount: 0,
        },
        ComplianceType: '',
      },
      ResourceId: '',
      ResourceType: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeConfigRuleEvaluationStatus = function DescribeConfigRuleEvaluationStatus(aws) {
  var configRuleNames = aws.params.ConfigRuleNames;


  // TODO implement code

  var ret = {
    ConfigRulesEvaluationStatus: [ {
      ConfigRuleArn: '',
      ConfigRuleId: '',
      ConfigRuleName: '',
      FirstActivatedTime: awsCommon.timestamp(),
      FirstEvaluationStarted: false,
      LastErrorCode: '',
      LastErrorMessage: '',
      LastFailedEvaluationTime: awsCommon.timestamp(),
      LastFailedInvocationTime: awsCommon.timestamp(),
      LastSuccessfulEvaluationTime: awsCommon.timestamp(),
      LastSuccessfulInvocationTime: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeConfigRules = function DescribeConfigRules(aws) {
  var configRuleNames = aws.params.ConfigRuleNames;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    ConfigRules: [ /*Sy*/{
      ConfigRuleArn: '',
      ConfigRuleId: '',
      ConfigRuleName: '',
      ConfigRuleState: '',
      Description: '',
      InputParameters: '',
      MaximumExecutionFrequency: '',
      Scope: {
        ComplianceResourceId: '',
        ComplianceResourceTypes: [ '', /* ...*/ ],
        TagKey: '',
        TagValue: '',
      },
      Source: {
        Owner: '',
        SourceDetails: [ {
          EventSource: '',
          MessageType: '',
        }, /* ...*/ ],
        SourceIdentifier: '',
      },
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeConfigurationRecorderStatus = function DescribeConfigurationRecorderStatus(aws) {
  var configurationRecorderNames = aws.params.ConfigurationRecorderNames;


  // TODO implement code

  var ret = {
    ConfigurationRecordersStatus: [ {
      lastErrorCode: '',
      lastErrorMessage: '',
      lastStartTime: awsCommon.timestamp(),
      lastStatus: '',
      lastStatusChangeTime: awsCommon.timestamp(),
      lastStopTime: awsCommon.timestamp(),
      name: '',
      recording: false,
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
      recordingGroup: {
        allSupported: false,
        includeGlobalResourceTypes: false,
        resourceTypes: [ '', /* ...*/ ],
      },
      roleARN: '',
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
      configHistoryDeliveryInfo: /*S1w*/{
        lastAttemptTime: awsCommon.timestamp(),
        lastErrorCode: '',
        lastErrorMessage: '',
        lastStatus: '',
        lastSuccessfulTime: awsCommon.timestamp(),
        nextDeliveryTime: awsCommon.timestamp(),
      },
      configSnapshotDeliveryInfo: /*S1w*/{
        lastAttemptTime: awsCommon.timestamp(),
        lastErrorCode: '',
        lastErrorMessage: '',
        lastStatus: '',
        lastSuccessfulTime: awsCommon.timestamp(),
        nextDeliveryTime: awsCommon.timestamp(),
      },
      configStreamDeliveryInfo: {
        lastErrorCode: '',
        lastErrorMessage: '',
        lastStatus: '',
        lastStatusChangeTime: awsCommon.timestamp(),
      },
      name: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeDeliveryChannels = function DescribeDeliveryChannels(aws) {
  var deliveryChannelNames = aws.params.DeliveryChannelNames;


  // TODO implement code

  var ret = {
    DeliveryChannels: [ /*S22*/{
      configSnapshotDeliveryProperties: {
        deliveryFrequency: '',
      },
      name: '',
      s3BucketName: '',
      s3KeyPrefix: '',
      snsTopicARN: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetComplianceDetailsByConfigRule = function GetComplianceDetailsByConfigRule(aws) {
  var complianceTypes = aws.params.ComplianceTypes;
  var configRuleName = aws.params.ConfigRuleName;
  var limit = aws.params.Limit /* Type integer */;
  var nextToken = aws.params.NextToken;
  if (!configRuleName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ConfigRuleName'];
  }


  // TODO implement code

  var ret = {
    EvaluationResults: /*S26*/[ {
      Annotation: '',
      ComplianceType: '',
      ConfigRuleInvokedTime: awsCommon.timestamp(),
      EvaluationResultIdentifier: {
        EvaluationResultQualifier: {
          ConfigRuleName: '',
          ResourceId: '',
          ResourceType: '',
        },
        OrderingTimestamp: awsCommon.timestamp(),
      },
      ResultRecordedTime: awsCommon.timestamp(),
      ResultToken: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetComplianceDetailsByResource = function GetComplianceDetailsByResource(aws) {
  var complianceTypes = aws.params.ComplianceTypes;
  var nextToken = aws.params.NextToken;
  var resourceId = aws.params.ResourceId;
  var resourceType = aws.params.ResourceType;
  if (!resourceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ResourceId'];
  }
  if (!resourceType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ResourceType'];
  }


  // TODO implement code

  var ret = {
    EvaluationResults: /*S26*/[ {
      Annotation: '',
      ComplianceType: '',
      ConfigRuleInvokedTime: awsCommon.timestamp(),
      EvaluationResultIdentifier: {
        EvaluationResultQualifier: {
          ConfigRuleName: '',
          ResourceId: '',
          ResourceType: '',
        },
        OrderingTimestamp: awsCommon.timestamp(),
      },
      ResultRecordedTime: awsCommon.timestamp(),
      ResultToken: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetComplianceSummaryByConfigRule = function GetComplianceSummaryByConfigRule(aws) {


  // TODO implement code

  var ret = {
    ComplianceSummary: /*S2d*/{
      ComplianceSummaryTimestamp: awsCommon.timestamp(),
      CompliantResourceCount: /*Sg*/{
        CapExceeded: false,
        CappedCount: 0,
      },
      NonCompliantResourceCount: /*Sg*/{
        CapExceeded: false,
        CappedCount: 0,
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetComplianceSummaryByResourceType = function GetComplianceSummaryByResourceType(aws) {
  var resourceTypes = aws.params.ResourceTypes /* Type list */;


  // TODO implement code

  var ret = {
    ComplianceSummariesByResourceType: [ {
      ComplianceSummary: /*S2d*/{
        ComplianceSummaryTimestamp: awsCommon.timestamp(),
        CompliantResourceCount: /*Sg*/{
          CapExceeded: false,
          CappedCount: 0,
        },
        NonCompliantResourceCount: /*Sg*/{
          CapExceeded: false,
          CappedCount: 0,
        },
      },
      ResourceType: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetResourceConfigHistory = function GetResourceConfigHistory(aws) {
  var chronologicalOrder = aws.params.chronologicalOrder;
  var earlierTime = aws.params.earlierTime /* Type timestamp */;
  var laterTime = aws.params.laterTime /* Type timestamp */;
  var limit = aws.params.limit /* Type integer */;
  var nextToken = aws.params.nextToken;
  var resourceId = aws.params.resourceId;
  var resourceType = aws.params.resourceType;
  if (!resourceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter resourceId'];
  }
  if (!resourceType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter resourceType'];
  }


  // TODO implement code

  var ret = {
    configurationItems: [ {
      accountId: '',
      arn: '',
      availabilityZone: '',
      awsRegion: '',
      configuration: '',
      configurationItemCaptureTime: awsCommon.timestamp(),
      configurationItemMD5Hash: '',
      configurationItemStatus: '',
      configurationStateId: '',
      relatedEvents: [ '', /* ...*/ ],
      relationships: [ {
        relationshipName: '',
        resourceId: '',
        resourceName: '',
        resourceType: '',
      }, /* ...*/ ],
      resourceCreationTime: awsCommon.timestamp(),
      resourceId: '',
      resourceName: '',
      resourceType: '',
      tags: {} /*Map*/,
      version: '',
    }, /* ...*/ ],
    nextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListDiscoveredResources = function ListDiscoveredResources(aws) {
  var includeDeletedResources = aws.params.includeDeletedResources /* Type boolean */;
  var limit = aws.params.limit /* Type integer */;
  var nextToken = aws.params.nextToken;
  var resourceIds = aws.params.resourceIds /* Type list */;
  var resourceName = aws.params.resourceName;
  var resourceType = aws.params.resourceType;
  if (!resourceType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter resourceType'];
  }


  // TODO implement code

  var ret = {
    nextToken: '',
    resourceIdentifiers: [ {
      resourceDeletionTime: awsCommon.timestamp(),
      resourceId: '',
      resourceName: '',
      resourceType: '',
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
module.exports.PutEvaluations = function PutEvaluations(aws) {
  var evaluations = aws.params.Evaluations;
  var resultToken = aws.params.ResultToken;
  if (!resultToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ResultToken'];
  }


  // TODO implement code

  var ret = {
    FailedEvaluations: /*S3l*/[ {
      Annotation: '',
      ComplianceResourceId: '',
      ComplianceResourceType: '',
      ComplianceType: '',
      OrderingTimestamp: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
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
module.exports.StopConfigurationRecorder = function StopConfigurationRecorder(aws) {
  var configurationRecorderName = aws.params.ConfigurationRecorderName;
  if (!configurationRecorderName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ConfigurationRecorderName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
