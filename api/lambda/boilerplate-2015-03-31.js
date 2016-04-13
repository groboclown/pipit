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
module.exports.PublishVersion = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/versions',
  function PublishVersion(aws) {
    var description = aws.params.Description;
    var functionName = aws.reqParams.FunctionName;
    var codeSha256 = aws.params.CodeSha256;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = /*Sz*/{
      LastModified: '',
      FunctionName: '',
      Role: '',
      CodeSize: 0 /*Long*/,
      Runtime: '',
      FunctionArn: '',
      Version: '',
      Description: '',
      MemorySize: 0,
      CodeSha256: '',
      Timeout: 0,
      Handler: '',
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.UpdateAlias = awsCommon.as(
  'PUT',
  '/2015-03-31/functions/:FunctionName/aliases/:Name',
  function UpdateAlias(aws) {
    var description = aws.params.Description;
    var name = aws.reqParams.Name;
    var functionName = aws.reqParams.FunctionName;
    var functionVersion = aws.params.FunctionVersion;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!name) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
    }


    // TODO implement code

    var ret = /*Sf*/{
      Description: '',
      Name: '',
      AliasArn: '',
      FunctionVersion: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.AddPermission = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/policy',
  function AddPermission(aws) {
    var principal = aws.params.Principal;
    var action = aws.params.Action;
    var sourceArn = aws.params.SourceArn;
    var qualifier = aws.params.Qualifier;
    var sourceAccount = aws.params.SourceAccount;
    var functionName = aws.reqParams.FunctionName;
    var statementId = aws.params.StatementId;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!statementId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StatementId'];
    }
    if (!action) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Action'];
    }
    if (!principal) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Principal'];
    }


    // TODO implement code

    var ret = {
      Statement: '',
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.Invoke = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/invocations',
  function Invoke(aws) {
    var functionName = aws.reqParams.FunctionName;
    var logType = aws.params.LogType;
    var clientContext = aws.params.ClientContext;
    var invocationType = aws.params.InvocationType;
    var qualifier = aws.params.Qualifier;
    var payload = aws.params.Payload /* Type blob */;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = {
      StatusCode: 0,
      FunctionError: '',
      LogResult: '',
      Payload: null /*Blob*/,
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
module.exports.GetAlias = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/aliases/:Name',
  function GetAlias(aws) {
    var name = aws.reqParams.Name;
    var functionName = aws.reqParams.FunctionName;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!name) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
    }


    // TODO implement code

    var ret = /*Sf*/{
      Description: '',
      Name: '',
      AliasArn: '',
      FunctionVersion: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.CreateFunction = awsCommon.as(
  '/2015-03-31/functions',
  function CreateFunction(aws) {
    var code = aws.params.Code /* Type structure */;
    var functionName = aws.params.FunctionName;
    var role = aws.params.Role;
    var runtime = aws.params.Runtime;
    var description = aws.params.Description;
    var memorySize = aws.params.MemorySize /* Type integer */;
    var timeout = aws.params.Timeout /* Type integer */;
    var publish = aws.params.Publish /* Type boolean */;
    var handler = aws.params.Handler;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!runtime) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Runtime'];
    }
    if (!role) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Role'];
    }
    if (!handler) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Handler'];
    }
    if (!code) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Code'];
    }


    // TODO implement code

    var ret = /*Sz*/{
      LastModified: '',
      FunctionName: '',
      Role: '',
      CodeSize: 0 /*Long*/,
      Runtime: '',
      FunctionArn: '',
      Version: '',
      Description: '',
      MemorySize: 0,
      CodeSha256: '',
      Timeout: 0,
      Handler: '',
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.CreateEventSourceMapping = awsCommon.as(
  '/2015-03-31/event-source-mappings/',
  function CreateEventSourceMapping(aws) {
    var eventSourceArn = aws.params.EventSourceArn;
    var functionName = aws.params.FunctionName;
    var batchSize = aws.params.BatchSize /* Type integer */;
    var startingPosition = aws.params.StartingPosition;
    var enabled = aws.params.Enabled /* Type boolean */;
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

    var ret = /*Sl*/{
      LastModified: awsCommon.timestamp(),
      UUID: '',
      BatchSize: 0,
      StateTransitionReason: '',
      FunctionArn: '',
      State: '',
      EventSourceArn: '',
      LastProcessingResult: '',
    };
    return [202, ret];
  });
// -----------------------------------
module.exports.UpdateFunctionConfiguration = awsCommon.as(
  'PUT',
  '/2015-03-31/functions/:FunctionName/configuration',
  function UpdateFunctionConfiguration(aws) {
    var functionName = aws.reqParams.FunctionName;
    var role = aws.params.Role;
    var description = aws.params.Description;
    var memorySize = aws.params.MemorySize /* Type integer */;
    var timeout = aws.params.Timeout /* Type integer */;
    var handler = aws.params.Handler;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = /*Sz*/{
      LastModified: '',
      FunctionName: '',
      Role: '',
      CodeSize: 0 /*Long*/,
      Runtime: '',
      FunctionArn: '',
      Version: '',
      Description: '',
      MemorySize: 0,
      CodeSha256: '',
      Timeout: 0,
      Handler: '',
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
      NextMarker: '',
      Functions: /*S1v*/[ /*Sz*/{
        LastModified: '',
        FunctionName: '',
        Role: '',
        CodeSize: 0 /*Long*/,
        Runtime: '',
        FunctionArn: '',
        Version: '',
        Description: '',
        MemorySize: 0,
        CodeSha256: '',
        Timeout: 0,
        Handler: '',
      }, /* ...*/ ],
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
        RepositoryType: '',
        Location: '',
      },
      Configuration: /*Sz*/{
        LastModified: '',
        FunctionName: '',
        Role: '',
        CodeSize: 0 /*Long*/,
        Runtime: '',
        FunctionArn: '',
        Version: '',
        Description: '',
        MemorySize: 0,
        CodeSha256: '',
        Timeout: 0,
        Handler: '',
      },
    };
    return [200, ret];
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
module.exports.CreateAlias = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/aliases',
  function CreateAlias(aws) {
    var description = aws.params.Description;
    var name = aws.params.Name;
    var functionName = aws.reqParams.FunctionName;
    var functionVersion = aws.params.FunctionVersion;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }
    if (!name) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
    }
    if (!functionVersion) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionVersion'];
    }


    // TODO implement code

    var ret = /*Sf*/{
      Description: '',
      Name: '',
      AliasArn: '',
      FunctionVersion: '',
    };
    return [201, ret];
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
module.exports.UpdateFunctionCode = awsCommon.as(
  'PUT',
  '/2015-03-31/functions/:FunctionName/code',
  function UpdateFunctionCode(aws) {
    var zipFile = aws.params.ZipFile /* Type blob */;
    var functionName = aws.reqParams.FunctionName;
    var s3Bucket = aws.params.S3Bucket;
    var s3Key = aws.params.S3Key;
    var s3ObjectVersion = aws.params.S3ObjectVersion;
    var publish = aws.params.Publish /* Type boolean */;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = /*Sz*/{
      LastModified: '',
      FunctionName: '',
      Role: '',
      CodeSize: 0 /*Long*/,
      Runtime: '',
      FunctionArn: '',
      Version: '',
      Description: '',
      MemorySize: 0,
      CodeSha256: '',
      Timeout: 0,
      Handler: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.ListVersionsByFunction = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/versions',
  function ListVersionsByFunction(aws) {
    var marker = aws.params.Marker;
    var maxItems = aws.params.MaxItems /* Type integer */;
    var functionName = aws.reqParams.FunctionName;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = {
      NextMarker: '',
      Versions: /*S1v*/[ /*Sz*/{
        LastModified: '',
        FunctionName: '',
        Role: '',
        CodeSize: 0 /*Long*/,
        Runtime: '',
        FunctionArn: '',
        Version: '',
        Description: '',
        MemorySize: 0,
        CodeSha256: '',
        Timeout: 0,
        Handler: '',
      }, /* ...*/ ],
    };
    return [200, ret];
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

    var ret = /*Sl*/{
      LastModified: awsCommon.timestamp(),
      UUID: '',
      BatchSize: 0,
      StateTransitionReason: '',
      FunctionArn: '',
      State: '',
      EventSourceArn: '',
      LastProcessingResult: '',
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

    var ret = /*Sz*/{
      LastModified: '',
      FunctionName: '',
      Role: '',
      CodeSize: 0 /*Long*/,
      Runtime: '',
      FunctionArn: '',
      Version: '',
      Description: '',
      MemorySize: 0,
      CodeSha256: '',
      Timeout: 0,
      Handler: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.ListAliases = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/aliases',
  function ListAliases(aws) {
    var marker = aws.params.Marker;
    var maxItems = aws.params.MaxItems /* Type integer */;
    var functionName = aws.reqParams.FunctionName;
    var functionVersion = aws.params.FunctionVersion;
    if (!functionName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
    }


    // TODO implement code

    var ret = {
      NextMarker: '',
      Aliases: [ /*Sf*/{
        Description: '',
        Name: '',
        AliasArn: '',
        FunctionVersion: '',
      }, /* ...*/ ],
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.DeleteAlias = awsCommon.as(
  'DELETE',
  '/2015-03-31/functions/:FunctionName/aliases/:Name',
  function DeleteAlias(aws) {
    var name = aws.reqParams.Name;
    var functionName = aws.reqParams.FunctionName;
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
module.exports.GetEventSourceMapping = awsCommon.as(
  'GET',
  '/2015-03-31/event-source-mappings/:UUID',
  function GetEventSourceMapping(aws) {
    var uUID = aws.reqParams.UUID;
    if (!uUID) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter UUID'];
    }


    // TODO implement code

    var ret = /*Sl*/{
      LastModified: awsCommon.timestamp(),
      UUID: '',
      BatchSize: 0,
      StateTransitionReason: '',
      FunctionArn: '',
      State: '',
      EventSourceArn: '',
      LastProcessingResult: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.ListEventSourceMappings = awsCommon.as(
  'GET',
  '/2015-03-31/event-source-mappings/',
  function ListEventSourceMappings(aws) {
    var marker = aws.params.Marker;
    var eventSourceArn = aws.params.EventSourceArn;
    var functionName = aws.params.FunctionName;
    var maxItems = aws.params.MaxItems /* Type integer */;


    // TODO implement code

    var ret = {
      NextMarker: '',
      EventSourceMappings: [ /*Sl*/{
        LastModified: awsCommon.timestamp(),
        UUID: '',
        BatchSize: 0,
        StateTransitionReason: '',
        FunctionArn: '',
        State: '',
        EventSourceArn: '',
        LastProcessingResult: '',
      }, /* ...*/ ],
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.UpdateEventSourceMapping = awsCommon.as(
  'PUT',
  '/2015-03-31/event-source-mappings/:UUID',
  function UpdateEventSourceMapping(aws) {
    var enabled = aws.params.Enabled /* Type boolean */;
    var uUID = aws.reqParams.UUID;
    var batchSize = aws.params.BatchSize /* Type integer */;
    var functionName = aws.params.FunctionName;
    if (!uUID) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter UUID'];
    }


    // TODO implement code

    var ret = /*Sl*/{
      LastModified: awsCommon.timestamp(),
      UUID: '',
      BatchSize: 0,
      StateTransitionReason: '',
      FunctionArn: '',
      State: '',
      EventSourceArn: '',
      LastProcessingResult: '',
    };
    return [202, ret];
  });
