'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon Simple Systems Management Service version 2014-11-06
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);
// -----------------------------------
module.exports.CancelCommand = function CancelCommand(aws) {
  var commandId = aws.params.CommandId;
  var instanceIds = aws.params.InstanceIds;
  if (!commandId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter CommandId'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateAssociation = function CreateAssociation(aws) {
  var instanceId = aws.params.InstanceId;
  var name = aws.params.Name;
  var parameters = aws.params.Parameters;
  if (!instanceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InstanceId'];
  }
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {
    AssociationDescription: /*Sd*/{
      Date: awsCommon.timestamp(),
      InstanceId: '',
      Name: '',
      Parameters: /*S8*/{} /*Map*/,
      Status: /*Sf*/{
        AdditionalInfo: '',
        Date: awsCommon.timestamp(),
        Message: '',
        Name: '',
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateAssociationBatch = function CreateAssociationBatch(aws) {
  var entries = aws.params.Entries /* Type list */;
  if (!entries) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Entries'];
  }


  // TODO implement code

  var ret = {
    Failed: [ {
      Entry: /*Sl*/{
        InstanceId: '',
        Name: '',
        Parameters: /*S8*/{} /*Map*/,
      },
      Fault: '',
      Message: '',
    }, /* ...*/ ],
    Successful: [ /*Sd*/{
      Date: awsCommon.timestamp(),
      InstanceId: '',
      Name: '',
      Parameters: /*S8*/{} /*Map*/,
      Status: /*Sf*/{
        AdditionalInfo: '',
        Date: awsCommon.timestamp(),
        Message: '',
        Name: '',
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateDocument = function CreateDocument(aws) {
  var content = aws.params.Content;
  var name = aws.params.Name;
  if (!content) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Content'];
  }
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {
    DocumentDescription: /*Sv*/{
      CreatedDate: awsCommon.timestamp(),
      Description: '',
      Name: '',
      Parameters: [ {
        DefaultValue: '',
        Description: '',
        Name: '',
        Type: '',
      }, /* ...*/ ],
      PlatformTypes: /*S15*/[ '', /* ...*/ ],
      Sha1: '',
      Status: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteAssociation = function DeleteAssociation(aws) {
  var instanceId = aws.params.InstanceId;
  var name = aws.params.Name;
  if (!instanceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InstanceId'];
  }
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteDocument = function DeleteDocument(aws) {
  var name = aws.params.Name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAssociation = function DescribeAssociation(aws) {
  var instanceId = aws.params.InstanceId;
  var name = aws.params.Name;
  if (!instanceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InstanceId'];
  }
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {
    AssociationDescription: /*Sd*/{
      Date: awsCommon.timestamp(),
      InstanceId: '',
      Name: '',
      Parameters: /*S8*/{} /*Map*/,
      Status: /*Sf*/{
        AdditionalInfo: '',
        Date: awsCommon.timestamp(),
        Message: '',
        Name: '',
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeDocument = function DescribeDocument(aws) {
  var name = aws.params.Name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {
    Document: /*Sv*/{
      CreatedDate: awsCommon.timestamp(),
      Description: '',
      Name: '',
      Parameters: [ {
        DefaultValue: '',
        Description: '',
        Name: '',
        Type: '',
      }, /* ...*/ ],
      PlatformTypes: /*S15*/[ '', /* ...*/ ],
      Sha1: '',
      Status: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeInstanceInformation = function DescribeInstanceInformation(aws) {
  var instanceInformationFilterList = aws.params.InstanceInformationFilterList /* Type list */;
  var maxResults = aws.params.MaxResults /* Type integer */;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    InstanceInformationList: [ {
      AgentVersion: '',
      InstanceId: '',
      IsLatestVersion: false,
      LastPingDateTime: awsCommon.timestamp(),
      PingStatus: '',
      PlatformName: '',
      PlatformType: '',
      PlatformVersion: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetDocument = function GetDocument(aws) {
  var name = aws.params.Name;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {
    Content: '',
    Name: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListAssociations = function ListAssociations(aws) {
  var associationFilterList = aws.params.AssociationFilterList /* Type list */;
  var maxResults = aws.params.MaxResults /* Type integer */;
  var nextToken = aws.params.NextToken;
  if (!associationFilterList) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AssociationFilterList'];
  }


  // TODO implement code

  var ret = {
    Associations: [ {
      InstanceId: '',
      Name: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListCommandInvocations = function ListCommandInvocations(aws) {
  var commandId = aws.params.CommandId;
  var details = aws.params.Details /* Type boolean */;
  var filters = aws.params.Filters;
  var instanceId = aws.params.InstanceId;
  var maxResults = aws.params.MaxResults /* Type integer */;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    CommandInvocations: [ {
      CommandId: '',
      CommandPlugins: [ {
        Name: '',
        Output: '',
        OutputS3BucketName: '',
        OutputS3KeyPrefix: '',
        ResponseCode: 0,
        ResponseFinishDateTime: awsCommon.timestamp(),
        ResponseStartDateTime: awsCommon.timestamp(),
        Status: '',
      }, /* ...*/ ],
      Comment: '',
      DocumentName: '',
      InstanceId: '',
      RequestedDateTime: awsCommon.timestamp(),
      Status: '',
      TraceOutput: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListCommands = function ListCommands(aws) {
  var commandId = aws.params.CommandId;
  var filters = aws.params.Filters;
  var instanceId = aws.params.InstanceId;
  var maxResults = aws.params.MaxResults /* Type integer */;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    Commands: [ /*S2s*/{
      CommandId: '',
      Comment: '',
      DocumentName: '',
      ExpiresAfter: awsCommon.timestamp(),
      InstanceIds: /*S3*/[ '', /* ...*/ ],
      OutputS3BucketName: '',
      OutputS3KeyPrefix: '',
      Parameters: /*S8*/{} /*Map*/,
      RequestedDateTime: awsCommon.timestamp(),
      Status: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListDocuments = function ListDocuments(aws) {
  var documentFilterList = aws.params.DocumentFilterList /* Type list */;
  var maxResults = aws.params.MaxResults /* Type integer */;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    DocumentIdentifiers: [ {
      Name: '',
      PlatformTypes: /*S15*/[ '', /* ...*/ ],
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SendCommand = function SendCommand(aws) {
  var comment = aws.params.Comment;
  var documentName = aws.params.DocumentName;
  var instanceIds = aws.params.InstanceIds;
  var outputS3BucketName = aws.params.OutputS3BucketName;
  var outputS3KeyPrefix = aws.params.OutputS3KeyPrefix;
  var parameters = aws.params.Parameters;
  var timeoutSeconds = aws.params.TimeoutSeconds /* Type integer */;
  if (!documentName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DocumentName'];
  }
  if (!instanceIds) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InstanceIds'];
  }


  // TODO implement code

  var ret = {
    Command: /*S2s*/{
      CommandId: '',
      Comment: '',
      DocumentName: '',
      ExpiresAfter: awsCommon.timestamp(),
      InstanceIds: /*S3*/[ '', /* ...*/ ],
      OutputS3BucketName: '',
      OutputS3KeyPrefix: '',
      Parameters: /*S8*/{} /*Map*/,
      RequestedDateTime: awsCommon.timestamp(),
      Status: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateAssociationStatus = function UpdateAssociationStatus(aws) {
  var associationStatus = aws.params.AssociationStatus;
  var instanceId = aws.params.InstanceId;
  var name = aws.params.Name;
  if (!associationStatus) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AssociationStatus'];
  }
  if (!instanceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InstanceId'];
  }
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {
    AssociationDescription: /*Sd*/{
      Date: awsCommon.timestamp(),
      InstanceId: '',
      Name: '',
      Parameters: /*S8*/{} /*Map*/,
      Status: /*Sf*/{
        AdditionalInfo: '',
        Date: awsCommon.timestamp(),
        Message: '',
        Name: '',
      },
    },
  };
  return [200, ret];
};
