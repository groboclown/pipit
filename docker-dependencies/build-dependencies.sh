#!/bin/bash

cd $( dirname "$0" )
cd open-jre-7
docker build -t pipit.github/java:open7 .

cd ../DynamoDB
docker build -t pipit.github/dynamodb:latest .
