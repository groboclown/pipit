# Pipit's ECS Implementation

**Server endpoint: http://(servername):(port)/ecs/**

ECS is currently not implemented.  It is the next API that will be worked
on.

Current plans are to have the ECS commands route through a local Docker
cli.  This way, Pipit doesn't have to worry about how to connect to the
Docker server; instead, it just uses what you have locally setup to
invoke Docker.
