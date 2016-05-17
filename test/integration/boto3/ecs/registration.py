#!/usr/bin/python3

import unittest
from botocore.exceptions import ClientError
import sys
import datetime
import threading
from queue import Queue

from . import util




class TaskDefTestCase(unittest.TestCase):
    def test_registerTaskDef(self):
        ecs = util.EcsSetup(self)
        util.setup_docker_images()

        task_family_name = util.create_new_name()

        # ListTaskDefnitionFamilies
        initial_task_families = []
        pager = ecs.client.get_paginator('list_task_definition_families').paginate(
            familyPrefix=task_family_name
        )
        for page in pager:
            initial_task_families.extend(page['families'])
        self.assertEqual(len(initial_task_families), 0, 'Found task families for new name')

        # ListTaskDefinitions
        initial_task_def_arns = [];
        pager = ecs.client.get_paginator('list_task_definitions').paginate(
            familyPrefix=task_family_name,
            status='ACTIVE',
            sort='ASC'
        )
        for page in pager:
            initial_task_def_arns.extend(page['taskDefinitionArns'])
        self.assertEqual(len(initial_task_def_arns), 0, 'Found task defs for new family name')

        response = ecs.client.register_task_definition(
            family=task_family_name,
            containerDefinitions=[
                {

                }
            ]
        )
        pass


if __name__ == '__main__':
    unittest.main()
