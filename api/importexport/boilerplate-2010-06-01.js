'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS Import/Export version 2010-06-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.CancelJob = aws_common.as(
    "/?Operation=CancelJob",
    function CancelJob(aws) {
        var JobId = aws.params['JobId'];
        var APIVersion = aws.params['APIVersion'];
        if (! JobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobId"];
        }

        // TODO implement code

        var ret = {
            Success: false
        };
        return [200, ret];
    });
module.exports.GetShippingLabel = aws_common.as(
    "/?Operation=GetShippingLabel",
    function GetShippingLabel(aws) {
        var city = aws.params['city'];
        var jobIds = aws.params['jobIds'] /* list */;
        var name = aws.params['name'];
        var street2 = aws.params['street2'];
        var stateOrProvince = aws.params['stateOrProvince'];
        var phoneNumber = aws.params['phoneNumber'];
        var street3 = aws.params['street3'];
        var postalCode = aws.params['postalCode'];
        var APIVersion = aws.params['APIVersion'];
        var street1 = aws.params['street1'];
        var company = aws.params['company'];
        var country = aws.params['country'];
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
module.exports.CreateJob = aws_common.as(
    "/?Operation=CreateJob",
    function CreateJob(aws) {
        var JobType = aws.params['JobType'];
        var Manifest = aws.params['Manifest'];
        var APIVersion = aws.params['APIVersion'];
        var ManifestAddendum = aws.params['ManifestAddendum'];
        var ValidateOnly = aws.params['ValidateOnly'] /* boolean */;
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
            SignatureFileContents: "",
            Signature: "",
            WarningMessage: "",
            JobId: "",
            ArtifactList: /*Sf*/[ {
                Description: "",
                URL: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    });
module.exports.UpdateJob = aws_common.as(
    "/?Operation=UpdateJob",
    function UpdateJob(aws) {
        var JobType = aws.params['JobType'];
        var JobId = aws.params['JobId'];
        var APIVersion = aws.params['APIVersion'];
        var Manifest = aws.params['Manifest'];
        var ValidateOnly = aws.params['ValidateOnly'] /* boolean */;
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
            WarningMessage: "",
            ArtifactList: /*Sf*/[ {
                Description: "",
                URL: ""
            } /*, ...*/ ],
            Success: false
        };
        return [200, ret];
    });
module.exports.GetStatus = aws_common.as(
    "/?Operation=GetStatus",
    function GetStatus(aws) {
        var JobId = aws.params['JobId'];
        var APIVersion = aws.params['APIVersion'];
        if (! JobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobId"];
        }

        // TODO implement code

        var ret = {
            JobType: "",
            SignatureFileContents: "",
            LogBucket: "",
            TrackingNumber: "",
            CreationDate: now(),
            JobId: "",
            LocationMessage: "",
            ErrorCount: 0,
            ProgressMessage: "",
            ProgressCode: "",
            Carrier: "",
            ArtifactList: /*Sf*/[ {
                Description: "",
                URL: ""
            } /*, ...*/ ],
            CurrentManifest: "",
            LocationCode: "",
            LogKey: "",
            Signature: ""
        };
        return [200, ret];
    });
module.exports.ListJobs = aws_common.as(
    "/?Operation=ListJobs",
    function ListJobs(aws) {
        var Marker = aws.params['Marker'];
        var MaxJobs = aws.params['MaxJobs'] /* integer */;
        var APIVersion = aws.params['APIVersion'];


        // TODO implement code

        var ret = {
            Jobs: [ {
                JobType: "",
                JobId: "",
                IsCanceled: false,
                CreationDate: now()
            } /*, ...*/ ],
            IsTruncated: false
        };
        return [200, ret];
    });
