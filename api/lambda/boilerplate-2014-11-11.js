'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS Lambda version 2014-11-11
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.UploadFunction = aws_common.as(
    "PUT",
    "/2014-11-13/functions/:FunctionName",
    function UploadFunction(aws) {
        var Mode = aws.params.Mode;
        var FunctionZip = aws.params.FunctionZip;
        var FunctionName = aws.reqParams.FunctionName;
        var Handler = aws.params.Handler;
        var Runtime = aws.params.Runtime;
        var Description = aws.params.Description;
        var MemorySize = aws.params.MemorySize /* integer */;
        var Timeout = aws.params.Timeout /* integer */;
        var Role = aws.params.Role;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }        if (! FunctionZip) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionZip"];
        }        if (! Runtime) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Runtime"];
        }        if (! Role) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Role"];
        }        if (! Handler) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Handler"];
        }        if (! Mode) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Mode"];
        }

        // TODO implement code

        var ret = /*Se*/{
            Mode: "",
            FunctionARN: "",
            LastModified: now(),
            Handler: "",
            Description: "",
            Role: "",
            ConfigurationId: "",
            FunctionName: "",
            Runtime: "",
            CodeSize: 0 /*long*/,
            MemorySize: 0,
            Timeout: 0
        };
        return [201, ret];
    });
module.exports.ListFunctions = aws_common.as(
    "GET",
    "/2014-11-13/functions/",
    function ListFunctions(aws) {
        var MaxItems = aws.params.MaxItems /* integer */;
        var Marker = aws.params.Marker;


        // TODO implement code

        var ret = {
            NextMarker: "",
            Functions: [ /*Se*/{
                Mode: "",
                FunctionARN: "",
                LastModified: now(),
                Handler: "",
                Description: "",
                Role: "",
                ConfigurationId: "",
                FunctionName: "",
                Runtime: "",
                CodeSize: 0 /*long*/,
                MemorySize: 0,
                Timeout: 0
            } /*, ...*/ ]
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
            BatchSize: 0,
            UUID: "",
            FunctionName: "",
            IsActive: false,
            LastModified: now(),
            Status: "",
            Parameters: /*S6*/{} /* map */,
            EventSource: "",
            Role: ""
        };
        return [200, ret];
    });
module.exports.InvokeAsync = aws_common.as(
    "/2014-11-13/functions/:FunctionName/invoke-async/",
    function InvokeAsync(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var InvokeArgs = aws.params.InvokeArgs;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }        if (! InvokeArgs) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter InvokeArgs"];
        }

        // TODO implement code

        var ret = {
            Status: 0
        };
        return [202, ret];
    });
module.exports.UpdateFunctionConfiguration = aws_common.as(
    "PUT",
    "/2014-11-13/functions/:FunctionName/configuration",
    function UpdateFunctionConfiguration(aws) {
        var FunctionName = aws.reqParams.FunctionName;
        var Handler = aws.params.Handler;
        var Timeout = aws.params.Timeout /* integer */;
        var Description = aws.params.Description;
        var MemorySize = aws.params.MemorySize /* integer */;
        var Role = aws.params.Role;
        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }

        // TODO implement code

        var ret = /*Se*/{
            Mode: "",
            FunctionARN: "",
            LastModified: now(),
            Handler: "",
            Description: "",
            Role: "",
            ConfigurationId: "",
            FunctionName: "",
            Runtime: "",
            CodeSize: 0 /*long*/,
            MemorySize: 0,
            Timeout: 0
        };
        return [200, ret];
    });
module.exports.ListEventSources = aws_common.as(
    "GET",
    "/2014-11-13/event-source-mappings/",
    function ListEventSources(aws) {
        var FunctionName = aws.params.FunctionName;
        var Marker = aws.params.Marker;
        var EventSourceArn = aws.params.EventSourceArn;
        var MaxItems = aws.params.MaxItems /* integer */;


        // TODO implement code

        var ret = {
            NextMarker: "",
            EventSources: [ /*S7*/{
                BatchSize: 0,
                UUID: "",
                FunctionName: "",
                IsActive: false,
                LastModified: now(),
                Status: "",
                Parameters: /*S6*/{} /* map */,
                EventSource: "",
                Role: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    });
module.exports.AddEventSource = aws_common.as(
    "/2014-11-13/event-source-mappings/",
    function AddEventSource(aws) {
        var FunctionName = aws.params.FunctionName;
        var BatchSize = aws.params.BatchSize /* integer */;
        var Parameters = aws.params.Parameters;
        var EventSource = aws.params.EventSource;
        var Role = aws.params.Role;
        if (! EventSource) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter EventSource"];
        }        if (! FunctionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FunctionName"];
        }        if (! Role) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Role"];
        }

        // TODO implement code

        var ret = /*S7*/{
            BatchSize: 0,
            UUID: "",
            FunctionName: "",
            IsActive: false,
            LastModified: now(),
            Status: "",
            Parameters: /*S6*/{} /* map */,
            EventSource: "",
            Role: ""
        };
        return [200, ret];
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
                Location: "",
                RepositoryType: ""
            },
            Configuration: /*Se*/{
                Mode: "",
                FunctionARN: "",
                LastModified: now(),
                Handler: "",
                Description: "",
                Role: "",
                ConfigurationId: "",
                FunctionName: "",
                Runtime: "",
                CodeSize: 0 /*long*/,
                MemorySize: 0,
                Timeout: 0
            }
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
            Mode: "",
            FunctionARN: "",
            LastModified: now(),
            Handler: "",
            Description: "",
            Role: "",
            ConfigurationId: "",
            FunctionName: "",
            Runtime: "",
            CodeSize: 0 /*long*/,
            MemorySize: 0,
            Timeout: 0
        };
        return [200, ret];
    });
