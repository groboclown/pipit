FROM pipit.github/java:open7
MAINTAINER pipit.github


# Install cURL and tar,
# download and unzip the dynamodb package
# Uninstall the unnecessary packages
RUN apk --update add curl tar \
    && mkdir -p /usr/local/dynamodb \
    && mkdir -p /var/dynamodb \
    && curl -Ls http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz \
        | tar -xzf - -C /usr/local/dynamodb \
    && apk del curl tar

# Shared database directory, for persistence across restarts, if desired
VOLUME ["/var/dynamodb"]

# Ensure that Java just works
ENV PATH=/usr/bin:/bin:/usr

EXPOSE 8000
WORKDIR /usr/local/dynamodb
CMD [ "java", "-Djava.library.path=./DynamoDBLocal_lib", "-jar", "DynamoDBLocal.jar", "-sharedDb", "-dbPath", '/var/dynamodb', "-port", "8000" ]
