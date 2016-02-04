'use strict';

/**
 * Administration tasks for the configuration of the pipit server.
 */
 var express = require('express');
 var router = express.Router();
 var requestedUrl = require('../../lib/requested-url');
 var injections = require('../../lib/aws-common/injections');

/**
 * Get the list of before injections
 */
router.get('/:type', function(req, res, next) {
    var type = getType(req, res);
    if (! type) {
        return;
    }
    var inj = [];
    injections['forEach' + type](function(serviceName, apiName, injectionName, jsPath) {
        inj.push({
            Service: serviceName,
            Api: apiName,
            Name: injectionName,
            JSPath: jsPath,
            InjectionUrl: requestedUrl + "/" + serviceName + "/" + apiName + "/" + injectionName
        });
    });
    res.status(200);
    res.send({Injections: inj});
});


router.post('/:type', function(req, res, next) {
    var type = getType(req, res);
    if (! type) {
        return;
    }
    if (req.body.Clear === 'All') {
        injections['clear' + type]();
        res.send(true);
    } else {
        res.status(400);
        res.send({ErrorMessage: 'invalid operation on injections'});
    }
});


router.post('/:type/:service/:api/:name', function(req, res, next) {
    var type = getType(req, res);
    if (! type) {
        return;
    }
    var service = req.params.service;
    var api = req.params.api;
    var name = req.params.name;
    var jsPath = req.body.path;
    injections['add' + type](service, api, name, jsPath);
    res.status(200);
    res.send(true);
});


/**
 *
 */
router.get('/:type/:service/:api/:name', function(req, res, next) {
    var type = getType(req, res);
    if (! type) {
        return;
    }
    var service = req.params.service;
    var api = req.params.api;
    var name = req.params.name;
    var jsPath = injections['get' + type + 'JSPath'](service, api, name);
    if (!! jsPath) {
        res.status(200);
        res.send({ Injection: {
            Serivce: service,
            Api: api,
            Name: name,
            JSPath: jsPath,
            InjectionUrl: requestedUrl
        }});
    } else {
        res.status(404);
        res.send({ErrorMessage: 'injection not found'})
    }
});


router.delete('/:type/:service/:api/:name', function(req, res, next) {
    var type = getType(req, res);
    if (! type) {
        return;
    }
    var service = req.params.service;
    var api = req.params.api;
    var name = req.params.name;
    if (injections['remove' + type](service, api, name)) {
        res.send(true);
    } else {
        res.status(404);
        res.send({ErrorMessage: 'injection not found'})
    }
});





var getType = function(req, res) {
    var type = req.params.type;
    if (type !== 'After' && type !== 'Before') {
        res.status(404);
        res.send({ErrorMessage: 'injection not found; must be After or Before'});
        return null;
    }
    return type;
}


module.exports = router;
