'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon CloudHSM version 2014-05-30
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.ModifyHapg = function ModifyHapg(aws) {
        var Label = aws.params['Label'];
        var HapgArn = aws.params['HapgArn'];
        var PartitionSerialList = aws.params['PartitionSerialList'];
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
        var HsmArn = aws.params['HsmArn'];
        var HsmSerialNumber = aws.params['HsmSerialNumber'];


        // TODO implement code

        var ret = {
            SoftwareVersion: "",
            SshKeyLastUpdated: "",
            StatusDetails: "",
            ServerCertLastUpdated: "",
            HsmArn: "",
            VpcId: "",
            EniId: "",
            EniIp: "",
            IamRoleArn: "",
            SubscriptionEndDate: "",
            Partitions: [ "" /*, ...*/ ],
            AvailabilityZone: "",
            SubscriptionStartDate: "",
            ServerCertUri: "",
            SshPublicKey: "",
            HsmType: "",
            SerialNumber: "",
            VendorName: "",
            SubnetId: "",
            Status: "",
            SubscriptionType: ""
        };
        return [200, ret];
    }
module.exports.ListHsms = function ListHsms(aws) {
        var NextToken = aws.params['NextToken'];


        // TODO implement code

        var ret = {
            NextToken: "",
            HsmList: /*St*/[ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ModifyHsm = function ModifyHsm(aws) {
        var ExternalId = aws.params['ExternalId'];
        var SyslogIp = aws.params['SyslogIp'];
        var HsmArn = aws.params['HsmArn'];
        var SubnetId = aws.params['SubnetId'];
        var IamRoleArn = aws.params['IamRoleArn'];
        var EniIp = aws.params['EniIp'];
        if (! HsmArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HsmArn"];
        }

        // TODO implement code

        var ret = {
            HsmArn: ""
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
module.exports.DescribeLunaClient = function DescribeLunaClient(aws) {
        var CertificateFingerprint = aws.params['CertificateFingerprint'];
        var ClientArn = aws.params['ClientArn'];


        // TODO implement code

        var ret = {
            Label: "",
            LastModifiedTimestamp: "",
            CertificateFingerprint: "",
            ClientArn: "",
            Certificate: ""
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
module.exports.ModifyLunaClient = function ModifyLunaClient(aws) {
        var ClientArn = aws.params['ClientArn'];
        var Certificate = aws.params['Certificate'];
        if (! ClientArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClientArn"];
        }        if (! Certificate) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Certificate"];
        }

        // TODO implement code

        var ret = {
            ClientArn: ""
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
module.exports.CreateHsm = function CreateHsm(aws) {
        var ClientToken = aws.params['ClientToken'];
        var ExternalId = aws.params['ExternalId'];
        var SshKey = aws.params['SshKey'];
        var SyslogIp = aws.params['SyslogIp'];
        var SubscriptionType = aws.params['SubscriptionType'];
        var SubnetId = aws.params['SubnetId'];
        var IamRoleArn = aws.params['IamRoleArn'];
        var EniIp = aws.params['EniIp'];
        if (! SubnetId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SubnetId"];
        }        if (! SshKey) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SshKey"];
        }        if (! IamRoleArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter IamRoleArn"];
        }        if (! SubscriptionType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SubscriptionType"];
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
module.exports.DescribeHapg = function DescribeHapg(aws) {
        var HapgArn = aws.params['HapgArn'];
        if (! HapgArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HapgArn"];
        }

        // TODO implement code

        var ret = {
            Label: "",
            HsmsLastActionFailed: /*St*/[ "" /*, ...*/ ],
            HapgArn: "",
            HapgSerial: "",
            State: "",
            HsmsPendingDeletion: /*St*/[ "" /*, ...*/ ],
            PartitionSerialList: /*Sv*/[ "" /*, ...*/ ],
            LastModifiedTimestamp: "",
            HsmsPendingRegistration: /*St*/[ "" /*, ...*/ ]
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
module.exports.GetConfig = function GetConfig(aws) {
        var ClientVersion = aws.params['ClientVersion'];
        var HapgList = aws.params['HapgList'];
        var ClientArn = aws.params['ClientArn'];
        if (! ClientArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClientArn"];
        }        if (! ClientVersion) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClientVersion"];
        }        if (! HapgList) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HapgList"];
        }

        // TODO implement code

        var ret = {
            ConfigType: "",
            ConfigFile: "",
            ConfigCred: ""
        };
        return [200, ret];
    }
