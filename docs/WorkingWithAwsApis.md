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


## Java

```
client = new AmazonDynamoDBClient(credentials);
client.setEndpoint("http://localhost:3000/dynamodb");
```

### Override Region Enpoints with Java SDK Before 1.10

Additionally, the Java AWS client uses the Java system variable
`com.amazonaws.regions.RegionUtils.fileOverride` to allow for overriding the
endpoint metadata file, which maps the AWS region code to a list of services
and their hostname.  The underlying implementation uses the hostname as the
endpoint URL (stripped of the protocol).

Therefore, if you are dealing with code that does not allow for changing
the endpoint, then you can do these two steps:

1. Create a file, say `/path/to/override-endpoints.xml`, that points the services over
   to your Pipit server, which is running on `http://localhost:3000`:

    ```
    <XML>
      <Region>
        <Name>us-mock-1</Name> <!-- set to whichever your app uses -->
        <Endpoint>
            <ServiceName>dynamodb</ServiceName>
            <Http>true</Http> <!-- Allow HTTP connections -->
            <Https>false</Https> <!-- Do not allow HTTPS connections -->
            <Hostname>localhost:3000/dynamodb</Hostname>
			<SignatureVersionOverride>4</SignatureVersionOverride> <!-- only supported signature, but this looks like it's ignored -->
        </Endpoint>
		(add additional Endpoint structures per service)
      </Region>
    </XML>
    ```
2. When invoking the Java program, include the JVM command-line argument
   (the arguments that come before the class name):
   `-Dcom.amazonaws.regions.RegionUtils.fileOverride=/path/to/override-endpoints.xml`

Note that this will work if your Java application uses multiple AWS services.

### Override Region Enpoints with Java SDK After 1.10

Starting with version 1.10 of the AWS SDK for Java, the endpoints has changed.
It still supports the legacy XML file, but that may be removed in future
versions.

With the new version, the endpoints are loaded from the classpath.  You can
override the base endpoints by adding the file `com/amazonaws/partitions/override/endpoints.json`
into the classpath.  This will replace all the default endpoint definitions.

The file will need to look like this: *TODO this needs testing*

```
{
	"version": 3,
	"partitions": [
	{
		"partition": "aws",
		"partitionName": "AWS Mock Standard",
		"dnsSuffix": "",
		"regionRegex": "^.*$",
		"defaults": {
		  "hostname": "localhost:3000/{service}",
		  "protocols": [
			"http"
		  ],
		  "signatureVersions": [
			"v4"
		  ]
		},
		"regions": {
			"us-mock-1": { /* whichever your server uses */
				"description": "Mock region"
			}
		},
		"services": {
			"dynamodb": {
				"endpoints": {
					"us-mock-1": {} /* whichever your server uses */
				}
			}
			/* add in additional services that you use */
		}
	}
	]
}
```


## .NET

```
var config = new AmazonDynamoDBConfig();
config.ServiceURL = "http://localhost:3000/dynamodb";
client = new AmazonDynamoDBClient(config);
```


## PHP

```
$sdk = new Aws\Sdk([
    'region'   => 'us-west-2',
    'version'  => 'latest',
    'endpoint' => 'http://localhost:3000/dynamodb'
]);
$dynamodb = $sdk->createDynamoDb();
```


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


## Javascript


### Override Region Endpoints with Javascript

You can override the endpoint location by replacing the file
`node_modules/aws-sdk/lib/region_config.json` to look like:

*TODO need to test*

```
{
	"rules": {
	  "*/*": {
	    "endpoint": "localhost:3000/{service}",
		"signatureVersion": "v4",
		"sslEnabled": false
	  }
	},
	"patterns": {}
}
```


## `aws` CLI usage

To use with the `aws` CLI tool, you will need to use special arguments to
tell it to connect to the mock server.  The region is required, but it is
ignored by the Pipit server.

```
aws --endpoint-url http://localhost:3000/(servicename)/ --region mock-region (servicename) (args)
```

You may also find it useful to enable debugging.
