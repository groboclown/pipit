'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon CloudWatch Events version 2014-02-03
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null)
module.exports.PutEvents = function PutEvents(aws) {
        var Entries = aws.params['Entries'] /* list */;
        if (! Entries) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Entries"];
        }


        // TODO implement code

        var ret = {
            FailedEntryCount: 0,
            Entries: [ {
                ErrorMessage: "",
                EventId: "",
                ErrorCode: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListRules = function ListRules(aws) {
        var NextToken = aws.params['NextToken'];
        var NamePrefix = aws.params['NamePrefix'];
        var Limit = aws.params['Limit'] /* integer */;


        // TODO implement code

        var ret = {
            NextToken: "",
            Rules: [ {
                ScheduleExpression: "",
                Description: "",
                State: "",
                RoleArn: "",
                Arn: "",
                EventPattern: "",
                Name: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListRuleNamesByTarget = function ListRuleNamesByTarget(aws) {
        var NextToken = aws.params['NextToken'];
        var Limit = aws.params['Limit'] /* integer */;
        var TargetArn = aws.params['TargetArn'];
        if (! TargetArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TargetArn"];
        }


        // TODO implement code

        var ret = {
            RuleNames: [ "" /*, ...*/ ],
            NextToken: ""
        };
        return [200, ret];
    }
module.exports.ListTargetsByRule = function ListTargetsByRule(aws) {
        var NextToken = aws.params['NextToken'];
        var Rule = aws.params['Rule'];
        var Limit = aws.params['Limit'] /* integer */;
        if (! Rule) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Rule"];
        }


        // TODO implement code

        var ret = {
            NextToken: "",
            Targets: /*Sp*/[ {
                Input: "",
                InputPath: "",
                Id: "",
                Arn: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteRule = function DeleteRule(aws) {
        var Name = aws.params['Name'];
        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutRule = function PutRule(aws) {
        var ScheduleExpression = aws.params['ScheduleExpression'];
        var Description = aws.params['Description'];
        var State = aws.params['State'];
        var RoleArn = aws.params['RoleArn'];
        var EventPattern = aws.params['EventPattern'];
        var Name = aws.params['Name'];
        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }


        // TODO implement code

        var ret = {
            RuleArn: ""
        };
        return [200, ret];
    }
module.exports.TestEventPattern = function TestEventPattern(aws) {
        var EventPattern = aws.params['EventPattern'];
        var Event = aws.params['Event'];
        if (! EventPattern) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter EventPattern"];
        }
        if (! Event) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Event"];
        }


        // TODO implement code

        var ret = {
            Result: false
        };
        return [200, ret];
    }
module.exports.PutTargets = function PutTargets(aws) {
        var Rule = aws.params['Rule'];
        var Targets = aws.params['Targets'];
        if (! Rule) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Rule"];
        }
        if (! Targets) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Targets"];
        }


        // TODO implement code

        var ret = {
            FailedEntryCount: 0,
            FailedEntries: [ {
                ErrorMessage: "",
                ErrorCode: "",
                TargetId: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.EnableRule = function EnableRule(aws) {
        var Name = aws.params['Name'];
        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DisableRule = function DisableRule(aws) {
        var Name = aws.params['Name'];
        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }


        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.DescribeRule = function DescribeRule(aws) {
        var Name = aws.params['Name'];
        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }


        // TODO implement code

        var ret = {
            ScheduleExpression: "",
            Description: "",
            State: "",
            RoleArn: "",
            Arn: "",
            EventPattern: "",
            Name: ""
        };
        return [200, ret];
    }
module.exports.RemoveTargets = function RemoveTargets(aws) {
        var Rule = aws.params['Rule'];
        var Ids = aws.params['Ids'] /* list */;
        if (! Rule) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Rule"];
        }
        if (! Ids) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Ids"];
        }


        // TODO implement code

        var ret = {
            FailedEntryCount: 0,
            FailedEntries: [ {
                ErrorMessage: "",
                ErrorCode: "",
                TargetId: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }