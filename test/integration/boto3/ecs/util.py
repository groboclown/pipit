
"""
Helper utilities for working with ecs.
"""

import uuid
import sys
import subprocess
from ..aws_common import create_client

def create_new_name():
    return uuid.uuid4().urn.replace(':', '_')

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
    pass

def run_docker_cmd(args):
    cmd = ['docker']
    cmd.extend(args)
    sp = subprocess.Popen(cmd, stdout = subprocess.PIPE)
    out = []
    for line in sp.stdin.readlines():
        out.append(line)
    exit_code = sp.poll()
    if exit_code != 0:
        raise Exception(repr(cmd) + ' exited with ' + str(exit_code))
    return out
