'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * Amazon CloudWatch Events version 2014-02-03
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.DeleteRule = function DeleteRule(aws) {
        var Name = aws.params['Name'];
        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.ListRuleNamesByTarget = function ListRuleNamesByTarget(aws) {
        var TargetArn = aws.params['TargetArn'];
        var NextToken = aws.params['NextToken'];
        var Limit = aws.params['Limit'] /* integer */;
        if (! TargetArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter TargetArn"];
        }

        // TODO implement code

        var ret = {
            NextToken: "",
            RuleNames: [ "" /*, ...*/ ]
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
                InputPath: "",
                Input: "",
                Arn: "",
                Id: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.RemoveTargets = function RemoveTargets(aws) {
        var Ids = aws.params['Ids'] /* list */;
        var Rule = aws.params['Rule'];
        if (! Rule) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Rule"];
        }        if (! Ids) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Ids"];
        }

        // TODO implement code

        var ret = {
            FailedEntries: [ {
                ErrorMessage: "",
                TargetId: "",
                ErrorCode: ""
            } /*, ...*/ ],
            FailedEntryCount: 0
        };
        return [200, ret];
    }
module.exports.DescribeRule = function DescribeRule(aws) {
        var Name = aws.params['Name'];
        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }

        // TODO implement code

        var ret = {
            Description: "",
            Arn: "",
            State: "",
            ScheduleExpression: "",
            Name: "",
            RoleArn: "",
            EventPattern: ""
        };
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
module.exports.EnableRule = function EnableRule(aws) {
        var Name = aws.params['Name'];
        if (! Name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Name"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.PutRule = function PutRule(aws) {
        var Description = aws.params['Description'];
        var State = aws.params['State'];
        var ScheduleExpression = aws.params['ScheduleExpression'];
        var Name = aws.params['Name'];
        var RoleArn = aws.params['RoleArn'];
        var EventPattern = aws.params['EventPattern'];
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
        var Event = aws.params['Event'];
        var EventPattern = aws.params['EventPattern'];
        if (! EventPattern) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter EventPattern"];
        }        if (! Event) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Event"];
        }

        // TODO implement code

        var ret = {
            Result: false
        };
        return [200, ret];
    }
module.exports.PutEvents = function PutEvents(aws) {
        var Entries = aws.params['Entries'] /* list */;
        if (! Entries) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Entries"];
        }

        // TODO implement code

        var ret = {
            Entries: [ {
                ErrorMessage: "",
                ErrorCode: "",
                EventId: ""
            } /*, ...*/ ],
            FailedEntryCount: 0
        };
        return [200, ret];
    }
module.exports.PutTargets = function PutTargets(aws) {
        var Rule = aws.params['Rule'];
        var Targets = aws.params['Targets'];
        if (! Rule) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Rule"];
        }        if (! Targets) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter Targets"];
        }

        // TODO implement code

        var ret = {
            FailedEntries: [ {
                ErrorMessage: "",
                TargetId: "",
                ErrorCode: ""
            } /*, ...*/ ],
            FailedEntryCount: 0
        };
        return [200, ret];
    }
module.exports.ListRules = function ListRules(aws) {
        var NamePrefix = aws.params['NamePrefix'];
        var NextToken = aws.params['NextToken'];
        var Limit = aws.params['Limit'] /* integer */;


        // TODO implement code

        var ret = {
            Rules: [ {
                Description: "",
                Arn: "",
                State: "",
                ScheduleExpression: "",
                Name: "",
                RoleArn: "",
                EventPattern: ""
            } /*, ...*/ ],
            NextToken: ""
        };
        return [200, ret];
    }
