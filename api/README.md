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
