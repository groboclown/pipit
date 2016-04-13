'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon Glacier version 2012-06-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol rest-json
require('../../lib/aws-common/shape_http')('rest-json', module.exports, null);
// -----------------------------------
module.exports.ListParts = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName/multipart-uploads/:uploadId',
  function ListParts(aws) {
    var uploadId = aws.reqParams.uploadId;
    var limit = aws.params.limit;
    var marker = aws.params.marker;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }
    if (!uploadId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter uploadId'];
    }


    // TODO implement code

    var ret = {
      Parts: [ {
        SHA256TreeHash: '',
        RangeInBytes: '',
      }, /* ...*/ ],
      VaultARN: '',
      MultipartUploadId: '',
      PartSizeInBytes: 0 /*Long*/,
      Marker: '',
      ArchiveDescription: '',
      CreationDate: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.DeleteArchive = awsCommon.as(
  'DELETE',
  '/:accountId/vaults/:vaultName/archives/:archiveId',
  function DeleteArchive(aws) {
    var archiveId = aws.reqParams.archiveId;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }
    if (!archiveId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter archiveId'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.GetDataRetrievalPolicy = awsCommon.as(
  'GET',
  '/:accountId/policies/data-retrieval',
  function GetDataRetrievalPolicy(aws) {
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }


    // TODO implement code

    var ret = {
      Policy: /*Su*/{
        Rules: [ {
          BytesPerHour: 0 /*Long*/,
          Strategy: '',
        }, /* ...*/ ],
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.GetVaultAccessPolicy = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName/access-policy',
  function GetVaultAccessPolicy(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      policy: /*S14*/{
        Policy: '',
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.InitiateVaultLock = awsCommon.as(
  '/:accountId/vaults/:vaultName/lock-policy',
  function InitiateVaultLock(aws) {
    var policy = aws.params.policy /* Type structure */;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      lockId: '',
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.AbortMultipartUpload = awsCommon.as(
  'DELETE',
  '/:accountId/vaults/:vaultName/multipart-uploads/:uploadId',
  function AbortMultipartUpload(aws) {
    var uploadId = aws.reqParams.uploadId;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }
    if (!uploadId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter uploadId'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.DeleteVault = awsCommon.as(
  'DELETE',
  '/:accountId/vaults/:vaultName',
  function DeleteVault(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.CreateVault = awsCommon.as(
  'PUT',
  '/:accountId/vaults/:vaultName',
  function CreateVault(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      location: '',
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.DescribeJob = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName/jobs/:jobId',
  function DescribeJob(aws) {
    var jobId = aws.reqParams.jobId;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }
    if (!jobId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter jobId'];
    }


    // TODO implement code

    var ret = /*Si*/{
      StatusCode: '',
      InventorySizeInBytes: 0 /*Long*/,
      ArchiveSizeInBytes: 0 /*Long*/,
      InventoryRetrievalParameters: {
        StartDate: '',
        Marker: '',
        EndDate: '',
        Format: '',
        Limit: '',
      },
      CompletionDate: '',
      SNSTopic: '',
      Completed: false,
      RetrievalByteRange: '',
      VaultARN: '',
      ArchiveSHA256TreeHash: '',
      SHA256TreeHash: '',
      JobDescription: '',
      ArchiveId: '',
      Action: '',
      StatusMessage: '',
      CreationDate: '',
      JobId: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.RemoveTagsFromVault = awsCommon.as(
  '/:accountId/vaults/:vaultName/tags?operation=remove',
  function RemoveTagsFromVault(aws) {
    var tagKeys = aws.params.TagKeys /* Type list */;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.ListMultipartUploads = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName/multipart-uploads',
  function ListMultipartUploads(aws) {
    var limit = aws.params.limit;
    var marker = aws.params.marker;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      Marker: '',
      UploadsList: [ {
        ArchiveDescription: '',
        VaultARN: '',
        MultipartUploadId: '',
        PartSizeInBytes: 0 /*Long*/,
        CreationDate: '',
      }, /* ...*/ ],
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.UploadMultipartPart = awsCommon.as(
  'PUT',
  '/:accountId/vaults/:vaultName/multipart-uploads/:uploadId',
  function UploadMultipartPart(aws) {
    var uploadId = aws.reqParams.uploadId;
    var vaultName = aws.reqParams.vaultName;
    var range = aws.params.range;
    var body = aws.params.body;
    var checksum = aws.params.checksum;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }
    if (!uploadId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter uploadId'];
    }


    // TODO implement code

    var ret = {
      checksum: '',
    };
    return [204, ret];
  });
// -----------------------------------
module.exports.CompleteMultipartUpload = awsCommon.as(
  '/:accountId/vaults/:vaultName/multipart-uploads/:uploadId',
  function CompleteMultipartUpload(aws) {
    var uploadId = aws.reqParams.uploadId;
    var checksum = aws.params.checksum;
    var archiveSize = aws.params.archiveSize;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }
    if (!uploadId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter uploadId'];
    }


    // TODO implement code

    var ret = /*S9*/{
      archiveId: '',
      location: '',
      checksum: '',
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.SetVaultNotifications = awsCommon.as(
  'PUT',
  '/:accountId/vaults/:vaultName/notification-configuration',
  function SetVaultNotifications(aws) {
    var vaultNotificationConfig = aws.params.vaultNotificationConfig;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.GetVaultLock = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName/lock-policy',
  function GetVaultLock(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      ExpirationDate: '',
      Policy: '',
      CreationDate: '',
      State: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.ListVaults = awsCommon.as(
  'GET',
  '/:accountId/vaults',
  function ListVaults(aws) {
    var limit = aws.params.limit;
    var marker = aws.params.marker;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }


    // TODO implement code

    var ret = {
      VaultList: [ /*Sq*/{
        VaultARN: '',
        SizeInBytes: 0 /*Long*/,
        CreationDate: '',
        LastInventoryDate: '',
        NumberOfArchives: 0 /*Long*/,
        VaultName: '',
      }, /* ...*/ ],
      Marker: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.GetVaultNotifications = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName/notification-configuration',
  function GetVaultNotifications(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      vaultNotificationConfig: /*S19*/{
        SNSTopic: '',
        Events: [ '', /* ...*/ ],
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.GetJobOutput = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName/jobs/:jobId/output',
  function GetJobOutput(aws) {
    var range = aws.params.range;
    var jobId = aws.reqParams.jobId;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }
    if (!jobId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter jobId'];
    }


    // TODO implement code

    var ret = {
      contentRange: '',
      archiveDescription: '',
      body: /*S10*/null /*Blob*/,
      status: 0,
      contentType: '',
      checksum: '',
      acceptRanges: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.UploadArchive = awsCommon.as(
  '/:accountId/vaults/:vaultName/archives',
  function UploadArchive(aws) {
    var archiveDescription = aws.params.archiveDescription;
    var body = aws.params.body;
    var checksum = aws.params.checksum;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }


    // TODO implement code

    var ret = /*S9*/{
      archiveId: '',
      location: '',
      checksum: '',
    };
    return [201, ret];
  });
// -----------------------------------
module.exports.SetDataRetrievalPolicy = awsCommon.as(
  'PUT',
  '/:accountId/policies/data-retrieval',
  function SetDataRetrievalPolicy(aws) {
    var policy = aws.params.Policy;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.AddTagsToVault = awsCommon.as(
  '/:accountId/vaults/:vaultName/tags?operation=add',
  function AddTagsToVault(aws) {
    var tags = aws.params.Tags;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.AbortVaultLock = awsCommon.as(
  'DELETE',
  '/:accountId/vaults/:vaultName/lock-policy',
  function AbortVaultLock(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.DeleteVaultAccessPolicy = awsCommon.as(
  'DELETE',
  '/:accountId/vaults/:vaultName/access-policy',
  function DeleteVaultAccessPolicy(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.ListTagsForVault = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName/tags',
  function ListTagsForVault(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      Tags: /*S5*/{} /*Map*/,
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.DescribeVault = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName',
  function DescribeVault(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = /*Sq*/{
      VaultARN: '',
      SizeInBytes: 0 /*Long*/,
      CreationDate: '',
      LastInventoryDate: '',
      NumberOfArchives: 0 /*Long*/,
      VaultName: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.SetVaultAccessPolicy = awsCommon.as(
  'PUT',
  '/:accountId/vaults/:vaultName/access-policy',
  function SetVaultAccessPolicy(aws) {
    var policy = aws.params.policy;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.CompleteVaultLock = awsCommon.as(
  '/:accountId/vaults/:vaultName/lock-policy/:lockId',
  function CompleteVaultLock(aws) {
    var lockId = aws.reqParams.lockId;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }
    if (!lockId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter lockId'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.ListJobs = awsCommon.as(
  'GET',
  '/:accountId/vaults/:vaultName/jobs',
  function ListJobs(aws) {
    var limit = aws.params.limit;
    var completed = aws.params.completed;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    var statuscode = aws.params.statuscode;
    var marker = aws.params.marker;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      JobList: [ /*Si*/{
        StatusCode: '',
        InventorySizeInBytes: 0 /*Long*/,
        ArchiveSizeInBytes: 0 /*Long*/,
        InventoryRetrievalParameters: {
          StartDate: '',
          Marker: '',
          EndDate: '',
          Format: '',
          Limit: '',
        },
        CompletionDate: '',
        SNSTopic: '',
        Completed: false,
        RetrievalByteRange: '',
        VaultARN: '',
        ArchiveSHA256TreeHash: '',
        SHA256TreeHash: '',
        JobDescription: '',
        ArchiveId: '',
        Action: '',
        StatusMessage: '',
        CreationDate: '',
        JobId: '',
      }, /* ...*/ ],
      Marker: '',
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.DeleteVaultNotifications = awsCommon.as(
  'DELETE',
  '/:accountId/vaults/:vaultName/notification-configuration',
  function DeleteVaultNotifications(aws) {
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {};
    return [204, ret];
  });
// -----------------------------------
module.exports.InitiateJob = awsCommon.as(
  '/:accountId/vaults/:vaultName/jobs',
  function InitiateJob(aws) {
    var jobParameters = aws.params.jobParameters /* Type structure */;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      location: '',
      jobId: '',
    };
    return [202, ret];
  });
// -----------------------------------
module.exports.InitiateMultipartUpload = awsCommon.as(
  '/:accountId/vaults/:vaultName/multipart-uploads',
  function InitiateMultipartUpload(aws) {
    var archiveDescription = aws.params.archiveDescription;
    var partSize = aws.params.partSize;
    var vaultName = aws.reqParams.vaultName;
    var accountId = aws.reqParams.accountId;
    if (!accountId) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter accountId'];
    }
    if (!vaultName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter vaultName'];
    }


    // TODO implement code

    var ret = {
      uploadId: '',
      location: '',
    };
    return [201, ret];
  });
