'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon SimpleDB version 2009-04-15
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol query
require('../../lib/aws-common/shape_http')('query', module.exports, 'http://sdb.amazonaws.com/doc/2009-04-15/')
module.exports.Select = function Select(aws) {
        var NextToken = aws.params['NextToken'];
        var SelectExpression = aws.params['SelectExpression'];
        var ConsistentRead = aws.params['ConsistentRead'] /* boolean */;
        if (! SelectExpression) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SelectExpression"];
        }


        // TODO implement code

        var ret = {
            NextToken: "",
            Items: [ {
                Attributes: /*So*/[ {
                    Value: "",
                    AlternateValueEncoding: "",
                    Name: "",
                    AlternateNameEncoding: ""
                } /*, ...*/ ],
                Name: "",
                AlternateNameEncoding: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.BatchDeleteAttributes = function BatchDeleteAttributes(aws) {
        var DomainName = aws.params['DomainName'];
        var Items = aws.params['Items'] /* list */;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }
        if (! Items) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Items"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DomainMetadata = function DomainMetadata(aws) {
        var DomainName = aws.params['DomainName'];
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }


        // TODO implement code

        var ret = {
            ItemNamesSizeBytes: 0 /*long*/,
            ItemCount: 0,
            AttributeValueCount: 0,
            AttributeNameCount: 0,
            AttributeValuesSizeBytes: 0 /*long*/,
            AttributeNamesSizeBytes: 0 /*long*/,
            Timestamp: 0
        };
        return [200, ret];
    }
module.exports.BatchPutAttributes = function BatchPutAttributes(aws) {
        var DomainName = aws.params['DomainName'];
        var Items = aws.params['Items'] /* list */;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }
        if (! Items) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Items"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.ListDomains = function ListDomains(aws) {
        var MaxNumberOfDomains = aws.params['MaxNumberOfDomains'] /* integer */;
        var NextToken = aws.params['NextToken'];


        // TODO implement code

        var ret = {
            NextToken: "",
            DomainNames: [ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteAttributes = function DeleteAttributes(aws) {
        var DomainName = aws.params['DomainName'];
        var Attributes = aws.params['Attributes'];
        var ItemName = aws.params['ItemName'];
        var Expected = aws.params['Expected'];
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }
        if (! ItemName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ItemName"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeleteDomain = function DeleteDomain(aws) {
        var DomainName = aws.params['DomainName'];
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.GetAttributes = function GetAttributes(aws) {
        var DomainName = aws.params['DomainName'];
        var ItemName = aws.params['ItemName'];
        var AttributeNames = aws.params['AttributeNames'] /* list */;
        var ConsistentRead = aws.params['ConsistentRead'] /* boolean */;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }
        if (! ItemName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ItemName"];
        }


        // TODO implement code

        var ret = {
            Attributes: /*So*/[ {
                Value: "",
                AlternateValueEncoding: "",
                Name: "",
                AlternateNameEncoding: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.CreateDomain = function CreateDomain(aws) {
        var DomainName = aws.params['DomainName'];
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutAttributes = function PutAttributes(aws) {
        var DomainName = aws.params['DomainName'];
        var Attributes = aws.params['Attributes'];
        var ItemName = aws.params['ItemName'];
        var Expected = aws.params['Expected'];
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }
        if (! ItemName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ItemName"];
        }
        if (! Attributes) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Attributes"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
