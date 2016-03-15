# Web Service Routing

This folder contains the routing to the different Amazon Web Service
mock implementations.  To add a new service implementation, add it to the
[routes.js](routes.js) file.  Please also add a `docs/(service).md` file
to describe your new service.

Additionally, alternate implementations to existing services can be easily
added by adding a new route, and copying over the existing service.  You
will need to alter your endpoints to reference this alias.

At the moment, there isn't a clean way to use the amazon-common helper functions
with an alias.  It's better just to use injections.

## Long Poll Services

*TODO include description on how to write a long poll service.  For now,
reference the sqs ReceiveMessage call.*

## Creating Boilerplate Code

The tool [build-api.py](../bin/build-api.py) can auto-generate each
of the AWS api basic code framework to get you started in creating a
real implementation.  Simply run it as:

```
$ python bin/build-api.py node_modules/aws-sdk/apis api
```

and the framework files are put into the `api` directory.  This can be safely
run as the AWS service interfaces get updated.  You can transfer new files
from the generated `api/boilerplate-routes.js` file into the `routes.js`
file.

## Auto-loading setup

The setup for each service should load from the `lib/json-watch` library
to read the configuration that should allow for loading the initial state.

## S3

Many of the APIs require references to S3.  To simplify this, the S3 emulation
for the back end is just a reference to a local file directory.
