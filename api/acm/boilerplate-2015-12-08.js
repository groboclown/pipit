'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS Certificate Manager version 2015-12-08
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.GetCertificate = function GetCertificate(aws) {
        var CertificateArn = aws.params.CertificateArn;
        if (! CertificateArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter CertificateArn"];
        }

        // TODO implement code

        var ret = {
            Certificate: "",
            CertificateChain: ""
        };
        return [200, ret];
    }
module.exports.ListCertificates = function ListCertificates(aws) {
        var MaxItems = aws.params.MaxItems /* integer */;
        var CertificateStatuses = aws.params.CertificateStatuses /* list */;
        var NextToken = aws.params.NextToken;


        // TODO implement code

        var ret = {
            CertificateSummaryList: [ {
                DomainName: "",
                CertificateArn: ""
            } /*, ...*/ ],
            NextToken: ""
        };
        return [200, ret];
    }
module.exports.ResendValidationEmail = function ResendValidationEmail(aws) {
        var Domain = aws.params.Domain;
        var ValidationDomain = aws.params.ValidationDomain;
        var CertificateArn = aws.params.CertificateArn;
        if (! CertificateArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter CertificateArn"];
        }        if (! Domain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Domain"];
        }        if (! ValidationDomain) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ValidationDomain"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.RequestCertificate = function RequestCertificate(aws) {
        var SubjectAlternativeNames = aws.params.SubjectAlternativeNames;
        var DomainValidationOptions = aws.params.DomainValidationOptions /* list */;
        var DomainName = aws.params.DomainName;
        var IdempotencyToken = aws.params.IdempotencyToken;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {
            CertificateArn: ""
        };
        return [200, ret];
    }
module.exports.DescribeCertificate = function DescribeCertificate(aws) {
        var CertificateArn = aws.params.CertificateArn;
        if (! CertificateArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter CertificateArn"];
        }

        // TODO implement code

        var ret = {
            Certificate: {
                DomainValidationOptions: [ {
                    ValidationDomain: "",
                    DomainName: "",
                    ValidationEmails: [ "" /*, ...*/ ]
                } /*, ...*/ ],
                SignatureAlgorithm: "",
                NotAfter: now(),
                NotBefore: now(),
                Serial: "",
                RevokedAt: now(),
                KeyAlgorithm: "",
                Issuer: "",
                InUseBy: [ "" /*, ...*/ ],
                Subject: "",
                RevocationReason: "",
                CertificateArn: "",
                IssuedAt: now(),
                SubjectAlternativeNames: /*S7*/[ "" /*, ...*/ ],
                CreatedAt: now(),
                DomainName: "",
                Status: ""
            }
        };
        return [200, ret];
    }
module.exports.DeleteCertificate = function DeleteCertificate(aws) {
        var CertificateArn = aws.params.CertificateArn;
        if (! CertificateArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter CertificateArn"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
