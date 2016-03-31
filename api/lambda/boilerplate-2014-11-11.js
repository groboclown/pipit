'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS Lambda version 2014-11-11
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol rest-json
require('../../lib/aws-common/shape_http')('rest-json', module.exports, null)
module.exports.UpdateFunctionConfiguration = aws_common.as(
    "PUT",
    "/2014-11-13/functions/:FunctionName/configuration",
    function UpdateFunctionConfiguration(aws) {
        var Description = aws.params['Description'];
        var MemorySize = aws.params['MemorySize'] /* integer */;
        var Handler = aws.params['Handler'];
        var FunctionName = aws.reqParams.FunctionName;
        var Role = aws.params['Role'];
        var Timeout = aws.params['Timeout'] /* integer */;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }


        // TODO implement code

        var ret = /*Se*/{
            Handler: "",
            MemorySize: 0,
            Description: "",
            CodeSize: 0 /*long*/,
            FunctionName: "",
            Timeout: 0,
            ConfigurationId: "",
            LastModified: now(),
            FunctionARN: "",
            Runtime: "",
            Role: "",
            Mode: ""
        };
        return [200, ret];
    });
module.exports.GetFunctionConfiguration = aws_common.as(
    "GET",
    "/2014-11-13/functions/:FunctionName/configuration",
    function GetFunctionConfiguration(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }


        // TODO implement code

        var ret = /*Se*/{
            Handler: "",
            MemorySize: 0,
            Description: "",
            CodeSize: 0 /*long*/,
            FunctionName: "",
            Timeout: 0,
            ConfigurationId: "",
            LastModified: now(),
            FunctionARN: "",
            Runtime: "",
            Role: "",
            Mode: ""
        };
        return [200, ret];
    });
module.exports.DeleteFunction = aws_common.as(
    "DELETE",
    "/2014-11-13/functions/:FunctionName",
    function DeleteFunction(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }


        // TODO implement code

        var ret = {};
        return [204, ret];
    });
module.exports.InvokeAsync = aws_common.as(
    "/2014-11-13/functions/:FunctionName/invoke-async/",
    function InvokeAsync(aws) {
        var InvokeArgs = aws.params['InvokeArgs'];
        var FunctionName = aws.reqParams.FunctionName;
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
module.exports.ListEventSources = aws_common.as(
    "GET",
    "/2014-11-13/event-source-mappings/",
    function ListEventSources(aws) {
        var EventSourceArn = aws.params['EventSourceArn'];
        var Marker = aws.params['Marker'];
        var FunctionName = aws.params['FunctionName'];
        var MaxItems = aws.params['MaxItems'] /* integer */;


        // TODO implement code

        var ret = {
            EventSources: [ /*S7*/{
                Parameters: /*S6*/{} /* map */,
                Role: "",
                LastModified: now(),
                BatchSize: 0,
                EventSource: "",
                Status: "",
                IsActive: false,
                UUID: "",
                FunctionName: ""
            } /*, ...*/ ],
            NextMarker: ""
        };
        return [200, ret];
    });
module.exports.GetEventSource = aws_common.as(
    "GET",
    "/2014-11-13/event-source-mappings/:UUID",
    function GetEventSource(aws) {
        var UUID = aws.reqParams.UUID;
        if (! UUID) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter UUID"];
        }


        // TODO implement code

        var ret = /*S7*/{
            Parameters: /*S6*/{} /* map */,
            Role: "",
            LastModified: now(),
            BatchSize: 0,
            EventSource: "",
            Status: "",
            IsActive: false,
            UUID: "",
            FunctionName: ""
        };
        return [200, ret];
    });
module.exports.ListFunctions = aws_common.as(
    "GET",
    "/2014-11-13/functions/",
    function ListFunctions(aws) {
        var Marker = aws.params['Marker'];
        var MaxItems = aws.params['MaxItems'] /* integer */;


        // TODO implement code

        var ret = {
            NextMarker: "",
            Functions: [ /*Se*/{
                Handler: "",
                MemorySize: 0,
                Description: "",
                CodeSize: 0 /*long*/,
                FunctionName: "",
                Timeout: 0,
                ConfigurationId: "",
                LastModified: now(),
                FunctionARN: "",
                Runtime: "",
                Role: "",
                Mode: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    });
module.exports.UploadFunction = aws_common.as(
    "PUT",
    "/2014-11-13/functions/:FunctionName",
    function UploadFunction(aws) {
        var Role = aws.params['Role'];
        var Timeout = aws.params['Timeout'] /* integer */;
        var Description = aws.params['Description'];
        var Runtime = aws.params['Runtime'];
        var MemorySize = aws.params['MemorySize'] /* integer */;
        var FunctionName = aws.reqParams.FunctionName;
        var FunctionZip = aws.params['FunctionZip'];
        var Handler = aws.params['Handler'];
        var Mode = aws.params['Mode'];
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }
        if (! FunctionZip) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionZip"];
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
        if (! Mode) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Mode"];
        }


        // TODO implement code

        var ret = /*Se*/{
            Handler: "",
            MemorySize: 0,
            Description: "",
            CodeSize: 0 /*long*/,
            FunctionName: "",
            Timeout: 0,
            ConfigurationId: "",
            LastModified: now(),
            FunctionARN: "",
            Runtime: "",
            Role: "",
            Mode: ""
        };
        return [201, ret];
    });
module.exports.AddEventSource = aws_common.as(
    "/2014-11-13/event-source-mappings/",
    function AddEventSource(aws) {
        var Parameters = aws.params['Parameters'];
        var Role = aws.params['Role'];
        var FunctionName = aws.params['FunctionName'];
        var BatchSize = aws.params['BatchSize'] /* integer */;
        var EventSource = aws.params['EventSource'];
        if (! EventSource) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter EventSource"];
        }
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }
        if (! Role) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Role"];
        }


        // TODO implement code

        var ret = /*S7*/{
            Parameters: /*S6*/{} /* map */,
            Role: "",
            LastModified: now(),
            BatchSize: 0,
            EventSource: "",
            Status: "",
            IsActive: false,
            UUID: "",
            FunctionName: ""
        };
        return [200, ret];
    });
module.exports.RemoveEventSource = aws_common.as(
    "DELETE",
    "/2014-11-13/event-source-mappings/:UUID",
    function RemoveEventSource(aws) {
        var UUID = aws.reqParams.UUID;
        if (! UUID) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter UUID"];
        }


        // TODO implement code

        var ret = {};
        return [204, ret];
    });
module.exports.GetFunction = aws_common.as(
    "GET",
    "/2014-11-13/functions/:FunctionName",
    function GetFunction(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }


        // TODO implement code

        var ret = {
            Code: {
                RepositoryType: "",
                Location: ""
            },
            Configuration: /*Se*/{
                Handler: "",
                MemorySize: 0,
                Description: "",
                CodeSize: 0 /*long*/,
                FunctionName: "",
                Timeout: 0,
                ConfigurationId: "",
                LastModified: now(),
                FunctionARN: "",
                Runtime: "",
                Role: "",
                Mode: ""
            }
        };
        return [200, ret];
    });
