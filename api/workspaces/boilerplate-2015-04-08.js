'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon WorkSpaces version 2015-04-08
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);
// -----------------------------------
module.exports.CreateWorkspaces = function CreateWorkspaces(aws) {
  var workspaces = aws.params.Workspaces /* Type list */;
  if (!workspaces) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Workspaces'];
  }


  // TODO implement code

  var ret = {
    FailedRequests: [ {
      ErrorCode: '',
      ErrorMessage: '',
      WorkspaceRequest: /*S3*/{
        BundleId: '',
        DirectoryId: '',
        RootVolumeEncryptionEnabled: false,
        UserName: '',
        UserVolumeEncryptionEnabled: false,
        VolumeEncryptionKey: '',
      },
    }, /* ...*/ ],
    PendingRequests: /*Se*/[ {
      BundleId: '',
      ComputerName: '',
      DirectoryId: '',
      ErrorCode: '',
      ErrorMessage: '',
      IpAddress: '',
      RootVolumeEncryptionEnabled: false,
      State: '',
      SubnetId: '',
      UserName: '',
      UserVolumeEncryptionEnabled: false,
      VolumeEncryptionKey: '',
      WorkspaceId: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeWorkspaceBundles = function DescribeWorkspaceBundles(aws) {
  var bundleIds = aws.params.BundleIds /* Type list */;
  var nextToken = aws.params.NextToken;
  var owner = aws.params.Owner;


  // TODO implement code

  var ret = {
    Bundles: [ {
      BundleId: '',
      ComputeType: {
        Name: '',
      },
      Description: '',
      Name: '',
      Owner: '',
      UserStorage: {
        Capacity: '',
      },
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeWorkspaceDirectories = function DescribeWorkspaceDirectories(aws) {
  var directoryIds = aws.params.DirectoryIds /* Type list */;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    Directories: [ {
      Alias: '',
      CustomerUserName: '',
      DirectoryId: '',
      DirectoryName: '',
      DirectoryType: '',
      DnsIpAddresses: [ '', /* ...*/ ],
      IamRoleId: '',
      RegistrationCode: '',
      State: '',
      SubnetIds: [ '', /* ...*/ ],
      WorkspaceCreationProperties: {
        CustomSecurityGroupId: '',
        DefaultOu: '',
        EnableInternetAccess: false,
        EnableWorkDocs: false,
        UserEnabledAsLocalAdministrator: false,
      },
      WorkspaceSecurityGroupId: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeWorkspaces = function DescribeWorkspaces(aws) {
  var bundleId = aws.params.BundleId;
  var directoryId = aws.params.DirectoryId;
  var limit = aws.params.Limit /* Type integer */;
  var nextToken = aws.params.NextToken;
  var userName = aws.params.UserName;
  var workspaceIds = aws.params.WorkspaceIds /* Type list */;


  // TODO implement code

  var ret = {
    NextToken: '',
    Workspaces: /*Se*/[ {
      BundleId: '',
      ComputerName: '',
      DirectoryId: '',
      ErrorCode: '',
      ErrorMessage: '',
      IpAddress: '',
      RootVolumeEncryptionEnabled: false,
      State: '',
      SubnetId: '',
      UserName: '',
      UserVolumeEncryptionEnabled: false,
      VolumeEncryptionKey: '',
      WorkspaceId: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RebootWorkspaces = function RebootWorkspaces(aws) {
  var rebootWorkspaceRequests = aws.params.RebootWorkspaceRequests /* Type list */;
  if (!rebootWorkspaceRequests) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RebootWorkspaceRequests'];
  }


  // TODO implement code

  var ret = {
    FailedRequests: [ /*S1m*/{
      ErrorCode: '',
      ErrorMessage: '',
      WorkspaceId: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RebuildWorkspaces = function RebuildWorkspaces(aws) {
  var rebuildWorkspaceRequests = aws.params.RebuildWorkspaceRequests /* Type list */;
  if (!rebuildWorkspaceRequests) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RebuildWorkspaceRequests'];
  }


  // TODO implement code

  var ret = {
    FailedRequests: [ /*S1m*/{
      ErrorCode: '',
      ErrorMessage: '',
      WorkspaceId: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.TerminateWorkspaces = function TerminateWorkspaces(aws) {
  var terminateWorkspaceRequests = aws.params.TerminateWorkspaceRequests /* Type list */;
  if (!terminateWorkspaceRequests) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TerminateWorkspaceRequests'];
  }


  // TODO implement code

  var ret = {
    FailedRequests: [ /*S1m*/{
      ErrorCode: '',
      ErrorMessage: '',
      WorkspaceId: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
