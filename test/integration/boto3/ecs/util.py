
"""
Helper utilities for working with ecs.
"""

import uuid
import sys
import subprocess
# import tempfile
from ..aws_common import create_client

def create_new_name():
    return uuid.uuid4().urn.replace(':', '_')

TEST_DOCKER_IMAGE_NAME = 'pipit/test-docker'

class EcsSetup(object):
    def __init__(self, test_instance):
        object.__init__(self)
        self.test_instance = test_instance
        self.test_name = test_instance.__class__.__name__
        self.client = create_client('ecs')


def setup_docker_images():
    # TODO make a temp file for the Dockerfile, and load it
    # into the docker image.  These need to be well-known images,
    # so that we don't have to recreate them every time.
    out = run_docker_cmd(['images', '--no-trunc'])
    for line in out:
        if line.startswith(TEST_DOCKER_IMAGE_NAME + ' '):
            # Image already exists
            return

    # Need to build the image.
    contents = """FROM library/alpine:latest
RUN apk add --update python py-pip py-setuptools &&\
  pip install --upgrade awscli &&\
  apk del py-pip &&\
  apk del py-setuptools &&\
  rm -rf /var/cache/apk/* &&\
  rm -rf /tmp/*

CMD /bin/sh
"""
    # FIXME Uncomment when working online
    print(contents)
    run_docker_cmd(['build', '-t', TEST_DOCKER_IMAGE_NAME, '-'], contents)

def run_docker_cmd(args, input=None):
    cmd = ['docker']
    cmd.extend(args)
    print('Running ' + repr(cmd))
    sp = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stdin=subprocess.PIPE,
        universal_newlines=True,
        shell=True # Fixes many path problems
    )
    if input is not None:
        sp.stdin.write(input)
    sp.stdin.close()
    out = []
    for line in sp.stdout.readlines():
        out.append(str(line))
    exit_code = sp.wait()
    sp.stdout.close()
    if exit_code != 0:
        raise Exception(repr(cmd) + ' exited with ' + str(exit_code))
    return out
