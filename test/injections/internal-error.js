'use strict';

module.exports.alwaysFail_before = function(serviceName, apiName, req) {
    return [500, 'Service', 'InternalFailure', 'Mock testing of internal errors'];
};
