'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS CodePipeline version 2015-07-09
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.AcknowledgeThirdPartyJob = function AcknowledgeThirdPartyJob(aws) {
        var nonce = aws.params['nonce'];
        var clientToken = aws.params['clientToken'];
        var jobId = aws.params['jobId'];
        if (! jobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter jobId"];
        }        if (! nonce) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter nonce"];
        }        if (! clientToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter clientToken"];
        }

        // TODO implement code

        var ret = {
            status: ""
        };
        return [200, ret];
    }
module.exports.GetPipelineState = function GetPipelineState(aws) {
        var name = aws.params['name'];
        if (! name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
        }

        // TODO implement code

        var ret = {
            updated: now(),
            created: now(),
            pipelineVersion: 0,
            pipelineName: "",
            stageStates: [ {
                inboundTransitionState: {
                    lastChangedAt: now(),
                    enabled: false,
                    disabledReason: "",
                    lastChangedBy: ""
                },
                actionStates: [ {
                    latestExecution: {
                        status: "",
                        summary: "",
                        errorDetails: {
                            code: "",
                            message: ""
                        },
                        externalExecutionUrl: "",
                        percentComplete: 0,
                        externalExecutionId: "",
                        lastStatusChange: now()
                    },
                    currentRevision: /*S2s*/{
                        created: now(),
                        revisionChangeId: "",
                        revisionId: ""
                    },
                    revisionUrl: "",
                    entityUrl: "",
                    actionName: ""
                } /*, ...*/ ],
                stageName: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.PutJobFailureResult = function PutJobFailureResult(aws) {
        var failureDetails = aws.params['failureDetails'];
        var jobId = aws.params['jobId'];
        if (! jobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter jobId"];
        }        if (! failureDetails) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter failureDetails"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.GetJobDetails = function GetJobDetails(aws) {
        var jobId = aws.params['jobId'];
        if (! jobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter jobId"];
        }

        // TODO implement code

        var ret = {
            jobDetails: {
                data: /*S1x*/{
                    encryptionKey: /*S11*/{
                        type: "",
                        id: ""
                    },
                    pipelineContext: /*S1z*/{
                        action: {
                            name: ""
                        },
                        stage: {
                            name: ""
                        },
                        pipelineName: ""
                    },
                    actionTypeId: /*Ss*/{
                        version: "",
                        category: "",
                        owner: "",
                        provider: ""
                    },
                    actionConfiguration: /*S1y*/{
                        configuration: /*S1f*/{} /* map */
                    },
                    inputArtifacts: /*S22*/[ {
                        location: {
                            s3Location: {
                                objectKey: "",
                                bucketName: ""
                            },
                            type: ""
                        },
                        revision: "",
                        name: ""
                    } /*, ...*/ ],
                    continuationToken: "",
                    artifactCredentials: /*S2a*/{
                        secretAccessKey: "",
                        sessionToken: "",
                        accessKeyId: ""
                    },
                    outputArtifacts: /*S22*/[ {
                        location: {
                            s3Location: {
                                objectKey: "",
                                bucketName: ""
                            },
                            type: ""
                        },
                        revision: "",
                        name: ""
                    } /*, ...*/ ]
                },
                accountId: "",
                id: ""
            }
        };
        return [200, ret];
    }
module.exports.DeleteCustomActionType = function DeleteCustomActionType(aws) {
        var version = aws.params['version'];
        var category = aws.params['category'];
        var provider = aws.params['provider'];
        if (! category) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter category"];
        }        if (! provider) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter provider"];
        }        if (! version) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter version"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DeletePipeline = function DeletePipeline(aws) {
        var name = aws.params['name'];
        if (! name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.UpdatePipeline = function UpdatePipeline(aws) {
        var pipeline = aws.params['pipeline'];
        if (! pipeline) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipeline"];
        }

        // TODO implement code

        var ret = {
            pipeline: /*Sv*/{
                artifactStore: {
                    encryptionKey: /*S11*/{
                        type: "",
                        id: ""
                    },
                    location: "",
                    type: ""
                },
                version: 0,
                roleArn: "",
                name: "",
                stages: [ {
                    blockers: [ {
                        name: "",
                        type: ""
                    } /*, ...*/ ],
                    name: "",
                    actions: [ {
                        configuration: /*S1f*/{} /* map */,
                        actionTypeId: /*Ss*/{
                            version: "",
                            category: "",
                            owner: "",
                            provider: ""
                        },
                        inputArtifacts: [ {
                            name: ""
                        } /*, ...*/ ],
                        runOrder: 0,
                        roleArn: "",
                        name: "",
                        outputArtifacts: [ {
                            name: ""
                        } /*, ...*/ ]
                    } /*, ...*/ ]
                } /*, ...*/ ]
            }
        };
        return [200, ret];
    }
module.exports.ListPipelines = function ListPipelines(aws) {
        var nextToken = aws.params['nextToken'];


        // TODO implement code

        var ret = {
            pipelines: [ {
                version: 0,
                updated: now(),
                created: now(),
                name: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.PutThirdPartyJobSuccessResult = function PutThirdPartyJobSuccessResult(aws) {
        var currentRevision = aws.params['currentRevision'];
        var clientToken = aws.params['clientToken'];
        var executionDetails = aws.params['executionDetails'];
        var jobId = aws.params['jobId'];
        var continuationToken = aws.params['continuationToken'];
        if (! jobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter jobId"];
        }        if (! clientToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter clientToken"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PollForJobs = function PollForJobs(aws) {
        var queryParam = aws.params['queryParam'] /* map */;
        var actionTypeId = aws.params['actionTypeId'];
        var maxBatchSize = aws.params['maxBatchSize'] /* integer */;
        if (! actionTypeId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter actionTypeId"];
        }

        // TODO implement code

        var ret = {
            jobs: [ {
                nonce: "",
                data: /*S1x*/{
                    encryptionKey: /*S11*/{
                        type: "",
                        id: ""
                    },
                    pipelineContext: /*S1z*/{
                        action: {
                            name: ""
                        },
                        stage: {
                            name: ""
                        },
                        pipelineName: ""
                    },
                    actionTypeId: /*Ss*/{
                        version: "",
                        category: "",
                        owner: "",
                        provider: ""
                    },
                    actionConfiguration: /*S1y*/{
                        configuration: /*S1f*/{} /* map */
                    },
                    inputArtifacts: /*S22*/[ {
                        location: {
                            s3Location: {
                                objectKey: "",
                                bucketName: ""
                            },
                            type: ""
                        },
                        revision: "",
                        name: ""
                    } /*, ...*/ ],
                    continuationToken: "",
                    artifactCredentials: /*S2a*/{
                        secretAccessKey: "",
                        sessionToken: "",
                        accessKeyId: ""
                    },
                    outputArtifacts: /*S22*/[ {
                        location: {
                            s3Location: {
                                objectKey: "",
                                bucketName: ""
                            },
                            type: ""
                        },
                        revision: "",
                        name: ""
                    } /*, ...*/ ]
                },
                accountId: "",
                id: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.GetThirdPartyJobDetails = function GetThirdPartyJobDetails(aws) {
        var clientToken = aws.params['clientToken'];
        var jobId = aws.params['jobId'];
        if (! jobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter jobId"];
        }        if (! clientToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter clientToken"];
        }

        // TODO implement code

        var ret = {
            jobDetails: {
                nonce: "",
                data: {
                    encryptionKey: /*S11*/{
                        type: "",
                        id: ""
                    },
                    pipelineContext: /*S1z*/{
                        action: {
                            name: ""
                        },
                        stage: {
                            name: ""
                        },
                        pipelineName: ""
                    },
                    actionTypeId: /*Ss*/{
                        version: "",
                        category: "",
                        owner: "",
                        provider: ""
                    },
                    actionConfiguration: /*S1y*/{
                        configuration: /*S1f*/{} /* map */
                    },
                    inputArtifacts: /*S22*/[ {
                        location: {
                            s3Location: {
                                objectKey: "",
                                bucketName: ""
                            },
                            type: ""
                        },
                        revision: "",
                        name: ""
                    } /*, ...*/ ],
                    continuationToken: "",
                    artifactCredentials: /*S2a*/{
                        secretAccessKey: "",
                        sessionToken: "",
                        accessKeyId: ""
                    },
                    outputArtifacts: /*S22*/[ {
                        location: {
                            s3Location: {
                                objectKey: "",
                                bucketName: ""
                            },
                            type: ""
                        },
                        revision: "",
                        name: ""
                    } /*, ...*/ ]
                },
                id: ""
            }
        };
        return [200, ret];
    }
module.exports.PutThirdPartyJobFailureResult = function PutThirdPartyJobFailureResult(aws) {
        var failureDetails = aws.params['failureDetails'];
        var clientToken = aws.params['clientToken'];
        var jobId = aws.params['jobId'];
        if (! jobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter jobId"];
        }        if (! clientToken) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter clientToken"];
        }        if (! failureDetails) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter failureDetails"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.CreateCustomActionType = function CreateCustomActionType(aws) {
        var inputArtifactDetails = aws.params['inputArtifactDetails'];
        var provider = aws.params['provider'];
        var version = aws.params['version'];
        var category = aws.params['category'];
        var outputArtifactDetails = aws.params['outputArtifactDetails'];
        var settings = aws.params['settings'];
        var configurationProperties = aws.params['configurationProperties'];
        if (! category) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter category"];
        }        if (! provider) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter provider"];
        }        if (! version) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter version"];
        }        if (! inputArtifactDetails) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter inputArtifactDetails"];
        }        if (! outputArtifactDetails) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter outputArtifactDetails"];
        }

        // TODO implement code

        var ret = {
            actionType: /*Sr*/{
                actionConfigurationProperties: /*Sh*/[ {
                    type: "",
                    secret: false,
                    description: "",
                    key: false,
                    queryable: false,
                    name: "",
                    required: false
                } /*, ...*/ ],
                outputArtifactDetails: /*Sn*/{
                    maximumCount: 0,
                    minimumCount: 0
                },
                inputArtifactDetails: /*Sn*/{
                    maximumCount: 0,
                    minimumCount: 0
                },
                settings: /*Se*/{
                    thirdPartyConfigurationUrl: "",
                    entityUrlTemplate: "",
                    revisionUrlTemplate: "",
                    executionUrlTemplate: ""
                },
                id: /*Ss*/{
                    version: "",
                    category: "",
                    owner: "",
                    provider: ""
                }
            }
        };
        return [200, ret];
    }
module.exports.StartPipelineExecution = function StartPipelineExecution(aws) {
        var name = aws.params['name'];
        if (! name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
        }

        // TODO implement code

        var ret = {
            pipelineExecutionId: ""
        };
        return [200, ret];
    }
module.exports.AcknowledgeJob = function AcknowledgeJob(aws) {
        var nonce = aws.params['nonce'];
        var jobId = aws.params['jobId'];
        if (! jobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter jobId"];
        }        if (! nonce) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter nonce"];
        }

        // TODO implement code

        var ret = {
            status: ""
        };
        return [200, ret];
    }
module.exports.GetPipeline = function GetPipeline(aws) {
        var version = aws.params['version'] /* integer */;
        var name = aws.params['name'];
        if (! name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
        }

        // TODO implement code

        var ret = {
            pipeline: /*Sv*/{
                artifactStore: {
                    encryptionKey: /*S11*/{
                        type: "",
                        id: ""
                    },
                    location: "",
                    type: ""
                },
                version: 0,
                roleArn: "",
                name: "",
                stages: [ {
                    blockers: [ {
                        name: "",
                        type: ""
                    } /*, ...*/ ],
                    name: "",
                    actions: [ {
                        configuration: /*S1f*/{} /* map */,
                        actionTypeId: /*Ss*/{
                            version: "",
                            category: "",
                            owner: "",
                            provider: ""
                        },
                        inputArtifacts: [ {
                            name: ""
                        } /*, ...*/ ],
                        runOrder: 0,
                        roleArn: "",
                        name: "",
                        outputArtifacts: [ {
                            name: ""
                        } /*, ...*/ ]
                    } /*, ...*/ ]
                } /*, ...*/ ]
            }
        };
        return [200, ret];
    }
module.exports.EnableStageTransition = function EnableStageTransition(aws) {
        var transitionType = aws.params['transitionType'];
        var pipelineName = aws.params['pipelineName'];
        var stageName = aws.params['stageName'];
        if (! pipelineName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineName"];
        }        if (! stageName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter stageName"];
        }        if (! transitionType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter transitionType"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.CreatePipeline = function CreatePipeline(aws) {
        var pipeline = aws.params['pipeline'];
        if (! pipeline) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipeline"];
        }

        // TODO implement code

        var ret = {
            pipeline: /*Sv*/{
                artifactStore: {
                    encryptionKey: /*S11*/{
                        type: "",
                        id: ""
                    },
                    location: "",
                    type: ""
                },
                version: 0,
                roleArn: "",
                name: "",
                stages: [ {
                    blockers: [ {
                        name: "",
                        type: ""
                    } /*, ...*/ ],
                    name: "",
                    actions: [ {
                        configuration: /*S1f*/{} /* map */,
                        actionTypeId: /*Ss*/{
                            version: "",
                            category: "",
                            owner: "",
                            provider: ""
                        },
                        inputArtifacts: [ {
                            name: ""
                        } /*, ...*/ ],
                        runOrder: 0,
                        roleArn: "",
                        name: "",
                        outputArtifacts: [ {
                            name: ""
                        } /*, ...*/ ]
                    } /*, ...*/ ]
                } /*, ...*/ ]
            }
        };
        return [200, ret];
    }
module.exports.ListActionTypes = function ListActionTypes(aws) {
        var actionOwnerFilter = aws.params['actionOwnerFilter'];
        var nextToken = aws.params['nextToken'];


        // TODO implement code

        var ret = {
            actionTypes: [ /*Sr*/{
                actionConfigurationProperties: /*Sh*/[ {
                    type: "",
                    secret: false,
                    description: "",
                    key: false,
                    queryable: false,
                    name: "",
                    required: false
                } /*, ...*/ ],
                outputArtifactDetails: /*Sn*/{
                    maximumCount: 0,
                    minimumCount: 0
                },
                inputArtifactDetails: /*Sn*/{
                    maximumCount: 0,
                    minimumCount: 0
                },
                settings: /*Se*/{
                    thirdPartyConfigurationUrl: "",
                    entityUrlTemplate: "",
                    revisionUrlTemplate: "",
                    executionUrlTemplate: ""
                },
                id: /*Ss*/{
                    version: "",
                    category: "",
                    owner: "",
                    provider: ""
                }
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.DisableStageTransition = function DisableStageTransition(aws) {
        var transitionType = aws.params['transitionType'];
        var reason = aws.params['reason'];
        var pipelineName = aws.params['pipelineName'];
        var stageName = aws.params['stageName'];
        if (! pipelineName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineName"];
        }        if (! stageName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter stageName"];
        }        if (! transitionType) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter transitionType"];
        }        if (! reason) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter reason"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutJobSuccessResult = function PutJobSuccessResult(aws) {
        var currentRevision = aws.params['currentRevision'];
        var executionDetails = aws.params['executionDetails'];
        var jobId = aws.params['jobId'];
        var continuationToken = aws.params['continuationToken'];
        if (! jobId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter jobId"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PollForThirdPartyJobs = function PollForThirdPartyJobs(aws) {
        var actionTypeId = aws.params['actionTypeId'];
        var maxBatchSize = aws.params['maxBatchSize'] /* integer */;
        if (! actionTypeId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter actionTypeId"];
        }

        // TODO implement code

        var ret = {
            jobs: [ {
                clientId: "",
                jobId: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.PutActionRevision = function PutActionRevision(aws) {
        var actionRevision = aws.params['actionRevision'];
        var pipelineName = aws.params['pipelineName'];
        var stageName = aws.params['stageName'];
        var actionName = aws.params['actionName'];
        if (! pipelineName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter pipelineName"];
        }        if (! stageName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter stageName"];
        }        if (! actionName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter actionName"];
        }        if (! actionRevision) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter actionRevision"];
        }

        // TODO implement code

        var ret = {
            newRevision: false,
            pipelineExecutionId: ""
        };
        return [200, ret];
    }
