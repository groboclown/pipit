'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * AWS Data Pipeline version 2012-10-29
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);
// -----------------------------------
module.exports.ActivatePipeline = function ActivatePipeline(aws) {
  var parameterValues = aws.params.parameterValues;
  var pipelineId = aws.params.pipelineId;
  var startTimestamp = aws.params.startTimestamp /* Type timestamp */;
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.AddTags = function AddTags(aws) {
  var pipelineId = aws.params.pipelineId;
  var tags = aws.params.tags;
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }
  if (!tags) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter tags'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreatePipeline = function CreatePipeline(aws) {
  var description = aws.params.description;
  var name = aws.params.name;
  var tags = aws.params.tags;
  var uniqueId = aws.params.uniqueId;
  if (!name) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter name'];
  }
  if (!uniqueId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter uniqueId'];
  }


  // TODO implement code

  var ret = {
    pipelineId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeactivatePipeline = function DeactivatePipeline(aws) {
  var cancelActive = aws.params.cancelActive /* Type boolean */;
  var pipelineId = aws.params.pipelineId;
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeletePipeline = function DeletePipeline(aws) {
  var pipelineId = aws.params.pipelineId;
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeObjects = function DescribeObjects(aws) {
  var evaluateExpressions = aws.params.evaluateExpressions /* Type boolean */;
  var marker = aws.params.marker;
  var objectIds = aws.params.objectIds;
  var pipelineId = aws.params.pipelineId;
  if (!objectIds) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter objectIds'];
  }
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }


  // TODO implement code

  var ret = {
    hasMoreResults: false,
    marker: '',
    pipelineObjects: /*Sq*/[ /*Sr*/{
      fields: /*Ss*/[ {
        key: '',
        refValue: '',
        stringValue: '',
      }, /* ...*/ ],
      id: '',
      name: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribePipelines = function DescribePipelines(aws) {
  var pipelineIds = aws.params.pipelineIds;
  if (!pipelineIds) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineIds'];
  }


  // TODO implement code

  var ret = {
    pipelineDescriptionList: [ {
      description: '',
      fields: /*Ss*/[ {
        key: '',
        refValue: '',
        stringValue: '',
      }, /* ...*/ ],
      name: '',
      pipelineId: '',
      tags: /*Sa*/[ {
        key: '',
        value: '',
      }, /* ...*/ ],
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.EvaluateExpression = function EvaluateExpression(aws) {
  var expression = aws.params.expression;
  var objectId = aws.params.objectId;
  var pipelineId = aws.params.pipelineId;
  if (!expression) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter expression'];
  }
  if (!objectId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter objectId'];
  }
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }


  // TODO implement code

  var ret = {
    evaluatedExpression: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetPipelineDefinition = function GetPipelineDefinition(aws) {
  var pipelineId = aws.params.pipelineId;
  var version = aws.params.version;
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }


  // TODO implement code

  var ret = {
    parameterObjects: /*S13*/[ {
      attributes: [ {
        key: '',
        stringValue: '',
      }, /* ...*/ ],
      id: '',
    }, /* ...*/ ],
    parameterValues: /*S3*/[ {
      id: '',
      stringValue: '',
    }, /* ...*/ ],
    pipelineObjects: /*Sq*/[ /*Sr*/{
      fields: /*Ss*/[ {
        key: '',
        refValue: '',
        stringValue: '',
      }, /* ...*/ ],
      id: '',
      name: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListPipelines = function ListPipelines(aws) {
  var marker = aws.params.marker;


  // TODO implement code

  var ret = {
    hasMoreResults: false,
    marker: '',
    pipelineIdList: [ {
      id: '',
      name: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PollForTask = function PollForTask(aws) {
  var hostname = aws.params.hostname;
  var instanceIdentity = aws.params.instanceIdentity /* Type structure */;
  var workerGroup = aws.params.workerGroup;
  if (!workerGroup) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter workerGroup'];
  }


  // TODO implement code

  var ret = {
    taskObject: {
      attemptId: '',
      objects: {} /*Map*/,
      pipelineId: '',
      taskId: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutPipelineDefinition = function PutPipelineDefinition(aws) {
  var parameterObjects = aws.params.parameterObjects;
  var parameterValues = aws.params.parameterValues;
  var pipelineId = aws.params.pipelineId;
  var pipelineObjects = aws.params.pipelineObjects;
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }
  if (!pipelineObjects) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineObjects'];
  }


  // TODO implement code

  var ret = {
    errored: false,
    validationErrors: /*S1l*/[ {
      errors: /*S1n*/[ '', /* ...*/ ],
      id: '',
    }, /* ...*/ ],
    validationWarnings: /*S1p*/[ {
      id: '',
      warnings: /*S1n*/[ '', /* ...*/ ],
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.QueryObjects = function QueryObjects(aws) {
  var limit = aws.params.limit /* Type integer */;
  var marker = aws.params.marker;
  var pipelineId = aws.params.pipelineId;
  var query = aws.params.query /* Type structure */;
  var sphere = aws.params.sphere;
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }
  if (!sphere) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter sphere'];
  }


  // TODO implement code

  var ret = {
    hasMoreResults: false,
    ids: /*Sn*/[ '', /* ...*/ ],
    marker: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RemoveTags = function RemoveTags(aws) {
  var pipelineId = aws.params.pipelineId;
  var tagKeys = aws.params.tagKeys;
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }
  if (!tagKeys) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter tagKeys'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.ReportTaskProgress = function ReportTaskProgress(aws) {
  var fields = aws.params.fields;
  var taskId = aws.params.taskId;
  if (!taskId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskId'];
  }


  // TODO implement code

  var ret = {
    canceled: false,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ReportTaskRunnerHeartbeat = function ReportTaskRunnerHeartbeat(aws) {
  var hostname = aws.params.hostname;
  var taskrunnerId = aws.params.taskrunnerId;
  var workerGroup = aws.params.workerGroup;
  if (!taskrunnerId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskrunnerId'];
  }


  // TODO implement code

  var ret = {
    terminate: false,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetStatus = function SetStatus(aws) {
  var objectIds = aws.params.objectIds;
  var pipelineId = aws.params.pipelineId;
  var status = aws.params.status;
  if (!objectIds) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter objectIds'];
  }
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }
  if (!status) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter status'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.SetTaskStatus = function SetTaskStatus(aws) {
  var errorId = aws.params.errorId;
  var errorMessage = aws.params.errorMessage;
  var errorStackTrace = aws.params.errorStackTrace;
  var taskId = aws.params.taskId;
  var taskStatus = aws.params.taskStatus;
  if (!taskId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskId'];
  }
  if (!taskStatus) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter taskStatus'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.ValidatePipelineDefinition = function ValidatePipelineDefinition(aws) {
  var parameterObjects = aws.params.parameterObjects;
  var parameterValues = aws.params.parameterValues;
  var pipelineId = aws.params.pipelineId;
  var pipelineObjects = aws.params.pipelineObjects;
  if (!pipelineId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineId'];
  }
  if (!pipelineObjects) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter pipelineObjects'];
  }


  // TODO implement code

  var ret = {
    errored: false,
    validationErrors: /*S1l*/[ {
      errors: /*S1n*/[ '', /* ...*/ ],
      id: '',
    }, /* ...*/ ],
    validationWarnings: /*S1p*/[ {
      id: '',
      warnings: /*S1n*/[ '', /* ...*/ ],
    }, /* ...*/ ],
  };
  return [200, ret];
};
