'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon Elasticsearch Service version 2015-01-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol rest-json
require('../../lib/aws-common/shape_http')('rest-json', module.exports, null);
// -----------------------------------
module.exports.AddTags = awsCommon.as(
  '/2015-01-01/tags',
  function AddTags(aws) {
    var aRN = aws.params.ARN;
    var tagList = aws.params.TagList;
    if (!aRN) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ARN'];
    }
    if (!tagList) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TagList'];
    }


    // TODO implement code

    var ret = {};
    return [200, ret];
  });
// -----------------------------------
module.exports.CreateElasticsearchDomain = awsCommon.as(
  '/2015-01-01/es/domain',
  function CreateElasticsearchDomain(aws) {
    var accessPolicies = aws.params.AccessPolicies;
    var advancedOptions = aws.params.AdvancedOptions;
    var domainName = aws.params.DomainName;
    var eBSOptions = aws.params.EBSOptions;
    var elasticsearchClusterConfig = aws.params.ElasticsearchClusterConfig;
    var snapshotOptions = aws.params.SnapshotOptions;
    if (!domainName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
    }


    // TODO implement code

    var ret = {
      DomainStatus: /*Sk*/{
        ARN: '',
        AccessPolicies: '',
        AdvancedOptions: /*Sh*/{} /*Map*/,
        Created: false,
        Deleted: false,
        DomainId: '',
        DomainName: '',
        EBSOptions: /*Sd*/{
          EBSEnabled: false,
          Iops: 0,
          VolumeSize: 0,
          VolumeType: '',
        },
        ElasticsearchClusterConfig: /*S9*/{
          DedicatedMasterCount: 0,
          DedicatedMasterEnabled: false,
          DedicatedMasterType: '',
          InstanceCount: 0,
          InstanceType: '',
          ZoneAwarenessEnabled: false,
        },
        Endpoint: '',
        Processing: false,
        SnapshotOptions: /*Sg*/{
          AutomatedSnapshotStartHour: 0,
        },
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.DeleteElasticsearchDomain = awsCommon.as(
  'DELETE',
  '/2015-01-01/es/domain/:DomainName',
  function DeleteElasticsearchDomain(aws) {
    var domainName = aws.reqParams.DomainName;
    if (!domainName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
    }


    // TODO implement code

    var ret = {
      DomainStatus: /*Sk*/{
        ARN: '',
        AccessPolicies: '',
        AdvancedOptions: /*Sh*/{} /*Map*/,
        Created: false,
        Deleted: false,
        DomainId: '',
        DomainName: '',
        EBSOptions: /*Sd*/{
          EBSEnabled: false,
          Iops: 0,
          VolumeSize: 0,
          VolumeType: '',
        },
        ElasticsearchClusterConfig: /*S9*/{
          DedicatedMasterCount: 0,
          DedicatedMasterEnabled: false,
          DedicatedMasterType: '',
          InstanceCount: 0,
          InstanceType: '',
          ZoneAwarenessEnabled: false,
        },
        Endpoint: '',
        Processing: false,
        SnapshotOptions: /*Sg*/{
          AutomatedSnapshotStartHour: 0,
        },
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.DescribeElasticsearchDomain = awsCommon.as(
  'GET',
  '/2015-01-01/es/domain/:DomainName',
  function DescribeElasticsearchDomain(aws) {
    var domainName = aws.reqParams.DomainName;
    if (!domainName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
    }


    // TODO implement code

    var ret = {
      DomainStatus: /*Sk*/{
        ARN: '',
        AccessPolicies: '',
        AdvancedOptions: /*Sh*/{} /*Map*/,
        Created: false,
        Deleted: false,
        DomainId: '',
        DomainName: '',
        EBSOptions: /*Sd*/{
          EBSEnabled: false,
          Iops: 0,
          VolumeSize: 0,
          VolumeType: '',
        },
        ElasticsearchClusterConfig: /*S9*/{
          DedicatedMasterCount: 0,
          DedicatedMasterEnabled: false,
          DedicatedMasterType: '',
          InstanceCount: 0,
          InstanceType: '',
          ZoneAwarenessEnabled: false,
        },
        Endpoint: '',
        Processing: false,
        SnapshotOptions: /*Sg*/{
          AutomatedSnapshotStartHour: 0,
        },
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.DescribeElasticsearchDomainConfig = awsCommon.as(
  'GET',
  '/2015-01-01/es/domain/:DomainName/config',
  function DescribeElasticsearchDomainConfig(aws) {
    var domainName = aws.reqParams.DomainName;
    if (!domainName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
    }


    // TODO implement code

    var ret = {
      DomainConfig: /*St*/{
        AccessPolicies: {
          Options: '',
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
        AdvancedOptions: {
          Options: /*Sh*/{} /*Map*/,
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
        EBSOptions: {
          Options: /*Sd*/{
            EBSEnabled: false,
            Iops: 0,
            VolumeSize: 0,
            VolumeType: '',
          },
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
        ElasticsearchClusterConfig: {
          Options: /*S9*/{
            DedicatedMasterCount: 0,
            DedicatedMasterEnabled: false,
            DedicatedMasterType: '',
            InstanceCount: 0,
            InstanceType: '',
            ZoneAwarenessEnabled: false,
          },
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
        SnapshotOptions: {
          Options: /*Sg*/{
            AutomatedSnapshotStartHour: 0,
          },
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
      },
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.DescribeElasticsearchDomains = awsCommon.as(
  '/2015-01-01/es/domain-info',
  function DescribeElasticsearchDomains(aws) {
    var domainNames = aws.params.DomainNames /* Type list */;
    if (!domainNames) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainNames'];
    }


    // TODO implement code

    var ret = {
      DomainStatusList: [ /*Sk*/{
        ARN: '',
        AccessPolicies: '',
        AdvancedOptions: /*Sh*/{} /*Map*/,
        Created: false,
        Deleted: false,
        DomainId: '',
        DomainName: '',
        EBSOptions: /*Sd*/{
          EBSEnabled: false,
          Iops: 0,
          VolumeSize: 0,
          VolumeType: '',
        },
        ElasticsearchClusterConfig: /*S9*/{
          DedicatedMasterCount: 0,
          DedicatedMasterEnabled: false,
          DedicatedMasterType: '',
          InstanceCount: 0,
          InstanceType: '',
          ZoneAwarenessEnabled: false,
        },
        Endpoint: '',
        Processing: false,
        SnapshotOptions: /*Sg*/{
          AutomatedSnapshotStartHour: 0,
        },
      }, /* ...*/ ],
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.ListDomainNames = awsCommon.as(
  'GET',
  '/2015-01-01/domain',
  function ListDomainNames(aws) {


    // TODO implement code

    var ret = {
      DomainNames: [ {
        DomainName: '',
      }, /* ...*/ ],
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.ListTags = awsCommon.as(
  'GET',
  '/2015-01-01/tags/',
  function ListTags(aws) {
    var aRN = aws.params.ARN;
    if (!aRN) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ARN'];
    }


    // TODO implement code

    var ret = {
      TagList: /*S3*/[ {
        Key: '',
        Value: '',
      }, /* ...*/ ],
    };
    return [200, ret];
  });
// -----------------------------------
module.exports.RemoveTags = awsCommon.as(
  '/2015-01-01/tags-removal',
  function RemoveTags(aws) {
    var aRN = aws.params.ARN;
    var tagKeys = aws.params.TagKeys /* Type list */;
    if (!aRN) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ARN'];
    }
    if (!tagKeys) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TagKeys'];
    }


    // TODO implement code

    var ret = {};
    return [200, ret];
  });
// -----------------------------------
module.exports.UpdateElasticsearchDomainConfig = awsCommon.as(
  '/2015-01-01/es/domain/:DomainName/config',
  function UpdateElasticsearchDomainConfig(aws) {
    var accessPolicies = aws.params.AccessPolicies;
    var advancedOptions = aws.params.AdvancedOptions;
    var domainName = aws.reqParams.DomainName;
    var eBSOptions = aws.params.EBSOptions;
    var elasticsearchClusterConfig = aws.params.ElasticsearchClusterConfig;
    var snapshotOptions = aws.params.SnapshotOptions;
    if (!domainName) {
      return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
    }


    // TODO implement code

    var ret = {
      DomainConfig: /*St*/{
        AccessPolicies: {
          Options: '',
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
        AdvancedOptions: {
          Options: /*Sh*/{} /*Map*/,
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
        EBSOptions: {
          Options: /*Sd*/{
            EBSEnabled: false,
            Iops: 0,
            VolumeSize: 0,
            VolumeType: '',
          },
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
        ElasticsearchClusterConfig: {
          Options: /*S9*/{
            DedicatedMasterCount: 0,
            DedicatedMasterEnabled: false,
            DedicatedMasterType: '',
            InstanceCount: 0,
            InstanceType: '',
            ZoneAwarenessEnabled: false,
          },
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
        SnapshotOptions: {
          Options: /*Sg*/{
            AutomatedSnapshotStartHour: 0,
          },
          Status: /*Sv*/{
            CreationDate: awsCommon.timestamp(),
            PendingDeletion: false,
            State: '',
            UpdateDate: awsCommon.timestamp(),
            UpdateVersion: 0,
          },
        },
      },
    };
    return [200, ret];
  });
