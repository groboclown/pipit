'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon Mobile Analytics version 2014-06-05
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol rest-json
require('../../lib/aws-common/shape_http')('rest-json', module.exports, null)
// -----------------------------------
module.exports.PutEvents = awsCommon.as(
  '/2014-06-05/events',
  function PutEvents(aws) {
  var events = aws.params['events'] /* Type list */;
  var clientContext = aws.params['clientContext'];
  var clientContextEncoding = aws.params['clientContextEncoding'];
  if (!events) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter events'];
  }
  if (!clientContext) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter clientContext'];
  }


  // TODO implement code

  var ret = {};
  return [202, ret];
});
