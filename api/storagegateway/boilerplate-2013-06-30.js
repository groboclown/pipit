'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS Storage Gateway version 2013-06-30
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null)
module.exports.UpdateSnapshotSchedule = function UpdateSnapshotSchedule(aws) {
        var Description = aws.params['Description'];
        var RecurrenceInHours = aws.params['RecurrenceInHours'] /* integer */;
        var StartAt = aws.params['StartAt'] /* integer */;
        var VolumeARN = aws.params['VolumeARN'];
        if (! VolumeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeARN"];
        }
        if (! StartAt) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter StartAt"];
        }
        if (! RecurrenceInHours) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter RecurrenceInHours"];
        }


        // TODO implement code

        var ret = {
            VolumeARN: ""
        };
        return [200, ret];
    }
module.exports.CancelRetrieval = function CancelRetrieval(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var TapeARN = aws.params['TapeARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! TapeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TapeARN"];
        }


        // TODO implement code

        var ret = {
            TapeARN: ""
        };
        return [200, ret];
    }
module.exports.DeleteTape = function DeleteTape(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var TapeARN = aws.params['TapeARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! TapeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TapeARN"];
        }


        // TODO implement code

        var ret = {
            TapeARN: ""
        };
        return [200, ret];
    }
module.exports.CreateSnapshotFromVolumeRecoveryPoint = function CreateSnapshotFromVolumeRecoveryPoint(aws) {
        var SnapshotDescription = aws.params['SnapshotDescription'];
        var VolumeARN = aws.params['VolumeARN'];
        if (! VolumeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeARN"];
        }
        if (! SnapshotDescription) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SnapshotDescription"];
        }


        // TODO implement code

        var ret = {
            SnapshotId: "",
            VolumeRecoveryPointTime: "",
            VolumeARN: ""
        };
        return [200, ret];
    }
module.exports.DescribeTapeArchives = function DescribeTapeArchives(aws) {
        var Marker = aws.params['Marker'];
        var Limit = aws.params['Limit'] /* integer */;
        var TapeARNs = aws.params['TapeARNs'];


        // TODO implement code

        var ret = {
            Marker: "",
            TapeArchives: [ {
                RetrievedTo: "",
                CompletionTime: now(),
                TapeStatus: "",
                TapeARN: "",
                TapeSizeInBytes: 0 /*long*/,
                TapeBarcode: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DescribeUploadBuffer = function DescribeUploadBuffer(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: "",
            UploadBufferUsedInBytes: 0 /*long*/,
            DiskIds: /*Sc*/[ "" /*, ...*/ ],
            UploadBufferAllocatedInBytes: 0 /*long*/
        };
        return [200, ret];
    }
module.exports.CreateCachediSCSIVolume = function CreateCachediSCSIVolume(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var TargetName = aws.params['TargetName'];
        var VolumeSizeInBytes = aws.params['VolumeSizeInBytes'] /* long */;
        var NetworkInterfaceId = aws.params['NetworkInterfaceId'];
        var ClientToken = aws.params['ClientToken'];
        var SnapshotId = aws.params['SnapshotId'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! VolumeSizeInBytes) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeSizeInBytes"];
        }
        if (! TargetName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TargetName"];
        }
        if (! NetworkInterfaceId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter NetworkInterfaceId"];
        }
        if (! ClientToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClientToken"];
        }


        // TODO implement code

        var ret = {
            TargetARN: "",
            VolumeARN: ""
        };
        return [200, ret];
    }
module.exports.ActivateGateway = function ActivateGateway(aws) {
        var MediumChangerType = aws.params['MediumChangerType'];
        var TapeDriveType = aws.params['TapeDriveType'];
        var GatewayName = aws.params['GatewayName'];
        var ActivationKey = aws.params['ActivationKey'];
        var GatewayRegion = aws.params['GatewayRegion'];
        var GatewayTimezone = aws.params['GatewayTimezone'];
        var GatewayType = aws.params['GatewayType'];
        if (! ActivationKey) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ActivationKey"];
        }
        if (! GatewayName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayName"];
        }
        if (! GatewayTimezone) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayTimezone"];
        }
        if (! GatewayRegion) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayRegion"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.DeleteVolume = function DeleteVolume(aws) {
        var VolumeARN = aws.params['VolumeARN'];
        if (! VolumeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeARN"];
        }


        // TODO implement code

        var ret = {
            VolumeARN: ""
        };
        return [200, ret];
    }
module.exports.AddTagsToResource = function AddTagsToResource(aws) {
        var Tags = aws.params['Tags'];
        var ResourceARN = aws.params['ResourceARN'];
        if (! ResourceARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ResourceARN"];
        }
        if (! Tags) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Tags"];
        }


        // TODO implement code

        var ret = {
            ResourceARN: ""
        };
        return [200, ret];
    }
module.exports.DescribeVTLDevices = function DescribeVTLDevices(aws) {
        var Marker = aws.params['Marker'];
        var GatewayARN = aws.params['GatewayARN'];
        var Limit = aws.params['Limit'] /* integer */;
        var VTLDeviceARNs = aws.params['VTLDeviceARNs'] /* list */;
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            Marker: "",
            GatewayARN: "",
            VTLDevices: [ {
                DeviceiSCSIAttributes: {
                    TargetARN: "",
                    NetworkInterfacePort: 0,
                    NetworkInterfaceId: "",
                    ChapEnabled: false
                },
                VTLDeviceVendor: "",
                VTLDeviceARN: "",
                VTLDeviceProductIdentifier: "",
                VTLDeviceType: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListVolumeInitiators = function ListVolumeInitiators(aws) {
        var VolumeARN = aws.params['VolumeARN'];
        if (! VolumeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeARN"];
        }


        // TODO implement code

        var ret = {
            Initiators: [ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteSnapshotSchedule = function DeleteSnapshotSchedule(aws) {
        var VolumeARN = aws.params['VolumeARN'];
        if (! VolumeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeARN"];
        }


        // TODO implement code

        var ret = {
            VolumeARN: ""
        };
        return [200, ret];
    }
module.exports.DeleteTapeArchive = function DeleteTapeArchive(aws) {
        var TapeARN = aws.params['TapeARN'];
        if (! TapeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TapeARN"];
        }


        // TODO implement code

        var ret = {
            TapeARN: ""
        };
        return [200, ret];
    }
module.exports.AddWorkingStorage = function AddWorkingStorage(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var DiskIds = aws.params['DiskIds'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! DiskIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DiskIds"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.DescribeTapeRecoveryPoints = function DescribeTapeRecoveryPoints(aws) {
        var Marker = aws.params['Marker'];
        var GatewayARN = aws.params['GatewayARN'];
        var Limit = aws.params['Limit'] /* integer */;
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            TapeRecoveryPointInfos: [ {
                TapeARN: "",
                TapeRecoveryPointTime: now(),
                TapeSizeInBytes: 0 /*long*/,
                TapeStatus: ""
            } /*, ...*/ ],
            GatewayARN: "",
            Marker: ""
        };
        return [200, ret];
    }
module.exports.RemoveTagsFromResource = function RemoveTagsFromResource(aws) {
        var TagKeys = aws.params['TagKeys'] /* list */;
        var ResourceARN = aws.params['ResourceARN'];


        // TODO implement code

        var ret = {
            ResourceARN: ""
        };
        return [200, ret];
    }
module.exports.ListVolumeRecoveryPoints = function ListVolumeRecoveryPoints(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: "",
            VolumeRecoveryPointInfos: [ {
                VolumeRecoveryPointTime: "",
                VolumeUsageInBytes: 0 /*long*/,
                VolumeSizeInBytes: 0 /*long*/,
                VolumeARN: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ShutdownGateway = function ShutdownGateway(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.UpdateGatewaySoftwareNow = function UpdateGatewaySoftwareNow(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.CreateTapes = function CreateTapes(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var NumTapesToCreate = aws.params['NumTapesToCreate'] /* integer */;
        var TapeSizeInBytes = aws.params['TapeSizeInBytes'] /* long */;
        var TapeBarcodePrefix = aws.params['TapeBarcodePrefix'];
        var ClientToken = aws.params['ClientToken'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! TapeSizeInBytes) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TapeSizeInBytes"];
        }
        if (! ClientToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClientToken"];
        }
        if (! NumTapesToCreate) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter NumTapesToCreate"];
        }
        if (! TapeBarcodePrefix) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TapeBarcodePrefix"];
        }


        // TODO implement code

        var ret = {
            TapeARNs: /*S1i*/[ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.CancelArchival = function CancelArchival(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var TapeARN = aws.params['TapeARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! TapeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TapeARN"];
        }


        // TODO implement code

        var ret = {
            TapeARN: ""
        };
        return [200, ret];
    }
module.exports.StartGateway = function StartGateway(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.UpdateChapCredentials = function UpdateChapCredentials(aws) {
        var TargetARN = aws.params['TargetARN'];
        var SecretToAuthenticateTarget = aws.params['SecretToAuthenticateTarget'];
        var InitiatorName = aws.params['InitiatorName'];
        var SecretToAuthenticateInitiator = aws.params['SecretToAuthenticateInitiator'];
        if (! TargetARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TargetARN"];
        }
        if (! SecretToAuthenticateInitiator) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SecretToAuthenticateInitiator"];
        }
        if (! InitiatorName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter InitiatorName"];
        }


        // TODO implement code

        var ret = {
            TargetARN: "",
            InitiatorName: ""
        };
        return [200, ret];
    }
module.exports.DescribeSnapshotSchedule = function DescribeSnapshotSchedule(aws) {
        var VolumeARN = aws.params['VolumeARN'];
        if (! VolumeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeARN"];
        }


        // TODO implement code

        var ret = {
            Description: "",
            RecurrenceInHours: 0,
            StartAt: 0,
            Timezone: "",
            VolumeARN: ""
        };
        return [200, ret];
    }
module.exports.DeleteBandwidthRateLimit = function DeleteBandwidthRateLimit(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var BandwidthType = aws.params['BandwidthType'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! BandwidthType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter BandwidthType"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.DescribeWorkingStorage = function DescribeWorkingStorage(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: "",
            WorkingStorageAllocatedInBytes: 0 /*long*/,
            DiskIds: /*Sc*/[ "" /*, ...*/ ],
            WorkingStorageUsedInBytes: 0 /*long*/
        };
        return [200, ret];
    }
module.exports.DescribeCachediSCSIVolumes = function DescribeCachediSCSIVolumes(aws) {
        var VolumeARNs = aws.params['VolumeARNs'];
        if (! VolumeARNs) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeARNs"];
        }


        // TODO implement code

        var ret = {
            CachediSCSIVolumes: [ {
                VolumeType: "",
                VolumeSizeInBytes: 0 /*long*/,
                VolumeARN: "",
                VolumeProgress: 0.0 /*double*/,
                VolumeId: "",
                SourceSnapshotId: "",
                VolumeStatus: "",
                VolumeiSCSIAttributes: /*S2f*/{
                    TargetARN: "",
                    LunNumber: 0,
                    NetworkInterfacePort: 0,
                    NetworkInterfaceId: "",
                    ChapEnabled: false
                }
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.RetrieveTapeArchive = function RetrieveTapeArchive(aws) {
        var TapeARN = aws.params['TapeARN'];
        var GatewayARN = aws.params['GatewayARN'];
        if (! TapeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TapeARN"];
        }
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            TapeARN: ""
        };
        return [200, ret];
    }
module.exports.ResetCache = function ResetCache(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.DeleteChapCredentials = function DeleteChapCredentials(aws) {
        var TargetARN = aws.params['TargetARN'];
        var InitiatorName = aws.params['InitiatorName'];
        if (! TargetARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TargetARN"];
        }
        if (! InitiatorName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter InitiatorName"];
        }


        // TODO implement code

        var ret = {
            TargetARN: "",
            InitiatorName: ""
        };
        return [200, ret];
    }
module.exports.DescribeStorediSCSIVolumes = function DescribeStorediSCSIVolumes(aws) {
        var VolumeARNs = aws.params['VolumeARNs'];
        if (! VolumeARNs) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeARNs"];
        }


        // TODO implement code

        var ret = {
            StorediSCSIVolumes: [ {
                VolumeDiskId: "",
                PreservedExistingData: false,
                VolumeType: "",
                VolumeSizeInBytes: 0 /*long*/,
                VolumeARN: "",
                VolumeProgress: 0.0 /*double*/,
                VolumeId: "",
                SourceSnapshotId: "",
                VolumeStatus: "",
                VolumeiSCSIAttributes: /*S2f*/{
                    TargetARN: "",
                    LunNumber: 0,
                    NetworkInterfacePort: 0,
                    NetworkInterfaceId: "",
                    ChapEnabled: false
                }
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.UpdateBandwidthRateLimit = function UpdateBandwidthRateLimit(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var AverageUploadRateLimitInBitsPerSec = aws.params['AverageUploadRateLimitInBitsPerSec'] /* long */;
        var AverageDownloadRateLimitInBitsPerSec = aws.params['AverageDownloadRateLimitInBitsPerSec'] /* long */;
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.DescribeTapes = function DescribeTapes(aws) {
        var Marker = aws.params['Marker'];
        var GatewayARN = aws.params['GatewayARN'];
        var Limit = aws.params['Limit'] /* integer */;
        var TapeARNs = aws.params['TapeARNs'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            Marker: "",
            Tapes: [ {
                TapeStatus: "",
                Progress: 0.0 /*double*/,
                TapeARN: "",
                TapeSizeInBytes: 0 /*long*/,
                VTLDevice: "",
                TapeBarcode: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.AddUploadBuffer = function AddUploadBuffer(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var DiskIds = aws.params['DiskIds'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! DiskIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DiskIds"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.DescribeBandwidthRateLimit = function DescribeBandwidthRateLimit(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: "",
            AverageUploadRateLimitInBitsPerSec: 0 /*long*/,
            AverageDownloadRateLimitInBitsPerSec: 0 /*long*/
        };
        return [200, ret];
    }
module.exports.DescribeGatewayInformation = function DescribeGatewayInformation(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: "",
            LastSoftwareUpdate: "",
            GatewayState: "",
            GatewayName: "",
            NextUpdateAvailabilityDate: "",
            GatewayId: "",
            GatewayTimezone: "",
            GatewayType: "",
            GatewayNetworkInterfaces: [ {
                MacAddress: "",
                Ipv4Address: "",
                Ipv6Address: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListTagsForResource = function ListTagsForResource(aws) {
        var Marker = aws.params['Marker'];
        var Limit = aws.params['Limit'] /* integer */;
        var ResourceARN = aws.params['ResourceARN'];


        // TODO implement code

        var ret = {
            Marker: "",
            Tags: /*Sh*/[ {
                Value: "",
                Key: ""
            } /*, ...*/ ],
            ResourceARN: ""
        };
        return [200, ret];
    }
module.exports.RetrieveTapeRecoveryPoint = function RetrieveTapeRecoveryPoint(aws) {
        var TapeARN = aws.params['TapeARN'];
        var GatewayARN = aws.params['GatewayARN'];
        if (! TapeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TapeARN"];
        }
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            TapeARN: ""
        };
        return [200, ret];
    }
module.exports.ListLocalDisks = function ListLocalDisks(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: "",
            Disks: [ {
                DiskNode: "",
                DiskAllocationResource: "",
                DiskPath: "",
                DiskId: "",
                DiskStatus: "",
                DiskSizeInBytes: 0 /*long*/,
                DiskAllocationType: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.UpdateGatewayInformation = function UpdateGatewayInformation(aws) {
        var GatewayName = aws.params['GatewayName'];
        var GatewayARN = aws.params['GatewayARN'];
        var GatewayTimezone = aws.params['GatewayTimezone'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayName: "",
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.UpdateMaintenanceStartTime = function UpdateMaintenanceStartTime(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var DayOfWeek = aws.params['DayOfWeek'] /* integer */;
        var MinuteOfHour = aws.params['MinuteOfHour'] /* integer */;
        var HourOfDay = aws.params['HourOfDay'] /* integer */;
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! HourOfDay) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter HourOfDay"];
        }
        if (! MinuteOfHour) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter MinuteOfHour"];
        }
        if (! DayOfWeek) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DayOfWeek"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.DescribeChapCredentials = function DescribeChapCredentials(aws) {
        var TargetARN = aws.params['TargetARN'];
        if (! TargetARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TargetARN"];
        }


        // TODO implement code

        var ret = {
            ChapCredentials: [ {
                TargetARN: "",
                SecretToAuthenticateTarget: "",
                InitiatorName: "",
                SecretToAuthenticateInitiator: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteGateway = function DeleteGateway(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.DescribeCache = function DescribeCache(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            CacheHitPercentage: 0.0 /*double*/,
            GatewayARN: "",
            CacheAllocatedInBytes: 0 /*long*/,
            CacheUsedPercentage: 0.0 /*double*/,
            CacheMissPercentage: 0.0 /*double*/,
            DiskIds: /*Sc*/[ "" /*, ...*/ ],
            CacheDirtyPercentage: 0.0 /*double*/
        };
        return [200, ret];
    }
module.exports.UpdateVTLDeviceType = function UpdateVTLDeviceType(aws) {
        var DeviceType = aws.params['DeviceType'];
        var VTLDeviceARN = aws.params['VTLDeviceARN'];
        if (! VTLDeviceARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VTLDeviceARN"];
        }
        if (! DeviceType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DeviceType"];
        }


        // TODO implement code

        var ret = {
            VTLDeviceARN: ""
        };
        return [200, ret];
    }
module.exports.AddCache = function AddCache(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var DiskIds = aws.params['DiskIds'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! DiskIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DiskIds"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.DescribeMaintenanceStartTime = function DescribeMaintenanceStartTime(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            Timezone: "",
            GatewayARN: "",
            DayOfWeek: 0,
            MinuteOfHour: 0,
            HourOfDay: 0
        };
        return [200, ret];
    }
module.exports.CreateStorediSCSIVolume = function CreateStorediSCSIVolume(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        var TargetName = aws.params['TargetName'];
        var NetworkInterfaceId = aws.params['NetworkInterfaceId'];
        var DiskId = aws.params['DiskId'];
        var SnapshotId = aws.params['SnapshotId'];
        var PreserveExistingData = aws.params['PreserveExistingData'] /* boolean */;
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }
        if (! DiskId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DiskId"];
        }
        if (! PreserveExistingData) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter PreserveExistingData"];
        }
        if (! TargetName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TargetName"];
        }
        if (! NetworkInterfaceId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter NetworkInterfaceId"];
        }


        // TODO implement code

        var ret = {
            TargetARN: "",
            VolumeSizeInBytes: 0 /*long*/,
            VolumeARN: ""
        };
        return [200, ret];
    }
module.exports.DisableGateway = function DisableGateway(aws) {
        var GatewayARN = aws.params['GatewayARN'];
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            GatewayARN: ""
        };
        return [200, ret];
    }
module.exports.ListGateways = function ListGateways(aws) {
        var Marker = aws.params['Marker'];
        var Limit = aws.params['Limit'] /* integer */;


        // TODO implement code

        var ret = {
            Marker: "",
            Gateways: [ {
                GatewayName: "",
                GatewayARN: "",
                GatewayType: "",
                GatewayOperationalState: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.CreateSnapshot = function CreateSnapshot(aws) {
        var SnapshotDescription = aws.params['SnapshotDescription'];
        var VolumeARN = aws.params['VolumeARN'];
        if (! VolumeARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VolumeARN"];
        }
        if (! SnapshotDescription) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SnapshotDescription"];
        }


        // TODO implement code

        var ret = {
            SnapshotId: "",
            VolumeARN: ""
        };
        return [200, ret];
    }
module.exports.ListVolumes = function ListVolumes(aws) {
        var Marker = aws.params['Marker'];
        var GatewayARN = aws.params['GatewayARN'];
        var Limit = aws.params['Limit'] /* integer */;
        if (! GatewayARN) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter GatewayARN"];
        }


        // TODO implement code

        var ret = {
            Marker: "",
            GatewayARN: "",
            VolumeInfos: [ {
                VolumeType: "",
                VolumeARN: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }