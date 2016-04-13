'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon EC2 Container Registry version 2015-09-21
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);
// -----------------------------------
module.exports.CreateRepository = function CreateRepository(aws) {
  var repositoryName = aws.params.repositoryName;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }


  // TODO implement code

  var ret = {
    repository: /*S11*/{
      repositoryArn: '',
      repositoryName: '',
      registryId: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetRepositoryPolicy = function SetRepositoryPolicy(aws) {
  var force = aws.params.force /* Type boolean */;
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  var policyText = aws.params.policyText;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }
  if (!policyText) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter policyText'];
  }


  // TODO implement code

  var ret = {
    repositoryName: '',
    registryId: '',
    policyText: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutImage = function PutImage(aws) {
  var imageManifest = aws.params.imageManifest;
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }
  if (!imageManifest) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter imageManifest'];
  }


  // TODO implement code

  var ret = {
    image: /*St*/{
      imageManifest: '',
      repositoryName: '',
      registryId: '',
      imageId: /*Si*/{
        imageTag: '',
        imageDigest: '',
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.InitiateLayerUpload = function InitiateLayerUpload(aws) {
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }


  // TODO implement code

  var ret = {
    uploadId: '',
    partSize: 0 /*Long*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeRepositories = function DescribeRepositories(aws) {
  var repositoryNames = aws.params.repositoryNames /* Type list */;
  var maxResults = aws.params.maxResults /* Type integer */;
  var registryId = aws.params.registryId;
  var nextToken = aws.params.nextToken;


  // TODO implement code

  var ret = {
    repositories: [ /*S11*/{
      repositoryArn: '',
      repositoryName: '',
      registryId: '',
    }, /* ...*/ ],
    nextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetAuthorizationToken = function GetAuthorizationToken(aws) {
  var registryIds = aws.params.registryIds /* Type list */;


  // TODO implement code

  var ret = {
    authorizationData: [ {
      authorizationToken: '',
      proxyEndpoint: '',
      expiresAt: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.BatchDeleteImage = function BatchDeleteImage(aws) {
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  var imageIds = aws.params.imageIds;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }
  if (!imageIds) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter imageIds'];
  }


  // TODO implement code

  var ret = {
    failures: /*Sm*/[ {
      failureReason: '',
      failureCode: '',
      imageId: /*Si*/{
        imageTag: '',
        imageDigest: '',
      },
    }, /* ...*/ ],
    imageIds: /*Sh*/[ /*Si*/{
        imageTag: '',
        imageDigest: '',
      }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CompleteLayerUpload = function CompleteLayerUpload(aws) {
  var uploadId = aws.params.uploadId;
  var layerDigests = aws.params.layerDigests /* Type list */;
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }
  if (!uploadId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter uploadId'];
  }
  if (!layerDigests) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter layerDigests'];
  }


  // TODO implement code

  var ret = {
    uploadId: '',
    layerDigest: '',
    repositoryName: '',
    registryId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.BatchGetImage = function BatchGetImage(aws) {
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  var imageIds = aws.params.imageIds;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }
  if (!imageIds) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter imageIds'];
  }


  // TODO implement code

  var ret = {
    failures: /*Sm*/[ {
      failureReason: '',
      failureCode: '',
      imageId: /*Si*/{
        imageTag: '',
        imageDigest: '',
      },
    }, /* ...*/ ],
    images: [ /*St*/{
      imageManifest: '',
      repositoryName: '',
      registryId: '',
      imageId: /*Si*/{
        imageTag: '',
        imageDigest: '',
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetRepositoryPolicy = function GetRepositoryPolicy(aws) {
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }


  // TODO implement code

  var ret = {
    repositoryName: '',
    registryId: '',
    policyText: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteRepository = function DeleteRepository(aws) {
  var force = aws.params.force /* Type boolean */;
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }


  // TODO implement code

  var ret = {
    repository: /*S11*/{
      repositoryArn: '',
      repositoryName: '',
      registryId: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListImages = function ListImages(aws) {
  var maxResults = aws.params.maxResults /* Type integer */;
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  var nextToken = aws.params.nextToken;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }


  // TODO implement code

  var ret = {
    imageIds: /*Sh*/[ /*Si*/{
      imageTag: '',
      imageDigest: '',
    }, /* ...*/ ],
    nextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetDownloadUrlForLayer = function GetDownloadUrlForLayer(aws) {
  var layerDigest = aws.params.layerDigest;
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }
  if (!layerDigest) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter layerDigest'];
  }


  // TODO implement code

  var ret = {
    layerDigest: '',
    downloadUrl: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.BatchCheckLayerAvailability = function BatchCheckLayerAvailability(aws) {
  var layerDigests = aws.params.layerDigests /* Type list */;
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }
  if (!layerDigests) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter layerDigests'];
  }


  // TODO implement code

  var ret = {
    layers: [ {
      layerAvailability: '',
      layerSize: 0 /*Long*/,
      layerDigest: '',
    }, /* ...*/ ],
    failures: [ {
      failureReason: '',
      layerDigest: '',
      failureCode: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteRepositoryPolicy = function DeleteRepositoryPolicy(aws) {
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }


  // TODO implement code

  var ret = {
    repositoryName: '',
    registryId: '',
    policyText: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UploadLayerPart = function UploadLayerPart(aws) {
  var uploadId = aws.params.uploadId;
  var layerPartBlob = aws.params.layerPartBlob /* Type blob */;
  var partLastByte = aws.params.partLastByte /* Type long */;
  var partFirstByte = aws.params.partFirstByte /* Type long */;
  var repositoryName = aws.params.repositoryName;
  var registryId = aws.params.registryId;
  if (!repositoryName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter repositoryName'];
  }
  if (!uploadId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter uploadId'];
  }
  if (!partFirstByte) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter partFirstByte'];
  }
  if (!partLastByte) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter partLastByte'];
  }
  if (!layerPartBlob) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter layerPartBlob'];
  }


  // TODO implement code

  var ret = {
    uploadId: '',
    lastByteReceived: 0 /*Long*/,
    repositoryName: '',
    registryId: '',
  };
  return [200, ret];
};
