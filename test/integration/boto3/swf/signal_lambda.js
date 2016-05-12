'use strict';

const AWS = require('aws-sdk');

module.exports.handler = function(event, context) {
  var data = JSON.parse(event);
  var domain = data.domain;
  var workflowId = data.workflowId;
  var signalName = data.signalName;
  var signalInput = data.input;

  // AWS connection setup
  AWS.config.update({region: 'us-west-1'});

  var swf = new AWS.SWF();
  var params = {
    domain: domain,
    workflowId: workflowId,
    signalName: signalName,
    input: signalInput,
  };
  console.log(`[lambda test handler] calling signalWorkflowExecution`);
  swf.signalWorkflowExecution(params, function(err, data) {
    if (err) {
      return context.fail(err);
    }
    context.succeed();
  });
};
