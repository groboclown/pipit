'use strict';

module.exports.alwaysFail_before = function(serviceName, apiName, req) {
    return [400, 'Service', 'InternalError', 'Mock testing of internal errors'];
};
