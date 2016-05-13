# Running Pipit with HTTPS

In some cases, the client forces an HTTPS protocol, which means that it must
contact the Pipit server through HTTPS.  There are several ways to setup
the service so that the client can connect to the Pipit server securely.

## Reverse Proxy

You can create a front-end server (such as Apache HTTPD) listening on HTTPS
that has a reverse proxy to the Pipit server.

### Apache HTTPD

In the `httpd.conf` file, you can setup a virtual host with a reverse proxy
like this:

```
<VirtualHost *:443>
    ServerName www.example.com
    SSLEngine On
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/cert.key
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

You can find more information about this through better and more indepth
documentation guides online.

## HTTPS Pipit

Pipit can be run in HTTPS mode by setting the environment variables
`SSL_KEY` and `SSL_CERT`, which must be assigned to a
certificate key and certificate file respectively.  This will trigger
the server to run in HTTPS mode.  Note that while in HTTPS mode,
it cannot receive HTTP connections.

To generate the key and certificate pairs, you can run these commands:

```
$ openssl genrsa -out key.pem
$ openssl req -new -key key.pem -out csr.pem
(answer all the questions, but be sure to set "Common name" to the
name of the server as it will be called by the client; use
"localhost" only if the client will use "localhost")
$ openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
$ rm csr.pem
```

With this setup, you can then set `SSL_KEY=key.pem` and `SSL_CERT=cert.pem`.

# Using the self-signed certificate with the client

Depending on which client platform you're using, the method to use this
self-signed certificate changes.

## Java

Use the JRE's `keytool` to store the certificate.

```
$ $JAVA_HOME/bin/keytool -import -v -trustcacerts -alias LocalMockAWS -file cert.pm -keypass changeit -storepass changeit -keystore cacerts
```

If you want the stored certificate to be used by all applications running on
this JVM install, without needing to change the Java code, then you can change
the `cacerts` argument value to instead reference the JVM's `lib/security/cacerts`
file (note that the "changeit" passwords are the default JVM passwords for the
keystore).
