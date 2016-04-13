'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * AWS Support version 2013-04-15
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null);
// -----------------------------------
module.exports.AddCommunicationToCase = function AddCommunicationToCase(aws) {
  var communicationBody = aws.params.communicationBody;
  var ccEmailAddresses = aws.params.ccEmailAddresses;
  var attachmentSetId = aws.params.attachmentSetId;
  var caseId = aws.params.caseId;
  if (!communicationBody) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter communicationBody'];
  }


  // TODO implement code

  var ret = {
    result: false,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeTrustedAdvisorChecks = function DescribeTrustedAdvisorChecks(aws) {
  var language = aws.params.language;
  if (!language) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter language'];
  }


  // TODO implement code

  var ret = {
    checks: [ {
      name: '',
      id: '',
      metadata: /*S1t*/[ '', /* ...*/ ],
      category: '',
      description: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeCases = function DescribeCases(aws) {
  var includeResolvedCases = aws.params.includeResolvedCases /* Type boolean */;
  var beforeTime = aws.params.beforeTime;
  var caseIdList = aws.params.caseIdList /* Type list */;
  var includeCommunications = aws.params.includeCommunications /* Type boolean */;
  var maxResults = aws.params.maxResults /* Type integer */;
  var afterTime = aws.params.afterTime;
  var displayId = aws.params.displayId;
  var language = aws.params.language;
  var nextToken = aws.params.nextToken;


  // TODO implement code

  var ret = {
    cases: [ {
      timeCreated: '',
      subject: '',
      recentCommunications: {
        communications: /*S17*/[ {
          body: '',
          timeCreated: '',
          attachmentSet: [ {
            attachmentId: '',
            fileName: '',
          }, /* ...*/ ],
          submittedBy: '',
          caseId: '',
        }, /* ...*/ ],
        nextToken: '',
      },
      serviceCode: '',
      displayId: '',
      language: '',
      status: '',
      ccEmailAddresses: /*Sc*/[ '', /* ...*/ ],
      categoryCode: '',
      submittedBy: '',
      caseId: '',
      severityCode: '',
    }, /* ...*/ ],
    nextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RefreshTrustedAdvisorCheck = function RefreshTrustedAdvisorCheck(aws) {
  var checkId = aws.params.checkId;
  if (!checkId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter checkId'];
  }


  // TODO implement code

  var ret = {
    status: /*S1x*/{
      checkId: '',
      millisUntilNextRefreshable: 0 /*Long*/,
      status: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.AddAttachmentsToSet = function AddAttachmentsToSet(aws) {
  var attachments = aws.params.attachments /* Type list */;
  var attachmentSetId = aws.params.attachmentSetId;
  if (!attachments) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter attachments'];
  }


  // TODO implement code

  var ret = {
    expiryTime: '',
    attachmentSetId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeCommunications = function DescribeCommunications(aws) {
  var maxResults = aws.params.maxResults /* Type integer */;
  var afterTime = aws.params.afterTime;
  var nextToken = aws.params.nextToken;
  var beforeTime = aws.params.beforeTime;
  var caseId = aws.params.caseId;
  if (!caseId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter caseId'];
  }


  // TODO implement code

  var ret = {
    communications: /*S17*/[ {
      body: '',
      timeCreated: '',
      attachmentSet: [ {
        attachmentId: '',
        fileName: '',
      }, /* ...*/ ],
      submittedBy: '',
      caseId: '',
    }, /* ...*/ ],
    nextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeTrustedAdvisorCheckSummaries = function DescribeTrustedAdvisorCheckSummaries(aws) {
  var checkIds = aws.params.checkIds;
  if (!checkIds) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter checkIds'];
  }


  // TODO implement code

  var ret = {
    summaries: [ {
      hasFlaggedResources: false,
      checkId: '',
      resourcesSummary: /*S22*/{
        resourcesSuppressed: 0 /*Long*/,
        resourcesProcessed: 0 /*Long*/,
        resourcesIgnored: 0 /*Long*/,
        resourcesFlagged: 0 /*Long*/,
      },
      categorySpecificSummary: /*S23*/{
        costOptimizing: {
          estimatedMonthlySavings: 0.0 /*Double*/,
          estimatedPercentMonthlySavings: 0.0 /*Double*/,
        },
      },
      timestamp: '',
      status: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ResolveCase = function ResolveCase(aws) {
  var caseId = aws.params.caseId;


  // TODO implement code

  var ret = {
    initialCaseStatus: '',
    finalCaseStatus: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAttachment = function DescribeAttachment(aws) {
  var attachmentId = aws.params.attachmentId;
  if (!attachmentId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter attachmentId'];
  }


  // TODO implement code

  var ret = {
    attachment: /*S4*/{
      data: null /*Blob*/,
      fileName: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateCase = function CreateCase(aws) {
  var communicationBody = aws.params.communicationBody;
  var categoryCode = aws.params.categoryCode;
  var subject = aws.params.subject;
  var ccEmailAddresses = aws.params.ccEmailAddresses;
  var severityCode = aws.params.severityCode;
  var serviceCode = aws.params.serviceCode;
  var issueType = aws.params.issueType;
  var language = aws.params.language;
  var attachmentSetId = aws.params.attachmentSetId;
  if (!subject) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter subject'];
  }
  if (!communicationBody) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter communicationBody'];
  }


  // TODO implement code

  var ret = {
    caseId: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeSeverityLevels = function DescribeSeverityLevels(aws) {
  var language = aws.params.language;


  // TODO implement code

  var ret = {
    severityLevels: [ {
      name: '',
      code: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeServices = function DescribeServices(aws) {
  var serviceCodeList = aws.params.serviceCodeList /* Type list */;
  var language = aws.params.language;


  // TODO implement code

  var ret = {
    services: [ {
      name: '',
      categories: [ {
        name: '',
        code: '',
      }, /* ...*/ ],
      code: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeTrustedAdvisorCheckResult = function DescribeTrustedAdvisorCheckResult(aws) {
  var checkId = aws.params.checkId;
  var language = aws.params.language;
  if (!checkId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter checkId'];
  }


  // TODO implement code

  var ret = {
    result: {
      flaggedResources: [ {
        region: '',
        resourceId: '',
        isSuppressed: false,
        metadata: /*S1t*/[ '', /* ...*/ ],
        status: '',
      }, /* ...*/ ],
      checkId: '',
      resourcesSummary: /*S22*/{
        resourcesSuppressed: 0 /*Long*/,
        resourcesProcessed: 0 /*Long*/,
        resourcesIgnored: 0 /*Long*/,
        resourcesFlagged: 0 /*Long*/,
      },
      categorySpecificSummary: /*S23*/{
        costOptimizing: {
          estimatedMonthlySavings: 0.0 /*Double*/,
          estimatedPercentMonthlySavings: 0.0 /*Double*/,
        },
      },
      timestamp: '',
      status: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeTrustedAdvisorCheckRefreshStatuses = function DescribeTrustedAdvisorCheckRefreshStatuses(aws) {
  var checkIds = aws.params.checkIds;
  if (!checkIds) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter checkIds'];
  }


  // TODO implement code

  var ret = {
    statuses: [ /*S1x*/{
      checkId: '',
      millisUntilNextRefreshable: 0 /*Long*/,
      status: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
