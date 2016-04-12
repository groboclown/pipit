'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * AWS Lambda version 2015-03-31
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol rest-json
require('../../lib/aws-common/shape_http')('rest-json', module.exports, null)
// -----------------------------------
module.exports.UpdateEventSourceMapping = awsCommon.as(
  'PUT',
  '/2015-03-31/event-source-mappings/:UUID',
  function UpdateEventSourceMapping(aws) {
  var BatchSize = aws.params['BatchSize'] /* Type integer */;
  var UUID = aws.reqParams['UUID'];
  var FunctionName = aws.params['FunctionName'];
  var Enabled = aws.params['Enabled'] /* Type boolean */;
  if (!UUID) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter UUID'];
  }


  // TODO implement code

  var ret = /*Sl*/{
    BatchSize: 0,
    EventSourceArn: '',
    LastModified: awsCommon.timestamp(),
    StateTransitionReason: '',
    LastProcessingResult: '',
    UUID: '',
    State: '',
    FunctionArn: '',
  };
  return [202, ret];
});
// -----------------------------------
module.exports.AddPermission = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/policy',
  function AddPermission(aws) {
  var Principal = aws.params['Principal'];
  var Action = aws.params['Action'];
  var FunctionName = aws.reqParams['FunctionName'];
  var SourceArn = aws.params['SourceArn'];
  var StatementId = aws.params['StatementId'];
  var Qualifier = aws.params['Qualifier'];
  var SourceAccount = aws.params['SourceAccount'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }
  if (!StatementId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StatementId'];
  }
  if (!Action) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Action'];
  }
  if (!Principal) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Principal'];
  }


  // TODO implement code

  var ret = {
    Statement: '',
  };
  return [201, ret];
});
// -----------------------------------
module.exports.UpdateFunctionConfiguration = awsCommon.as(
  'PUT',
  '/2015-03-31/functions/:FunctionName/configuration',
  function UpdateFunctionConfiguration(aws) {
  var Description = aws.params['Description'];
  var FunctionName = aws.reqParams['FunctionName'];
  var MemorySize = aws.params['MemorySize'] /* Type integer */;
  var Role = aws.params['Role'];
  var Handler = aws.params['Handler'];
  var Timeout = aws.params['Timeout'] /* Type integer */;
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = /*Sz*/{
    CodeSha256: '',
    Description: '',
    Version: '',
    CodeSize: 0 /*Long*/,
    Handler: '',
    FunctionName: '',
    Runtime: '',
    LastModified: '',
    MemorySize: 0,
    Role: '',
    Timeout: 0,
    FunctionArn: '',
  };
  return [200, ret];
});
// -----------------------------------
module.exports.CreateFunction = awsCommon.as(
  '/2015-03-31/functions',
  function CreateFunction(aws) {
  var MemorySize = aws.params['MemorySize'] /* Type integer */;
  var Description = aws.params['Description'];
  var FunctionName = aws.params['FunctionName'];
  var Code = aws.params['Code'] /* Type structure */;
  var Publish = aws.params['Publish'] /* Type boolean */;
  var Role = aws.params['Role'];
  var Handler = aws.params['Handler'];
  var Timeout = aws.params['Timeout'] /* Type integer */;
  var Runtime = aws.params['Runtime'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }
  if (!Runtime) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Runtime'];
  }
  if (!Role) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Role'];
  }
  if (!Handler) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Handler'];
  }
  if (!Code) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Code'];
  }


  // TODO implement code

  var ret = /*Sz*/{
    CodeSha256: '',
    Description: '',
    Version: '',
    CodeSize: 0 /*Long*/,
    Handler: '',
    FunctionName: '',
    Runtime: '',
    LastModified: '',
    MemorySize: 0,
    Role: '',
    Timeout: 0,
    FunctionArn: '',
  };
  return [201, ret];
});
// -----------------------------------
module.exports.GetPolicy = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/policy',
  function GetPolicy(aws) {
  var Qualifier = aws.params['Qualifier'];
  var FunctionName = aws.reqParams['FunctionName'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = {
    Policy: '',
  };
  return [200, ret];
});
// -----------------------------------
module.exports.DeleteEventSourceMapping = awsCommon.as(
  'DELETE',
  '/2015-03-31/event-source-mappings/:UUID',
  function DeleteEventSourceMapping(aws) {
  var UUID = aws.reqParams['UUID'];
  if (!UUID) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter UUID'];
  }


  // TODO implement code

  var ret = /*Sl*/{
    BatchSize: 0,
    EventSourceArn: '',
    LastModified: awsCommon.timestamp(),
    StateTransitionReason: '',
    LastProcessingResult: '',
    UUID: '',
    State: '',
    FunctionArn: '',
  };
  return [202, ret];
});
// -----------------------------------
module.exports.ListFunctions = awsCommon.as(
  'GET',
  '/2015-03-31/functions/',
  function ListFunctions(aws) {
  var Marker = aws.params['Marker'];
  var MaxItems = aws.params['MaxItems'] /* Type integer */;


  // TODO implement code

  var ret = {
    NextMarker: '',
    Functions: /*S1v*/[ /*Sz*/{
      CodeSha256: '',
      Description: '',
      Version: '',
      CodeSize: 0 /*Long*/,
      Handler: '',
      FunctionName: '',
      Runtime: '',
      LastModified: '',
      MemorySize: 0,
      Role: '',
      Timeout: 0,
      FunctionArn: '',
    }, /* ...*/ ],
  };
  return [200, ret];
});
// -----------------------------------
module.exports.GetFunction = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName',
  function GetFunction(aws) {
  var Qualifier = aws.params['Qualifier'];
  var FunctionName = aws.reqParams['FunctionName'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = {
    Code: {
      RepositoryType: '',
      Location: '',
    },
    Configuration: /*Sz*/{
      CodeSha256: '',
      Description: '',
      Version: '',
      CodeSize: 0 /*Long*/,
      Handler: '',
      FunctionName: '',
      Runtime: '',
      LastModified: '',
      MemorySize: 0,
      Role: '',
      Timeout: 0,
      FunctionArn: '',
    },
  };
  return [200, ret];
});
// -----------------------------------
module.exports.Invoke = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/invocations',
  function Invoke(aws) {
  var ClientContext = aws.params['ClientContext'];
  var InvocationType = aws.params['InvocationType'];
  var LogType = aws.params['LogType'];
  var FunctionName = aws.reqParams['FunctionName'];
  var Qualifier = aws.params['Qualifier'];
  var Payload = aws.params['Payload'] /* Type blob */;
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = {
    Payload: null /*Blob*/,
    FunctionError: '',
    StatusCode: 0,
    LogResult: '',
  };
  return [200, ret];
});
// -----------------------------------
module.exports.GetAlias = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/aliases/:Name',
  function GetAlias(aws) {
  var FunctionName = aws.reqParams['FunctionName'];
  var Name = aws.reqParams['Name'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }
  if (!Name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = /*Sf*/{
    AliasArn: '',
    Description: '',
    FunctionVersion: '',
    Name: '',
  };
  return [200, ret];
});
// -----------------------------------
module.exports.UpdateFunctionCode = awsCommon.as(
  'PUT',
  '/2015-03-31/functions/:FunctionName/code',
  function UpdateFunctionCode(aws) {
  var S3Key = aws.params['S3Key'];
  var Publish = aws.params['Publish'] /* Type boolean */;
  var S3ObjectVersion = aws.params['S3ObjectVersion'];
  var FunctionName = aws.reqParams['FunctionName'];
  var ZipFile = aws.params['ZipFile'] /* Type blob */;
  var S3Bucket = aws.params['S3Bucket'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = /*Sz*/{
    CodeSha256: '',
    Description: '',
    Version: '',
    CodeSize: 0 /*Long*/,
    Handler: '',
    FunctionName: '',
    Runtime: '',
    LastModified: '',
    MemorySize: 0,
    Role: '',
    Timeout: 0,
    FunctionArn: '',
  };
  return [200, ret];
});
// -----------------------------------
module.exports.ListAliases = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/aliases',
  function ListAliases(aws) {
  var Marker = aws.params['Marker'];
  var FunctionVersion = aws.params['FunctionVersion'];
  var FunctionName = aws.reqParams['FunctionName'];
  var MaxItems = aws.params['MaxItems'] /* Type integer */;
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = {
    NextMarker: '',
    Aliases: [ /*Sf*/{
      AliasArn: '',
      Description: '',
      FunctionVersion: '',
      Name: '',
    }, /* ...*/ ],
  };
  return [200, ret];
});
// -----------------------------------
module.exports.ListEventSourceMappings = awsCommon.as(
  'GET',
  '/2015-03-31/event-source-mappings/',
  function ListEventSourceMappings(aws) {
  var Marker = aws.params['Marker'];
  var EventSourceArn = aws.params['EventSourceArn'];
  var FunctionName = aws.params['FunctionName'];
  var MaxItems = aws.params['MaxItems'] /* Type integer */;


  // TODO implement code

  var ret = {
    NextMarker: '',
    EventSourceMappings: [ /*Sl*/{
      BatchSize: 0,
      EventSourceArn: '',
      LastModified: awsCommon.timestamp(),
      StateTransitionReason: '',
      LastProcessingResult: '',
      UUID: '',
      State: '',
      FunctionArn: '',
    }, /* ...*/ ],
  };
  return [200, ret];
});
// -----------------------------------
module.exports.InvokeAsync = awsCommon.as(
  '/2014-11-13/functions/:FunctionName/invoke-async/',
  function InvokeAsync(aws) {
  var InvokeArgs = aws.params['InvokeArgs'] /* Type blob */;
  var FunctionName = aws.reqParams['FunctionName'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }
  if (!InvokeArgs) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InvokeArgs'];
  }


  // TODO implement code

  var ret = {
    Status: 0,
  };
  return [202, ret];
});
// -----------------------------------
module.exports.GetEventSourceMapping = awsCommon.as(
  'GET',
  '/2015-03-31/event-source-mappings/:UUID',
  function GetEventSourceMapping(aws) {
  var UUID = aws.reqParams['UUID'];
  if (!UUID) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter UUID'];
  }


  // TODO implement code

  var ret = /*Sl*/{
    BatchSize: 0,
    EventSourceArn: '',
    LastModified: awsCommon.timestamp(),
    StateTransitionReason: '',
    LastProcessingResult: '',
    UUID: '',
    State: '',
    FunctionArn: '',
  };
  return [200, ret];
});
// -----------------------------------
module.exports.GetFunctionConfiguration = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/configuration',
  function GetFunctionConfiguration(aws) {
  var Qualifier = aws.params['Qualifier'];
  var FunctionName = aws.reqParams['FunctionName'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = /*Sz*/{
    CodeSha256: '',
    Description: '',
    Version: '',
    CodeSize: 0 /*Long*/,
    Handler: '',
    FunctionName: '',
    Runtime: '',
    LastModified: '',
    MemorySize: 0,
    Role: '',
    Timeout: 0,
    FunctionArn: '',
  };
  return [200, ret];
});
// -----------------------------------
module.exports.DeleteFunction = awsCommon.as(
  'DELETE',
  '/2015-03-31/functions/:FunctionName',
  function DeleteFunction(aws) {
  var Qualifier = aws.params['Qualifier'];
  var FunctionName = aws.reqParams['FunctionName'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = {};
  return [204, ret];
});
// -----------------------------------
module.exports.RemovePermission = awsCommon.as(
  'DELETE',
  '/2015-03-31/functions/:FunctionName/policy/:StatementId',
  function RemovePermission(aws) {
  var StatementId = aws.reqParams['StatementId'];
  var Qualifier = aws.params['Qualifier'];
  var FunctionName = aws.reqParams['FunctionName'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }
  if (!StatementId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StatementId'];
  }


  // TODO implement code

  var ret = {};
  return [204, ret];
});
// -----------------------------------
module.exports.ListVersionsByFunction = awsCommon.as(
  'GET',
  '/2015-03-31/functions/:FunctionName/versions',
  function ListVersionsByFunction(aws) {
  var Marker = aws.params['Marker'];
  var FunctionName = aws.reqParams['FunctionName'];
  var MaxItems = aws.params['MaxItems'] /* Type integer */;
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = {
    NextMarker: '',
    Versions: /*S1v*/[ /*Sz*/{
      CodeSha256: '',
      Description: '',
      Version: '',
      CodeSize: 0 /*Long*/,
      Handler: '',
      FunctionName: '',
      Runtime: '',
      LastModified: '',
      MemorySize: 0,
      Role: '',
      Timeout: 0,
      FunctionArn: '',
    }, /* ...*/ ],
  };
  return [200, ret];
});
// -----------------------------------
module.exports.UpdateAlias = awsCommon.as(
  'PUT',
  '/2015-03-31/functions/:FunctionName/aliases/:Name',
  function UpdateAlias(aws) {
  var FunctionVersion = aws.params['FunctionVersion'];
  var Description = aws.params['Description'];
  var FunctionName = aws.reqParams['FunctionName'];
  var Name = aws.reqParams['Name'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }
  if (!Name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = /*Sf*/{
    AliasArn: '',
    Description: '',
    FunctionVersion: '',
    Name: '',
  };
  return [200, ret];
});
// -----------------------------------
module.exports.PublishVersion = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/versions',
  function PublishVersion(aws) {
  var CodeSha256 = aws.params['CodeSha256'];
  var Description = aws.params['Description'];
  var FunctionName = aws.reqParams['FunctionName'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }


  // TODO implement code

  var ret = /*Sz*/{
    CodeSha256: '',
    Description: '',
    Version: '',
    CodeSize: 0 /*Long*/,
    Handler: '',
    FunctionName: '',
    Runtime: '',
    LastModified: '',
    MemorySize: 0,
    Role: '',
    Timeout: 0,
    FunctionArn: '',
  };
  return [201, ret];
});
// -----------------------------------
module.exports.DeleteAlias = awsCommon.as(
  'DELETE',
  '/2015-03-31/functions/:FunctionName/aliases/:Name',
  function DeleteAlias(aws) {
  var FunctionName = aws.reqParams['FunctionName'];
  var Name = aws.reqParams['Name'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }
  if (!Name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }


  // TODO implement code

  var ret = {};
  return [204, ret];
});
// -----------------------------------
module.exports.CreateEventSourceMapping = awsCommon.as(
  '/2015-03-31/event-source-mappings/',
  function CreateEventSourceMapping(aws) {
  var BatchSize = aws.params['BatchSize'] /* Type integer */;
  var StartingPosition = aws.params['StartingPosition'];
  var EventSourceArn = aws.params['EventSourceArn'];
  var FunctionName = aws.params['FunctionName'];
  var Enabled = aws.params['Enabled'] /* Type boolean */;
  if (!EventSourceArn) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter EventSourceArn'];
  }
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }
  if (!StartingPosition) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter StartingPosition'];
  }


  // TODO implement code

  var ret = /*Sl*/{
    BatchSize: 0,
    EventSourceArn: '',
    LastModified: awsCommon.timestamp(),
    StateTransitionReason: '',
    LastProcessingResult: '',
    UUID: '',
    State: '',
    FunctionArn: '',
  };
  return [202, ret];
});
// -----------------------------------
module.exports.CreateAlias = awsCommon.as(
  '/2015-03-31/functions/:FunctionName/aliases',
  function CreateAlias(aws) {
  var FunctionVersion = aws.params['FunctionVersion'];
  var Description = aws.params['Description'];
  var FunctionName = aws.reqParams['FunctionName'];
  var Name = aws.params['Name'];
  if (!FunctionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionName'];
  }
  if (!Name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Name'];
  }
  if (!FunctionVersion) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FunctionVersion'];
  }


  // TODO implement code

  var ret = /*Sf*/{
    AliasArn: '',
    Description: '',
    FunctionVersion: '',
    Name: '',
  };
  return [201, ret];
});
