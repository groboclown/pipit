# Building Pipit For Fun and Profit


## Unit Tests

To run the code validation and unit tests:

```
npm test
```


## Integration Tests

First, startup the server:

```
npm start
```

Then, from the `test` directory, run:

```
python3 -m unittest integration
```

This will run both the AWS CLI and Python Boto3 tests, which means you need
the boto3 Python library installed, and the AWS CLI tool installed.

If you're running through the proxy, then you can setup the server with:

```
PORT=2999 npm test
```

and run the port forwarder from the `test/integration` directory:

```
python3 port_forward.py 3000 localhost 2999
```


## Generating Boilerplate API calls

If the Amazon API was updated (the JavaScript aws-sdk), then the boilerplate
code should likewise be updated.  To update the boilerplate code, run:

```
python3 bin/build-api.py node_modules/aws-sdk/apis ./api
```

Note that the boilerplate code does not do anything, and regenerating this
will not overwrite non-boilerplate code.  You will need to merge the
`api/boilerplate-routes.js` with the `api/routes.js` file.

It looks like the "metering.marketplace" has the dot in some places and without
in other places.  This needs to be fixed in `build-api.py`, but I'm not sure the
right value.
