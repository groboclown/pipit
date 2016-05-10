#!/usr/bin/python3

import unittest
from botocore.exceptions import ClientError
import sys
import datetime
import threading
from queue import Queue

from . import util


class LambdaTaskTestCase(unittest.TestCase):
    def test_PollForActivityTask(self):
        swf = util.BasicSwfSetup(self)
        function_name = swf.upload_lambda('SimpleLambda', 'simple_lambda.js')
        domain_name = swf.create_domain()
        workflow_type = swf.create_workflow_type()
        workflow_id, run_id = swf.start_workflow_execution(workflow_type)


        # FIXME


if __name__ == '__main__':
    unittest.main()
