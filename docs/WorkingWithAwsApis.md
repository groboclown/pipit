# Working with AWS API Packages

Amazon and some other vendors provide different APIs to more easily use the
AWS web services.  They each are configured slightly differently.

The basics behind the configurations are all similar, though.  You want to
configure the "endpoint".  Some APIs require that the region also be set,
but with a manually set endpoint, the region can be anything.  Likewise,
the Pipit server doesn't authenticate requests, so the AWS access key and
secret access key doesn't matter.  Note, however, that some AWS web services
use the AWS access key for internal naming (such as SQS queues), so your
particular usage may need to take care with this.

Also note that the endpoint _must_ be configured per service.

## Python boto3 usage

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

## `aws` CLI usage

To use with the `aws` CLI tool, you will need to use special arguments to
tell it to connect to the mock server.  The region is required, but it is
ignored by the Pipit server.

```
aws --endpoint-url http://localhost:3000/(servicename)/ --region mock-region (servicename) (args)
```

You may also find it useful to enable debugging.
