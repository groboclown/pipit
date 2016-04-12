'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Auto Scaling version 2011-01-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol query
require('../../lib/aws-common/shape_http')('query', module.exports, 'http://autoscaling.amazonaws.com/doc/2011-01-01/')
// -----------------------------------
module.exports.DetachLoadBalancers = function DetachLoadBalancers(aws) {
  var LoadBalancerNames = aws.params['LoadBalancerNames'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeletePolicy = function DeletePolicy(aws) {
  var PolicyName = aws.params['PolicyName'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!PolicyName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter PolicyName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeScalingProcessTypes = function DescribeScalingProcessTypes(aws) {


  // TODO implement code

  var ret = {
    Processes: [ {
      ProcessName: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteLifecycleHook = function DeleteLifecycleHook(aws) {
  var LifecycleHookName = aws.params['LifecycleHookName'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!LifecycleHookName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LifecycleHookName'];
  }
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeLaunchConfigurations = function DescribeLaunchConfigurations(aws) {
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var NextToken = aws.params['NextToken'];
  var LaunchConfigurationNames = aws.params['LaunchConfigurationNames'] /* Type list */;


  // TODO implement code

  var ret = {
    LaunchConfigurations: [ {
      RamdiskId: '',
      ImageId: '',
      CreatedTime: awsCommon.timestamp(),
      InstanceType: '',
      KeyName: '',
      SpotPrice: '',
      KernelId: '',
      SecurityGroups: /*Sw*/[ '', /* ...*/ ],
      IamInstanceProfile: '',
      UserData: '',
      ClassicLinkVPCId: '',
      AssociatePublicIpAddress: false,
      InstanceMonitoring: /*S18*/{
        Enabled: false,
      },
      BlockDeviceMappings: /*Sz*/[ {
        DeviceName: '',
        Ebs: {
          Encrypted: false,
          Iops: 0,
          SnapshotId: '',
          DeleteOnTermination: false,
          VolumeType: '',
          VolumeSize: 0,
        },
        NoDevice: false,
        VirtualName: '',
      }, /* ...*/ ],
      EbsOptimized: false,
      PlacementTenancy: '',
      LaunchConfigurationARN: '',
      ClassicLinkVPCSecurityGroups: /*Sx*/[ '', /* ...*/ ],
      LaunchConfigurationName: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAutoScalingInstances = function DescribeAutoScalingInstances(aws) {
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var InstanceIds = aws.params['InstanceIds'];
  var NextToken = aws.params['NextToken'];


  // TODO implement code

  var ret = {
    AutoScalingInstances: [ {
      ProtectedFromScaleIn: false,
      InstanceId: '',
      AutoScalingGroupName: '',
      LifecycleState: '',
      AvailabilityZone: '',
      HealthStatus: '',
      LaunchConfigurationName: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutNotificationConfiguration = function PutNotificationConfiguration(aws) {
  var TopicARN = aws.params['TopicARN'];
  var NotificationTypes = aws.params['NotificationTypes'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!TopicARN) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TopicARN'];
  }
  if (!NotificationTypes) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter NotificationTypes'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteLaunchConfiguration = function DeleteLaunchConfiguration(aws) {
  var LaunchConfigurationName = aws.params['LaunchConfigurationName'];
  if (!LaunchConfigurationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LaunchConfigurationName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.SetInstanceHealth = function SetInstanceHealth(aws) {
  var HealthStatus = aws.params['HealthStatus'];
  var InstanceId = aws.params['InstanceId'];
  var ShouldRespectGracePeriod = aws.params['ShouldRespectGracePeriod'] /* Type boolean */;
  if (!InstanceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InstanceId'];
  }
  if (!HealthStatus) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter HealthStatus'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeScalingActivities = function DescribeScalingActivities(aws) {
  var ActivityIds = aws.params['ActivityIds'] /* Type list */;
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var NextToken = aws.params['NextToken'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];


  // TODO implement code

  var ret = {
    Activities: /*S3s*/[ /*S3t*/{
      StatusCode: '',
      Details: '',
      Description: '',
      StatusMessage: '',
      Progress: 0,
      AutoScalingGroupName: '',
      EndTime: awsCommon.timestamp(),
      ActivityId: '',
      Cause: '',
      StartTime: awsCommon.timestamp(),
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAdjustmentTypes = function DescribeAdjustmentTypes(aws) {


  // TODO implement code

  var ret = {
    AdjustmentTypes: [ {
      AdjustmentType: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribePolicies = function DescribePolicies(aws) {
  var PolicyNames = aws.params['PolicyNames'] /* Type list */;
  var PolicyTypes = aws.params['PolicyTypes'] /* Type list */;
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var NextToken = aws.params['NextToken'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];


  // TODO implement code

  var ret = {
    ScalingPolicies: [ {
      PolicyARN: '',
      PolicyName: '',
      AutoScalingGroupName: '',
      MetricAggregationType: '',
      Alarms: [ {
        AlarmARN: '',
        AlarmName: '',
      }, /* ...*/ ],
      MinAdjustmentStep: /*S3g*/0,
      StepAdjustments: /*S3j*/[ {
        MetricIntervalUpperBound: 0.0 /*Double*/,
        ScalingAdjustment: 0,
        MetricIntervalLowerBound: 0.0 /*Double*/,
      }, /* ...*/ ],
      AdjustmentType: '',
      MinAdjustmentMagnitude: 0,
      Cooldown: 0,
      ScalingAdjustment: 0,
      EstimatedInstanceWarmup: 0,
      PolicyType: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeLoadBalancers = function DescribeLoadBalancers(aws) {
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var NextToken = aws.params['NextToken'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }


  // TODO implement code

  var ret = {
    NextToken: '',
    LoadBalancers: [ {
      LoadBalancerName: '',
      State: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeTags = function DescribeTags(aws) {
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var NextToken = aws.params['NextToken'];
  var Filters = aws.params['Filters'] /* Type list */;


  // TODO implement code

  var ret = {
    Tags: /*S2a*/[ {
      ResourceType: '',
      Key: '',
      ResourceId: '',
      Value: '',
      PropagateAtLaunch: false,
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAutoScalingGroups = function DescribeAutoScalingGroups(aws) {
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var AutoScalingGroupNames = aws.params['AutoScalingGroupNames'];
  var NextToken = aws.params['NextToken'];


  // TODO implement code

  var ret = {
    AutoScalingGroups: [ {
      Status: '',
      HealthCheckType: '',
      LaunchConfigurationName: '',
      AutoScalingGroupName: '',
      AutoScalingGroupARN: '',
      HealthCheckGracePeriod: 0,
      AvailabilityZones: /*Sj*/[ '', /* ...*/ ],
      PlacementGroup: '',
      SuspendedProcesses: [ {
        ProcessName: '',
        SuspensionReason: '',
      }, /* ...*/ ],
      DefaultCooldown: 0,
      EnabledMetrics: [ {
        Granularity: '',
        Metric: '',
      }, /* ...*/ ],
      NewInstancesProtectedFromScaleIn: false,
      TerminationPolicies: /*Sm*/[ '', /* ...*/ ],
      Instances: [ {
        ProtectedFromScaleIn: false,
        InstanceId: '',
        LifecycleState: '',
        AvailabilityZone: '',
        HealthStatus: '',
        LaunchConfigurationName: '',
      }, /* ...*/ ],
      DesiredCapacity: 0,
      LoadBalancerNames: /*S6*/[ '', /* ...*/ ],
      Tags: /*S2a*/[ {
        ResourceType: '',
        Key: '',
        ResourceId: '',
        Value: '',
        PropagateAtLaunch: false,
      }, /* ...*/ ],
      VPCZoneIdentifier: '',
      MaxSize: 0,
      CreatedTime: awsCommon.timestamp(),
      MinSize: 0,
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeLifecycleHookTypes = function DescribeLifecycleHookTypes(aws) {


  // TODO implement code

  var ret = {
    LifecycleHookTypes: /*S2h*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DetachInstances = function DetachInstances(aws) {
  var InstanceIds = aws.params['InstanceIds'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var ShouldDecrementDesiredCapacity = aws.params['ShouldDecrementDesiredCapacity'] /* Type boolean */;
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!ShouldDecrementDesiredCapacity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ShouldDecrementDesiredCapacity'];
  }


  // TODO implement code

  var ret = {
    Activities: /*S3s*/[ /*S3t*/{
      StatusCode: '',
      Details: '',
      Description: '',
      StatusMessage: '',
      Progress: 0,
      AutoScalingGroupName: '',
      EndTime: awsCommon.timestamp(),
      ActivityId: '',
      Cause: '',
      StartTime: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeNotificationConfigurations = function DescribeNotificationConfigurations(aws) {
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var AutoScalingGroupNames = aws.params['AutoScalingGroupNames'];
  var NextToken = aws.params['NextToken'];


  // TODO implement code

  var ret = {
    NotificationConfigurations: [ {
      TopicARN: '',
      NotificationType: '',
      AutoScalingGroupName: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeTerminationPolicyTypes = function DescribeTerminationPolicyTypes(aws) {


  // TODO implement code

  var ret = {
    TerminationPolicyTypes: /*Sm*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateAutoScalingGroup = function UpdateAutoScalingGroup(aws) {
  var HealthCheckType = aws.params['HealthCheckType'];
  var LaunchConfigurationName = aws.params['LaunchConfigurationName'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var HealthCheckGracePeriod = aws.params['HealthCheckGracePeriod'] /* Type integer */;
  var AvailabilityZones = aws.params['AvailabilityZones'];
  var PlacementGroup = aws.params['PlacementGroup'];
  var DefaultCooldown = aws.params['DefaultCooldown'] /* Type integer */;
  var NewInstancesProtectedFromScaleIn = aws.params['NewInstancesProtectedFromScaleIn'] /* Type boolean */;
  var TerminationPolicies = aws.params['TerminationPolicies'];
  var DesiredCapacity = aws.params['DesiredCapacity'] /* Type integer */;
  var MaxSize = aws.params['MaxSize'] /* Type integer */;
  var VPCZoneIdentifier = aws.params['VPCZoneIdentifier'];
  var MinSize = aws.params['MinSize'] /* Type integer */;
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAccountLimits = function DescribeAccountLimits(aws) {


  // TODO implement code

  var ret = {
    NumberOfAutoScalingGroups: 0,
    MaxNumberOfLaunchConfigurations: 0,
    MaxNumberOfAutoScalingGroups: 0,
    NumberOfLaunchConfigurations: 0,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteAutoScalingGroup = function DeleteAutoScalingGroup(aws) {
  var ForceDelete = aws.params['ForceDelete'] /* Type boolean */;
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeScheduledActions = function DescribeScheduledActions(aws) {
  var ScheduledActionNames = aws.params['ScheduledActionNames'] /* Type list */;
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var EndTime = aws.params['EndTime'] /* Type timestamp */;
  var NextToken = aws.params['NextToken'];
  var StartTime = aws.params['StartTime'] /* Type timestamp */;


  // TODO implement code

  var ret = {
    ScheduledUpdateGroupActions: [ {
      Time: awsCommon.timestamp(),
      Recurrence: '',
      DesiredCapacity: 0,
      AutoScalingGroupName: '',
      ScheduledActionName: '',
      EndTime: awsCommon.timestamp(),
      MaxSize: 0,
      ScheduledActionARN: '',
      StartTime: awsCommon.timestamp(),
      MinSize: 0,
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.EnterStandby = function EnterStandby(aws) {
  var InstanceIds = aws.params['InstanceIds'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var ShouldDecrementDesiredCapacity = aws.params['ShouldDecrementDesiredCapacity'] /* Type boolean */;
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!ShouldDecrementDesiredCapacity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ShouldDecrementDesiredCapacity'];
  }


  // TODO implement code

  var ret = {
    Activities: /*S3s*/[ /*S3t*/{
      StatusCode: '',
      Details: '',
      Description: '',
      StatusMessage: '',
      Progress: 0,
      AutoScalingGroupName: '',
      EndTime: awsCommon.timestamp(),
      ActivityId: '',
      Cause: '',
      StartTime: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SuspendProcesses = function SuspendProcesses(aws) {


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.PutScheduledUpdateGroupAction = function PutScheduledUpdateGroupAction(aws) {
  var Time = aws.params['Time'] /* Type timestamp */;
  var DesiredCapacity = aws.params['DesiredCapacity'] /* Type integer */;
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var ScheduledActionName = aws.params['ScheduledActionName'];
  var Recurrence = aws.params['Recurrence'];
  var MaxSize = aws.params['MaxSize'] /* Type integer */;
  var EndTime = aws.params['EndTime'] /* Type timestamp */;
  var StartTime = aws.params['StartTime'] /* Type timestamp */;
  var MinSize = aws.params['MinSize'] /* Type integer */;
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!ScheduledActionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ScheduledActionName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.CompleteLifecycleAction = function CompleteLifecycleAction(aws) {
  var LifecycleActionToken = aws.params['LifecycleActionToken'];
  var LifecycleActionResult = aws.params['LifecycleActionResult'];
  var LifecycleHookName = aws.params['LifecycleHookName'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!LifecycleHookName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LifecycleHookName'];
  }
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!LifecycleActionToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LifecycleActionToken'];
  }
  if (!LifecycleActionResult) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LifecycleActionResult'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.AttachInstances = function AttachInstances(aws) {
  var InstanceIds = aws.params['InstanceIds'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.PutLifecycleHook = function PutLifecycleHook(aws) {
  var NotificationTargetARN = aws.params['NotificationTargetARN'];
  var LifecycleTransition = aws.params['LifecycleTransition'];
  var HeartbeatTimeout = aws.params['HeartbeatTimeout'] /* Type integer */;
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var NotificationMetadata = aws.params['NotificationMetadata'];
  var RoleARN = aws.params['RoleARN'];
  var LifecycleHookName = aws.params['LifecycleHookName'];
  var DefaultResult = aws.params['DefaultResult'];
  if (!LifecycleHookName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LifecycleHookName'];
  }
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.AttachLoadBalancers = function AttachLoadBalancers(aws) {
  var LoadBalancerNames = aws.params['LoadBalancerNames'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.ExitStandby = function ExitStandby(aws) {
  var InstanceIds = aws.params['InstanceIds'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }


  // TODO implement code

  var ret = {
    Activities: /*S3s*/[ /*S3t*/{
      StatusCode: '',
      Details: '',
      Description: '',
      StatusMessage: '',
      Progress: 0,
      AutoScalingGroupName: '',
      EndTime: awsCommon.timestamp(),
      ActivityId: '',
      Cause: '',
      StartTime: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.SetDesiredCapacity = function SetDesiredCapacity(aws) {
  var HonorCooldown = aws.params['HonorCooldown'] /* Type boolean */;
  var DesiredCapacity = aws.params['DesiredCapacity'] /* Type integer */;
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!DesiredCapacity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DesiredCapacity'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteNotificationConfiguration = function DeleteNotificationConfiguration(aws) {
  var TopicARN = aws.params['TopicARN'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!TopicARN) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TopicARN'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.CreateLaunchConfiguration = function CreateLaunchConfiguration(aws) {
  var RamdiskId = aws.params['RamdiskId'];
  var ImageId = aws.params['ImageId'];
  var AssociatePublicIpAddress = aws.params['AssociatePublicIpAddress'] /* Type boolean */;
  var InstanceType = aws.params['InstanceType'];
  var KeyName = aws.params['KeyName'];
  var SpotPrice = aws.params['SpotPrice'];
  var KernelId = aws.params['KernelId'];
  var SecurityGroups = aws.params['SecurityGroups'];
  var IamInstanceProfile = aws.params['IamInstanceProfile'];
  var InstanceId = aws.params['InstanceId'];
  var ClassicLinkVPCId = aws.params['ClassicLinkVPCId'];
  var EbsOptimized = aws.params['EbsOptimized'] /* Type boolean */;
  var UserData = aws.params['UserData'];
  var BlockDeviceMappings = aws.params['BlockDeviceMappings'];
  var InstanceMonitoring = aws.params['InstanceMonitoring'];
  var PlacementTenancy = aws.params['PlacementTenancy'];
  var ClassicLinkVPCSecurityGroups = aws.params['ClassicLinkVPCSecurityGroups'];
  var LaunchConfigurationName = aws.params['LaunchConfigurationName'];
  if (!LaunchConfigurationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LaunchConfigurationName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.TerminateInstanceInAutoScalingGroup = function TerminateInstanceInAutoScalingGroup(aws) {
  var ShouldDecrementDesiredCapacity = aws.params['ShouldDecrementDesiredCapacity'] /* Type boolean */;
  var InstanceId = aws.params['InstanceId'];
  if (!InstanceId) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InstanceId'];
  }
  if (!ShouldDecrementDesiredCapacity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ShouldDecrementDesiredCapacity'];
  }


  // TODO implement code

  var ret = {
    Activity: /*S3t*/{
      StatusCode: '',
      Details: '',
      Description: '',
      StatusMessage: '',
      Progress: 0,
      AutoScalingGroupName: '',
      EndTime: awsCommon.timestamp(),
      ActivityId: '',
      Cause: '',
      StartTime: awsCommon.timestamp(),
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ExecutePolicy = function ExecutePolicy(aws) {
  var HonorCooldown = aws.params['HonorCooldown'] /* Type boolean */;
  var PolicyName = aws.params['PolicyName'];
  var BreachThreshold = aws.params['BreachThreshold'] /* Type double */;
  var MetricValue = aws.params['MetricValue'] /* Type double */;
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!PolicyName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter PolicyName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.CreateOrUpdateTags = function CreateOrUpdateTags(aws) {
  var Tags = aws.params['Tags'];
  if (!Tags) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Tags'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.SetInstanceProtection = function SetInstanceProtection(aws) {
  var InstanceIds = aws.params['InstanceIds'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var ProtectedFromScaleIn = aws.params['ProtectedFromScaleIn'] /* Type boolean */;
  if (!InstanceIds) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InstanceIds'];
  }
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!ProtectedFromScaleIn) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ProtectedFromScaleIn'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.ResumeProcesses = function ResumeProcesses(aws) {


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeMetricCollectionTypes = function DescribeMetricCollectionTypes(aws) {


  // TODO implement code

  var ret = {
    Granularities: [ {
      Granularity: '',
    }, /* ...*/ ],
    Metrics: [ {
      Metric: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeLifecycleHooks = function DescribeLifecycleHooks(aws) {
  var LifecycleHookNames = aws.params['LifecycleHookNames'] /* Type list */;
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }


  // TODO implement code

  var ret = {
    LifecycleHooks: [ {
      NotificationTargetARN: '',
      LifecycleTransition: '',
      GlobalTimeout: 0,
      HeartbeatTimeout: 0,
      AutoScalingGroupName: '',
      NotificationMetadata: '',
      RoleARN: '',
      LifecycleHookName: '',
      DefaultResult: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateAutoScalingGroup = function CreateAutoScalingGroup(aws) {
  var HealthCheckType = aws.params['HealthCheckType'];
  var LaunchConfigurationName = aws.params['LaunchConfigurationName'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var HealthCheckGracePeriod = aws.params['HealthCheckGracePeriod'] /* Type integer */;
  var AvailabilityZones = aws.params['AvailabilityZones'];
  var PlacementGroup = aws.params['PlacementGroup'];
  var DefaultCooldown = aws.params['DefaultCooldown'] /* Type integer */;
  var NewInstancesProtectedFromScaleIn = aws.params['NewInstancesProtectedFromScaleIn'] /* Type boolean */;
  var TerminationPolicies = aws.params['TerminationPolicies'];
  var Tags = aws.params['Tags'];
  var DesiredCapacity = aws.params['DesiredCapacity'] /* Type integer */;
  var InstanceId = aws.params['InstanceId'];
  var LoadBalancerNames = aws.params['LoadBalancerNames'];
  var VPCZoneIdentifier = aws.params['VPCZoneIdentifier'];
  var MaxSize = aws.params['MaxSize'] /* Type integer */;
  var MinSize = aws.params['MinSize'] /* Type integer */;
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!MinSize) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter MinSize'];
  }
  if (!MaxSize) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter MaxSize'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteTags = function DeleteTags(aws) {
  var Tags = aws.params['Tags'];
  if (!Tags) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Tags'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DisableMetricsCollection = function DisableMetricsCollection(aws) {
  var Metrics = aws.params['Metrics'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.EnableMetricsCollection = function EnableMetricsCollection(aws) {
  var Granularity = aws.params['Granularity'];
  var Metrics = aws.params['Metrics'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!Granularity) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Granularity'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAutoScalingNotificationTypes = function DescribeAutoScalingNotificationTypes(aws) {


  // TODO implement code

  var ret = {
    AutoScalingNotificationTypes: /*S2h*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.PutScalingPolicy = function PutScalingPolicy(aws) {
  var MetricAggregationType = aws.params['MetricAggregationType'];
  var PolicyName = aws.params['PolicyName'];
  var AdjustmentType = aws.params['AdjustmentType'];
  var MinAdjustmentMagnitude = aws.params['MinAdjustmentMagnitude'] /* Type integer */;
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var Cooldown = aws.params['Cooldown'] /* Type integer */;
  var ScalingAdjustment = aws.params['ScalingAdjustment'] /* Type integer */;
  var StepAdjustments = aws.params['StepAdjustments'];
  var MinAdjustmentStep = aws.params['MinAdjustmentStep'];
  var EstimatedInstanceWarmup = aws.params['EstimatedInstanceWarmup'] /* Type integer */;
  var PolicyType = aws.params['PolicyType'];
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!PolicyName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter PolicyName'];
  }
  if (!AdjustmentType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AdjustmentType'];
  }


  // TODO implement code

  var ret = {
    PolicyARN: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RecordLifecycleActionHeartbeat = function RecordLifecycleActionHeartbeat(aws) {
  var LifecycleActionToken = aws.params['LifecycleActionToken'];
  var LifecycleHookName = aws.params['LifecycleHookName'];
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  if (!LifecycleHookName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LifecycleHookName'];
  }
  if (!AutoScalingGroupName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AutoScalingGroupName'];
  }
  if (!LifecycleActionToken) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter LifecycleActionToken'];
  }


  // TODO implement code

  var ret = {

  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteScheduledAction = function DeleteScheduledAction(aws) {
  var AutoScalingGroupName = aws.params['AutoScalingGroupName'];
  var ScheduledActionName = aws.params['ScheduledActionName'];
  if (!ScheduledActionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ScheduledActionName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
