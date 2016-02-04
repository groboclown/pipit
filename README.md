# pipit

Mock AWS Services for integration testing.

Pipit allows for simulating Amazon Web Services for use with integration
testing.  It allows you to run disconnected from the Internet, run tests
without worrying about network failures or service disruptions, and to
explicitly simulate those kinds of conditions for environmental testing.

Currently supported AWS apis:

* SQS


## Running Pipit

Pipit can either be run in a local node.js server:

```
npm start
```

or as a Docker image with the supplied `Dockerfile`.  It will run by default
on port 3000.  You can change this by setting the environment variable `PORT`.

You can additionally monitor the communication with the pipit server with a
provided port forwarder:

```
python test/integration/port_forward.py 3001 localhost 3000
```
Here, `3001` is the listening port, `localhost` is the Pipit server, and
`3000` is the Pipit listening port.


## Connecting to Pipit

To connect to Pipit, you'll need to tell the AWS apis the server endpoint
of the Pipit server.  The endpoint will be the server address plus the
service name as the path.  For example, if you're connecting to the SQS
service on the localhost on port 3001, the url would be `http://localhost:3001/sqs/`.

### Python boto3 usage

To connect to the local Pipit server using the boto3 API calls, this code will
do the trick:

```
import os
from boto3.session import Session

def create_service(service_id, api_version=None, user='USER_ACCESS_KEY'):
    def env(key, default_value):
        return key in os.environ and os.environ[key] or default_value
    session = Session(
        aws_access_key_id=user,
        aws_secret_access_key='SUPER_SECRET_KEY')
    endpoint = env('AWS_ENDPOINT', 'http://localhost:3000/')
    return session.resource(
        service_name=service_id,
        api_version=api_version,
        use_ssl=False,
        verify=False,
        region_name='moon-base-alpha',
        endpoint_url=endpoint + service_id + '/'
    )
```

### `aws` CLI usage

To use with the `aws` CLI tool, you will need to use special arguments to
tell it to connect to the mock server.

```
aws --endpoint-url http://localhost:3000/(servicename)/ --region mock-region (servicename) (args)
```

You may also find it useful to enable debugging.


## Extending Pipit

Each service is registered under the [api/routes.js](api/routes.js) file.
If you want to add more services, you can add them there.

Additionally, you can change the behavior of Pipit's API responses by registering
_api injections_.

_TODO describe adding and changing injections._

## License

Pipit is under the MIT license.
