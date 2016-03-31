'use strict';
const aws_common = require('../../lib/aws-common');


/**
 * AWS Device Farm version 2015-06-23
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol json
require('../../lib/aws-common/shape_http')('json', module.exports, null)
module.exports.GetDevice = function GetDevice(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            device: /*S16*/{
                manufacturer: "",
                model: "",
                radio: "",
                arn: "",
                memory: 0 /*long*/,
                os: "",
                name: "",
                formFactor: "",
                image: "",
                cpu: {
                    clock: 0.0 /*double*/,
                    frequency: "",
                    architecture: ""
                },
                carrier: "",
                heapSize: 0 /*long*/,
                platform: "",
                resolution: {
                    height: 0,
                    width: 0
                }
            }
        };
        return [200, ret];
    }
module.exports.DeleteDevicePool = function DeleteDevicePool(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.CreateDevicePool = function CreateDevicePool(aws) {
        var rules = aws.params['rules'];
        var description = aws.params['description'];
        var name = aws.params['name'];
        var projectArn = aws.params['projectArn'];
        if (! projectArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter projectArn"];
        }
        if (! name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
        }
        if (! rules) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter rules"];
        }


        // TODO implement code

        var ret = {
            devicePool: /*Sb*/{
                rules: /*S5*/[ {
                    value: "",
                    operator: "",
                    attribute: ""
                } /*, ...*/ ],
                type: "",
                description: "",
                arn: "",
                name: ""
            }
        };
        return [200, ret];
    }
module.exports.GetJob = function GetJob(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            job: /*S1o*/{
                type: "",
                created: now(),
                status: "",
                arn: "",
                result: "",
                stopped: now(),
                counters: /*S1r*/{
                    skipped: 0,
                    total: 0,
                    failed: 0,
                    errored: 0,
                    passed: 0,
                    stopped: 0,
                    warned: 0
                },
                started: now(),
                deviceMinutes: /*S1s*/{
                    unmetered: 0.0 /*double*/,
                    total: 0.0 /*double*/,
                    metered: 0.0 /*double*/
                },
                name: "",
                device: /*S16*/{
                    manufacturer: "",
                    model: "",
                    radio: "",
                    arn: "",
                    memory: 0 /*long*/,
                    os: "",
                    name: "",
                    formFactor: "",
                    image: "",
                    cpu: {
                        clock: 0.0 /*double*/,
                        frequency: "",
                        architecture: ""
                    },
                    carrier: "",
                    heapSize: 0 /*long*/,
                    platform: "",
                    resolution: {
                        height: 0,
                        width: 0
                    }
                },
                message: ""
            }
        };
        return [200, ret];
    }
module.exports.GetProject = function GetProject(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            project: /*Sf*/{
                created: now(),
                arn: "",
                name: ""
            }
        };
        return [200, ret];
    }
module.exports.ListArtifacts = function ListArtifacts(aws) {
        var type = aws.params['type'];
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }
        if (! type) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter type"];
        }


        // TODO implement code

        var ret = {
            nextToken: "",
            artifacts: [ {
                type: "",
                extension: "",
                url: "",
                arn: "",
                name: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteRun = function DeleteRun(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.ListJobs = function ListJobs(aws) {
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            jobs: [ /*S1o*/{
                type: "",
                created: now(),
                status: "",
                arn: "",
                result: "",
                stopped: now(),
                counters: /*S1r*/{
                    skipped: 0,
                    total: 0,
                    failed: 0,
                    errored: 0,
                    passed: 0,
                    stopped: 0,
                    warned: 0
                },
                started: now(),
                deviceMinutes: /*S1s*/{
                    unmetered: 0.0 /*double*/,
                    total: 0.0 /*double*/,
                    metered: 0.0 /*double*/
                },
                name: "",
                device: /*S16*/{
                    manufacturer: "",
                    model: "",
                    radio: "",
                    arn: "",
                    memory: 0 /*long*/,
                    os: "",
                    name: "",
                    formFactor: "",
                    image: "",
                    cpu: {
                        clock: 0.0 /*double*/,
                        frequency: "",
                        architecture: ""
                    },
                    carrier: "",
                    heapSize: 0 /*long*/,
                    platform: "",
                    resolution: {
                        height: 0,
                        width: 0
                    }
                },
                message: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.ListDevicePools = function ListDevicePools(aws) {
        var type = aws.params['type'];
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            devicePools: [ /*Sb*/{
                rules: /*S5*/[ {
                    value: "",
                    operator: "",
                    attribute: ""
                } /*, ...*/ ],
                type: "",
                description: "",
                arn: "",
                name: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.CreateProject = function CreateProject(aws) {
        var name = aws.params['name'];
        if (! name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
        }


        // TODO implement code

        var ret = {
            project: /*Sf*/{
                created: now(),
                arn: "",
                name: ""
            }
        };
        return [200, ret];
    }
module.exports.GetUpload = function GetUpload(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            upload: /*Sl*/{
                type: "",
                created: now(),
                contentType: "",
                status: "",
                arn: "",
                name: "",
                message: "",
                metadata: "",
                url: ""
            }
        };
        return [200, ret];
    }
module.exports.GetDevicePool = function GetDevicePool(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            devicePool: /*Sb*/{
                rules: /*S5*/[ {
                    value: "",
                    operator: "",
                    attribute: ""
                } /*, ...*/ ],
                type: "",
                description: "",
                arn: "",
                name: ""
            }
        };
        return [200, ret];
    }
module.exports.GetAccountSettings = function GetAccountSettings(aws) {


        // TODO implement code

        var ret = {
            accountSettings: {
                awsAccountNumber: "",
                unmeteredDevices: {} /* map */
            }
        };
        return [200, ret];
    }
module.exports.ScheduleRun = function ScheduleRun(aws) {
        var configuration = aws.params['configuration'] /* structure */;
        var name = aws.params['name'];
        var projectArn = aws.params['projectArn'];
        var appArn = aws.params['appArn'];
        var test = aws.params['test'] /* structure */;
        var devicePoolArn = aws.params['devicePoolArn'];
        if (! projectArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter projectArn"];
        }
        if (! devicePoolArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter devicePoolArn"];
        }
        if (! test) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter test"];
        }


        // TODO implement code

        var ret = {
            run: /*S1x*/{
                type: "",
                created: now(),
                status: "",
                arn: "",
                result: "",
                completedJobs: 0,
                stopped: now(),
                counters: /*S1r*/{
                    skipped: 0,
                    total: 0,
                    failed: 0,
                    errored: 0,
                    passed: 0,
                    stopped: 0,
                    warned: 0
                },
                started: now(),
                totalJobs: 0,
                deviceMinutes: /*S1s*/{
                    unmetered: 0.0 /*double*/,
                    total: 0.0 /*double*/,
                    metered: 0.0 /*double*/
                },
                name: "",
                platform: "",
                message: "",
                billingMethod: ""
            }
        };
        return [200, ret];
    }
module.exports.UpdateDevicePool = function UpdateDevicePool(aws) {
        var rules = aws.params['rules'];
        var description = aws.params['description'];
        var arn = aws.params['arn'];
        var name = aws.params['name'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            devicePool: /*Sb*/{
                rules: /*S5*/[ {
                    value: "",
                    operator: "",
                    attribute: ""
                } /*, ...*/ ],
                type: "",
                description: "",
                arn: "",
                name: ""
            }
        };
        return [200, ret];
    }
module.exports.ListSuites = function ListSuites(aws) {
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            nextToken: "",
            suites: [ /*S21*/{
                type: "",
                created: now(),
                deviceMinutes: /*S1s*/{
                    unmetered: 0.0 /*double*/,
                    total: 0.0 /*double*/,
                    metered: 0.0 /*double*/
                },
                status: "",
                arn: "",
                name: "",
                result: "",
                stopped: now(),
                counters: /*S1r*/{
                    skipped: 0,
                    total: 0,
                    failed: 0,
                    errored: 0,
                    passed: 0,
                    stopped: 0,
                    warned: 0
                },
                started: now(),
                message: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListProjects = function ListProjects(aws) {
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];


        // TODO implement code

        var ret = {
            nextToken: "",
            projects: [ /*Sf*/{
                created: now(),
                arn: "",
                name: ""
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteUpload = function DeleteUpload(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
module.exports.UpdateProject = function UpdateProject(aws) {
        var arn = aws.params['arn'];
        var name = aws.params['name'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            project: /*Sf*/{
                created: now(),
                arn: "",
                name: ""
            }
        };
        return [200, ret];
    }
module.exports.GetRun = function GetRun(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            run: /*S1x*/{
                type: "",
                created: now(),
                status: "",
                arn: "",
                result: "",
                completedJobs: 0,
                stopped: now(),
                counters: /*S1r*/{
                    skipped: 0,
                    total: 0,
                    failed: 0,
                    errored: 0,
                    passed: 0,
                    stopped: 0,
                    warned: 0
                },
                started: now(),
                totalJobs: 0,
                deviceMinutes: /*S1s*/{
                    unmetered: 0.0 /*double*/,
                    total: 0.0 /*double*/,
                    metered: 0.0 /*double*/
                },
                name: "",
                platform: "",
                message: "",
                billingMethod: ""
            }
        };
        return [200, ret];
    }
module.exports.CreateUpload = function CreateUpload(aws) {
        var type = aws.params['type'];
        var name = aws.params['name'];
        var contentType = aws.params['contentType'];
        var projectArn = aws.params['projectArn'];
        if (! projectArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter projectArn"];
        }
        if (! name) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter name"];
        }
        if (! type) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter type"];
        }


        // TODO implement code

        var ret = {
            upload: /*Sl*/{
                type: "",
                created: now(),
                contentType: "",
                status: "",
                arn: "",
                name: "",
                message: "",
                metadata: "",
                url: ""
            }
        };
        return [200, ret];
    }
module.exports.ListRuns = function ListRuns(aws) {
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            runs: [ /*S1x*/{
                type: "",
                created: now(),
                status: "",
                arn: "",
                result: "",
                completedJobs: 0,
                stopped: now(),
                counters: /*S1r*/{
                    skipped: 0,
                    total: 0,
                    failed: 0,
                    errored: 0,
                    passed: 0,
                    stopped: 0,
                    warned: 0
                },
                started: now(),
                totalJobs: 0,
                deviceMinutes: /*S1s*/{
                    unmetered: 0.0 /*double*/,
                    total: 0.0 /*double*/,
                    metered: 0.0 /*double*/
                },
                name: "",
                platform: "",
                message: "",
                billingMethod: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.GetSuite = function GetSuite(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            suite: /*S21*/{
                type: "",
                created: now(),
                deviceMinutes: /*S1s*/{
                    unmetered: 0.0 /*double*/,
                    total: 0.0 /*double*/,
                    metered: 0.0 /*double*/
                },
                status: "",
                arn: "",
                name: "",
                result: "",
                stopped: now(),
                counters: /*S1r*/{
                    skipped: 0,
                    total: 0,
                    failed: 0,
                    errored: 0,
                    passed: 0,
                    stopped: 0,
                    warned: 0
                },
                started: now(),
                message: ""
            }
        };
        return [200, ret];
    }
module.exports.ListTests = function ListTests(aws) {
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            tests: [ /*S24*/{
                type: "",
                created: now(),
                deviceMinutes: /*S1s*/{
                    unmetered: 0.0 /*double*/,
                    total: 0.0 /*double*/,
                    metered: 0.0 /*double*/
                },
                status: "",
                arn: "",
                name: "",
                result: "",
                stopped: now(),
                counters: /*S1r*/{
                    skipped: 0,
                    total: 0,
                    failed: 0,
                    errored: 0,
                    passed: 0,
                    stopped: 0,
                    warned: 0
                },
                started: now(),
                message: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.ListUniqueProblems = function ListUniqueProblems(aws) {
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            uniqueProblems: {} /* map */,
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.GetDevicePoolCompatibility = function GetDevicePoolCompatibility(aws) {
        var testType = aws.params['testType'];
        var devicePoolArn = aws.params['devicePoolArn'];
        var appArn = aws.params['appArn'];
        if (! devicePoolArn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter devicePoolArn"];
        }


        // TODO implement code

        var ret = {
            compatibleDevices: /*S1h*/[ {
                incompatibilityMessages: [ {
                    type: "",
                    message: ""
                } /*, ...*/ ],
                device: /*S16*/{
                    manufacturer: "",
                    model: "",
                    radio: "",
                    arn: "",
                    memory: 0 /*long*/,
                    os: "",
                    name: "",
                    formFactor: "",
                    image: "",
                    cpu: {
                        clock: 0.0 /*double*/,
                        frequency: "",
                        architecture: ""
                    },
                    carrier: "",
                    heapSize: 0 /*long*/,
                    platform: "",
                    resolution: {
                        height: 0,
                        width: 0
                    }
                },
                compatible: false
            } /*, ...*/ ],
            incompatibleDevices: /*S1h*/[ {
                incompatibilityMessages: [ {
                    type: "",
                    message: ""
                } /*, ...*/ ],
                device: /*S16*/{
                    manufacturer: "",
                    model: "",
                    radio: "",
                    arn: "",
                    memory: 0 /*long*/,
                    os: "",
                    name: "",
                    formFactor: "",
                    image: "",
                    cpu: {
                        clock: 0.0 /*double*/,
                        frequency: "",
                        architecture: ""
                    },
                    carrier: "",
                    heapSize: 0 /*long*/,
                    platform: "",
                    resolution: {
                        height: 0,
                        width: 0
                    }
                },
                compatible: false
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.ListSamples = function ListSamples(aws) {
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            samples: [ {
                type: "",
                url: "",
                arn: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.ListUploads = function ListUploads(aws) {
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            uploads: [ /*Sl*/{
                type: "",
                created: now(),
                contentType: "",
                status: "",
                arn: "",
                name: "",
                message: "",
                metadata: "",
                url: ""
            } /*, ...*/ ],
            nextToken: ""
        };
        return [200, ret];
    }
module.exports.GetTest = function GetTest(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {
            test: /*S24*/{
                type: "",
                created: now(),
                deviceMinutes: /*S1s*/{
                    unmetered: 0.0 /*double*/,
                    total: 0.0 /*double*/,
                    metered: 0.0 /*double*/
                },
                status: "",
                arn: "",
                name: "",
                result: "",
                stopped: now(),
                counters: /*S1r*/{
                    skipped: 0,
                    total: 0,
                    failed: 0,
                    errored: 0,
                    passed: 0,
                    stopped: 0,
                    warned: 0
                },
                started: now(),
                message: ""
            }
        };
        return [200, ret];
    }
module.exports.ListDevices = function ListDevices(aws) {
        var nextToken = aws.params['nextToken'];
        var arn = aws.params['arn'];


        // TODO implement code

        var ret = {
            nextToken: "",
            devices: [ /*S16*/{
                manufacturer: "",
                model: "",
                radio: "",
                arn: "",
                memory: 0 /*long*/,
                os: "",
                name: "",
                formFactor: "",
                image: "",
                cpu: {
                    clock: 0.0 /*double*/,
                    frequency: "",
                    architecture: ""
                },
                carrier: "",
                heapSize: 0 /*long*/,
                platform: "",
                resolution: {
                    height: 0,
                    width: 0
                }
            } /*, ...*/ ]
        };
        return [200, ret];
    }
module.exports.DeleteProject = function DeleteProject(aws) {
        var arn = aws.params['arn'];
        if (! arn) {
            return [400, "Sender", "MissingParameter", "Did not specify parameter arn"];
        }


        // TODO implement code

        var ret = {

        };
        return [200, ret];
    }
