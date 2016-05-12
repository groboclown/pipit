'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * AWS Lambda version 2015-03-31
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol rest-json
require('../../lib/aws-common/shape_http')('rest-json', module.exports, null);
// -----------------------------------
module.exports.AddPermission = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/policy',
  function AddPermission(aws) {
    var action = aws.params.Action;
    var eventSourceToken = aws.params.EventSourceToken;
    var functionName = aws.reqParams.FunctionName;
    var principal = aws.params.Principal;
    var qualifier = aws.params.Qualifier;
    var sourceAccount = aws.params.SourceAccount;
    var sourceArn = aws.params.SourceArn;
    var statementId = aws.params.StatementId;
    if (!action) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Action'];
    }
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!principal) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Principal'];
    }
    if (!statementId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StatementId'];
    }


    // TODO implement code

    var ret = {
      Statement: '',
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.CreateAlias = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/aliases',
  function CreateAlias(aws) {
    var description = aws.params.Description;
    var functionName = aws.reqParams.FunctionName;
    var functionVersion = aws.params.FunctionVersion;
    var name = aws.params.Name;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!functionVersion) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionVersion'];
    }
    if (!name) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
    }


    // TODO implement code

    var ret = /*Sg*/{
      AliasArn: '',
      Description: '',
      FunctionVersion: '',
      Name: '',
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.CreateEventSourceMapping = awsCommon.as(
  '/2015-03-31/event-source-mappings/',
  function CreateEventSourceMapping(aws) {
    var batchSize = aws.params.BatchSize /* Type integer */;
    var enabled = aws.params.Enabled /* Type boolean */;
    var eventSourceArn = aws.params.EventSourceArn;
    var functionName = aws.params.FunctionName;
    var startingPosition = aws.params.StartingPosition;
    if (!eventSourceArn) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter EventSourceArn'];
    }
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!startingPosition) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StartingPosition'];
    }


    // TODO implement code

    var ret = /*Sm*/{
      BatchSize: 0,
      EventSourceArn: '',
      FunctionArn: '',
      LastModified: awsCommon.timestamp(),
      LastProcessingResult: '',
      State: '',
      StateTransitionReason: '',
      UUID: '',
    };
    return [202, ret];
  });
// -----------------------------------
module.exports.CreateFunction = awsCommon.as(
  '/2015-03-31/functions',
  function CreateFunction(aws) {
    var code = aws.params.Code /* Type structure */;
    var description = aws.params.Description;
    var functionName = aws.params.FunctionName;
    var handler = aws.params.Handler;
    var memorySize = aws.params.MemorySize /* Type integer */;
    var publish = aws.params.Publish /* Type boolean */;
    var role = aws.params.Role;
    var runtime = aws.params.Runtime;
    var timeout = aws.params.Timeout /* Type integer */;
    var vpcConfig = aws.params.VpcConfig;
    if (!code) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Code'];
    }
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!handler) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Handler'];
    }
    if (!role) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Role'];
    }
    if (!runtime) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Runtime'];
    }


    // TODO implement code

    var ret = /*S15*/{
      CodeSha256: '',
      CodeSize: 0 /*Long*/,
      Description: '',
      FunctionArn: '',
      FunctionName: '',
      Handler: '',
      LastModified: '',
      MemorySize: 0,
      Role: '',
      Runtime: '',
      Timeout: 0,
      Version: '',
      VpcConfig: {
        SecurityGroupIds: /*S13*/[ '', /* ...*/ ],
        SubnetIds: /*S11*/[ '', /* ...*/ ],
        VpcId: '',
      },
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.DeleteAlias = awsCommon.as(
  'DELETE',
  '/2015-03-31/functions/:FunctionName/aliases/:Name',
  function DeleteAlias(aws) {
    var functionName = aws.reqParams.FunctionName;
    var name = aws.reqParams.Name;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!name) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.DeleteEventSourceMapping = awsCommon.as(
  'DELETE',
  '/2015-03-31/event-source-mappings/:UUID',
  function DeleteEventSourceMapping(aws) {
    var uUID = aws.reqParams.UUID;
    if (!uUID) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter UUID'];
    }


    // TODO implement code

    var ret = /*Sm*/{
      BatchSize: 0,
      EventSourceArn: '',
      FunctionArn: '',
      LastModified: awsCommon.timestamp(),
      LastProcessingResult: '',
      State: '',
      StateTransitionReason: '',
      UUID: '',
    };
    return [202, ret];
  });
// -----------------------------------
module.exports.DeleteFunction = awsCommon.as(
  'DELETE',
  '/2015-03-31/functions/:FunctionName',
  function DeleteFunction(aws) {
    var functionName = aws.reqParams.FunctionName;
    var qualifier = aws.params.Qualifier;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.GetAlias = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/aliases/:Name',
  function GetAlias(aws) {
    var functionName = aws.reqParams.FunctionName;
    var name = aws.reqParams.Name;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!name) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
    }


    // TODO implement code

    var ret = /*Sg*/{
      AliasArn: '',
      Description: '',
      FunctionVersion: '',
      Name: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.GetEventSourceMapping = awsCommon.as(
  'GET',
  '/2015-03-31/event-source-mappings/:UUID',
  function GetEventSourceMapping(aws) {
    var uUID = aws.reqParams.UUID;
    if (!uUID) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter UUID'];
    }


    // TODO implement code

    var ret = /*Sm*/{
      BatchSize: 0,
      EventSourceArn: '',
      FunctionArn: '',
      LastModified: awsCommon.timestamp(),
      LastProcessingResult: '',
      State: '',
      StateTransitionReason: '',
      UUID: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.GetFunction = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName',
  function GetFunction(aws) {
    var functionName = aws.reqParams.FunctionName;
    var qualifier = aws.params.Qualifier;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = {
      Code: {
        Location: '',
        RepositoryType: '',
      },
      Configuration: /*S15*/{
        CodeSha256: '',
        CodeSize: 0 /*Long*/,
        Description: '',
        FunctionArn: '',
        FunctionName: '',
        Handler: '',
        LastModified: '',
        MemorySize: 0,
        Role: '',
        Runtime: '',
        Timeout: 0,
        Version: '',
        VpcConfig: {
          SecurityGroupIds: /*S13*/[ '', /* ...*/ ],
          SubnetIds: /*S11*/[ '', /* ...*/ ],
          VpcId: '',
        },
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.GetFunctionConfiguration = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/configuration',
  function GetFunctionConfiguration(aws) {
    var functionName = aws.reqParams.FunctionName;
    var qualifier = aws.params.Qualifier;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = /*S15*/{
      CodeSha256: '',
      CodeSize: 0 /*Long*/,
      Description: '',
      FunctionArn: '',
      FunctionName: '',
      Handler: '',
      LastModified: '',
      MemorySize: 0,
      Role: '',
      Runtime: '',
      Timeout: 0,
      Version: '',
      VpcConfig: {
        SecurityGroupIds: /*S13*/[ '', /* ...*/ ],
        SubnetIds: /*S11*/[ '', /* ...*/ ],
        VpcId: '',
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.GetPolicy = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/policy',
  function GetPolicy(aws) {
    var functionName = aws.reqParams.FunctionName;
    var qualifier = aws.params.Qualifier;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = {
      Policy: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.Invoke = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/invocations',
  function Invoke(aws) {
    var clientContext = aws.params.ClientContext;
    var functionName = aws.reqParams.FunctionName;
    var invocationType = aws.params.InvocationType;
    var logType = aws.params.LogType;
    var payload = aws.params.Payload /* Type blob */;
    var qualifier = aws.params.Qualifier;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = {
      FunctionError: '',
      LogResult: '',
      Payload: null /*Blob*/,
      StatusCode: 0,
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.InvokeAsync = awsCommon.as(
  '/2014-11-13/functions/:FunctionName/invoke-async/',
  function InvokeAsync(aws) {
    var functionName = aws.reqParams.FunctionName;
    var invokeArgs = aws.params.InvokeArgs /* Type blob */;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!invokeArgs) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InvokeArgs'];
    }


    // TODO implement code

    var ret = {
      Status: 0,
    };
    return [202, ret];
  });
// -----------------------------------
module.exports.ListAliases = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/aliases',
  function ListAliases(aws) {
    var functionName = aws.reqParams.FunctionName;
    var functionVersion = aws.params.FunctionVersion;
    var marker = aws.params.Marker;
    var maxItems = aws.params.MaxItems /* Type integer */;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = {
      Aliases: [ /*Sg*/{
        AliasArn: '',
        Description: '',
        FunctionVersion: '',
        Name: '',
      }, /* ...*/ ],
      NextMarker: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.ListEventSourceMappings = awsCommon.as(
  'GET',
  '/2015-03-31/event-source-mappings/',
  function ListEventSourceMappings(aws) {
    var eventSourceArn = aws.params.EventSourceArn;
    var functionName = aws.params.FunctionName;
    var marker = aws.params.Marker;
    var maxItems = aws.params.MaxItems /* Type integer */;


    // TODO implement code

    var ret = {
      EventSourceMappings: [ /*Sm*/{
        BatchSize: 0,
        EventSourceArn: '',
        FunctionArn: '',
        LastModified: awsCommon.timestamp(),
        LastProcessingResult: '',
        State: '',
        StateTransitionReason: '',
        UUID: '',
      }, /* ...*/ ],
      NextMarker: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.ListFunctions = awsCommon.as(
  'GET',
  '/2015-03-31/functions/',
  function ListFunctions(aws) {
    var marker = aws.params.Marker;
    var maxItems = aws.params.MaxItems /* Type integer */;


    // TODO implement code

    var ret = {
      Functions: /*S23*/[ /*S15*/{
        CodeSha256: '',
        CodeSize: 0 /*Long*/,
        Description: '',
        FunctionArn: '',
        FunctionName: '',
        Handler: '',
        LastModified: '',
        MemorySize: 0,
        Role: '',
        Runtime: '',
        Timeout: 0,
        Version: '',
        VpcConfig: {
          SecurityGroupIds: /*S13*/[ '', /* ...*/ ],
          SubnetIds: /*S11*/[ '', /* ...*/ ],
          VpcId: '',
        },
      }, /* ...*/ ],
      NextMarker: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.ListVersionsByFunction = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/versions',
  function ListVersionsByFunction(aws) {
    var functionName = aws.reqParams.FunctionName;
    var marker = aws.params.Marker;
    var maxItems = aws.params.MaxItems /* Type integer */;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = {
      NextMarker: '',
      Versions: /*S23*/[ /*S15*/{
        CodeSha256: '',
        CodeSize: 0 /*Long*/,
        Description: '',
        FunctionArn: '',
        FunctionName: '',
        Handler: '',
        LastModified: '',
        MemorySize: 0,
        Role: '',
        Runtime: '',
        Timeout: 0,
        Version: '',
        VpcConfig: {
          SecurityGroupIds: /*S13*/[ '', /* ...*/ ],
          SubnetIds: /*S11*/[ '', /* ...*/ ],
          VpcId: '',
        },
      }, /* ...*/ ],
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.PublishVersion = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/versions',
  function PublishVersion(aws) {
    var codeSha256 = aws.params.CodeSha256;
    var description = aws.params.Description;
    var functionName = aws.reqParams.FunctionName;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = /*S15*/{
      CodeSha256: '',
      CodeSize: 0 /*Long*/,
      Description: '',
      FunctionArn: '',
      FunctionName: '',
      Handler: '',
      LastModified: '',
      MemorySize: 0,
      Role: '',
      Runtime: '',
      Timeout: 0,
      Version: '',
      VpcConfig: {
        SecurityGroupIds: /*S13*/[ '', /* ...*/ ],
        SubnetIds: /*S11*/[ '', /* ...*/ ],
        VpcId: '',
      },
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.RemovePermission = awsCommon.as(
  'DELETE',
  '/2015-03-31/functions/:FunctionName/policy/:StatementId',
  function RemovePermission(aws) {
    var functionName = aws.reqParams.FunctionName;
    var qualifier = aws.params.Qualifier;
    var statementId = aws.reqParams.StatementId;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!statementId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StatementId'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.UpdateAlias = awsCommon.as(
  'PUT',
  '/2015-03-31/functions/:FunctionName/aliases/:Name',
  function UpdateAlias(aws) {
    var description = aws.params.Description;
    var functionName = aws.reqParams.FunctionName;
    var functionVersion = aws.params.FunctionVersion;
    var name = aws.reqParams.Name;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!name) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
    }


    // TODO implement code

    var ret = /*Sg*/{
      AliasArn: '',
      Description: '',
      FunctionVersion: '',
      Name: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.UpdateEventSourceMapping = awsCommon.as(
  'PUT',
  '/2015-03-31/event-source-mappings/:UUID',
  function UpdateEventSourceMapping(aws) {
    var batchSize = aws.params.BatchSize /* Type integer */;
    var enabled = aws.params.Enabled /* Type boolean */;
    var functionName = aws.params.FunctionName;
    var uUID = aws.reqParams.UUID;
    if (!uUID) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter UUID'];
    }


    // TODO implement code

    var ret = /*Sm*/{
      BatchSize: 0,
      EventSourceArn: '',
      FunctionArn: '',
      LastModified: awsCommon.timestamp(),
      LastProcessingResult: '',
      State: '',
      StateTransitionReason: '',
      UUID: '',
    };
    return [202, ret];
  });
// -----------------------------------
module.exports.UpdateFunctionCode = awsCommon.as(
  'PUT',
  '/2015-03-31/functions/:FunctionName/code',
  function UpdateFunctionCode(aws) {
    var functionName = aws.reqParams.FunctionName;
    var publish = aws.params.Publish /* Type boolean */;
    var s3Bucket = aws.params.S3Bucket;
    var s3Key = aws.params.S3Key;
    var s3ObjectVersion = aws.params.S3ObjectVersion;
    var zipFile = aws.params.ZipFile /* Type blob */;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = /*S15*/{
      CodeSha256: '',
      CodeSize: 0 /*Long*/,
      Description: '',
      FunctionArn: '',
      FunctionName: '',
      Handler: '',
      LastModified: '',
      MemorySize: 0,
      Role: '',
      Runtime: '',
      Timeout: 0,
      Version: '',
      VpcConfig: {
        SecurityGroupIds: /*S13*/[ '', /* ...*/ ],
        SubnetIds: /*S11*/[ '', /* ...*/ ],
        VpcId: '',
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.UpdateFunctionConfiguration = awsCommon.as(
  'PUT',
  '/2015-03-31/functions/:FunctionName/configuration',
  function UpdateFunctionConfiguration(aws) {
    var description = aws.params.Description;
    var functionName = aws.reqParams.FunctionName;
    var handler = aws.params.Handler;
    var memorySize = aws.params.MemorySize /* Type integer */;
    var role = aws.params.Role;
    var runtime = aws.params.Runtime;
    var timeout = aws.params.Timeout /* Type integer */;
    var vpcConfig = aws.params.VpcConfig;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = /*S15*/{
      CodeSha256: '',
      CodeSize: 0 /*Long*/,
      Description: '',
      FunctionArn: '',
      FunctionName: '',
      Handler: '',
      LastModified: '',
      MemorySize: 0,
      Role: '',
      Runtime: '',
      Timeout: 0,
      Version: '',
      VpcConfig: {
        SecurityGroupIds: /*S13*/[ '', /* ...*/ ],
        SubnetIds: /*S11*/[ '', /* ...*/ ],
        VpcId: '',
      },
    };
    return [200, ret];
  });
