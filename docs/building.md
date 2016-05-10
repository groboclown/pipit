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
