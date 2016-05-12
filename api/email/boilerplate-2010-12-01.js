'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon Simple Email Service version 2010-12-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol query
require('../../lib/aws-common/shape_http')('query', module.exports, 'http://ses.amazonaws.com/doc/2010-12-01/');
// -----------------------------------
module.exports.CloneReceiptRuleSet = function CloneReceiptRuleSet(aws) {
  var originalRuleSetName = aws.params.OriginalRuleSetName;
  var ruleSetName = aws.params.RuleSetName;
  if (!originalRuleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter OriginalRuleSetName'];
  }
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateReceiptFilter = function CreateReceiptFilter(aws) {
  var filter = aws.params.Filter;
  if (!filter) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Filter'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateReceiptRule = function CreateReceiptRule(aws) {
  var after = aws.params.After;
  var rule = aws.params.Rule;
  var ruleSetName = aws.params.RuleSetName;
  if (!rule) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Rule'];
  }
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateReceiptRuleSet = function CreateReceiptRuleSet(aws) {
  var ruleSetName = aws.params.RuleSetName;
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteIdentity = function DeleteIdentity(aws) {
  var identity = aws.params.Identity;
  if (!identity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identity'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteIdentityPolicy = function DeleteIdentityPolicy(aws) {
  var identity = aws.params.Identity;
  var policyName = aws.params.PolicyName;
  if (!identity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identity'];
  }
  if (!policyName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter PolicyName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteReceiptFilter = function DeleteReceiptFilter(aws) {
  var filterName = aws.params.FilterName;
  if (!filterName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter FilterName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteReceiptRule = function DeleteReceiptRule(aws) {
  var ruleName = aws.params.RuleName;
  var ruleSetName = aws.params.RuleSetName;
  if (!ruleName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleName'];
  }
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteReceiptRuleSet = function DeleteReceiptRuleSet(aws) {
  var ruleSetName = aws.params.RuleSetName;
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteVerifiedEmailAddress = function DeleteVerifiedEmailAddress(aws) {
  var emailAddress = aws.params.EmailAddress;
  if (!emailAddress) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter EmailAddress'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeActiveReceiptRuleSet = function DescribeActiveReceiptRuleSet(aws) {


  // TODO implement code

  var ret = {
    Metadata: /*S1l*/{
      CreatedTimestamp: awsCommon.timestamp(),
      Name: '',
    },
    Rules: /*S1n*/[ /*Sd*/{
      Actions: [ {
        AddHeaderAction: {
          HeaderName: '',
          HeaderValue: '',
        },
        BounceAction: {
          Message: '',
          Sender: '',
          SmtpReplyCode: '',
          StatusCode: '',
          TopicArn: '',
        },
        LambdaAction: {
          FunctionArn: '',
          InvocationType: '',
          TopicArn: '',
        },
        S3Action: {
          BucketName: '',
          KmsKeyArn: '',
          ObjectKeyPrefix: '',
          TopicArn: '',
        },
        SNSAction: {
          Encoding: '',
          TopicArn: '',
        },
        StopAction: {
          Scope: '',
          TopicArn: '',
        },
        WorkmailAction: {
          OrganizationArn: '',
          TopicArn: '',
        },
      }, /* ...*/ ],
      Enabled: false,
      Name: '',
      Recipients: [ '', /* ...*/ ],
      ScanEnabled: false,
      TlsPolicy: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeReceiptRule = function DescribeReceiptRule(aws) {
  var ruleName = aws.params.RuleName;
  var ruleSetName = aws.params.RuleSetName;
  if (!ruleName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleName'];
  }
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {
    Rule: /*Sd*/{
      Actions: [ {
        AddHeaderAction: {
          HeaderName: '',
          HeaderValue: '',
        },
        BounceAction: {
          Message: '',
          Sender: '',
          SmtpReplyCode: '',
          StatusCode: '',
          TopicArn: '',
        },
        LambdaAction: {
          FunctionArn: '',
          InvocationType: '',
          TopicArn: '',
        },
        S3Action: {
          BucketName: '',
          KmsKeyArn: '',
          ObjectKeyPrefix: '',
          TopicArn: '',
        },
        SNSAction: {
          Encoding: '',
          TopicArn: '',
        },
        StopAction: {
          Scope: '',
          TopicArn: '',
        },
        WorkmailAction: {
          OrganizationArn: '',
          TopicArn: '',
        },
      }, /* ...*/ ],
      Enabled: false,
      Name: '',
      Recipients: [ '', /* ...*/ ],
      ScanEnabled: false,
      TlsPolicy: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeReceiptRuleSet = function DescribeReceiptRuleSet(aws) {
  var ruleSetName = aws.params.RuleSetName;
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {
    Metadata: /*S1l*/{
      CreatedTimestamp: awsCommon.timestamp(),
      Name: '',
    },
    Rules: /*S1n*/[ /*Sd*/{
      Actions: [ {
        AddHeaderAction: {
          HeaderName: '',
          HeaderValue: '',
        },
        BounceAction: {
          Message: '',
          Sender: '',
          SmtpReplyCode: '',
          StatusCode: '',
          TopicArn: '',
        },
        LambdaAction: {
          FunctionArn: '',
          InvocationType: '',
          TopicArn: '',
        },
        S3Action: {
          BucketName: '',
          KmsKeyArn: '',
          ObjectKeyPrefix: '',
          TopicArn: '',
        },
        SNSAction: {
          Encoding: '',
          TopicArn: '',
        },
        StopAction: {
          Scope: '',
          TopicArn: '',
        },
        WorkmailAction: {
          OrganizationArn: '',
          TopicArn: '',
        },
      }, /* ...*/ ],
      Enabled: false,
      Name: '',
      Recipients: [ '', /* ...*/ ],
      ScanEnabled: false,
      TlsPolicy: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetIdentityDkimAttributes = function GetIdentityDkimAttributes(aws) {
  var identities = aws.params.Identities;
  if (!identities) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identities'];
  }


  // TODO implement code

  var ret = {
    DkimAttributes: {} /*Map*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetIdentityMailFromDomainAttributes = function GetIdentityMailFromDomainAttributes(aws) {
  var identities = aws.params.Identities;
  if (!identities) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identities'];
  }


  // TODO implement code

  var ret = {
    MailFromDomainAttributes: {} /*Map*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetIdentityNotificationAttributes = function GetIdentityNotificationAttributes(aws) {
  var identities = aws.params.Identities;
  if (!identities) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identities'];
  }


  // TODO implement code

  var ret = {
    NotificationAttributes: {} /*Map*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetIdentityPolicies = function GetIdentityPolicies(aws) {
  var identity = aws.params.Identity;
  var policyNames = aws.params.PolicyNames;
  if (!identity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identity'];
  }
  if (!policyNames) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter PolicyNames'];
  }


  // TODO implement code

  var ret = {
    Policies: {} /*Map*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetIdentityVerificationAttributes = function GetIdentityVerificationAttributes(aws) {
  var identities = aws.params.Identities;
  if (!identities) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identities'];
  }


  // TODO implement code

  var ret = {
    VerificationAttributes: {} /*Map*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetSendQuota = function GetSendQuota(aws) {


  // TODO implement code

  var ret = {
    Max24HourSend: 0.0 /*Double*/,
    MaxSendRate: 0.0 /*Double*/,
    SentLast24Hours: 0.0 /*Double*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.GetSendStatistics = function GetSendStatistics(aws) {


  // TODO implement code

  var ret = {
    SendDataPoints: [ {
      Bounces: 0 /*Long*/,
      Complaints: 0 /*Long*/,
      DeliveryAttempts: 0 /*Long*/,
      Rejects: 0 /*Long*/,
      Timestamp: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListIdentities = function ListIdentities(aws) {
  var identityType = aws.params.IdentityType;
  var maxItems = aws.params.MaxItems /* Type integer */;
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    Identities: /*S1t*/[ '', /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListIdentityPolicies = function ListIdentityPolicies(aws) {
  var identity = aws.params.Identity;
  if (!identity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identity'];
  }


  // TODO implement code

  var ret = {
    PolicyNames: /*S2d*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListReceiptFilters = function ListReceiptFilters(aws) {


  // TODO implement code

  var ret = {
    Filters: [ /*S5*/{
      IpFilter: {
        Cidr: '',
        Policy: '',
      },
      Name: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListReceiptRuleSets = function ListReceiptRuleSets(aws) {
  var nextToken = aws.params.NextToken;


  // TODO implement code

  var ret = {
    NextToken: '',
    RuleSets: [ /*S1l*/{
      CreatedTimestamp: awsCommon.timestamp(),
      Name: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListVerifiedEmailAddresses = function ListVerifiedEmailAddresses(aws) {


  // TODO implement code

  var ret = {
    VerifiedEmailAddresses: /*S37*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutIdentityPolicy = function PutIdentityPolicy(aws) {
  var identity = aws.params.Identity;
  var policy = aws.params.Policy;
  var policyName = aws.params.PolicyName;
  if (!identity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identity'];
  }
  if (!policy) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Policy'];
  }
  if (!policyName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter PolicyName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.ReorderReceiptRuleSet = function ReorderReceiptRuleSet(aws) {
  var ruleNames = aws.params.RuleNames /* Type list */;
  var ruleSetName = aws.params.RuleSetName;
  if (!ruleNames) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleNames'];
  }
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.SendBounce = function SendBounce(aws) {
  var bounceSender = aws.params.BounceSender;
  var bounceSenderArn = aws.params.BounceSenderArn;
  var bouncedRecipientInfoList = aws.params.BouncedRecipientInfoList /* Type list */;
  var explanation = aws.params.Explanation;
  var messageDsn = aws.params.MessageDsn /* Type structure */;
  var originalMessageId = aws.params.OriginalMessageId;
  if (!bounceSender) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter BounceSender'];
  }
  if (!bouncedRecipientInfoList) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter BouncedRecipientInfoList'];
  }
  if (!originalMessageId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter OriginalMessageId'];
  }


  // TODO implement code

  var ret = {
    MessageId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SendEmail = function SendEmail(aws) {
  var destination = aws.params.Destination /* Type structure */;
  var message = aws.params.Message /* Type structure */;
  var replyToAddresses = aws.params.ReplyToAddresses;
  var returnPath = aws.params.ReturnPath;
  var returnPathArn = aws.params.ReturnPathArn;
  var source = aws.params.Source;
  var sourceArn = aws.params.SourceArn;
  if (!destination) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Destination'];
  }
  if (!message) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Message'];
  }
  if (!source) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Source'];
  }


  // TODO implement code

  var ret = {
    MessageId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SendRawEmail = function SendRawEmail(aws) {
  var destinations = aws.params.Destinations;
  var fromArn = aws.params.FromArn;
  var rawMessage = aws.params.RawMessage /* Type structure */;
  var returnPathArn = aws.params.ReturnPathArn;
  var source = aws.params.Source;
  var sourceArn = aws.params.SourceArn;
  if (!rawMessage) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RawMessage'];
  }


  // TODO implement code

  var ret = {
    MessageId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetActiveReceiptRuleSet = function SetActiveReceiptRuleSet(aws) {
  var ruleSetName = aws.params.RuleSetName;


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetIdentityDkimEnabled = function SetIdentityDkimEnabled(aws) {
  var dkimEnabled = aws.params.DkimEnabled /* Type boolean */;
  var identity = aws.params.Identity;
  if (!dkimEnabled) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DkimEnabled'];
  }
  if (!identity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identity'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetIdentityFeedbackForwardingEnabled = function SetIdentityFeedbackForwardingEnabled(aws) {
  var forwardingEnabled = aws.params.ForwardingEnabled /* Type boolean */;
  var identity = aws.params.Identity;
  if (!forwardingEnabled) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ForwardingEnabled'];
  }
  if (!identity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identity'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetIdentityMailFromDomain = function SetIdentityMailFromDomain(aws) {
  var behaviorOnMXFailure = aws.params.BehaviorOnMXFailure;
  var identity = aws.params.Identity;
  var mailFromDomain = aws.params.MailFromDomain;
  if (!identity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identity'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetIdentityNotificationTopic = function SetIdentityNotificationTopic(aws) {
  var identity = aws.params.Identity;
  var notificationType = aws.params.NotificationType;
  var snsTopic = aws.params.SnsTopic;
  if (!identity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Identity'];
  }
  if (!notificationType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter NotificationType'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetReceiptRulePosition = function SetReceiptRulePosition(aws) {
  var after = aws.params.After;
  var ruleName = aws.params.RuleName;
  var ruleSetName = aws.params.RuleSetName;
  if (!ruleName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleName'];
  }
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateReceiptRule = function UpdateReceiptRule(aws) {
  var rule = aws.params.Rule;
  var ruleSetName = aws.params.RuleSetName;
  if (!rule) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Rule'];
  }
  if (!ruleSetName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter RuleSetName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.VerifyDomainDkim = function VerifyDomainDkim(aws) {
  var domain = aws.params.Domain;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Domain'];
  }


  // TODO implement code

  var ret = {
    DkimTokens: /*S1y*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.VerifyDomainIdentity = function VerifyDomainIdentity(aws) {
  var domain = aws.params.Domain;
  if (!domain) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Domain'];
  }


  // TODO implement code

  var ret = {
    VerificationToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.VerifyEmailAddress = function VerifyEmailAddress(aws) {
  var emailAddress = aws.params.EmailAddress;
  if (!emailAddress) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter EmailAddress'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.VerifyEmailIdentity = function VerifyEmailIdentity(aws) {
  var emailAddress = aws.params.EmailAddress;
  if (!emailAddress) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter EmailAddress'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
