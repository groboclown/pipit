'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS Import/Export version 2010-06-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.ListJobs = aws_common.as(
    "/?Operation=ListJobs",
    function ListJobs(aws) {
        var APIVersion = aws.params.APIVersion;
        var Marker = aws.params.Marker;
        var MaxJobs = aws.params.MaxJobs /* integer */;


        // TODO implement code

        var ret = {
            Jobs: [ {
                IsCanceled: false,
                JobType: "",
                CreationDate: now(),
                JobId: ""
            } /*, ...*/ ],
            IsTruncated: false
        };
        return [200, ret];
    });
module.exports.CancelJob = aws_common.as(
    "/?Operation=CancelJob",
    function CancelJob(aws) {
        var APIVersion = aws.params.APIVersion;
        var JobId = aws.params.JobId;
        if (! JobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobId"];
        }

        // TODO implement code

        var ret = {
            Success: false
        };
        return [200, ret];
    });
module.exports.CreateJob = aws_common.as(
    "/?Operation=CreateJob",
    function CreateJob(aws) {
        var ManifestAddendum = aws.params.ManifestAddendum;
        var APIVersion = aws.params.APIVersion;
        var ValidateOnly = aws.params.ValidateOnly /* boolean */;
        var JobType = aws.params.JobType;
        var Manifest = aws.params.Manifest;
        if (! JobType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobType"];
        }        if (! Manifest) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Manifest"];
        }        if (! ValidateOnly) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ValidateOnly"];
        }

        // TODO implement code

        var ret = {
            JobType: "",
            ArtifactList: /*Sf*/[ {
                Description: "",
                URL: ""
            } /*, ...*/ ],
            Signature: "",
            JobId: "",
            WarningMessage: "",
            SignatureFileContents: ""
        };
        return [200, ret];
    });
module.exports.GetShippingLabel = aws_common.as(
    "/?Operation=GetShippingLabel",
    function GetShippingLabel(aws) {
        var city = aws.params.city;
        var postalCode = aws.params.postalCode;
        var street2 = aws.params.street2;
        var phoneNumber = aws.params.phoneNumber;
        var APIVersion = aws.params.APIVersion;
        var name = aws.params.name;
        var stateOrProvince = aws.params.stateOrProvince;
        var country = aws.params.country;
        var street1 = aws.params.street1;
        var company = aws.params.company;
        var street3 = aws.params.street3;
        var jobIds = aws.params.jobIds /* list */;
        if (! jobIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter jobIds"];
        }

        // TODO implement code

        var ret = {
            ShippingLabelURL: "",
            Warning: ""
        };
        return [200, ret];
    });
module.exports.GetStatus = aws_common.as(
    "/?Operation=GetStatus",
    function GetStatus(aws) {
        var APIVersion = aws.params.APIVersion;
        var JobId = aws.params.JobId;
        if (! JobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobId"];
        }

        // TODO implement code

        var ret = {
            ErrorCount: 0,
            JobType: "",
            CurrentManifest: "",
            LocationMessage: "",
            ArtifactList: /*Sf*/[ {
                Description: "",
                URL: ""
            } /*, ...*/ ],
            SignatureFileContents: "",
            LogBucket: "",
            LogKey: "",
            LocationCode: "",
            CreationDate: now(),
            ProgressMessage: "",
            Carrier: "",
            Signature: "",
            TrackingNumber: "",
            ProgressCode: "",
            JobId: ""
        };
        return [200, ret];
    });
module.exports.UpdateJob = aws_common.as(
    "/?Operation=UpdateJob",
    function UpdateJob(aws) {
        var APIVersion = aws.params.APIVersion;
        var Manifest = aws.params.Manifest;
        var JobType = aws.params.JobType;
        var ValidateOnly = aws.params.ValidateOnly /* boolean */;
        var JobId = aws.params.JobId;
        if (! JobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobId"];
        }        if (! Manifest) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Manifest"];
        }        if (! JobType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobType"];
        }        if (! ValidateOnly) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ValidateOnly"];
        }

        // TODO implement code

        var ret = {
            Success: false,
            ArtifactList: /*Sf*/[ {
                Description: "",
                URL: ""
            } /*, ...*/ ],
            WarningMessage: ""
        };
        return [200, ret];
    });
