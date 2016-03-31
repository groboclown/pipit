'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon CloudHSM version 2014-05-30
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null)
module.exports.ModifyHapg = function ModifyHapg(aws) {
        var PartitionSerialList = aws.params['PartitionSerialList'];
        var HapgArn = aws.params['HapgArn'];
        var Label = aws.params['Label'];
        if (! HapgArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HapgArn"];
        }


        // TODO implement code

        var ret = {
            HapgArn: ""
        };
        return [200, ret];
    }
module.exports.DescribeHsm = function DescribeHsm(aws) {
        var HsmSerialNumber = aws.params['HsmSerialNumber'];
        var HsmArn = aws.params['HsmArn'];


        // TODO implement code

        var ret = {
            EniIp: "",
            VendorName: "",
            SubscriptionType: "",
            Status: "",
            AvailabilityZone: "",
            SubscriptionEndDate: "",
            HsmArn: "",
            SubnetId: "",
            ServerCertUri: "",
            HsmType: "",
            ServerCertLastUpdated: "",
            SoftwareVersion: "",
            SubscriptionStartDate: "",
            IamRoleArn: "",
            SshKeyLastUpdated: "",
            Partitions: [ "" /*, ...*/ ],
            StatusDetails: "",
            SshPublicKey: "",
            EniId: "",
            SerialNumber: "",
            VpcId: ""
        };
        return [200, ret];
    }
module.exports.ListHapgs = function ListHapgs(aws) {
        var NextToken = aws.params['NextToken'];


        // TODO implement code

        var ret = {
            NextToken: "",
            HapgList: /*S1c*/[ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListAvailableZones = function ListAvailableZones(aws) {


        // TODO implement code

        var ret = {
            AZList: [ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.CreateHapg = function CreateHapg(aws) {
        var Label = aws.params['Label'];
        if (! Label) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Label"];
        }


        // TODO implement code

        var ret = {
            HapgArn: ""
        };
        return [200, ret];
    }
module.exports.ListLunaClients = function ListLunaClients(aws) {
        var NextToken = aws.params['NextToken'];


        // TODO implement code

        var ret = {
            NextToken: "",
            ClientList: [ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DescribeHapg = function DescribeHapg(aws) {
        var HapgArn = aws.params['HapgArn'];
        if (! HapgArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HapgArn"];
        }


        // TODO implement code

        var ret = {
            PartitionSerialList: /*Sv*/[ "" /*, ...*/ ],
            HsmsPendingDeletion: /*St*/[ "" /*, ...*/ ],
            State: "",
            HsmsPendingRegistration: /*St*/[ "" /*, ...*/ ],
            HapgArn: "",
            HapgSerial: "",
            HsmsLastActionFailed: /*St*/[ "" /*, ...*/ ],
            LastModifiedTimestamp: "",
            Label: ""
        };
        return [200, ret];
    }
module.exports.GetConfig = function GetConfig(aws) {
        var HapgList = aws.params['HapgList'];
        var ClientArn = aws.params['ClientArn'];
        var ClientVersion = aws.params['ClientVersion'];
        if (! ClientArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClientArn"];
        }
        if (! ClientVersion) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClientVersion"];
        }
        if (! HapgList) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HapgList"];
        }


        // TODO implement code

        var ret = {
            ConfigFile: "",
            ConfigCred: "",
            ConfigType: ""
        };
        return [200, ret];
    }
module.exports.DeleteHapg = function DeleteHapg(aws) {
        var HapgArn = aws.params['HapgArn'];
        if (! HapgArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HapgArn"];
        }


        // TODO implement code

        var ret = {
            Status: ""
        };
        return [200, ret];
    }
module.exports.DescribeLunaClient = function DescribeLunaClient(aws) {
        var ClientArn = aws.params['ClientArn'];
        var CertificateFingerprint = aws.params['CertificateFingerprint'];


        // TODO implement code

        var ret = {
            LastModifiedTimestamp: "",
            ClientArn: "",
            CertificateFingerprint: "",
            Label: "",
            Certificate: ""
        };
        return [200, ret];
    }
module.exports.DeleteLunaClient = function DeleteLunaClient(aws) {
        var ClientArn = aws.params['ClientArn'];
        if (! ClientArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClientArn"];
        }


        // TODO implement code

        var ret = {
            Status: ""
        };
        return [200, ret];
    }
module.exports.CreateHsm = function CreateHsm(aws) {
        var EniIp = aws.params['EniIp'];
        var SubscriptionType = aws.params['SubscriptionType'];
        var ClientToken = aws.params['ClientToken'];
        var SyslogIp = aws.params['SyslogIp'];
        var IamRoleArn = aws.params['IamRoleArn'];
        var SshKey = aws.params['SshKey'];
        var ExternalId = aws.params['ExternalId'];
        var SubnetId = aws.params['SubnetId'];
        if (! SubnetId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SubnetId"];
        }
        if (! SshKey) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SshKey"];
        }
        if (! IamRoleArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter IamRoleArn"];
        }
        if (! SubscriptionType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SubscriptionType"];
        }


        // TODO implement code

        var ret = {
            HsmArn: ""
        };
        return [200, ret];
    }
module.exports.ListHsms = function ListHsms(aws) {
        var NextToken = aws.params['NextToken'];


        // TODO implement code

        var ret = {
            HsmList: /*St*/[ "" /*, ...*/ ],
            NextToken: ""
        };
        return [200, ret];
    }
module.exports.DeleteHsm = function DeleteHsm(aws) {
        var HsmArn = aws.params['HsmArn'];
        if (! HsmArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HsmArn"];
        }


        // TODO implement code

        var ret = {
            Status: ""
        };
        return [200, ret];
    }
module.exports.ModifyLunaClient = function ModifyLunaClient(aws) {
        var ClientArn = aws.params['ClientArn'];
        var Certificate = aws.params['Certificate'];
        if (! ClientArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClientArn"];
        }
        if (! Certificate) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Certificate"];
        }


        // TODO implement code

        var ret = {
            ClientArn: ""
        };
        return [200, ret];
    }
module.exports.ModifyHsm = function ModifyHsm(aws) {
        var EniIp = aws.params['EniIp'];
        var IamRoleArn = aws.params['IamRoleArn'];
        var ExternalId = aws.params['ExternalId'];
        var HsmArn = aws.params['HsmArn'];
        var SyslogIp = aws.params['SyslogIp'];
        var SubnetId = aws.params['SubnetId'];
        if (! HsmArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HsmArn"];
        }


        // TODO implement code

        var ret = {
            HsmArn: ""
        };
        return [200, ret];
    }
module.exports.CreateLunaClient = function CreateLunaClient(aws) {
        var Label = aws.params['Label'];
        var Certificate = aws.params['Certificate'];
        if (! Certificate) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Certificate"];
        }


        // TODO implement code

        var ret = {
            ClientArn: ""
        };
        return [200, ret];
    }