#!/bin/bash

args="$@"
if [ -z "${args}" ]; then
    args="integration"
fi

if [ -z "${AWS_ENDPOINT}" ]; then
    AWS_ENDPOINT="http://localhost:3000/"
    export AWS_ENDPOINT
fi

PYT=python
which python3 >/dev/null 2>&1
if [ $? -eq 0 ]; then
    PYT=python3
fi

$PYT -m unittest $args
