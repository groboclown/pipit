'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon Route 53 Domains version 2014-05-15
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.EnableDomainTransferLock = function EnableDomainTransferLock(aws) {
        var DomainName = aws.params.DomainName;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {
            OperationId: ""
        };
        return [200, ret];
    }
module.exports.ListDomains = function ListDomains(aws) {
        var MaxItems = aws.params.MaxItems /* integer */;
        var Marker = aws.params.Marker;


        // TODO implement code

        var ret = {
            Domains: [ {
                Expiry: now(),
                AutoRenew: false,
                DomainName: "",
                TransferLock: false
            } /*, ...*/ ],
            NextPageMarker: ""
        };
        return [200, ret];
    }
module.exports.GetDomainDetail = function GetDomainDetail(aws) {
        var DomainName = aws.params.DomainName;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {
            AdminPrivacy: false,
            AbuseContactEmail: "",
            RegistrarUrl: "",
            AutoRenew: false,
            Nameservers: /*Sl*/[ {
                Name: "",
                GlueIps: [ "" /*, ...*/ ]
            } /*, ...*/ ],
            RegistrantPrivacy: false,
            AdminContact: /*Sr*/{
                OrganizationName: "",
                PhoneNumber: "",
                Email: "",
                FirstName: "",
                ZipCode: "",
                Fax: "",
                City: "",
                CountryCode: "",
                AddressLine1: "",
                ContactType: "",
                AddressLine2: "",
                ExtraParams: [ {
                    Name: "",
                    Value: ""
                } /*, ...*/ ],
                LastName: "",
                State: ""
            },
            StatusList: [ "" /*, ...*/ ],
            UpdatedDate: now(),
            TechContact: /*Sr*/{
                OrganizationName: "",
                PhoneNumber: "",
                Email: "",
                FirstName: "",
                ZipCode: "",
                Fax: "",
                City: "",
                CountryCode: "",
                AddressLine1: "",
                ContactType: "",
                AddressLine2: "",
                ExtraParams: [ {
                    Name: "",
                    Value: ""
                } /*, ...*/ ],
                LastName: "",
                State: ""
            },
            RegistrantContact: /*Sr*/{
                OrganizationName: "",
                PhoneNumber: "",
                Email: "",
                FirstName: "",
                ZipCode: "",
                Fax: "",
                City: "",
                CountryCode: "",
                AddressLine1: "",
                ContactType: "",
                AddressLine2: "",
                ExtraParams: [ {
                    Name: "",
                    Value: ""
                } /*, ...*/ ],
                LastName: "",
                State: ""
            },
            RegistrarName: "",
            Reseller: "",
            DnsSec: "",
            CreationDate: now(),
            TechPrivacy: false,
            RegistryDomainId: "",
            WhoIsServer: "",
            ExpirationDate: now(),
            DomainName: "",
            AbuseContactPhone: ""
        };
        return [200, ret];
    }
module.exports.CheckDomainAvailability = function CheckDomainAvailability(aws) {
        var DomainName = aws.params.DomainName;
        var IdnLangCode = aws.params.IdnLangCode;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {
            Availability: ""
        };
        return [200, ret];
    }
module.exports.UpdateTagsForDomain = function UpdateTagsForDomain(aws) {
        var DomainName = aws.params.DomainName;
        var TagsToUpdate = aws.params.TagsToUpdate;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.EnableDomainAutoRenew = function EnableDomainAutoRenew(aws) {
        var DomainName = aws.params.DomainName;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.UpdateDomainContact = function UpdateDomainContact(aws) {
        var AdminContact = aws.params.AdminContact;
        var DomainName = aws.params.DomainName;
        var TechContact = aws.params.TechContact;
        var RegistrantContact = aws.params.RegistrantContact;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {
            OperationId: ""
        };
        return [200, ret];
    }
module.exports.RegisterDomain = function RegisterDomain(aws) {
        var DurationInYears = aws.params.DurationInYears /* integer */;
        var PrivacyProtectAdminContact = aws.params.PrivacyProtectAdminContact /* boolean */;
        var AutoRenew = aws.params.AutoRenew /* boolean */;
        var TechContact = aws.params.TechContact;
        var PrivacyProtectTechContact = aws.params.PrivacyProtectTechContact /* boolean */;
        var PrivacyProtectRegistrantContact = aws.params.PrivacyProtectRegistrantContact /* boolean */;
        var AdminContact = aws.params.AdminContact;
        var DomainName = aws.params.DomainName;
        var IdnLangCode = aws.params.IdnLangCode;
        var RegistrantContact = aws.params.RegistrantContact;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }        if (! DurationInYears) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DurationInYears"];
        }        if (! AdminContact) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter AdminContact"];
        }        if (! RegistrantContact) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter RegistrantContact"];
        }        if (! TechContact) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TechContact"];
        }

        // TODO implement code

        var ret = {
            OperationId: ""
        };
        return [200, ret];
    }
module.exports.ListTagsForDomain = function ListTagsForDomain(aws) {
        var DomainName = aws.params.DomainName;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {
            TagList: /*S1v*/[ {
                Value: "",
                Key: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.UpdateDomainNameservers = function UpdateDomainNameservers(aws) {
        var FIAuthKey = aws.params.FIAuthKey;
        var DomainName = aws.params.DomainName;
        var Nameservers = aws.params.Nameservers;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }        if (! Nameservers) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Nameservers"];
        }

        // TODO implement code

        var ret = {
            OperationId: ""
        };
        return [200, ret];
    }
module.exports.DeleteTagsForDomain = function DeleteTagsForDomain(aws) {
        var DomainName = aws.params.DomainName;
        var TagsToDelete = aws.params.TagsToDelete /* list */;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }        if (! TagsToDelete) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TagsToDelete"];
        }

        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.ListOperations = function ListOperations(aws) {
        var MaxItems = aws.params.MaxItems /* integer */;
        var Marker = aws.params.Marker;


        // TODO implement code

        var ret = {
            Operations: [ {
                Type: "",
                OperationId: "",
                SubmittedDate: now(),
                Status: ""
            } /*, ...*/ ],
            NextPageMarker: ""
        };
        return [200, ret];
    }
module.exports.GetOperationDetail = function GetOperationDetail(aws) {
        var OperationId = aws.params.OperationId;
        if (! OperationId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter OperationId"];
        }

        // TODO implement code

        var ret = {
            Type: "",
            SubmittedDate: now(),
            Message: "",
            DomainName: "",
            OperationId: "",
            Status: ""
        };
        return [200, ret];
    }
module.exports.UpdateDomainContactPrivacy = function UpdateDomainContactPrivacy(aws) {
        var AdminPrivacy = aws.params.AdminPrivacy /* boolean */;
        var RegistrantPrivacy = aws.params.RegistrantPrivacy /* boolean */;
        var DomainName = aws.params.DomainName;
        var TechPrivacy = aws.params.TechPrivacy /* boolean */;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {
            OperationId: ""
        };
        return [200, ret];
    }
module.exports.DisableDomainAutoRenew = function DisableDomainAutoRenew(aws) {
        var DomainName = aws.params.DomainName;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.RetrieveDomainAuthCode = function RetrieveDomainAuthCode(aws) {
        var DomainName = aws.params.DomainName;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {
            AuthCode: /*S23*/""
        };
        return [200, ret];
    }
module.exports.TransferDomain = function TransferDomain(aws) {
        var DurationInYears = aws.params.DurationInYears /* integer */;
        var AutoRenew = aws.params.AutoRenew /* boolean */;
        var Nameservers = aws.params.Nameservers;
        var PrivacyProtectTechContact = aws.params.PrivacyProtectTechContact /* boolean */;
        var AdminContact = aws.params.AdminContact;
        var AuthCode = aws.params.AuthCode;
        var PrivacyProtectRegistrantContact = aws.params.PrivacyProtectRegistrantContact /* boolean */;
        var TechContact = aws.params.TechContact;
        var RegistrantContact = aws.params.RegistrantContact;
        var PrivacyProtectAdminContact = aws.params.PrivacyProtectAdminContact /* boolean */;
        var IdnLangCode = aws.params.IdnLangCode;
        var DomainName = aws.params.DomainName;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }        if (! DurationInYears) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DurationInYears"];
        }        if (! AdminContact) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter AdminContact"];
        }        if (! RegistrantContact) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter RegistrantContact"];
        }        if (! TechContact) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TechContact"];
        }

        // TODO implement code

        var ret = {
            OperationId: ""
        };
        return [200, ret];
    }
module.exports.DisableDomainTransferLock = function DisableDomainTransferLock(aws) {
        var DomainName = aws.params.DomainName;
        if (! DomainName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DomainName"];
        }

        // TODO implement code

        var ret = {
            OperationId: ""
        };
        return [200, ret];
    }
