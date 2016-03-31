'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon Elastic MapReduce version 2009-03-31
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null)
module.exports.ListInstanceGroups = function ListInstanceGroups(aws) {
        var ClusterId = aws.params['ClusterId'];
        var Marker = aws.params['Marker'];
        if (! ClusterId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClusterId"];
        }


        // TODO implement code

        var ret = {
            Marker: "",
            InstanceGroups: [ {
                InstanceType: "",
                BidPrice: "",
                RunningInstanceCount: 0,
                InstanceGroupType: "",
                RequestedInstanceCount: 0,
                Status: {
                    StateChangeReason: {
                        Message: "",
                        Code: ""
                    },
                    State: "",
                    Timeline: {
                        EndDateTime: now(),
                        ReadyDateTime: now(),
                        CreationDateTime: now()
                    }
                },
                Configurations: /*S9*/[ {
                    Classification: "",
                    Configurations: null/* recursive S9*/,
                    Properties: /*Sc*/{} /* map */
                } /*, ...*/ ],
                Market: "",
                Name: "",
                Id: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListBootstrapActions = function ListBootstrapActions(aws) {
        var ClusterId = aws.params['ClusterId'];
        var Marker = aws.params['Marker'];
        if (! ClusterId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClusterId"];
        }


        // TODO implement code

        var ret = {
            Marker: "",
            BootstrapActions: [ {
                ScriptPath: "",
                Name: "",
                Args: /*S16*/[ "" /*, ...*/ ]
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ModifyInstanceGroups = function ModifyInstanceGroups(aws) {
        var InstanceGroups = aws.params['InstanceGroups'] /* list */;


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeJobFlows = function DescribeJobFlows(aws) {
        var CreatedBefore = aws.params['CreatedBefore'] /* timestamp */;
        var CreatedAfter = aws.params['CreatedAfter'] /* timestamp */;
        var JobFlowIds = aws.params['JobFlowIds'];
        var JobFlowStates = aws.params['JobFlowStates'] /* list */;


        // TODO implement code

        var ret = {
            JobFlows: [ {
                JobFlowId: "",
                VisibleToAllUsers: false,
                Instances: {
                    TerminationProtected: false,
                    MasterInstanceId: "",
                    Ec2KeyName: "",
                    SlaveInstanceType: "",
                    Ec2SubnetId: "",
                    HadoopVersion: "",
                    KeepJobFlowAliveWhenNoSteps: false,
                    InstanceGroups: [ {
                        InstanceRole: "",
                        InstanceType: "",
                        State: "",
                        CreationDateTime: now(),
                        InstanceGroupId: "",
                        StartDateTime: now(),
                        LastStateChangeReason: "",
                        ReadyDateTime: now(),
                        BidPrice: "",
                        InstanceRunningCount: 0,
                        InstanceRequestCount: 0,
                        EndDateTime: now(),
                        Market: "",
                        Name: ""
                    } /*, ...*/ ],
                    Placement: /*S1l*/{
                        AvailabilityZone: ""
                    },
                    MasterInstanceType: "",
                    NormalizedInstanceHours: 0,
                    MasterPublicDnsName: "",
                    InstanceCount: 0
                },
                ExecutionStatusDetail: {
                    State: "",
                    EndDateTime: now(),
                    CreationDateTime: now(),
                    StartDateTime: now(),
                    LastStateChangeReason: "",
                    ReadyDateTime: now()
                },
                LogUri: "",
                SupportedProducts: /*S1u*/[ "" /*, ...*/ ],
                AmiVersion: "",
                JobFlowRole: "",
                ServiceRole: "",
                Name: "",
                BootstrapActions: [ {
                    BootstrapActionConfig: /*S1s*/{
                        ScriptBootstrapAction: {
                            Args: /*Sn*/[ "" /*, ...*/ ],
                            Path: ""
                        },
                        Name: ""
                    }
                } /*, ...*/ ],
                Steps: [ {
                    ExecutionStatusDetail: {
                        State: "",
                        LastStateChangeReason: "",
                        StartDateTime: now(),
                        EndDateTime: now(),
                        CreationDateTime: now()
                    },
                    StepConfig: /*Sh*/{
                        ActionOnFailure: "",
                        Name: "",
                        HadoopJarStep: {
                            Jar: "",
                            MainClass: "",
                            Args: /*Sn*/[ "" /*, ...*/ ],
                            Properties: [ {
                                Value: "",
                                Key: ""
                            } /*, ...*/ ]
                        }
                    }
                } /*, ...*/ ]
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.AddJobFlowSteps = function AddJobFlowSteps(aws) {
        var JobFlowId = aws.params['JobFlowId'];
        var Steps = aws.params['Steps'];
        if (! JobFlowId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobFlowId"];
        }
        if (! Steps) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Steps"];
        }


        // TODO implement code

        var ret = {
            StepIds: [ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListInstances = function ListInstances(aws) {
        var ClusterId = aws.params['ClusterId'];
        var InstanceGroupId = aws.params['InstanceGroupId'];
        var Marker = aws.params['Marker'];
        var InstanceGroupTypes = aws.params['InstanceGroupTypes'] /* list */;
        if (! ClusterId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClusterId"];
        }


        // TODO implement code

        var ret = {
            Marker: "",
            Instances: [ {
                Ec2InstanceId: "",
                PrivateDnsName: "",
                Status: {
                    StateChangeReason: {
                        Message: "",
                        Code: ""
                    },
                    State: "",
                    Timeline: {
                        EndDateTime: now(),
                        ReadyDateTime: now(),
                        CreationDateTime: now()
                    }
                },
                PublicDnsName: "",
                PublicIpAddress: "",
                PrivateIpAddress: "",
                Id: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.RemoveTags = function RemoveTags(aws) {
        var ResourceId = aws.params['ResourceId'];
        var TagKeys = aws.params['TagKeys'];
        if (! ResourceId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ResourceId"];
        }
        if (! TagKeys) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TagKeys"];
        }


        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.RunJobFlow = function RunJobFlow(aws) {
        var Applications = aws.params['Applications'];
        var Tags = aws.params['Tags'];
        var JobFlowRole = aws.params['JobFlowRole'];
        var NewSupportedProducts = aws.params['NewSupportedProducts'] /* list */;
        var ReleaseLabel = aws.params['ReleaseLabel'];
        var VisibleToAllUsers = aws.params['VisibleToAllUsers'] /* boolean */;
        var AdditionalInfo = aws.params['AdditionalInfo'];
        var Instances = aws.params['Instances'] /* structure */;
        var Steps = aws.params['Steps'];
        var LogUri = aws.params['LogUri'];
        var SupportedProducts = aws.params['SupportedProducts'];
        var AmiVersion = aws.params['AmiVersion'];
        var Configurations = aws.params['Configurations'];
        var Name = aws.params['Name'];
        var BootstrapActions = aws.params['BootstrapActions'] /* list */;
        var ServiceRole = aws.params['ServiceRole'];
        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }
        if (! Instances) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Instances"];
        }


        // TODO implement code

        var ret = {
            JobFlowId: ""
        };
        return [200, ret];
    }
module.exports.TerminateJobFlows = function TerminateJobFlows(aws) {
        var JobFlowIds = aws.params['JobFlowIds'];
        if (! JobFlowIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobFlowIds"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeCluster = function DescribeCluster(aws) {
        var ClusterId = aws.params['ClusterId'];
        if (! ClusterId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClusterId"];
        }


        // TODO implement code

        var ret = {
            Cluster: {
                TerminationProtected: false,
                Applications: /*S18*/[ {
                    AdditionalInfo: /*Sc*/{} /* map */,
                    Version: "",
                    Name: "",
                    Args: /*S16*/[ "" /*, ...*/ ]
                } /*, ...*/ ],
                Tags: /*Ss*/[ {
                    Value: "",
                    Key: ""
                } /*, ...*/ ],
                Status: /*Sz*/{
                    StateChangeReason: {
                        Message: "",
                        Code: ""
                    },
                    State: "",
                    Timeline: {
                        EndDateTime: now(),
                        ReadyDateTime: now(),
                        CreationDateTime: now()
                    }
                },
                NormalizedInstanceHours: 0,
                ReleaseLabel: "",
                VisibleToAllUsers: false,
                RunningAmiVersion: "",
                Ec2InstanceAttributes: {
                    ServiceAccessSecurityGroup: "",
                    Ec2SubnetId: "",
                    Ec2KeyName: "",
                    EmrManagedMasterSecurityGroup: "",
                    IamInstanceProfile: "",
                    EmrManagedSlaveSecurityGroup: "",
                    Ec2AvailabilityZone: "",
                    AdditionalMasterSecurityGroups: /*S16*/[ "" /*, ...*/ ],
                    AdditionalSlaveSecurityGroups: /*S16*/[ "" /*, ...*/ ]
                },
                Id: "",
                LogUri: "",
                AutoTerminate: false,
                Configurations: /*S9*/[ {
                    Classification: "",
                    Configurations: null/* recursive S9*/,
                    Properties: /*Sc*/{} /* map */
                } /*, ...*/ ],
                ServiceRole: "",
                MasterPublicDnsName: "",
                Name: "",
                RequestedAmiVersion: ""
            }
        };
        return [200, ret];
    }
module.exports.AddInstanceGroups = function AddInstanceGroups(aws) {
        var InstanceGroups = aws.params['InstanceGroups'];
        var JobFlowId = aws.params['JobFlowId'];
        if (! InstanceGroups) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter InstanceGroups"];
        }
        if (! JobFlowId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobFlowId"];
        }


        // TODO implement code

        var ret = {
            JobFlowId: "",
            InstanceGroupIds: [ "" /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.SetTerminationProtection = function SetTerminationProtection(aws) {
        var TerminationProtected = aws.params['TerminationProtected'] /* boolean */;
        var JobFlowIds = aws.params['JobFlowIds'];
        if (! JobFlowIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobFlowIds"];
        }
        if (! TerminationProtected) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TerminationProtected"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeStep = function DescribeStep(aws) {
        var ClusterId = aws.params['ClusterId'];
        var StepId = aws.params['StepId'];
        if (! ClusterId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClusterId"];
        }
        if (! StepId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter StepId"];
        }


        // TODO implement code

        var ret = {
            Step: {
                Status: /*S20*/{
                    StateChangeReason: {
                        Message: "",
                        Code: ""
                    },
                    State: "",
                    Timeline: {
                        EndDateTime: now(),
                        StartDateTime: now(),
                        CreationDateTime: now()
                    }
                },
                Config: /*S1z*/{
                    Jar: "",
                    MainClass: "",
                    Args: /*S16*/[ "" /*, ...*/ ],
                    Properties: /*Sc*/{} /* map */
                },
                Name: "",
                Id: "",
                ActionOnFailure: ""
            }
        };
        return [200, ret];
    }
module.exports.SetVisibleToAllUsers = function SetVisibleToAllUsers(aws) {
        var VisibleToAllUsers = aws.params['VisibleToAllUsers'] /* boolean */;
        var JobFlowIds = aws.params['JobFlowIds'];
        if (! JobFlowIds) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter JobFlowIds"];
        }
        if (! VisibleToAllUsers) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter VisibleToAllUsers"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.AddTags = function AddTags(aws) {
        var Tags = aws.params['Tags'];
        var ResourceId = aws.params['ResourceId'];
        if (! ResourceId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ResourceId"];
        }
        if (! Tags) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Tags"];
        }


        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.ListClusters = function ListClusters(aws) {
        var CreatedBefore = aws.params['CreatedBefore'] /* timestamp */;
        var Marker = aws.params['Marker'];
        var CreatedAfter = aws.params['CreatedAfter'] /* timestamp */;
        var ClusterStates = aws.params['ClusterStates'] /* list */;


        // TODO implement code

        var ret = {
            Marker: "",
            Clusters: [ {
                Status: /*Sz*/{
                    StateChangeReason: {
                        Message: "",
                        Code: ""
                    },
                    State: "",
                    Timeline: {
                        EndDateTime: now(),
                        ReadyDateTime: now(),
                        CreationDateTime: now()
                    }
                },
                Name: "",
                Id: "",
                NormalizedInstanceHours: 0
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListSteps = function ListSteps(aws) {
        var ClusterId = aws.params['ClusterId'];
        var StepIds = aws.params['StepIds'];
        var StepStates = aws.params['StepStates'] /* list */;
        var Marker = aws.params['Marker'];
        if (! ClusterId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter ClusterId"];
        }


        // TODO implement code

        var ret = {
            Marker: "",
            Steps: [ {
                Status: /*S20*/{
                    StateChangeReason: {
                        Message: "",
                        Code: ""
                    },
                    State: "",
                    Timeline: {
                        EndDateTime: now(),
                        StartDateTime: now(),
                        CreationDateTime: now()
                    }
                },
                Config: /*S1z*/{
                    Jar: "",
                    MainClass: "",
                    Args: /*S16*/[ "" /*, ...*/ ],
                    Properties: /*Sc*/{} /* map */
                },
                Name: "",
                Id: "",
                ActionOnFailure: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }