'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * AWS Key Management Service version 2014-11-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);
// -----------------------------------
module.exports.CancelKeyDeletion = function CancelKeyDeletion(aws) {
  var keyId = aws.params.KeyId;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {
    KeyId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateAlias = function CreateAlias(aws) {
  var aliasName = aws.params.AliasName;
  var targetKeyId = aws.params.TargetKeyId;
  if (!aliasName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AliasName'];
  }
  if (!targetKeyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TargetKeyId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.CreateGrant = function CreateGrant(aws) {
  var constraints = aws.params.Constraints;
  var grantTokens = aws.params.GrantTokens;
  var granteePrincipal = aws.params.GranteePrincipal;
  var keyId = aws.params.KeyId;
  var name = aws.params.Name;
  var operations = aws.params.Operations;
  var retiringPrincipal = aws.params.RetiringPrincipal;
  if (!granteePrincipal) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter GranteePrincipal'];
  }
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {
    GrantId: '',
    GrantToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateKey = function CreateKey(aws) {
  var bypassPolicyLockoutSafetyCheck = aws.params.BypassPolicyLockoutSafetyCheck /* Type boolean */;
  var description = aws.params.Description;
  var keyUsage = aws.params.KeyUsage;
  var policy = aws.params.Policy;


  // TODO implement code

  var ret = {
    KeyMetadata: /*Sp*/{
      AWSAccountId: '',
      Arn: '',
      CreationDate: awsCommon.timestamp(),
      DeletionDate: awsCommon.timestamp(),
      Description: '',
      Enabled: false,
      KeyId: '',
      KeyState: '',
      KeyUsage: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.Decrypt = function Decrypt(aws) {
  var ciphertextBlob = aws.params.CiphertextBlob /* Type blob */;
  var encryptionContext = aws.params.EncryptionContext;
  var grantTokens = aws.params.GrantTokens;
  if (!ciphertextBlob) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter CiphertextBlob'];
  }


  // TODO implement code

  var ret = {
    KeyId: '',
    Plaintext: /*Sx*/null /*Blob*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteAlias = function DeleteAlias(aws) {
  var aliasName = aws.params.AliasName;
  if (!aliasName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AliasName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeKey = function DescribeKey(aws) {
  var grantTokens = aws.params.GrantTokens;
  var keyId = aws.params.KeyId;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {
    KeyMetadata: /*Sp*/{
      AWSAccountId: '',
      Arn: '',
      CreationDate: awsCommon.timestamp(),
      DeletionDate: awsCommon.timestamp(),
      Description: '',
      Enabled: false,
      KeyId: '',
      KeyState: '',
      KeyUsage: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DisableKey = function DisableKey(aws) {
  var keyId = aws.params.KeyId;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DisableKeyRotation = function DisableKeyRotation(aws) {
  var keyId = aws.params.KeyId;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.EnableKey = function EnableKey(aws) {
  var keyId = aws.params.KeyId;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.EnableKeyRotation = function EnableKeyRotation(aws) {
  var keyId = aws.params.KeyId;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.Encrypt = function Encrypt(aws) {
  var encryptionContext = aws.params.EncryptionContext;
  var grantTokens = aws.params.GrantTokens;
  var keyId = aws.params.KeyId;
  var plaintext = aws.params.Plaintext;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }
  if (!plaintext) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Plaintext'];
  }


  // TODO implement code

  var ret = {
    CiphertextBlob: null /*Blob*/,
    KeyId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GenerateDataKey = function GenerateDataKey(aws) {
  var encryptionContext = aws.params.EncryptionContext;
  var grantTokens = aws.params.GrantTokens;
  var keyId = aws.params.KeyId;
  var keySpec = aws.params.KeySpec;
  var numberOfBytes = aws.params.NumberOfBytes /* Type integer */;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {
    CiphertextBlob: null /*Blob*/,
    KeyId: '',
    Plaintext: /*Sx*/null /*Blob*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GenerateDataKeyWithoutPlaintext = function GenerateDataKeyWithoutPlaintext(aws) {
  var encryptionContext = aws.params.EncryptionContext;
  var grantTokens = aws.params.GrantTokens;
  var keyId = aws.params.KeyId;
  var keySpec = aws.params.KeySpec;
  var numberOfBytes = aws.params.NumberOfBytes /* Type integer */;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {
    CiphertextBlob: null /*Blob*/,
    KeyId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GenerateRandom = function GenerateRandom(aws) {
  var numberOfBytes = aws.params.NumberOfBytes /* Type integer */;


  // TODO implement code

  var ret = {
    Plaintext: /*Sx*/null /*Blob*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetKeyPolicy = function GetKeyPolicy(aws) {
  var keyId = aws.params.KeyId;
  var policyName = aws.params.PolicyName;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }
  if (!policyName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter PolicyName'];
  }


  // TODO implement code

  var ret = {
    Policy: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetKeyRotationStatus = function GetKeyRotationStatus(aws) {
  var keyId = aws.params.KeyId;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {
    KeyRotationEnabled: false,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListAliases = function ListAliases(aws) {
  var limit = aws.params.Limit /* Type integer */;
  var marker = aws.params.Marker;


  // TODO implement code

  var ret = {
    Aliases: [ {
      AliasArn: '',
      AliasName: '',
      TargetKeyId: '',
    }, /* ...*/ ],
    NextMarker: '',
    Truncated: false,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListGrants = function ListGrants(aws) {
  var keyId = aws.params.KeyId;
  var limit = aws.params.Limit /* Type integer */;
  var marker = aws.params.Marker;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = /*S1r*/{
    Grants: [ {
      Constraints: /*Sa*/{
        EncryptionContextEquals: /*Sb*/{} /*Map*/,
        EncryptionContextSubset: /*Sb*/{} /*Map*/,
      },
      CreationDate: awsCommon.timestamp(),
      GrantId: '',
      GranteePrincipal: '',
      IssuingAccount: '',
      KeyId: '',
      Name: '',
      Operations: /*S8*/[ '', /* ...*/ ],
      RetiringPrincipal: '',
    }, /* ...*/ ],
    NextMarker: '',
    Truncated: false,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListKeyPolicies = function ListKeyPolicies(aws) {
  var keyId = aws.params.KeyId;
  var limit = aws.params.Limit /* Type integer */;
  var marker = aws.params.Marker;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {
    NextMarker: '',
    PolicyNames: [ '', /* ...*/ ],
    Truncated: false,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListKeys = function ListKeys(aws) {
  var limit = aws.params.Limit /* Type integer */;
  var marker = aws.params.Marker;


  // TODO implement code

  var ret = {
    Keys: [ {
      KeyArn: '',
      KeyId: '',
    }, /* ...*/ ],
    NextMarker: '',
    Truncated: false,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListRetirableGrants = function ListRetirableGrants(aws) {
  var limit = aws.params.Limit /* Type integer */;
  var marker = aws.params.Marker;
  var retiringPrincipal = aws.params.RetiringPrincipal;
  if (!retiringPrincipal) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RetiringPrincipal'];
  }


  // TODO implement code

  var ret = /*S1r*/{
    Grants: [ {
      Constraints: /*Sa*/{
        EncryptionContextEquals: /*Sb*/{} /*Map*/,
        EncryptionContextSubset: /*Sb*/{} /*Map*/,
      },
      CreationDate: awsCommon.timestamp(),
      GrantId: '',
      GranteePrincipal: '',
      IssuingAccount: '',
      KeyId: '',
      Name: '',
      Operations: /*S8*/[ '', /* ...*/ ],
      RetiringPrincipal: '',
    }, /* ...*/ ],
    NextMarker: '',
    Truncated: false,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutKeyPolicy = function PutKeyPolicy(aws) {
  var bypassPolicyLockoutSafetyCheck = aws.params.BypassPolicyLockoutSafetyCheck /* Type boolean */;
  var keyId = aws.params.KeyId;
  var policy = aws.params.Policy;
  var policyName = aws.params.PolicyName;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }
  if (!policy) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Policy'];
  }
  if (!policyName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter PolicyName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.ReEncrypt = function ReEncrypt(aws) {
  var ciphertextBlob = aws.params.CiphertextBlob /* Type blob */;
  var destinationEncryptionContext = aws.params.DestinationEncryptionContext;
  var destinationKeyId = aws.params.DestinationKeyId;
  var grantTokens = aws.params.GrantTokens;
  var sourceEncryptionContext = aws.params.SourceEncryptionContext;
  if (!ciphertextBlob) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter CiphertextBlob'];
  }
  if (!destinationKeyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DestinationKeyId'];
  }


  // TODO implement code

  var ret = {
    CiphertextBlob: null /*Blob*/,
    KeyId: '',
    SourceKeyId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RetireGrant = function RetireGrant(aws) {
  var grantId = aws.params.GrantId;
  var grantToken = aws.params.GrantToken;
  var keyId = aws.params.KeyId;


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.RevokeGrant = function RevokeGrant(aws) {
  var grantId = aws.params.GrantId;
  var keyId = aws.params.KeyId;
  if (!grantId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter GrantId'];
  }
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.ScheduleKeyDeletion = function ScheduleKeyDeletion(aws) {
  var keyId = aws.params.KeyId;
  var pendingWindowInDays = aws.params.PendingWindowInDays /* Type integer */;
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {
    DeletionDate: awsCommon.timestamp(),
    KeyId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateAlias = function UpdateAlias(aws) {
  var aliasName = aws.params.AliasName;
  var targetKeyId = aws.params.TargetKeyId;
  if (!aliasName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AliasName'];
  }
  if (!targetKeyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TargetKeyId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateKeyDescription = function UpdateKeyDescription(aws) {
  var description = aws.params.Description;
  var keyId = aws.params.KeyId;
  if (!description) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Description'];
  }
  if (!keyId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter KeyId'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
