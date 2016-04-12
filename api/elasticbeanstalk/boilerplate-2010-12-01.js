'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * AWS Elastic Beanstalk version 2010-12-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol query
require('../../lib/aws-common/shape_http')('query', module.exports, 'http://elasticbeanstalk.amazonaws.com/docs/2010-12-01/')
// -----------------------------------
module.exports.AbortEnvironmentUpdate = function AbortEnvironmentUpdate(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var EnvironmentName = aws.params['EnvironmentName'];


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateEnvironment = function UpdateEnvironment(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var OptionsToRemove = aws.params['OptionsToRemove'];
  var Description = aws.params['Description'];
  var SolutionStackName = aws.params['SolutionStackName'];
  var EnvironmentName = aws.params['EnvironmentName'];
  var TemplateName = aws.params['TemplateName'];
  var GroupName = aws.params['GroupName'];
  var VersionLabel = aws.params['VersionLabel'];
  var Tier = aws.params['Tier'];
  var OptionSettings = aws.params['OptionSettings'];
  var ApplicationName = aws.params['ApplicationName'];


  // TODO implement code

  var ret = /*Sg*/{
    DateUpdated: awsCommon.timestamp(),
    Description: '',
    EnvironmentLinks: [ {
      LinkName: '',
      EnvironmentName: '',
    }, /* ...*/ ],
    SolutionStackName: '',
    Tier: /*Sx*/{
      Type: '',
      Version: '',
      Name: '',
    },
    EnvironmentName: '',
    CNAME: '',
    EndpointURL: '',
    ApplicationName: '',
    EnvironmentId: '',
    DateCreated: awsCommon.timestamp(),
    Status: '',
    AbortableOperationInProgress: false,
    TemplateName: '',
    VersionLabel: '',
    Health: '',
    HealthStatus: '',
    Resources: {
      LoadBalancer: {
        Domain: '',
        Listeners: [ {
          Protocol: '',
          Port: 0,
        }, /* ...*/ ],
        LoadBalancerName: '',
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeConfigurationSettings = function DescribeConfigurationSettings(aws) {
  var TemplateName = aws.params['TemplateName'];
  var EnvironmentName = aws.params['EnvironmentName'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }


  // TODO implement code

  var ret = {
    ConfigurationSettings: [ /*S1m*/{
      DeploymentStatus: '',
      DateUpdated: awsCommon.timestamp(),
      Description: '',
      SolutionStackName: '',
      EnvironmentName: '',
      TemplateName: '',
      DateCreated: awsCommon.timestamp(),
      OptionSettings: /*S1g*/[ {
        Namespace: '',
        OptionName: '',
        ResourceName: '',
        Value: '',
      }, /* ...*/ ],
      ApplicationName: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateStorageLocation = function CreateStorageLocation(aws) {


  // TODO implement code

  var ret = {
    S3Bucket: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateApplicationVersion = function UpdateApplicationVersion(aws) {
  var Description = aws.params['Description'];
  var VersionLabel = aws.params['VersionLabel'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }
  if (!VersionLabel) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter VersionLabel'];
  }


  // TODO implement code

  var ret = /*S1b*/{
    ApplicationVersion: /*S1c*/{
      SourceBundle: /*S16*/{
        S3Key: '',
        S3Bucket: '',
      },
      DateUpdated: awsCommon.timestamp(),
      Description: '',
      DateCreated: awsCommon.timestamp(),
      Status: '',
      ApplicationName: '',
      VersionLabel: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateApplication = function CreateApplication(aws) {
  var Description = aws.params['Description'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }


  // TODO implement code

  var ret = /*S11*/{
    Application: /*S12*/{
      DateUpdated: awsCommon.timestamp(),
      Description: '',
      ConfigurationTemplates: [ '', /* ...*/ ],
      DateCreated: awsCommon.timestamp(),
      Versions: /*S13*/[ '', /* ...*/ ],
      ApplicationName: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeApplications = function DescribeApplications(aws) {
  var ApplicationNames = aws.params['ApplicationNames'] /* Type list */;


  // TODO implement code

  var ret = {
    Applications: [ /*S12*/{
      DateUpdated: awsCommon.timestamp(),
      Description: '',
      ConfigurationTemplates: [ '', /* ...*/ ],
      DateCreated: awsCommon.timestamp(),
      Versions: /*S13*/[ '', /* ...*/ ],
      ApplicationName: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteApplicationVersion = function DeleteApplicationVersion(aws) {
  var DeleteSourceBundle = aws.params['DeleteSourceBundle'] /* Type boolean */;
  var VersionLabel = aws.params['VersionLabel'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }
  if (!VersionLabel) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter VersionLabel'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateApplication = function UpdateApplication(aws) {
  var Description = aws.params['Description'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }


  // TODO implement code

  var ret = /*S11*/{
    Application: /*S12*/{
      DateUpdated: awsCommon.timestamp(),
      Description: '',
      ConfigurationTemplates: [ '', /* ...*/ ],
      DateCreated: awsCommon.timestamp(),
      Versions: /*S13*/[ '', /* ...*/ ],
      ApplicationName: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeApplicationVersions = function DescribeApplicationVersions(aws) {
  var VersionLabels = aws.params['VersionLabels'];
  var ApplicationName = aws.params['ApplicationName'];


  // TODO implement code

  var ret = {
    ApplicationVersions: [ /*S1c*/{
      SourceBundle: /*S16*/{
        S3Key: '',
        S3Bucket: '',
      },
      DateUpdated: awsCommon.timestamp(),
      Description: '',
      DateCreated: awsCommon.timestamp(),
      Status: '',
      ApplicationName: '',
      VersionLabel: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RetrieveEnvironmentInfo = function RetrieveEnvironmentInfo(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var InfoType = aws.params['InfoType'];
  var EnvironmentName = aws.params['EnvironmentName'];
  if (!InfoType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InfoType'];
  }


  // TODO implement code

  var ret = {
    EnvironmentInfo: [ {
      SampleTimestamp: awsCommon.timestamp(),
      Ec2InstanceId: '',
      InfoType: '',
      Message: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateConfigurationTemplate = function CreateConfigurationTemplate(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var Description = aws.params['Description'];
  var SourceConfiguration = aws.params['SourceConfiguration'] /* Type structure */;
  var TemplateName = aws.params['TemplateName'];
  var SolutionStackName = aws.params['SolutionStackName'];
  var OptionSettings = aws.params['OptionSettings'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }
  if (!TemplateName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TemplateName'];
  }


  // TODO implement code

  var ret = /*S1m*/{
    DeploymentStatus: '',
    DateUpdated: awsCommon.timestamp(),
    Description: '',
    SolutionStackName: '',
    EnvironmentName: '',
    TemplateName: '',
    DateCreated: awsCommon.timestamp(),
    OptionSettings: /*S1g*/[ {
      Namespace: '',
      OptionName: '',
      ResourceName: '',
      Value: '',
    }, /* ...*/ ],
    ApplicationName: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RestartAppServer = function RestartAppServer(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var EnvironmentName = aws.params['EnvironmentName'];


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteEnvironmentConfiguration = function DeleteEnvironmentConfiguration(aws) {
  var EnvironmentName = aws.params['EnvironmentName'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }
  if (!EnvironmentName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter EnvironmentName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.RebuildEnvironment = function RebuildEnvironment(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var EnvironmentName = aws.params['EnvironmentName'];


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeEnvironments = function DescribeEnvironments(aws) {
  var IncludeDeleted = aws.params['IncludeDeleted'] /* Type boolean */;
  var IncludedDeletedBackTo = aws.params['IncludedDeletedBackTo'] /* Type timestamp */;
  var EnvironmentNames = aws.params['EnvironmentNames'] /* Type list */;
  var ApplicationName = aws.params['ApplicationName'];
  var EnvironmentIds = aws.params['EnvironmentIds'] /* Type list */;
  var VersionLabel = aws.params['VersionLabel'];


  // TODO implement code

  var ret = /*Se*/{
    Environments: [ /*Sg*/{
      DateUpdated: awsCommon.timestamp(),
      Description: '',
      EnvironmentLinks: [ {
        LinkName: '',
        EnvironmentName: '',
      }, /* ...*/ ],
      SolutionStackName: '',
      Tier: /*Sx*/{
        Type: '',
        Version: '',
        Name: '',
      },
      EnvironmentName: '',
      CNAME: '',
      EndpointURL: '',
      ApplicationName: '',
      EnvironmentId: '',
      DateCreated: awsCommon.timestamp(),
      Status: '',
      AbortableOperationInProgress: false,
      TemplateName: '',
      VersionLabel: '',
      Health: '',
      HealthStatus: '',
      Resources: {
        LoadBalancer: {
          Domain: '',
          Listeners: [ {
            Protocol: '',
            Port: 0,
          }, /* ...*/ ],
          LoadBalancerName: '',
        },
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.RequestEnvironmentInfo = function RequestEnvironmentInfo(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var InfoType = aws.params['InfoType'];
  var EnvironmentName = aws.params['EnvironmentName'];
  if (!InfoType) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter InfoType'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.CreateApplicationVersion = function CreateApplicationVersion(aws) {
  var SourceBundle = aws.params['SourceBundle'];
  var Description = aws.params['Description'];
  var Process = aws.params['Process'] /* Type boolean */;
  var AutoCreateApplication = aws.params['AutoCreateApplication'] /* Type boolean */;
  var ApplicationName = aws.params['ApplicationName'];
  var VersionLabel = aws.params['VersionLabel'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }
  if (!VersionLabel) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter VersionLabel'];
  }


  // TODO implement code

  var ret = /*S1b*/{
    ApplicationVersion: /*S1c*/{
      SourceBundle: /*S16*/{
        S3Key: '',
        S3Bucket: '',
      },
      DateUpdated: awsCommon.timestamp(),
      Description: '',
      DateCreated: awsCommon.timestamp(),
      Status: '',
      ApplicationName: '',
      VersionLabel: '',
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ComposeEnvironments = function ComposeEnvironments(aws) {
  var GroupName = aws.params['GroupName'];
  var VersionLabels = aws.params['VersionLabels'] /* Type list */;
  var ApplicationName = aws.params['ApplicationName'];


  // TODO implement code

  var ret = /*Se*/{
    Environments: [ /*Sg*/{
      DateUpdated: awsCommon.timestamp(),
      Description: '',
      EnvironmentLinks: [ {
        LinkName: '',
        EnvironmentName: '',
      }, /* ...*/ ],
      SolutionStackName: '',
      Tier: /*Sx*/{
        Type: '',
        Version: '',
        Name: '',
      },
      EnvironmentName: '',
      CNAME: '',
      EndpointURL: '',
      ApplicationName: '',
      EnvironmentId: '',
      DateCreated: awsCommon.timestamp(),
      Status: '',
      AbortableOperationInProgress: false,
      TemplateName: '',
      VersionLabel: '',
      Health: '',
      HealthStatus: '',
      Resources: {
        LoadBalancer: {
          Domain: '',
          Listeners: [ {
            Protocol: '',
            Port: 0,
          }, /* ...*/ ],
          LoadBalancerName: '',
        },
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListAvailableSolutionStacks = function ListAvailableSolutionStacks(aws) {


  // TODO implement code

  var ret = {
    SolutionStacks: [ '', /* ...*/ ],
    SolutionStackDetails: [ {
      PermittedFileTypes: [ '', /* ...*/ ],
      SolutionStackName: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteConfigurationTemplate = function DeleteConfigurationTemplate(aws) {
  var TemplateName = aws.params['TemplateName'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }
  if (!TemplateName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TemplateName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.TerminateEnvironment = function TerminateEnvironment(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var ForceTerminate = aws.params['ForceTerminate'] /* Type boolean */;
  var TerminateResources = aws.params['TerminateResources'] /* Type boolean */;
  var EnvironmentName = aws.params['EnvironmentName'];


  // TODO implement code

  var ret = /*Sg*/{
    DateUpdated: awsCommon.timestamp(),
    Description: '',
    EnvironmentLinks: [ {
      LinkName: '',
      EnvironmentName: '',
    }, /* ...*/ ],
    SolutionStackName: '',
    Tier: /*Sx*/{
      Type: '',
      Version: '',
      Name: '',
    },
    EnvironmentName: '',
    CNAME: '',
    EndpointURL: '',
    ApplicationName: '',
    EnvironmentId: '',
    DateCreated: awsCommon.timestamp(),
    Status: '',
    AbortableOperationInProgress: false,
    TemplateName: '',
    VersionLabel: '',
    Health: '',
    HealthStatus: '',
    Resources: {
      LoadBalancer: {
        Domain: '',
        Listeners: [ {
          Protocol: '',
          Port: 0,
        }, /* ...*/ ],
        LoadBalancerName: '',
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateEnvironment = function CreateEnvironment(aws) {
  var Description = aws.params['Description'];
  var Tags = aws.params['Tags'] /* Type list */;
  var SolutionStackName = aws.params['SolutionStackName'];
  var EnvironmentName = aws.params['EnvironmentName'];
  var OptionsToRemove = aws.params['OptionsToRemove'];
  var GroupName = aws.params['GroupName'];
  var Tier = aws.params['Tier'];
  var VersionLabel = aws.params['VersionLabel'];
  var TemplateName = aws.params['TemplateName'];
  var ApplicationName = aws.params['ApplicationName'];
  var OptionSettings = aws.params['OptionSettings'];
  var CNAMEPrefix = aws.params['CNAMEPrefix'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }


  // TODO implement code

  var ret = /*Sg*/{
    DateUpdated: awsCommon.timestamp(),
    Description: '',
    EnvironmentLinks: [ {
      LinkName: '',
      EnvironmentName: '',
    }, /* ...*/ ],
    SolutionStackName: '',
    Tier: /*Sx*/{
      Type: '',
      Version: '',
      Name: '',
    },
    EnvironmentName: '',
    CNAME: '',
    EndpointURL: '',
    ApplicationName: '',
    EnvironmentId: '',
    DateCreated: awsCommon.timestamp(),
    Status: '',
    AbortableOperationInProgress: false,
    TemplateName: '',
    VersionLabel: '',
    Health: '',
    HealthStatus: '',
    Resources: {
      LoadBalancer: {
        Domain: '',
        Listeners: [ {
          Protocol: '',
          Port: 0,
        }, /* ...*/ ],
        LoadBalancerName: '',
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeConfigurationOptions = function DescribeConfigurationOptions(aws) {
  var TemplateName = aws.params['TemplateName'];
  var EnvironmentName = aws.params['EnvironmentName'];
  var SolutionStackName = aws.params['SolutionStackName'];
  var Options = aws.params['Options'];
  var ApplicationName = aws.params['ApplicationName'];


  // TODO implement code

  var ret = {
    SolutionStackName: '',
    Options: [ {
      ValueType: '',
      UserDefined: false,
      MinValue: 0,
      Regex: {
        Label: '',
        Pattern: '',
      },
      Name: '',
      Namespace: '',
      ValueOptions: [ '', /* ...*/ ],
      MaxLength: 0,
      DefaultValue: '',
      ChangeSeverity: '',
      MaxValue: 0,
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeEvents = function DescribeEvents(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var Severity = aws.params['Severity'];
  var MaxRecords = aws.params['MaxRecords'] /* Type integer */;
  var EnvironmentName = aws.params['EnvironmentName'];
  var TemplateName = aws.params['TemplateName'];
  var EndTime = aws.params['EndTime'] /* Type timestamp */;
  var ApplicationName = aws.params['ApplicationName'];
  var RequestId = aws.params['RequestId'];
  var NextToken = aws.params['NextToken'];
  var StartTime = aws.params['StartTime'] /* Type timestamp */;
  var VersionLabel = aws.params['VersionLabel'];


  // TODO implement code

  var ret = {
    Events: [ {
      EventDate: awsCommon.timestamp(),
      Severity: '',
      EnvironmentName: '',
      TemplateName: '',
      ApplicationName: '',
      RequestId: '',
      Message: '',
      VersionLabel: '',
    }, /* ...*/ ],
    NextToken: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ValidateConfigurationSettings = function ValidateConfigurationSettings(aws) {
  var TemplateName = aws.params['TemplateName'];
  var EnvironmentName = aws.params['EnvironmentName'];
  var OptionSettings = aws.params['OptionSettings'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }
  if (!OptionSettings) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter OptionSettings'];
  }


  // TODO implement code

  var ret = {
    Messages: [ {
      Namespace: '',
      OptionName: '',
      Severity: '',
      Message: '',
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CheckDNSAvailability = function CheckDNSAvailability(aws) {
  var CNAMEPrefix = aws.params['CNAMEPrefix'];
  if (!CNAMEPrefix) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter CNAMEPrefix'];
  }


  // TODO implement code

  var ret = {
    Available: false,
    FullyQualifiedCNAME: '',
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeEnvironmentHealth = function DescribeEnvironmentHealth(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var AttributeNames = aws.params['AttributeNames'] /* Type list */;
  var EnvironmentName = aws.params['EnvironmentName'];


  // TODO implement code

  var ret = {
    InstancesHealth: {
      Info: 0,
      Pending: 0,
      Severe: 0,
      Degraded: 0,
      Warning: 0,
      NoData: 0,
      Ok: 0,
      Unknown: 0,
    },
    Status: '',
    EnvironmentName: '',
    Causes: /*S2w*/[ '', /* ...*/ ],
    ApplicationMetrics: /*S2y*/{
      RequestCount: 0,
      Duration: 0,
      StatusCodes: {
        Status2xx: 0,
        Status4xx: 0,
        Status5xx: 0,
        Status3xx: 0,
      },
      Latency: {
        P50: 0.0 /*Double*/,
        P95: 0.0 /*Double*/,
        P99: 0.0 /*Double*/,
        P75: 0.0 /*Double*/,
        P999: 0.0 /*Double*/,
        P90: 0.0 /*Double*/,
        P85: 0.0 /*Double*/,
        P10: 0.0 /*Double*/,
      },
    },
    Color: '',
    HealthStatus: '',
    RefreshedAt: awsCommon.timestamp(),
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteApplication = function DeleteApplication(aws) {
  var TerminateEnvByForce = aws.params['TerminateEnvByForce'] /* Type boolean */;
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.SwapEnvironmentCNAMEs = function SwapEnvironmentCNAMEs(aws) {
  var SourceEnvironmentId = aws.params['SourceEnvironmentId'];
  var SourceEnvironmentName = aws.params['SourceEnvironmentName'];
  var DestinationEnvironmentName = aws.params['DestinationEnvironmentName'];
  var DestinationEnvironmentId = aws.params['DestinationEnvironmentId'];


  // TODO implement code

  var ret = {};
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeEnvironmentResources = function DescribeEnvironmentResources(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var EnvironmentName = aws.params['EnvironmentName'];


  // TODO implement code

  var ret = {
    EnvironmentResources: {
      Triggers: [ {
        Name: '',
      }, /* ...*/ ],
      Instances: [ {
        Id: '',
      }, /* ...*/ ],
      LaunchConfigurations: [ {
        Name: '',
      }, /* ...*/ ],
      LoadBalancers: [ {
        Name: '',
      }, /* ...*/ ],
      EnvironmentName: '',
      Queues: [ {
        URL: '',
        Name: '',
      }, /* ...*/ ],
      AutoScalingGroups: [ {
        Name: '',
      }, /* ...*/ ],
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeInstancesHealth = function DescribeInstancesHealth(aws) {
  var EnvironmentId = aws.params['EnvironmentId'];
  var AttributeNames = aws.params['AttributeNames'] /* Type list */;
  var NextToken = aws.params['NextToken'];
  var EnvironmentName = aws.params['EnvironmentName'];


  // TODO implement code

  var ret = {
    RefreshedAt: awsCommon.timestamp(),
    NextToken: '',
    InstanceHealthList: [ {
      System: {
        CPUUtilization: {
          IRQ: 0.0 /*Double*/,
          System: 0.0 /*Double*/,
          Nice: 0.0 /*Double*/,
          Idle: 0.0 /*Double*/,
          SoftIRQ: 0.0 /*Double*/,
          IOWait: 0.0 /*Double*/,
          User: 0.0 /*Double*/,
        },
        LoadAverage: [ 0.0 /*Double*/, /* ...*/ ],
      },
      InstanceId: '',
      Causes: /*S2w*/[ '', /* ...*/ ],
      ApplicationMetrics: /*S2y*/{
        RequestCount: 0,
        Duration: 0,
        StatusCodes: {
          Status2xx: 0,
          Status4xx: 0,
          Status5xx: 0,
          Status3xx: 0,
        },
        Latency: {
          P50: 0.0 /*Double*/,
          P95: 0.0 /*Double*/,
          P99: 0.0 /*Double*/,
          P75: 0.0 /*Double*/,
          P999: 0.0 /*Double*/,
          P90: 0.0 /*Double*/,
          P85: 0.0 /*Double*/,
          P10: 0.0 /*Double*/,
        },
      },
      Color: '',
      HealthStatus: '',
      LaunchedAt: awsCommon.timestamp(),
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateConfigurationTemplate = function UpdateConfigurationTemplate(aws) {
  var TemplateName = aws.params['TemplateName'];
  var OptionsToRemove = aws.params['OptionsToRemove'];
  var Description = aws.params['Description'];
  var OptionSettings = aws.params['OptionSettings'];
  var ApplicationName = aws.params['ApplicationName'];
  if (!ApplicationName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ApplicationName'];
  }
  if (!TemplateName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter TemplateName'];
  }


  // TODO implement code

  var ret = /*S1m*/{
    DeploymentStatus: '',
    DateUpdated: awsCommon.timestamp(),
    Description: '',
    SolutionStackName: '',
    EnvironmentName: '',
    TemplateName: '',
    DateCreated: awsCommon.timestamp(),
    OptionSettings: /*S1g*/[ {
      Namespace: '',
      OptionName: '',
      ResourceName: '',
      Value: '',
    }, /* ...*/ ],
    ApplicationName: '',
  };
  return [200, ret];
};
