'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon SimpleDB version 2009-04-15
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol query
require('../../lib/aws-common/shape_http')('query', module.exports, 'http://sdb.amazonaws.com/doc/2009-04-15/');
// -----------------------------------
module.exports.BatchDeleteAttributes = function BatchDeleteAttributes(aws) {
  var domainName = aws.params.DomainName;
  var items = aws.params.Items /* Type list */;
  if (!domainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!items) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Items'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.BatchPutAttributes = function BatchPutAttributes(aws) {
  var domainName = aws.params.DomainName;
  var items = aws.params.Items /* Type list */;
  if (!domainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!items) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Items'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.CreateDomain = function CreateDomain(aws) {
  var domainName = aws.params.DomainName;
  if (!domainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteAttributes = function DeleteAttributes(aws) {
  var attributes = aws.params.Attributes;
  var domainName = aws.params.DomainName;
  var expected = aws.params.Expected;
  var itemName = aws.params.ItemName;
  if (!domainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!itemName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ItemName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteDomain = function DeleteDomain(aws) {
  var domainName = aws.params.DomainName;
  if (!domainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DomainMetadata = function DomainMetadata(aws) {
  var domainName = aws.params.DomainName;
  if (!domainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    AttributeNameCount: 0,
    AttributeNamesSizeBytes: 0 /*Long*/,
    AttributeValueCount: 0,
    AttributeValuesSizeBytes: 0 /*Long*/,
    ItemCount: 0,
    ItemNamesSizeBytes: 0 /*Long*/,
    Timestamp: 0,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetAttributes = function GetAttributes(aws) {
  var attributeNames = aws.params.AttributeNames /* Type list */;
  var consistentRead = aws.params.ConsistentRead /* Type boolean */;
  var domainName = aws.params.DomainName;
  var itemName = aws.params.ItemName;
  if (!domainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!itemName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ItemName'];
  }


  // TODO implement code

  var ret = {
    Attributes: /*So*/[ {
      AlternateNameEncoding: '',
      AlternateValueEncoding: '',
      Name: '',
      Value: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListDomains = function ListDomains(aws) {
  var maxNumberOfDomains = aws.params.MaxNumberOfDomains /* Type integer */;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    DomainNames: [ '', /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutAttributes = function PutAttributes(aws) {
  var attributes = aws.params.Attributes;
  var domainName = aws.params.DomainName;
  var expected = aws.params.Expected;
  var itemName = aws.params.ItemName;
  if (!attributes) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Attributes'];
  }
  if (!domainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!itemName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ItemName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.Select = function Select(aws) {
  var consistentRead = aws.params.ConsistentRead /* Type boolean */;
  var nextToken = aws.params.NextToken;
  var selectExpression = aws.params.SelectExpression;
  if (!selectExpression) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter SelectExpression'];
  }


  // TODO implement code

  var ret = {
    Items: [ {
      AlternateNameEncoding: '',
      Attributes: /*So*/[ {
        AlternateNameEncoding: '',
        AlternateValueEncoding: '',
        Name: '',
        Value: '',
      }, /* ...*/ ],
      Name: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
