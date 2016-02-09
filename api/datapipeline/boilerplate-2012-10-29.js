'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS Data Pipeline version 2012-10-29
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.ReportTaskProgress = function ReportTaskProgress(aws) {
        var fields = aws.params.fields;
        var taskId = aws.params.taskId;
        if (! taskId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskId"];
        }

        // TODO implement code

        var ret = {
            canceled: false
        };
        return [200, ret];
    }
module.exports.DescribeObjects = function DescribeObjects(aws) {
        var objectIds = aws.params.objectIds;
        var evaluateExpressions = aws.params.evaluateExpressions /* boolean */;
        var marker = aws.params.marker;
        var pipelineId = aws.params.pipelineId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }        if (! objectIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter objectIds"];
        }

        // TODO implement code

        var ret = {
            hasMoreResults: false,
            marker: "",
            pipelineObjects: /*Sq*/[ /*Sr*/{
                fields: /*Ss*/[ {
                    key: "",
                    refValue: "",
                    stringValue: ""
                } /*, ...*/ ],
                name: "",
                id: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.SetStatus = function SetStatus(aws) {
        var objectIds = aws.params.objectIds;
        var status = aws.params.status;
        var pipelineId = aws.params.pipelineId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }        if (! objectIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter objectIds"];
        }        if (! status) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter status"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.EvaluateExpression = function EvaluateExpression(aws) {
        var expression = aws.params.expression;
        var pipelineId = aws.params.pipelineId;
        var objectId = aws.params.objectId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }        if (! objectId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter objectId"];
        }        if (! expression) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter expression"];
        }

        // TODO implement code

        var ret = {
            evaluatedExpression: ""
        };
        return [200, ret];
    }
module.exports.ListPipelines = function ListPipelines(aws) {
        var marker = aws.params.marker;


        // TODO implement code

        var ret = {
            pipelineIdList: [ {
                name: "",
                id: ""
            } /*, ...*/ ],
            marker: "",
            hasMoreResults: false
        };
        return [200, ret];
    }
module.exports.DescribePipelines = function DescribePipelines(aws) {
        var pipelineIds = aws.params.pipelineIds;
        if (! pipelineIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineIds"];
        }

        // TODO implement code

        var ret = {
            pipelineDescriptionList: [ {
                fields: /*Ss*/[ {
                    key: "",
                    refValue: "",
                    stringValue: ""
                } /*, ...*/ ],
                name: "",
                description: "",
                pipelineId: "",
                tags: /*Sa*/[ {
                    key: "",
                    value: ""
                } /*, ...*/ ]
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.GetPipelineDefinition = function GetPipelineDefinition(aws) {
        var version = aws.params.version;
        var pipelineId = aws.params.pipelineId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }

        // TODO implement code

        var ret = {
            pipelineObjects: /*Sq*/[ /*Sr*/{
                fields: /*Ss*/[ {
                    key: "",
                    refValue: "",
                    stringValue: ""
                } /*, ...*/ ],
                name: "",
                id: ""
            } /*, ...*/ ],
            parameterObjects: /*S13*/[ {
                attributes: [ {
                    key: "",
                    stringValue: ""
                } /*, ...*/ ],
                id: ""
            } /*, ...*/ ],
            parameterValues: /*S3*/[ {
                id: "",
                stringValue: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.SetTaskStatus = function SetTaskStatus(aws) {
        var errorMessage = aws.params.errorMessage;
        var errorStackTrace = aws.params.errorStackTrace;
        var taskId = aws.params.taskId;
        var errorId = aws.params.errorId;
        var taskStatus = aws.params.taskStatus;
        if (! taskId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskId"];
        }        if (! taskStatus) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskStatus"];
        }

        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.DeletePipeline = function DeletePipeline(aws) {
        var pipelineId = aws.params.pipelineId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PollForTask = function PollForTask(aws) {
        var workerGroup = aws.params.workerGroup;
        var hostname = aws.params.hostname;
        var instanceIdentity = aws.params.instanceIdentity /* structure */;
        if (! workerGroup) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter workerGroup"];
        }

        // TODO implement code

        var ret = {
            taskObject: {
                attemptId: "",
                taskId: "",
                pipelineId: "",
                objects: {} /* map */
            }
        };
        return [200, ret];
    }
module.exports.AddTags = function AddTags(aws) {
        var tags = aws.params.tags;
        var pipelineId = aws.params.pipelineId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }        if (! tags) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter tags"];
        }

        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.DeactivatePipeline = function DeactivatePipeline(aws) {
        var cancelActive = aws.params.cancelActive /* boolean */;
        var pipelineId = aws.params.pipelineId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }

        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.ActivatePipeline = function ActivatePipeline(aws) {
        var startTimestamp = aws.params.startTimestamp /* timestamp */;
        var parameterValues = aws.params.parameterValues;
        var pipelineId = aws.params.pipelineId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }

        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.ValidatePipelineDefinition = function ValidatePipelineDefinition(aws) {
        var parameterValues = aws.params.parameterValues;
        var pipelineObjects = aws.params.pipelineObjects;
        var parameterObjects = aws.params.parameterObjects;
        var pipelineId = aws.params.pipelineId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }        if (! pipelineObjects) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineObjects"];
        }

        // TODO implement code

        var ret = {
            errored: false,
            validationWarnings: /*S1p*/[ {
                warnings: /*S1n*/[ "" /*, ...*/ ],
                id: ""
            } /*, ...*/ ],
            validationErrors: /*S1l*/[ {
                errors: /*S1n*/[ "" /*, ...*/ ],
                id: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.PutPipelineDefinition = function PutPipelineDefinition(aws) {
        var parameterValues = aws.params.parameterValues;
        var pipelineObjects = aws.params.pipelineObjects;
        var parameterObjects = aws.params.parameterObjects;
        var pipelineId = aws.params.pipelineId;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }        if (! pipelineObjects) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineObjects"];
        }

        // TODO implement code

        var ret = {
            errored: false,
            validationWarnings: /*S1p*/[ {
                warnings: /*S1n*/[ "" /*, ...*/ ],
                id: ""
            } /*, ...*/ ],
            validationErrors: /*S1l*/[ {
                errors: /*S1n*/[ "" /*, ...*/ ],
                id: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.RemoveTags = function RemoveTags(aws) {
        var pipelineId = aws.params.pipelineId;
        var tagKeys = aws.params.tagKeys;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }        if (! tagKeys) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter tagKeys"];
        }

        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.QueryObjects = function QueryObjects(aws) {
        var query = aws.params.query /* structure */;
        var marker = aws.params.marker;
        var limit = aws.params.limit /* integer */;
        var pipelineId = aws.params.pipelineId;
        var sphere = aws.params.sphere;
        if (! pipelineId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineId"];
        }        if (! sphere) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter sphere"];
        }

        // TODO implement code

        var ret = {
            ids: /*Sn*/[ "" /*, ...*/ ],
            marker: "",
            hasMoreResults: false
        };
        return [200, ret];
    }
module.exports.CreatePipeline = function CreatePipeline(aws) {
        var uniqueId = aws.params.uniqueId;
        var name = aws.params.name;
        var tags = aws.params.tags;
        var description = aws.params.description;
        if (! name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
        }        if (! uniqueId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter uniqueId"];
        }

        // TODO implement code

        var ret = {
            pipelineId: ""
        };
        return [200, ret];
    }
module.exports.ReportTaskRunnerHeartbeat = function ReportTaskRunnerHeartbeat(aws) {
        var workerGroup = aws.params.workerGroup;
        var hostname = aws.params.hostname;
        var taskrunnerId = aws.params.taskrunnerId;
        if (! taskrunnerId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter taskrunnerId"];
        }

        // TODO implement code

        var ret = {
            terminate: false
        };
        return [200, ret];
    }
