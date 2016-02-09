'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon Elastic File System version 2015-02-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.DescribeFileSystems = aws_common.as(
    "GET",
    "/2015-02-01/file-systems",
    function DescribeFileSystems(aws) {
        var MaxItems = aws.params.MaxItems /* integer */;
        var Marker = aws.params.Marker;
        var CreationToken = aws.params.CreationToken;
        var FileSystemId = aws.params.FileSystemId;


        // TODO implement code

        var ret = {
            NextMarker: "",
            Marker: "",
            FileSystems: [ /*S3*/{
                Name: "",
                CreationTime: now(),
                NumberOfMountTargets: 0,
                SizeInBytes: {
                    Value: 0 /*long*/,
                    Timestamp: now()
                },
                CreationToken: "",
                LifeCycleState: "",
                OwnerId: "",
                FileSystemId: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    });
module.exports.CreateTags = aws_common.as(
    "/2015-02-01/create-tags/:FileSystemId",
    function CreateTags(aws) {
        var Tags = aws.params.Tags;
        var FileSystemId = aws.reqParams.FileSystemId;
        if (! FileSystemId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FileSystemId"];
        }        if (! Tags) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Tags"];
        }

        // TODO implement code

        var ret = {};
        return [204, ret];
    });
module.exports.DescribeMountTargetSecurityGroups = aws_common.as(
    "GET",
    "/2015-02-01/mount-targets/:MountTargetId/security-groups",
    function DescribeMountTargetSecurityGroups(aws) {
        var MountTargetId = aws.reqParams.MountTargetId;
        if (! MountTargetId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter MountTargetId"];
        }

        // TODO implement code

        var ret = {
            SecurityGroups: /*Sf*/[ "" /*, ...*/ ]
        };
        return [200, ret];
    });
module.exports.DeleteTags = aws_common.as(
    "/2015-02-01/delete-tags/:FileSystemId",
    function DeleteTags(aws) {
        var TagKeys = aws.params.TagKeys /* list */;
        var FileSystemId = aws.reqParams.FileSystemId;
        if (! FileSystemId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FileSystemId"];
        }        if (! TagKeys) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TagKeys"];
        }

        // TODO implement code

        var ret = {};
        return [204, ret];
    });
module.exports.DescribeMountTargets = aws_common.as(
    "GET",
    "/2015-02-01/mount-targets",
    function DescribeMountTargets(aws) {
        var MaxItems = aws.params.MaxItems /* integer */;
        var Marker = aws.params.Marker;
        var MountTargetId = aws.params.MountTargetId;
        var FileSystemId = aws.params.FileSystemId;


        // TODO implement code

        var ret = {
            NextMarker: "",
            MountTargets: [ /*Sh*/{
                IpAddress: "",
                MountTargetId: "",
                NetworkInterfaceId: "",
                LifeCycleState: "",
                SubnetId: "",
                OwnerId: "",
                FileSystemId: ""
            } /*, ...*/ ],
            Marker: ""
        };
        return [200, ret];
    });
module.exports.ModifyMountTargetSecurityGroups = aws_common.as(
    "PUT",
    "/2015-02-01/mount-targets/:MountTargetId/security-groups",
    function ModifyMountTargetSecurityGroups(aws) {
        var SecurityGroups = aws.params.SecurityGroups;
        var MountTargetId = aws.reqParams.MountTargetId;
        if (! MountTargetId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter MountTargetId"];
        }

        // TODO implement code

        var ret = {};
        return [204, ret];
    });
module.exports.CreateMountTarget = aws_common.as(
    "/2015-02-01/mount-targets",
    function CreateMountTarget(aws) {
        var SecurityGroups = aws.params.SecurityGroups;
        var IpAddress = aws.params.IpAddress;
        var SubnetId = aws.params.SubnetId;
        var FileSystemId = aws.params.FileSystemId;
        if (! FileSystemId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FileSystemId"];
        }        if (! SubnetId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter SubnetId"];
        }

        // TODO implement code

        var ret = /*Sh*/{
            IpAddress: "",
            MountTargetId: "",
            NetworkInterfaceId: "",
            LifeCycleState: "",
            SubnetId: "",
            OwnerId: "",
            FileSystemId: ""
        };
        return [200, ret];
    });
module.exports.DescribeTags = aws_common.as(
    "GET",
    "/2015-02-01/tags/:FileSystemId/",
    function DescribeTags(aws) {
        var MaxItems = aws.params.MaxItems /* integer */;
        var Marker = aws.params.Marker;
        var FileSystemId = aws.reqParams.FileSystemId;
        if (! FileSystemId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FileSystemId"];
        }

        // TODO implement code

        var ret = {
            NextMarker: "",
            Marker: "",
            Tags: /*Sl*/[ {
                Value: "",
                Key: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    });
module.exports.DeleteMountTarget = aws_common.as(
    "DELETE",
    "/2015-02-01/mount-targets/:MountTargetId",
    function DeleteMountTarget(aws) {
        var MountTargetId = aws.reqParams.MountTargetId;
        if (! MountTargetId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter MountTargetId"];
        }

        // TODO implement code

        var ret = {};
        return [204, ret];
    });
module.exports.DeleteFileSystem = aws_common.as(
    "DELETE",
    "/2015-02-01/file-systems/:FileSystemId",
    function DeleteFileSystem(aws) {
        var FileSystemId = aws.reqParams.FileSystemId;
        if (! FileSystemId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter FileSystemId"];
        }

        // TODO implement code

        var ret = {};
        return [204, ret];
    });
module.exports.CreateFileSystem = aws_common.as(
    "/2015-02-01/file-systems",
    function CreateFileSystem(aws) {
        var CreationToken = aws.params.CreationToken;
        if (! CreationToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter CreationToken"];
        }

        // TODO implement code

        var ret = /*S3*/{
            Name: "",
            CreationTime: now(),
            NumberOfMountTargets: 0,
            SizeInBytes: {
                Value: 0 /*long*/,
                Timestamp: now()
            },
            CreationToken: "",
            LifeCycleState: "",
            OwnerId: "",
            FileSystemId: ""
        };
        return [201, ret];
    });
