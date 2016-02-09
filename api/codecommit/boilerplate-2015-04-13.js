'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS CodeCommit version 2015-04-13
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */
module.exports.GetRepository = function GetRepository(aws) {
        var repositoryName = aws.params.repositoryName;
        if (! repositoryName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter repositoryName"];
        }

        // TODO implement code

        var ret = {
            repositoryMetadata: /*S6*/{
                creationDate: now(),
                cloneUrlHttp: "",
                cloneUrlSsh: "",
                accountId: "",
                Arn: "",
                repositoryDescription: "",
                repositoryId: "",
                repositoryName: "",
                defaultBranch: "",
                lastModifiedDate: now()
            }
        };
        return [200, ret];
    }
module.exports.DeleteRepository = function DeleteRepository(aws) {
        var repositoryName = aws.params.repositoryName;
        if (! repositoryName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter repositoryName"];
        }

        // TODO implement code

        var ret = {
            repositoryId: ""
        };
        return [200, ret];
    }
module.exports.UpdateRepositoryName = function UpdateRepositoryName(aws) {
        var newName = aws.params.newName;
        var oldName = aws.params.oldName;
        if (! oldName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter oldName"];
        }        if (! newName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter newName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.GetBranch = function GetBranch(aws) {
        var repositoryName = aws.params.repositoryName;
        var branchName = aws.params.branchName;


        // TODO implement code

        var ret = {
            branch: {
                commitId: "",
                branchName: ""
            }
        };
        return [200, ret];
    }
module.exports.UpdateRepositoryDescription = function UpdateRepositoryDescription(aws) {
        var repositoryDescription = aws.params.repositoryDescription;
        var repositoryName = aws.params.repositoryName;
        if (! repositoryName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter repositoryName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.BatchGetRepositories = function BatchGetRepositories(aws) {
        var repositoryNames = aws.params.repositoryNames /* list */;
        if (! repositoryNames) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter repositoryNames"];
        }

        // TODO implement code

        var ret = {
            repositoriesNotFound: [ "" /*, ...*/ ],
            repositories: [ /*S6*/{
                creationDate: now(),
                cloneUrlHttp: "",
                cloneUrlSsh: "",
                accountId: "",
                Arn: "",
                repositoryDescription: "",
                repositoryId: "",
                repositoryName: "",
                defaultBranch: "",
                lastModifiedDate: now()
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.CreateBranch = function CreateBranch(aws) {
        var commitId = aws.params.commitId;
        var repositoryName = aws.params.repositoryName;
        var branchName = aws.params.branchName;
        if (! repositoryName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter repositoryName"];
        }        if (! branchName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter branchName"];
        }        if (! commitId) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter commitId"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.UpdateDefaultBranch = function UpdateDefaultBranch(aws) {
        var defaultBranchName = aws.params.defaultBranchName;
        var repositoryName = aws.params.repositoryName;
        if (! repositoryName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter repositoryName"];
        }        if (! defaultBranchName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter defaultBranchName"];
        }

        // TODO implement code

        var ret = {};
        return [200, ret];
    }
module.exports.CreateRepository = function CreateRepository(aws) {
        var repositoryDescription = aws.params.repositoryDescription;
        var repositoryName = aws.params.repositoryName;
        if (! repositoryName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter repositoryName"];
        }

        // TODO implement code

        var ret = {
            repositoryMetadata: /*S6*/{
                creationDate: now(),
                cloneUrlHttp: "",
                cloneUrlSsh: "",
                accountId: "",
                Arn: "",
                repositoryDescription: "",
                repositoryId: "",
                repositoryName: "",
                defaultBranch: "",
                lastModifiedDate: now()
            }
        };
        return [200, ret];
    }
module.exports.ListRepositories = function ListRepositories(aws) {
        var order = aws.params.order;
        var sortBy = aws.params.sortBy;
        var nextToken = aws.params.nextToken;


        // TODO implement code

        var ret = {
            repositories: [ {
                repositoryName: "",
                repositoryId: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.ListBranches = function ListBranches(aws) {
        var repositoryName = aws.params.repositoryName;
        var nextToken = aws.params.nextToken;
        if (! repositoryName) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter repositoryName"];
        }

        // TODO implement code

        var ret = {
            branches: [ "" /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
