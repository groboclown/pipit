# pipit

Mock AWS Services for integration testing.

Pipit allows for simulating Amazon Web Services for use with integration
testing.  It allows you to run disconnected from the Internet, run tests
without worrying about network failures or service disruptions, and to
explicitly simulate those kinds of conditions for environmental testing.

In order to start using Pipit, your production code only needs to
modify the parameters used to setup the connection to AWS.  There is
no additional library that needs to be swapped into place.

Pipit is not meant to be a production replacement for AWS services.
It doesn't scale, and doesn't persist data.

Currently supported Amazon Web Services:

* [SQS](docs/sqs.md)


## Running Pipit

First, you'll need to download Pipit from Github.  Go ahead.  I'll wait.

Pipit can either be run in a local node.js server:

```
npm install
npm start
```

or as a Docker image with the supplied `Dockerfile`.  It will run by default
on port 3000.  You can change this by setting the environment variable `PORT`.

You can additionally monitor the communication with the pipit server with a
provided port forwarder:

```
python test/integration/port_forward.py 3001 localhost 3000
```
Here, `3001` is the listening port for the port forwarder, `localhost` is
the Pipit server host, and `3000` is the Pipit server listening port.

For DynamoDB support, Pipit acts as a pass-through for a
[local DynamoDB server](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html).
You will need to deploy the server locally and set the `DYNAMODB_ENDPOINT`
environment variable.  You can use the supplied [docker-dependencies](docker-dependences)
to create a DynamoDB image, and launch it with the Pipit docker container
via `docker-compose up`.

If you want to make configurable extension points, or pre-built setup, you
should specify the environment variable `$PIPIT_EXTENSIONS`.

## Connecting to Pipit

To connect to Pipit, you'll need to tell the AWS apis the server endpoint
of the Pipit server.  The endpoint will be the server address plus the
service name as the path.  For example, if you're connecting to the SQS
service on localhost, port 3001, the url would be `http://localhost:3001/sqs/`.

Details on how to setup specific AWS APIs are covered in the
[Working With AWS API Packages](docs/WorkingWithAwsApis.md) document.

## Extending Pipit

Each service is registered under the [api/routes.js](api/routes.js) file.
If you want to add more services, you can add them there.

Additionally, you can change the behavior of Pipit's API responses by registering
[api injections](docs/injections.md).


## License

Pipit is under the [MIT license](LICENSE).
