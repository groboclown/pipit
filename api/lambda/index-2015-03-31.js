'use strict';
const aws_common = require('../../lib/aws-common');
const lambdaRepo = require('../../lib/lambdas');

/**
 * AWS Lambda version 2015-03-31
 */

// Setup input and output to use AWS protocol rest-json
require('../../lib/aws-common/shape_http')('rest-json', module.exports, null)

/*
Primary use case flow.  These are the functions that need to be implemented
first.

    create-function (upload the lambda)
        - to implement the "code" argument, rather than the "zip" argument,
          the S3 api emulation will need to be created.
          Optionally, the S3 references could be just a directory that the
          Pipit server looks at.

    invoke (test the lambda by manually running it)

    create-event-source-mapping
        - used for kinesis and dynamodb (stream APIs).

    create-alias


All the update, list, get, delete function are lower priority.

Permissions are just not implemented.
*/


// ------------------------------------------------------------------------
// Invoke the lambda - the big kahoona.

module.exports.InvokeAsync = aws_common.as(
    "/2014-11-13/functions/:FunctionName/invoke-async/",
    function InvokeAsync(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var InvokeArgs = aws.params['InvokeArgs'] /* blob */;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }
        if (! InvokeArgs) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter InvokeArgs"];
        }

        // TODO implement code

        var ret = {
            Status: 0
        };
        return [202, ret];
    });
module.exports.Invoke = aws_common.as(
    "/2015-03-31/functions/:FunctionName/invocations",
    function Invoke(aws) {
        var ClientContext = aws.params['ClientContext'];
        var FunctionName = aws.reqParams.FunctionName;
        var Qualifier = aws.params['Qualifier'];
        var LogType = aws.params['LogType'];
        var Payload = aws.params['Payload'] /* blob */;
        var InvocationType = aws.params['InvocationType'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = {
            LogResult: "",
            Payload: null /*blob*/,
            StatusCode: 0,
            FunctionError: ""
        };
        return [200, ret];
    });


// ----------------------------------------------------------------------
// Event Source Mappings
module.exports.CreateEventSourceMapping = aws_common.as(
    "/2015-03-31/event-source-mappings/",
    function CreateEventSourceMapping(aws) {
        var StartingPosition = aws.params['StartingPosition'];
        var BatchSize = aws.params['BatchSize'] /* integer */;
        var FunctionName = aws.params['FunctionName'];
        var Enabled = aws.params['Enabled'] /* boolean */;
        var EventSourceArn = aws.params['EventSourceArn'];
        if (! EventSourceArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter EventSourceArn"];
        }
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }
        if (! StartingPosition) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter StartingPosition"];
        }

        // TODO implement code

        var ret = /*Sl*/{
            FunctionArn: "",
            State: "",
            UUID: "",
            EventSourceArn: "",
            LastModified: now(),
            BatchSize: 0,
            LastProcessingResult: "",
            StateTransitionReason: ""
        };
        return [202, ret];
    });
module.exports.GetEventSourceMapping = aws_common.as(
    "GET",
    "/2015-03-31/event-source-mappings/:UUID",
    function GetEventSourceMapping(aws) {
        var UUID = aws.reqParams.UUID;
        if (! UUID) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter UUID"];
        }

        // TODO implement code

        var ret = /*Sl*/{
            FunctionArn: "",
            State: "",
            UUID: "",
            EventSourceArn: "",
            LastModified: now(),
            BatchSize: 0,
            LastProcessingResult: "",
            StateTransitionReason: ""
        };
        return [200, ret];
    });
module.exports.UpdateEventSourceMapping = aws_common.as(
    "PUT",
    "/2015-03-31/event-source-mappings/:UUID",
    function UpdateEventSourceMapping(aws) {
        var BatchSize = aws.params['BatchSize'] /* integer */;
        var FunctionName = aws.params['FunctionName'];
        var Enabled = aws.params['Enabled'] /* boolean */;
        var UUID = aws.reqParams.UUID;
        if (! UUID) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter UUID"];
        }

        // TODO implement code

        var ret = /*Sl*/{
            FunctionArn: "",
            State: "",
            UUID: "",
            EventSourceArn: "",
            LastModified: now(),
            BatchSize: 0,
            LastProcessingResult: "",
            StateTransitionReason: ""
        };
        return [202, ret];
    });
module.exports.DeleteEventSourceMapping = aws_common.as(
    "DELETE",
    "/2015-03-31/event-source-mappings/:UUID",
    function DeleteEventSourceMapping(aws) {
        var UUID = aws.reqParams.UUID;
        if (! UUID) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter UUID"];
        }

        // TODO implement code

        var ret = /*Sl*/{
            FunctionArn: "",
            State: "",
            UUID: "",
            EventSourceArn: "",
            LastModified: now(),
            BatchSize: 0,
            LastProcessingResult: "",
            StateTransitionReason: ""
        };
        return [202, ret];
    });
module.exports.ListEventSourceMappings = aws_common.as(
    "GET",
    "/2015-03-31/event-source-mappings/",
    function ListEventSourceMappings(aws) {
        var Marker = aws.params['Marker'];
        var FunctionName = aws.params['FunctionName'];
        var MaxItems = aws.params['MaxItems'] /* integer */;
        var EventSourceArn = aws.params['EventSourceArn'];


        // TODO implement code

        var ret = {
            NextMarker: "",
            EventSourceMappings: [ /*Sl*/{
                FunctionArn: "",
                State: "",
                UUID: "",
                EventSourceArn: "",
                LastModified: now(),
                BatchSize: 0,
                LastProcessingResult: "",
                StateTransitionReason: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    });

// --------------------------------------------------------------------
// Function management
module.exports.CreateFunction = aws_common.as(
    "/2015-03-31/functions",
    function CreateFunction(aws) {
        var FunctionName = aws.params['FunctionName'];
        var Description = aws.params['Description'];
        var Role = aws.params['Role'];
        var Code = aws.params['Code'] /* structure */;
        var MemorySize = aws.params['MemorySize'] /* integer */;
        var Publish = aws.params['Publish'] /* boolean */;
        var Runtime = aws.params['Runtime'];
        var Handler = aws.params['Handler'];
        var Timeout = aws.params['Timeout'] /* integer */;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }
        if (! Runtime) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Runtime"];
        }
        if (! Role) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Role"];
        }
        if (! Handler) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Handler"];
        }
        if (! Code) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Code"];
        }

        // Role: IAM role ARN.

        //lambdaRepo.

        // TODO implement code

        var ret = /*Sz*/{
            Description: "",
            Role: "",
            MemorySize: 0,
            LastModified: "",
            Timeout: 0,
            Handler: "",
            FunctionArn: "",
            FunctionName: "",
            Version: "",
            CodeSize: 0 /*long*/,
            Runtime: "",
            CodeSha256: ""
        };
        return [201, ret];
    });
module.exports.ListFunctions = aws_common.as(
    "GET",
    "/2015-03-31/functions/",
    function ListFunctions(aws) {
        var Marker = aws.params['Marker'];
        var MaxItems = aws.params['MaxItems'] /* integer */;


        // TODO implement code

        var ret = {
            Functions: /*S1v*/[ /*Sz*/{
                Description: "",
                Role: "",
                MemorySize: 0,
                LastModified: "",
                Timeout: 0,
                Handler: "",
                FunctionArn: "",
                FunctionName: "",
                Version: "",
                CodeSize: 0 /*long*/,
                Runtime: "",
                CodeSha256: ""
            } /*, ...*/ ],
            NextMarker: ""
        };
        return [200, ret];
    });
module.exports.GetFunctionConfiguration = aws_common.as(
    "GET",
    "/2015-03-31/functions/:FunctionName/configuration",
    function GetFunctionConfiguration(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var Qualifier = aws.params['Qualifier'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = /*Sz*/{
            Description: "",
            Role: "",
            MemorySize: 0,
            LastModified: "",
            Timeout: 0,
            Handler: "",
            FunctionArn: "",
            FunctionName: "",
            Version: "",
            CodeSize: 0 /*long*/,
            Runtime: "",
            CodeSha256: ""
        };
        return [200, ret];
    });
module.exports.UpdateFunctionConfiguration = aws_common.as(
    "PUT",
    "/2015-03-31/functions/:FunctionName/configuration",
    function UpdateFunctionConfiguration(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var Description = aws.params['Description'];
        var Role = aws.params['Role'];
        var MemorySize = aws.params['MemorySize'] /* integer */;
        var Timeout = aws.params['Timeout'] /* integer */;
        var Handler = aws.params['Handler'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = /*Sz*/{
            Description: "",
            Role: "",
            MemorySize: 0,
            LastModified: "",
            Timeout: 0,
            Handler: "",
            FunctionArn: "",
            FunctionName: "",
            Version: "",
            CodeSize: 0 /*long*/,
            Runtime: "",
            CodeSha256: ""
        };
        return [200, ret];
    });
module.exports.UpdateFunctionCode = aws_common.as(
    "PUT",
    "/2015-03-31/functions/:FunctionName/code",
    function UpdateFunctionCode(aws) {
        var ZipFile = aws.params['ZipFile'] /* blob */;
        var FunctionName = aws.reqParams.FunctionName;
        var S3Key = aws.params['S3Key'];
        var S3Bucket = aws.params['S3Bucket'];
        var S3ObjectVersion = aws.params['S3ObjectVersion'];
        var Publish = aws.params['Publish'] /* boolean */;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = /*Sz*/{
            Description: "",
            Role: "",
            MemorySize: 0,
            LastModified: "",
            Timeout: 0,
            Handler: "",
            FunctionArn: "",
            FunctionName: "",
            Version: "",
            CodeSize: 0 /*long*/,
            Runtime: "",
            CodeSha256: ""
        };
        return [200, ret];
    });
module.exports.GetFunction = aws_common.as(
    "GET",
    "/2015-03-31/functions/:FunctionName",
    function GetFunction(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var Qualifier = aws.params['Qualifier'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = {
            Configuration: /*Sz*/{
                Description: "",
                Role: "",
                MemorySize: 0,
                LastModified: "",
                Timeout: 0,
                Handler: "",
                FunctionArn: "",
                FunctionName: "",
                Version: "",
                CodeSize: 0 /*long*/,
                Runtime: "",
                CodeSha256: ""
            },
            Code: {
                RepositoryType: "",
                Location: ""
            }
        };
        return [200, ret];
    });
module.exports.DeleteFunction = aws_common.as(
    "DELETE",
    "/2015-03-31/functions/:FunctionName",
    function DeleteFunction(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var Qualifier = aws.params['Qualifier'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = {};
        return [204, ret];
    });
module.exports.PublishVersion = aws_common.as(
    "/2015-03-31/functions/:FunctionName/versions",
    function PublishVersion(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var Description = aws.params['Description'];
        var CodeSha256 = aws.params['CodeSha256'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = /*Sz*/{
            Description: "",
            Role: "",
            MemorySize: 0,
            LastModified: "",
            Timeout: 0,
            Handler: "",
            FunctionArn: "",
            FunctionName: "",
            Version: "",
            CodeSize: 0 /*long*/,
            Runtime: "",
            CodeSha256: ""
        };
        return [201, ret];
    });
module.exports.ListVersionsByFunction = aws_common.as(
    "GET",
    "/2015-03-31/functions/:FunctionName/versions",
    function ListVersionsByFunction(aws) {
        var Marker = aws.params['Marker'];
        var FunctionName = aws.reqParams.FunctionName;
        var MaxItems = aws.params['MaxItems'] /* integer */;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = {
            NextMarker: "",
            Versions: /*S1v*/[ /*Sz*/{
                Description: "",
                Role: "",
                MemorySize: 0,
                LastModified: "",
                Timeout: 0,
                Handler: "",
                FunctionArn: "",
                FunctionName: "",
                Version: "",
                CodeSize: 0 /*long*/,
                Runtime: "",
                CodeSha256: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    });


// -------------------------------------------------------------------
// Aliases
module.exports.UpdateAlias = aws_common.as(
    "PUT",
    "/2015-03-31/functions/:FunctionName/aliases/:Name",
    function UpdateAlias(aws) {
        var FunctionVersion = aws.params['FunctionVersion'];
        var FunctionName = aws.reqParams.FunctionName;
        var Description = aws.params['Description'];
        var Name = aws.reqParams.Name;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }

        // TODO implement code

        var ret = /*Sf*/{
            Description: "",
            FunctionVersion: "",
            Name: "",
            AliasArn: ""
        };
        return [200, ret];
    });
module.exports.GetAlias = aws_common.as(
    "GET",
    "/2015-03-31/functions/:FunctionName/aliases/:Name",
    function GetAlias(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var Name = aws.reqParams.Name;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }

        // TODO implement code

        var ret = /*Sf*/{
            Description: "",
            FunctionVersion: "",
            Name: "",
            AliasArn: ""
        };
        return [200, ret];
    });
module.exports.CreateAlias = aws_common.as(
    "/2015-03-31/functions/:FunctionName/aliases",
    function CreateAlias(aws) {
        var FunctionVersion = aws.params['FunctionVersion'];
        var FunctionName = aws.reqParams.FunctionName;
        var Description = aws.params['Description'];
        var Name = aws.params['Name'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }        if (! FunctionVersion) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionVersion"];
        }

        // TODO implement code

        var ret = /*Sf*/{
            Description: "",
            FunctionVersion: "",
            Name: "",
            AliasArn: ""
        };
        return [201, ret];
    });
module.exports.ListAliases = aws_common.as(
    "GET",
    "/2015-03-31/functions/:FunctionName/aliases",
    function ListAliases(aws) {
        var FunctionVersion = aws.params['FunctionVersion'];
        var Marker = aws.params['Marker'];
        var FunctionName = aws.reqParams.FunctionName;
        var MaxItems = aws.params['MaxItems'] /* integer */;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = {
            NextMarker: "",
            Aliases: [ /*Sf*/{
                Description: "",
                FunctionVersion: "",
                Name: "",
                AliasArn: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    });
module.exports.DeleteAlias = aws_common.as(
    "DELETE",
    "/2015-03-31/functions/:FunctionName/aliases/:Name",
    function DeleteAlias(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var Name = aws.reqParams.Name;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }

        // TODO implement code

        var ret = {};
        return [204, ret];
    });



// ---------------------------------------------------------------
// Permissions are ignored

module.exports.AddPermission = aws_common.as(
    "/2015-03-31/functions/:FunctionName/policy",
    function AddPermission(aws) {
        var SourceArn = aws.params['SourceArn'];
        var StatementId = aws.params['StatementId'];
        var FunctionName = aws.reqParams.FunctionName;
        var Action = aws.params['Action'];
        var Principal = aws.params['Principal'];
        var Qualifier = aws.params['Qualifier'];
        var SourceAccount = aws.params['SourceAccount'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }
        if (! StatementId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter StatementId"];
        }
        if (! Action) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Action"];
        }
        if (! Principal) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Principal"];
        }

        // permissions are ignored
        var ret = {
            Statement: "ignored"
        };
        return [201, ret];
    });
module.exports.RemovePermission = aws_common.as(
    "DELETE",
    "/2015-03-31/functions/:FunctionName/policy/:StatementId",
    function RemovePermission(aws) {
        var StatementId = aws.reqParams.StatementId;
        var FunctionName = aws.reqParams.FunctionName;
        var Qualifier = aws.params['Qualifier'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }
        if (! StatementId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter StatementId"];
        }

        // permissions are ignored

        return [404, 'Sender', 'PermissionNotFound', 'permissions not implemented']
    });
module.exports.GetPolicy = aws_common.as(
    "GET",
    "/2015-03-31/functions/:FunctionName/policy",
    function GetPolicy(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var Qualifier = aws.params['Qualifier'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // policies / permissions are ignored

        var ret = {
            Policy: "{}"
        };
        return [200, ret];
    });
