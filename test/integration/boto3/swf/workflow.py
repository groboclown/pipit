#!/usr/bin/python3

import unittest
from botocore.exceptions import ClientError
import sys
import datetime
import threading
from queue import Queue

from . import util


class ExecuteWorkflowDefaultsTestCase(unittest.TestCase):
    def test_ExecuteWorkflow_MissingDefault(self):
        swf = util.BasicSwfSetup(self)
        domain_name = swf.create_domain()
        new_workflow_type_name = util.create_new_name()
        swf.client.register_workflow_type(
            domain=domain_name,
            name=new_workflow_type_name,
            version='1.0',
            description='workflow type ' + new_workflow_type_name,
            # defaultTaskStartToCloseTimeout='1000',
            # defaultExecutionStartToCloseTimeout='2000',
            # defaultTaskList={'name': 'task_list'},
            defaultTaskPriority='-2',
            defaultChildPolicy='TERMINATE',
            defaultLambdaRole='lambda-role')
        new_activity_type_name = util.create_new_name()
        swf.client.register_activity_type(
            domain=domain_name,
            name=new_activity_type_name,
            version='abcd',
            description='activity type ' + new_activity_type_name,
            defaultTaskStartToCloseTimeout='10',
            defaultTaskHeartbeatTimeout='20',
            defaultTaskList={'name': 'activity_task list'},
            defaultTaskPriority='-10',
            defaultTaskScheduleToStartTimeout='30',
            defaultTaskScheduleToCloseTimeout='40'
        )

        workflow_id = util.create_new_name().replace(":", "-")
        try:
            swf.client.start_workflow_execution(
                domain=domain_name,
                workflowId=workflow_id,
                workflowType={
                    'name': new_workflow_type_name,
                    'version': '1.0'
                }
                # No more optional parameters
            )
            self.fail("Did not cause a server error")
        except ClientError as e:
            # TODO examine error
            # self.assertEqual()
            text = str(e)
            self.assertIn(
                "(DefaultUndefinedFault)",
                text,
                "Error does not include correct fault")
            # print(text)


class ExecuteWorkflowTestCase(unittest.TestCase):
    def test_StartWorkflowExecution_ListOpenWorkflowExecutions_TerminateWorkflow_ListClosedWorkflowExecutions(self):
        swf = util.BasicSwfSetup(self)
        domain_name = swf.create_domain()
        workflow_type = swf.create_workflow_type()

        # StartWorkflowExecution
        tagList = [util.create_new_name()]
        workflow_id, run_id = swf.start_workflow_execution(workflow_type, tagList=tagList)

        # ListOpenWorkflowExecutions, filter on workflow id
        info_count = 0
        open_exec_pager = swf.client.get_paginator('list_open_workflow_executions')
        for page in open_exec_pager.paginate(
                domain=domain_name,
                executionFilter={
                    'workflowId': workflow_id
                },
                startTimeFilter={
                    'oldestDate': datetime.datetime(2015, 1, 1)
                },
                reverseOrder=True):
            if 'executionInfos' in page:
                for exec_info in page['executionInfos']:
                    info_count += 1
                    self.assertEqual(
                        exec_info['execution']['workflowId'],
                        workflow_id,
                        "workflowId")
                    self.assertEqual(
                        exec_info['execution']['runId'],
                        run_id,
                        "runId")
                    self.assertEqual(
                        exec_info['workflowType']['name'],
                        workflow_type.name,
                        "type name")
                    self.assertEqual(
                        exec_info['workflowType']['version'],
                        workflow_type.version,
                        "type version")
                    self.assertTrue(
                        ('closeTimestamp' not in exec_info) or exec_info['closeTimestamp'] is None,
                        "closeTimestamp was incorrectly set")
                    self.assertTrue(
                        ('closeStatus' not in exec_info) or exec_info['closeStatus'] is None,
                        "closeStatus was incorrectly set")
                    self.assertTrue(
                        ('parent' not in exec_info) or exec_info['parent'] is None,
                        "parent was incorrectly set")
                    self.assertEqual(
                        exec_info['tagList'],
                        tagList,
                        "tagList set wrong")
                    self.assertTrue(
                        not exec_info['cancelRequested'],
                        'cancelRequested should be false')
                    # {
                    #     'execution': {
                    #         'workflowId': 'string',
                    #         'runId': 'string'
                    #     },
                    #     'workflowType': {
                    #         'name': 'string',
                    #         'version': 'string'
                    #     },
                    #     'startTimestamp': datetime(2015, 1, 1),
                    #     'closeTimestamp': datetime(2015, 1, 1),
                    #     'executionStatus': 'OPEN'|'CLOSED',
                    #     'closeStatus': 'COMPLETED'|'FAILED'|'CANCELED'|'TERMINATED'|'CONTINUED_AS_NEW'|'TIMED_OUT',
                    #     'parent': {
                    #         'workflowId': 'string',
                    #         'runId': 'string'
                    #     },
                    #     'tagList': [
                    #         'string',
                    #     ],
                    #     'cancelRequested': True|False
                    # },
        self.assertEqual(
            info_count,
            1,
            'open workflow count')


        swf.client.terminate_workflow_execution(
            domain=domain_name,
            workflowId=workflow_id,
            reason='Stop test',
            details='Stopped'
        )

        # ListOpenWorkflowExecutions, filter on tag list
        open_exec_pager = swf.client.get_paginator('list_open_workflow_executions')
        for page in open_exec_pager.paginate(
                domain=domain_name,
                tagFilter={
                    'tag': 'exec_' + workflow_id
                },
                startTimeFilter={
                    'oldestDate': datetime.datetime(2015, 1, 1)
                },
                reverseOrder=True):
            if 'executionInfos' in page:
                for info in page['executionInfos']:
                    self.assertTrue(False,
                        "found open exec " + info['execution']['workflowId'])

        # ListClosedWorkflowExecutions
        info_count = 0
        close_exec_pager = swf.client.get_paginator('list_closed_workflow_executions')
        for page in close_exec_pager.paginate(
                domain=domain_name,
                executionFilter={
                    'workflowId': workflow_id
                },
                startTimeFilter={
                    'oldestDate': datetime.datetime(2015, 1, 1)
                },
                reverseOrder=True):
            if 'executionInfos' in page:
                for exec_info in page['executionInfos']:
                    info_count += 1
                    self.assertEqual(
                        exec_info['execution']['workflowId'],
                        workflow_id,
                        "workflowId")
                    self.assertEqual(
                        exec_info['execution']['runId'],
                        run_id,
                        "runId")
                    self.assertEqual(
                        exec_info['workflowType']['name'],
                        workflow_type.name,
                        "type name")
                    self.assertEqual(
                        exec_info['workflowType']['version'],
                        workflow_type.version,
                        "type version")
                    self.assertTrue(
                        ('closeTimestamp' in exec_info) and exec_info['closeTimestamp'] is not None,
                        "closeTimestamp was incorrectly set")
                    self.assertEqual(
                        exec_info['closeStatus'],
                        'TERMINATED',
                        "closeStatus was incorrectly set")
                    self.assertTrue(
                        ('parent' not in exec_info) or exec_info['parent'] is None,
                        "parent was incorrectly set")
                    self.assertEqual(
                        exec_info['tagList'],
                        tagList,
                        "tagList set wrong")
                    self.assertTrue(
                        not exec_info['cancelRequested'],
                        'cancelRequested should be false')
                    # {
                    #     'execution': {
                    #         'workflowId': 'string',
                    #         'runId': 'string'
                    #     },
                    #     'workflowType': {
                    #         'name': 'string',
                    #         'version': 'string'
                    #     },
                    #     'startTimestamp': datetime(2015, 1, 1),
                    #     'closeTimestamp': datetime(2015, 1, 1),
                    #     'executionStatus': 'OPEN'|'CLOSED',
                    #     'closeStatus': 'COMPLETED'|'FAILED'|'CANCELED'|'TERMINATED'|'CONTINUED_AS_NEW'|'TIMED_OUT',
                    #     'parent': {
                    #         'workflowId': 'string',
                    #         'runId': 'string'
                    #     },
                    #     'tagList': [
                    #         'string',
                    #     ],
                    #     'cancelRequested': True|False
                    # },
        self.assertEqual(
            info_count,
            1,
            'closed workflow count')


class DecisionTaskTestCase(unittest.TestCase):
    def test_PollForDecisionTask_terminated(self):
        swf = util.BasicSwfSetup(self)
        domain_name = swf.create_domain()
        workflow_type = swf.create_workflow_type()
        workflow_id, run_id = swf.start_workflow_execution(workflow_type)

        # Poll for a decision in the background.
        poller_wait = Queue()
        tester_wait = Queue()
        def decision_poller():
            poller_wait.get()
            try:
                response = swf.poll_for_decision()
                if response is None:
                    results = []
                else:
                    results = response['events']
                tester_wait.put([True, results])
            except:
                tester_wait.put([False, sys.exc_info()[1]])

        t = threading.Thread(target=decision_poller)
        t.daemon = True
        t.start()

        # Request the workflow to die
        swf.client.terminate_workflow_execution(
            domain=domain_name,
            workflowId=workflow_id,
            reason='Stop test',
            details='Stopped'
        )
        # Tell the decision that we've made the event post
        poller_wait.put(0)

        # Wait for the decision to post the result
        events = tester_wait.get()
        if not events[0]:
            raise events[1]
        events = events[1]

        # It should have a started workflow and terminated workflow entries.
        self.assertTrue(len(events) > 1, "Not enough events: " + repr(events))

        # FIXME check result in more detail


if __name__ == '__main__':
    unittest.main()
