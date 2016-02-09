'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS Config version 2014-11-12
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.DescribeDeliveryChannels = function DescribeDeliveryChannels(aws) {
        var DeliveryChannelNames = aws.params.DeliveryChannelNames;


        // TODO implement code

        var ret = {
            DeliveryChannels: [ /*S22*/{
                s3BucketName: "",
                snsTopicARN: "",
                name: "",
                configSnapshotDeliveryProperties: {
                    deliveryFrequency: ""
                },
                s3KeyPrefix: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DescribeComplianceByResource = function DescribeComplianceByResource(aws) {
        var ResourceId = aws.params.ResourceId;
        var ComplianceTypes = aws.params.ComplianceTypes;
        var ResourceType = aws.params.ResourceType;
        var NextToken = aws.params.NextToken;
        var Limit = aws.params.Limit /* integer */;


        // TODO implement code

        var ret = {
            ComplianceByResources: [ {
                ResourceId: "",
                Compliance: /*Sf*/{
                    ComplianceType: "",
                    ComplianceContributorCount: /*Sg*/{
                        CappedCount: 0,
                        CapExceeded: false
                    }
                },
                ResourceType: ""
            } /*, ...*/ ],
            NextToken: ""
        };
        return [200, ret];
    }
module.exports.PutConfigurationRecorder = function PutConfigurationRecorder(aws) {
        var ConfigurationRecorder = aws.params.ConfigurationRecorder;
        if (! ConfigurationRecorder) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ConfigurationRecorder"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.ListDiscoveredResources = function ListDiscoveredResources(aws) {
        var includeDeletedResources = aws.params.includeDeletedResources /* boolean */;
        var limit = aws.params.limit /* integer */;
        var resourceIds = aws.params.resourceIds /* list */;
        var resourceName = aws.params.resourceName;
        var resourceType = aws.params.resourceType;
        var nextToken = aws.params.nextToken;
        if (! resourceType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter resourceType"];
        }

        // TODO implement code

        var ret = {
            resourceIdentifiers: [ {
                resourceId: "",
                resourceDeletionTime: now(),
                resourceType: "",
                resourceName: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.DescribeComplianceByConfigRule = function DescribeComplianceByConfigRule(aws) {
        var ComplianceTypes = aws.params.ComplianceTypes;
        var ConfigRuleNames = aws.params.ConfigRuleNames;
        var NextToken = aws.params.NextToken;


        // TODO implement code

        var ret = {
            ComplianceByConfigRules: [ {
                ConfigRuleName: "",
                Compliance: /*Sf*/{
                    ComplianceType: "",
                    ComplianceContributorCount: /*Sg*/{
                        CappedCount: 0,
                        CapExceeded: false
                    }
                }
            } /*, ...*/ ],
            NextToken: ""
        };
        return [200, ret];
    }
module.exports.PutEvaluations = function PutEvaluations(aws) {
        var Evaluations = aws.params.Evaluations;
        var ResultToken = aws.params.ResultToken;
        if (! ResultToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ResultToken"];
        }

        // TODO implement code

        var ret = {
            FailedEvaluations: /*S3l*/[ {
                OrderingTimestamp: now(),
                Annotation: "",
                ComplianceType: "",
                ComplianceResourceType: "",
                ComplianceResourceId: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.GetComplianceSummaryByConfigRule = function GetComplianceSummaryByConfigRule(aws) {


        // TODO implement code

        var ret = {
            ComplianceSummary: /*S2d*/{
                NonCompliantResourceCount: /*Sg*/{
                    CappedCount: 0,
                    CapExceeded: false
                },
                CompliantResourceCount: /*Sg*/{
                    CappedCount: 0,
                    CapExceeded: false
                },
                ComplianceSummaryTimestamp: now()
            }
        };
        return [200, ret];
    }
module.exports.DescribeConfigRules = function DescribeConfigRules(aws) {
        var ConfigRuleNames = aws.params.ConfigRuleNames;
        var NextToken = aws.params.NextToken;


        // TODO implement code

        var ret = {
            ConfigRules: [ /*Sy*/{
                Source: {
                    SourceIdentifier: "",
                    Owner: "",
                    SourceDetails: [ {
                        MessageType: "",
                        EventSource: ""
                    } /*, ...*/ ]
                },
                Description: "",
                ConfigRuleState: "",
                ConfigRuleName: "",
                ConfigRuleArn: "",
                InputParameters: "",
                ConfigRuleId: "",
                MaximumExecutionFrequency: "",
                Scope: {
                    TagValue: "",
                    ComplianceResourceTypes: [ "" /*, ...*/ ],
                    TagKey: "",
                    ComplianceResourceId: ""
                }
            } /*, ...*/ ],
            NextToken: ""
        };
        return [200, ret];
    }
module.exports.DeleteDeliveryChannel = function DeleteDeliveryChannel(aws) {
        var DeliveryChannelName = aws.params.DeliveryChannelName;
        if (! DeliveryChannelName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DeliveryChannelName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.GetComplianceSummaryByResourceType = function GetComplianceSummaryByResourceType(aws) {
        var ResourceTypes = aws.params.ResourceTypes /* list */;


        // TODO implement code

        var ret = {
            ComplianceSummariesByResourceType: [ {
                ResourceType: "",
                ComplianceSummary: /*S2d*/{
                    NonCompliantResourceCount: /*Sg*/{
                        CappedCount: 0,
                        CapExceeded: false
                    },
                    CompliantResourceCount: /*Sg*/{
                        CappedCount: 0,
                        CapExceeded: false
                    },
                    ComplianceSummaryTimestamp: now()
                }
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.GetComplianceDetailsByResource = function GetComplianceDetailsByResource(aws) {
        var ResourceId = aws.params.ResourceId;
        var ComplianceTypes = aws.params.ComplianceTypes;
        var ResourceType = aws.params.ResourceType;
        var NextToken = aws.params.NextToken;
        if (! ResourceType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ResourceType"];
        }        if (! ResourceId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ResourceId"];
        }

        // TODO implement code

        var ret = {
            EvaluationResults: /*S26*/[ {
                EvaluationResultIdentifier: {
                    OrderingTimestamp: now(),
                    EvaluationResultQualifier: {
                        ConfigRuleName: "",
                        ResourceId: "",
                        ResourceType: ""
                    }
                },
                ConfigRuleInvokedTime: now(),
                ResultToken: "",
                ResultRecordedTime: now(),
                ComplianceType: "",
                Annotation: ""
            } /*, ...*/ ],
            NextToken: ""
        };
        return [200, ret];
    }
module.exports.DescribeConfigurationRecorderStatus = function DescribeConfigurationRecorderStatus(aws) {
        var ConfigurationRecorderNames = aws.params.ConfigurationRecorderNames;


        // TODO implement code

        var ret = {
            ConfigurationRecordersStatus: [ {
                lastErrorMessage: "",
                lastStatusChangeTime: now(),
                lastErrorCode: "",
                name: "",
                lastStopTime: now(),
                lastStartTime: now(),
                recording: false,
                lastStatus: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.PutDeliveryChannel = function PutDeliveryChannel(aws) {
        var DeliveryChannel = aws.params.DeliveryChannel;
        if (! DeliveryChannel) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter DeliveryChannel"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeConfigRuleEvaluationStatus = function DescribeConfigRuleEvaluationStatus(aws) {
        var ConfigRuleNames = aws.params.ConfigRuleNames;


        // TODO implement code

        var ret = {
            ConfigRulesEvaluationStatus: [ {
                LastErrorMessage: "",
                FirstEvaluationStarted: false,
                LastSuccessfulInvocationTime: now(),
                FirstActivatedTime: now(),
                LastFailedEvaluationTime: now(),
                ConfigRuleName: "",
                ConfigRuleArn: "",
                LastErrorCode: "",
                ConfigRuleId: "",
                LastFailedInvocationTime: now(),
                LastSuccessfulEvaluationTime: now()
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.GetResourceConfigHistory = function GetResourceConfigHistory(aws) {
        var resourceId = aws.params.resourceId;
        var earlierTime = aws.params.earlierTime /* timestamp */;
        var limit = aws.params.limit /* integer */;
        var laterTime = aws.params.laterTime /* timestamp */;
        var chronologicalOrder = aws.params.chronologicalOrder;
        var resourceType = aws.params.resourceType;
        var nextToken = aws.params.nextToken;
        if (! resourceType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter resourceType"];
        }        if (! resourceId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter resourceId"];
        }

        // TODO implement code

        var ret = {
            configurationItems: [ {
                arn: "",
                availabilityZone: "",
                resourceName: "",
                configurationItemMD5Hash: "",
                version: "",
                configurationItemCaptureTime: now(),
                awsRegion: "",
                resourceCreationTime: now(),
                relatedEvents: [ "" /*, ...*/ ],
                configurationItemStatus: "",
                resourceId: "",
                accountId: "",
                configurationStateId: "",
                configuration: "",
                tags: {} /* map */,
                resourceType: "",
                relationships: [ {
                    relationshipName: "",
                    resourceId: "",
                    resourceType: "",
                    resourceName: ""
                } /*, ...*/ ]
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.StartConfigurationRecorder = function StartConfigurationRecorder(aws) {
        var ConfigurationRecorderName = aws.params.ConfigurationRecorderName;
        if (! ConfigurationRecorderName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ConfigurationRecorderName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.GetComplianceDetailsByConfigRule = function GetComplianceDetailsByConfigRule(aws) {
        var ConfigRuleName = aws.params.ConfigRuleName;
        var Limit = aws.params.Limit /* integer */;
        var ComplianceTypes = aws.params.ComplianceTypes;
        var NextToken = aws.params.NextToken;
        if (! ConfigRuleName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ConfigRuleName"];
        }

        // TODO implement code

        var ret = {
            EvaluationResults: /*S26*/[ {
                EvaluationResultIdentifier: {
                    OrderingTimestamp: now(),
                    EvaluationResultQualifier: {
                        ConfigRuleName: "",
                        ResourceId: "",
                        ResourceType: ""
                    }
                },
                ConfigRuleInvokedTime: now(),
                ResultToken: "",
                ResultRecordedTime: now(),
                ComplianceType: "",
                Annotation: ""
            } /*, ...*/ ],
            NextToken: ""
        };
        return [200, ret];
    }
module.exports.DescribeConfigurationRecorders = function DescribeConfigurationRecorders(aws) {
        var ConfigurationRecorderNames = aws.params.ConfigurationRecorderNames;


        // TODO implement code

        var ret = {
            ConfigurationRecorders: [ /*S1l*/{
                name: "",
                roleARN: "",
                recordingGroup: {
                    includeGlobalResourceTypes: false,
                    allSupported: false,
                    resourceTypes: [ "" /*, ...*/ ]
                }
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteConfigRule = function DeleteConfigRule(aws) {
        var ConfigRuleName = aws.params.ConfigRuleName;
        if (! ConfigRuleName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ConfigRuleName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.StopConfigurationRecorder = function StopConfigurationRecorder(aws) {
        var ConfigurationRecorderName = aws.params.ConfigurationRecorderName;
        if (! ConfigurationRecorderName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ConfigurationRecorderName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutConfigRule = function PutConfigRule(aws) {
        var ConfigRule = aws.params.ConfigRule;
        if (! ConfigRule) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ConfigRule"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeliverConfigSnapshot = function DeliverConfigSnapshot(aws) {
        var deliveryChannelName = aws.params.deliveryChannelName;
        if (! deliveryChannelName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter deliveryChannelName"];
        }

        // TODO implement code

        var ret = {
            configSnapshotId: ""
        };
        return [200, ret];
    }
module.exports.DescribeDeliveryChannelStatus = function DescribeDeliveryChannelStatus(aws) {
        var DeliveryChannelNames = aws.params.DeliveryChannelNames;


        // TODO implement code

        var ret = {
            DeliveryChannelsStatus: [ {
                configStreamDeliveryInfo: {
                    lastErrorMessage: "",
                    lastStatusChangeTime: now(),
                    lastErrorCode: "",
                    lastStatus: ""
                },
                name: "",
                configSnapshotDeliveryInfo: /*S1w*/{
                    lastErrorMessage: "",
                    lastAttemptTime: now(),
                    lastErrorCode: "",
                    lastStatus: "",
                    nextDeliveryTime: now(),
                    lastSuccessfulTime: now()
                },
                configHistoryDeliveryInfo: /*S1w*/{
                    lastErrorMessage: "",
                    lastAttemptTime: now(),
                    lastErrorCode: "",
                    lastStatus: "",
                    nextDeliveryTime: now(),
                    lastSuccessfulTime: now()
                }
            } /*, ...*/ ]
        };
        return [200, ret];
    }
