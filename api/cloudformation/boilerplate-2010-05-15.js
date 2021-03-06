'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * AWS CloudFormation version 2010-05-15
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol query
require('../../lib/aws-common/shape_http')('query', module.exports, 'http://cloudformation.amazonaws.com/doc/2010-05-15/');
// -----------------------------------
module.exports.CancelUpdateStack = function CancelUpdateStack(aws) {
  var stackName = aws.params.StackName;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.ContinueUpdateRollback = function ContinueUpdateRollback(aws) {
  var stackName = aws.params.StackName;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateChangeSet = function CreateChangeSet(aws) {
  var capabilities = aws.params.Capabilities;
  var changeSetName = aws.params.ChangeSetName;
  var clientToken = aws.params.ClientToken;
  var description = aws.params.Description;
  var notificationARNs = aws.params.NotificationARNs;
  var parameters = aws.params.Parameters;
  var resourceTypes = aws.params.ResourceTypes;
  var stackName = aws.params.StackName;
  var tags = aws.params.Tags;
  var templateBody = aws.params.TemplateBody;
  var templateURL = aws.params.TemplateURL;
  var usePreviousTemplate = aws.params.UsePreviousTemplate /* Type boolean */;
  if (!changeSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ChangeSetName'];
  }
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {
    Id: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateStack = function CreateStack(aws) {
  var capabilities = aws.params.Capabilities;
  var disableRollback = aws.params.DisableRollback /* Type boolean */;
  var notificationARNs = aws.params.NotificationARNs;
  var onFailure = aws.params.OnFailure;
  var parameters = aws.params.Parameters;
  var resourceTypes = aws.params.ResourceTypes;
  var stackName = aws.params.StackName;
  var stackPolicyBody = aws.params.StackPolicyBody;
  var stackPolicyURL = aws.params.StackPolicyURL;
  var tags = aws.params.Tags;
  var templateBody = aws.params.TemplateBody;
  var templateURL = aws.params.TemplateURL;
  var timeoutInMinutes = aws.params.TimeoutInMinutes /* Type integer */;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {
    StackId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteChangeSet = function DeleteChangeSet(aws) {
  var changeSetName = aws.params.ChangeSetName;
  var stackName = aws.params.StackName;
  if (!changeSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ChangeSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteStack = function DeleteStack(aws) {
  var retainResources = aws.params.RetainResources /* Type list */;
  var stackName = aws.params.StackName;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAccountLimits = function DescribeAccountLimits(aws) {
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    AccountLimits: [ {
      Name: '',
      Value: 0,
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeChangeSet = function DescribeChangeSet(aws) {
  var changeSetName = aws.params.ChangeSetName;
  var nextToken = aws.params.NextToken;
  var stackName = aws.params.StackName;
  if (!changeSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ChangeSetName'];
  }


  // TODO implement code

  var ret = {
    Capabilities: /*Sf*/[ '', /* ...*/ ],
    ChangeSetId: '',
    ChangeSetName: '',
    Changes: [ {
      ResourceChange: {
        Action: '',
        Details: [ {
          CausingEntity: '',
          ChangeSource: '',
          Evaluation: '',
          Target: {
            Attribute: '',
            Name: '',
            RequiresRecreation: '',
          },
        }, /* ...*/ ],
        LogicalResourceId: '',
        PhysicalResourceId: '',
        Replacement: '',
        ResourceType: '',
        Scope: [ '', /* ...*/ ],
      },
      Type: '',
    }, /* ...*/ ],
    CreationTime: awsCommon.timestamp(),
    Description: '',
    NextToken: '',
    NotificationARNs: /*Sj*/[ '', /* ...*/ ],
    Parameters: /*Sa*/[ {
      ParameterKey: '',
      ParameterValue: '',
      UsePreviousValue: false,
    }, /* ...*/ ],
    StackId: '',
    StackName: '',
    Status: '',
    StatusReason: '',
    Tags: /*Sl*/[ {
      Key: '',
      Value: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeStackEvents = function DescribeStackEvents(aws) {
  var nextToken = aws.params.NextToken;
  var stackName = aws.params.StackName;


  // TODO implement code

  var ret = {
    NextToken: '',
    StackEvents: [ {
      EventId: '',
      LogicalResourceId: '',
      PhysicalResourceId: '',
      ResourceProperties: '',
      ResourceStatus: '',
      ResourceStatusReason: '',
      ResourceType: '',
      StackId: '',
      StackName: '',
      Timestamp: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeStackResource = function DescribeStackResource(aws) {
  var logicalResourceId = aws.params.LogicalResourceId;
  var stackName = aws.params.StackName;
  if (!logicalResourceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LogicalResourceId'];
  }
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {
    StackResourceDetail: {
      Description: '',
      LastUpdatedTimestamp: awsCommon.timestamp(),
      LogicalResourceId: '',
      Metadata: '',
      PhysicalResourceId: '',
      ResourceStatus: '',
      ResourceStatusReason: '',
      ResourceType: '',
      StackId: '',
      StackName: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeStackResources = function DescribeStackResources(aws) {
  var logicalResourceId = aws.params.LogicalResourceId;
  var physicalResourceId = aws.params.PhysicalResourceId;
  var stackName = aws.params.StackName;


  // TODO implement code

  var ret = {
    StackResources: [ {
      Description: '',
      LogicalResourceId: '',
      PhysicalResourceId: '',
      ResourceStatus: '',
      ResourceStatusReason: '',
      ResourceType: '',
      StackId: '',
      StackName: '',
      Timestamp: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeStacks = function DescribeStacks(aws) {
  var nextToken = aws.params.NextToken;
  var stackName = aws.params.StackName;


  // TODO implement code

  var ret = {
    NextToken: '',
    Stacks: [ {
      Capabilities: /*Sf*/[ '', /* ...*/ ],
      CreationTime: awsCommon.timestamp(),
      Description: '',
      DisableRollback: false,
      LastUpdatedTime: awsCommon.timestamp(),
      NotificationARNs: /*Sj*/[ '', /* ...*/ ],
      Outputs: [ {
        Description: '',
        OutputKey: '',
        OutputValue: '',
      }, /* ...*/ ],
      Parameters: /*Sa*/[ {
        ParameterKey: '',
        ParameterValue: '',
        UsePreviousValue: false,
      }, /* ...*/ ],
      StackId: '',
      StackName: '',
      StackStatus: '',
      StackStatusReason: '',
      Tags: /*Sl*/[ {
        Key: '',
        Value: '',
      }, /* ...*/ ],
      TimeoutInMinutes: 0,
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.EstimateTemplateCost = function EstimateTemplateCost(aws) {
  var parameters = aws.params.Parameters;
  var templateBody = aws.params.TemplateBody;
  var templateURL = aws.params.TemplateURL;


  // TODO implement code

  var ret = {
    Url: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ExecuteChangeSet = function ExecuteChangeSet(aws) {
  var changeSetName = aws.params.ChangeSetName;
  var stackName = aws.params.StackName;
  if (!changeSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ChangeSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetStackPolicy = function GetStackPolicy(aws) {
  var stackName = aws.params.StackName;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {
    StackPolicyBody: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetTemplate = function GetTemplate(aws) {
  var stackName = aws.params.StackName;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {
    TemplateBody: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetTemplateSummary = function GetTemplateSummary(aws) {
  var stackName = aws.params.StackName;
  var templateBody = aws.params.TemplateBody;
  var templateURL = aws.params.TemplateURL;


  // TODO implement code

  var ret = {
    Capabilities: /*Sf*/[ '', /* ...*/ ],
    CapabilitiesReason: '',
    Description: '',
    Metadata: '',
    Parameters: [ {
      DefaultValue: '',
      Description: '',
      NoEcho: false,
      ParameterConstraints: {
        AllowedValues: [ '', /* ...*/ ],
      },
      ParameterKey: '',
      ParameterType: '',
    }, /* ...*/ ],
    ResourceTypes: /*Sh*/[ '', /* ...*/ ],
    Version: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListChangeSets = function ListChangeSets(aws) {
  var nextToken = aws.params.NextToken;
  var stackName = aws.params.StackName;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {
    NextToken: '',
    Summaries: [ {
      ChangeSetId: '',
      ChangeSetName: '',
      CreationTime: awsCommon.timestamp(),
      Description: '',
      StackId: '',
      StackName: '',
      Status: '',
      StatusReason: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListStackResources = function ListStackResources(aws) {
  var nextToken = aws.params.NextToken;
  var stackName = aws.params.StackName;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {
    NextToken: '',
    StackResourceSummaries: [ {
      LastUpdatedTimestamp: awsCommon.timestamp(),
      LogicalResourceId: '',
      PhysicalResourceId: '',
      ResourceStatus: '',
      ResourceStatusReason: '',
      ResourceType: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListStacks = function ListStacks(aws) {
  var nextToken = aws.params.NextToken;
  var stackStatusFilter = aws.params.StackStatusFilter /* Type list */;


  // TODO implement code

  var ret = {
    NextToken: '',
    StackSummaries: [ {
      CreationTime: awsCommon.timestamp(),
      DeletionTime: awsCommon.timestamp(),
      LastUpdatedTime: awsCommon.timestamp(),
      StackId: '',
      StackName: '',
      StackStatus: '',
      StackStatusReason: '',
      TemplateDescription: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetStackPolicy = function SetStackPolicy(aws) {
  var stackName = aws.params.StackName;
  var stackPolicyBody = aws.params.StackPolicyBody;
  var stackPolicyURL = aws.params.StackPolicyURL;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.SignalResource = function SignalResource(aws) {
  var logicalResourceId = aws.params.LogicalResourceId;
  var stackName = aws.params.StackName;
  var status = aws.params.Status;
  var uniqueId = aws.params.UniqueId;
  if (!logicalResourceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LogicalResourceId'];
  }
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }
  if (!status) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Status'];
  }
  if (!uniqueId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter UniqueId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateStack = function UpdateStack(aws) {
  var capabilities = aws.params.Capabilities;
  var notificationARNs = aws.params.NotificationARNs;
  var parameters = aws.params.Parameters;
  var resourceTypes = aws.params.ResourceTypes;
  var stackName = aws.params.StackName;
  var stackPolicyBody = aws.params.StackPolicyBody;
  var stackPolicyDuringUpdateBody = aws.params.StackPolicyDuringUpdateBody;
  var stackPolicyDuringUpdateURL = aws.params.StackPolicyDuringUpdateURL;
  var stackPolicyURL = aws.params.StackPolicyURL;
  var tags = aws.params.Tags;
  var templateBody = aws.params.TemplateBody;
  var templateURL = aws.params.TemplateURL;
  var usePreviousTemplate = aws.params.UsePreviousTemplate /* Type boolean */;
  if (!stackName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StackName'];
  }


  // TODO implement code

  var ret = {
    StackId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ValidateTemplate = function ValidateTemplate(aws) {
  var templateBody = aws.params.TemplateBody;
  var templateURL = aws.params.TemplateURL;


  // TODO implement code

  var ret = {
    Capabilities: /*Sf*/[ '', /* ...*/ ],
    CapabilitiesReason: '',
    Description: '',
    Parameters: [ {
      DefaultValue: '',
      Description: '',
      NoEcho: false,
      ParameterKey: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
