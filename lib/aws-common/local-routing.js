'use strict';

const psplit = require('../psplit');

/**
 * Routes the mock API calls (from Lambda functions) into the AWS
 * actions.
 *
 * @param {RouteMap} actionMap - the route entry from the api/route.js
 *    file, for a specific service name.
 * @return {Object[]} list of { actionName, handler }.
 */
module.exports = function(p) {
  var serviceName = p.serviceName;
  var url = p.url;
  var actionMap = p.actionMap;
  var ret = [];
  for (var i = 0; i < actionMap.routes.length; i++) {
    var route = actionMap.routes[i];
    ret.push({
      actionName: route.Action,
      handler: createHandler({
        serviceName: serviceName,
        url: url,
        route: route,
      }),
    });
  }
  return ret;
};

function createHandler(p) {
  var serviceName = p.serviceName;
  var url = p.url;
  var route = p.route;
  return function(awsConfig, params, callback) {
    console.log(`[local route ${serviceName}] calling ${route.Action} with params ${JSON.stringify(params)}`);
    try {
      var aws = createAws({
        awsConfig: awsConfig,
        serviceName: serviceName,
        url: url,
        route: route,
        params: params,
      });
      route.LongPoll(aws)
        .then(function(res) {
          if (res[0] >= 400) {
            // Error result
            callback(new Error(res[3]));
          } else {
            callback(null, res[1]);
          }
        })
        .catch(function(err) {
          callback(err, null);
        });
    } catch (err) {
      console.log(`[local route ${serviceName}] invoking ${route.Action} with params ${JSON.stringify(params)} generated: ${err.message}\n${err.stack}`);
      callback(err, null);
    }
  };
}


/**
 * Creates the mock AWS object.
 */
function createAws(p) {
  var awsConfig = p.awsConfig;
  var serviceName = p.serviceName;
  var url = p.url;
  var route = p.route;
  var params = p.params;

  // FIXME
  return {
    baseUrl: 'http://localhost/' + url, // TODO fix
    requestUrl: url, // TODO fix
    serviceName: serviceName,
    params: params,
    restParams: params,
    data: psplit.split(params),
    reqParams: params,
    version: awsConfig.VERSION, // AWS.config.versions, really.
    action: route.Action,
    accessKey: '1123', // TODO should come from AWS.config
    expires: '123412341234', // TODO fix
    signature: '12341234', // TODO fix
    signatureMethod: '', // TODO fix
    signatureVersion: '', // TODO fix
    timestamp: 10, // TODO fix
    region: (!!awsConfig.region ? awsConfig.region : 'ZN-MOCK-1'),
    isRest: (!route.Action),
  };
}
