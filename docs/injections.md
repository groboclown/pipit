# Injecting Behavior into Web Service Responses

Pipit allows for injecting custom behavior into the request chain by
registering *injections*.

You can register injections to run either before or after any Amazon AWS call.
If they run before, then they can either do nothing, modify the request to
make it look slightly different, or return a custom message.  Injections that
run after an API call can modify the return value, or return a different
value.

## Pipit API Call Chain

Normally, when a web service request is received by the Pipit server, the server
will route the call in this way:

1. The Node.js Express web sever uses the initial path to determine the service
    (as defined by [routes.js](../api/routes.js)), and passes the call to the
    service.
2. The service calls to [routing.js](../lib/aws-common/routing.js) to parse
   the AWS specific request, and then use the `Action` parameter to invoke
   the service's api call.
3. The service's api call handles the request, and returns a *response list*
   to `routing.js`.
4. `routing.js` translates the *response list* into a correctly formatted
   AWS response message and sends the response back to the requestor.

With an injector, however, the chain can be interrupted at several points.

`routing.js` will call a *before* injector right before the service's api is called.
If the injector returns a non-null value, then the chain will be short-circuited,
and the returned value will be instead turned into the final AWS response.  When
the first *before* injector returns a non-null value, no other before injectors
will run.

`routing.js` will call an *after* injector when the `routing.js` translates the
response.  It will take as one of its inputs the response, and can either
directly change it, or return a completely new value.  All the *after* injectors
will run on the response.  Note that this means that if a *before* injector
short-circuited the api call, the *after* injectors will still operate on the
response from the *before* injector.


## Injection Monitor Directory

The Pipit server will start by monitoring the directory specified by
the environment variable `$PIPIT_EXTENSIONS`.  That directory is scanned
constantly for new or updated `.json` files.  Any json file that contains an
`injections` key will be used.  The injections value looks like:

```
{
    "injections": [
        {
            "type": "(Before or After)",
            "service": "(service name)",
            "api": "(api name)",
            "path": "(path to the js file, relative to the json file)",
            "name": "(function name in the js file's module to call)"
        },
        ...
    ]
}
```

If a json file is removed or changed, it is de-registered from the injectors
(changed json files are then re-registered).

Likewise, if the JavaScript file that the json file references changes, it is
reloaded automatically.  This allows for faster mock testing and interactive
testing with a service.  This means that the endpoints won't be able to share
data from within their own module.  To share data between endpoints, or to
persist it between reloads, you should have the javascript file `require`
another file from within the same directory that isn't referenced as an
injection javascript file.

Note that you can easily disable an injection by changing the "type"
in the json file to be a value that isn't "Before" or "After".


## Writing an Injection

Injections are named functions registered to a javascript file.  They conform
to the `node.js` modules (and are `require`d into scope).

Let's say we want to inject behavior that causes a service to always return
a 400 internal error message, to ensure that our product code can correctly
handle these situations.  We would define the file as:

```
module.exports = {
    InternalError: function(service, api, req) {
        return [500, 'Service', 'InternalFailure', 'There was an unexpected internal error'];
    }
};
```
This is a function designed for use as a *before injection*, because it does
not take the generated response as an argument.

When this function is registered to run, it will prevent the mocked service API
from actually being called, and will instead just return an error message.

### Before Injections

A before injection has the parameters:

```
function(service, api, req)
```

* `service`: the name of the invoked AWS service.
* `api`: the name of the invoked AWS service method.
* `req`: the Node.js Express request object.  It has an additional attribute,
    `aws`, that contains parsed values specific to handling an AWS request.

The injection can return `null`, in which case processing continues, or it
can return a *response list* (see below).

Additionally, a before injection can modify the `req` object.  This will be
passed to the API handler and other injections.


### After Injections

An after injection has the parameters:

```
function(service, api, req, responseList)
```

* `service`: the name of the invoked AWS service.
* `api`: the name of the invoked AWS service method.
* `req`: the Node.js Express request object.  It has an additional attribute,
    `aws`, that contains parsed values specific to handling an AWS request.
* `responseList`: the current *response list* that will be sent back
    to the client.

The injection can return `null`, in which case the passed-in *response list*
will continue to be used, or it can return a *response list*.

The passed-in response list can additionaly be modified, rather than
returning a new list.

Modifying the `req` object will only affect later injections called.


### Response List

Probably the most obtuse part of the injectors is the return value.  The
response list is an array whose length is determined by the first element.

* if response list `[0]` < 400, then this is a "success" message.
* if response list `[0]` >= 400, then this is an "error" message.

As you may have guessed, the first element is the status message for the
response HTTP message.

Note that the system does not allow for injections to return just any text
to the user.  This is because Pipit is dedicated to simulating valid responses
from an AWS service for use in a program, and is not meant to test AWS
libraries.

#### Error Messages

Error messages have a well defined structure.  They are a simple list with 4
values:

* `[0]`: status code (must be >= 400)
* `[1]`: source of error.  Usually `Sender` to indicate a bad client request.
    *TODO find out what the actual server error source is.  Right now,
    `Service` is used.*
* `[2]`: The documented web service error code.  AWS provides this code.
* `[3]`: A short, human readable error code.

This structure will be translated into the correct AWS error response format.

#### Success Message

A success message has two values in the returned list: the status code (`[0]`),
and the data structure (`[1]`).

The data structure will be encased in the correct format:
```
<(api call)Response>
    <(api call)Result>
        (data structure)
    </(api call)Result>
    <ResponseMetadata>
        <RequestId>(unique value)</RequestId>
    </ResponseMetadata>
</(api call)>
```

The data structure is an object that has key names that directly translate
to the element tags.  The contents of that tag depends upon the type of
value for that key:

* null or undefined: an empty tag.
* number, string, boolean: inserted as plain text between the tag.
* array: each element of the array will be enclosed in tags named after the key.
    The element of the array's type determines what it will be.
* object: the contents of the element will be another XML structure.

For example, to return a list of batch results from an SQS SendMessageBatch, the
result list
```
[200, {
    SendMessageBatchResultEntry: [
        {
            Id: 1,
            MessageId: 'abc1',
            MD5OfMessageBody: 'some-md5'
        },
        {
            Id: 2,
            MessageId: 'abc2',
            MD5OfMessageBody: 'some-md5-2'
        }
    ],
    BatchResultErrorEntry: [
        {
            Id: 3,
            SenderFault: true,
            Code: "InvalidBatchEntryId",
            Message: "bad message Id 1234"
        }
    ]
}]
```
would translate to:
```
<SendMessageBatchResponse
        xmlns='http://sqs.us-east-1.amazonaws.com/doc/2012-11-05/'
        xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
        xsi:type='SendMessageBatchResponse'>
    <SendMessageBatchResult>
        <SendMessageBatchResultEntry>
            <Id>1</Id>
            <MessageId>abc1</MessageId>
            <MD5OfMessageBody>some-md5</MD5OfMessageBody>
        </SendMessageBatchResultEntry>
        <SendMessageBatchResultEntry>
            <Id>2</Id>
            <MessageId>abc2</MessageId>
            <MD5OfMessageBody>some-md5-2</MD5OfMessageBody>
        </SendMessageBatchResultEntry>
        <BatchResultErrorEntry>
            <Id>3</Id>
            <SenderFault>true</SenderFault>
            <Code>InvalidBatchEntryId</Code>
            <Message>bad message Id 1234</Code>
        </BatchResultErrorEntry>
    </SendMessageBatchResult>
    <ResponseMetadata>
        <RequestId>028d7d32-2a75-4a04-91e1-6d962983569b</RequestId>
    </ResponseMetadata>
</SendMessageBatchResponse>
```



## Injection REST service

The injections can be manipulated at runtime by use of the `/admin/injections`
REST api.

### List Injections

Returns a JSON formatted list of all the active injections.

`GET /(type)`

**URL parameters**
`type`: either "Before" or "After"

**Query Parameters**
Takes no query parameters.

**Returns**
```
{
    Injections: [
        {
            Service: "name of service (such as sqs)",
            Api: "API name, such as SendMessageBatch",
            Name: "name of the injection function",
            JSPath: "/path/to/source/file.js",
            InjectionUrl: "URL to act upon this injection"
        }, ...
    ]
}
```

### Clear All Injections

Remove all registered injections of a specific type.

`POST /(type)`

**URL parameters**
* `type`: either "Before" or "After"

**Form Body Parameters**
* `Clear`: must be set to "All" in order to work.


### Create New Injection

Add a new injection to the mock server.  The JS file will be `require()`d
into scope, but each time a file is added, it is completely reloaded, so you
won't be able to use shared data between two injections.  However, it does
mean that you can change a js file and reload it without needing to restart
the server.

`POST /(type)/(service)/(api)/(name)`

**URL parameters**
* `type`: either "Before" or "After"
* `service`: service in which this will be registered (e.g. sqs)
* `api`: the API call that this will inject into.
* `name`: JS function name in the JS file that will be called.

**Form Body Parameters**
* `path`: local file path (to the server) that will be read in for the
    injection source.


### Get Specific Injection Details

Discover details about a specific injection.

`GET /(type)/(service)/(api)/(name)`

**URL parameters**
* `type`: either "Before" or "After"
* `service`: service in which this will be registered (e.g. sqs)
* `api`: the API call that this will inject into.
* `name`: JS function name in the JS file that will be called.

**Query Parameters**
None

**Returns**
```
{
    Injection: {
        Service: "service",
        Api: "api",
        Name: "name",
        JSPath: "/path/to/file.js",
        InjectionUrl: "(this url)"
    }
}
```


### Delete An Injection

Remove from registration a single injection.

`DELETE /(type)/(service)/(api)/(name)`

**URL parameters**
* `type`: either "Before" or "After"
* `service`: service in which this will be registered (e.g. sqs)
* `api`: the API call that this will inject into.
* `name`: JS function name in the JS file that will be called.
