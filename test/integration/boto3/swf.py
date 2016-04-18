#!/usr/bin/python3

import unittest
from botocore.exceptions import ClientError
from .aws_common import create_client
import uuid
import sys
import datetime
import threading
from queue import Queue


class Boto3SwfTestCase(unittest.TestCase):
    """
    Integration tests for an SWF message server.
    """

    def test_ListDomains_RegisterDomain_DescribeDomain_DeprecateDomain(self):
        swf = create_client('swf')
        new_domain_name = uuid.uuid4().urn

        # ListDomains
        domain_pager = swf.get_paginator('list_domains')
        known_domains = []
        for page in domain_pager.paginate(
                registrationStatus='REGISTERED',
                reverseOrder=False):
            if 'domainInfos' in page:
                for domainInfo in page['domainInfos']:
                    known_domains.append(domainInfo['name'])

        # RegisterDomain
        # :: boto3 doesn't return anything
        swf.register_domain(
            name=new_domain_name,
            description='domain for ' + new_domain_name,
            workflowExecutionRetentionPeriodInDays='1'
        )

        # ListDomains
        domain_pager = swf.get_paginator('list_domains')
        found = False
        for page in domain_pager.paginate(
                registrationStatus='REGISTERED',
                reverseOrder=False):
            if 'domainInfos' in page:
                for domainInfo in page['domainInfos']:
                    self.assertTrue(
                        domainInfo['name'] in known_domains or domainInfo['name'] == new_domain_name,
                        'Found unexpected domain {0}'.format(domainInfo['name']))
                    found = found or domainInfo['name'] == new_domain_name
        self.assertTrue(found, 'Did not find new domain')

        # DescribeDomain
        domain = swf.describe_domain(name=new_domain_name)
        self.assertEqual(new_domain_name, domain['domainInfo']['name'],
            'incorrect name')
        self.assertEqual('REGISTERED', domain['domainInfo']['status'],
            'incorrect status')
        self.assertEqual('domain for ' + new_domain_name, domain['domainInfo']['description'],
            'incorrect description')

        # TODO implement DeprecateDomain then add tests


    def test_ListWorkflowTypes_RegisterWorkflowType_DescribeWorkflowType_DeprecateWorkflowType(self):
        swf = create_client('swf')
        new_domain_name = uuid.uuid4().urn
        swf.register_domain(
            name=new_domain_name,
            description='domain for ' + new_domain_name,
            workflowExecutionRetentionPeriodInDays='1'
        )

        # ListWorkflowTypes
        workflow_type_pager = swf.get_paginator('list_workflow_types')
        known_workflow_types = []
        for page in workflow_type_pager.paginate(
                domain=new_domain_name,
                registrationStatus='REGISTERED',
                reverseOrder=False):
            if 'typeInfos' in page:
                for type_info in page['typeInfos']:
                    known_workflow_types.append(type_info['workflowType']['name'])

        # RegisterWorkflowType
        # :: boto3 doesn't return anything
        new_workflow_type_name = uuid.uuid4().urn
        swf.register_workflow_type(
            domain=new_domain_name,
            name=new_workflow_type_name,
            version='1.0',
            description='workflow type ' + new_workflow_type_name,
            defaultTaskStartToCloseTimeout='1000',
            defaultExecutionStartToCloseTimeout='2000',
            defaultTaskList={'name': 'task_list'},
            defaultTaskPriority='-2',
            defaultChildPolicy='TERMINATE',
            defaultLambdaRole='lambda-role')


        # ListWorkflowTypes
        workflow_type_pager = swf.get_paginator('list_workflow_types')
        found = False
        for page in workflow_type_pager.paginate(
                domain=new_domain_name,
                registrationStatus='REGISTERED',
                reverseOrder=False):
            if 'typeInfos' in page:
                for type_info in page['typeInfos']:
                    name = type_info['workflowType']['name']
                    self.assertTrue(
                        name in known_workflow_types or name == new_workflow_type_name,
                        'Found unexpected workflow type {0}'.format(name))
                    found = found or name == new_workflow_type_name
        self.assertTrue(found, 'Did not find new workflow type')


        # DescribeWorkflowType
        workflow_type = swf.describe_workflow_type(
            domain=new_domain_name,
            workflowType={
                'name': new_workflow_type_name,
                'version': '1.0'
            }
        )
        self.assertEqual(
            new_workflow_type_name,
            workflow_type['typeInfo']['workflowType']['name'],
            "workflow type name")
        self.assertEqual(
            '1.0',
            workflow_type['typeInfo']['workflowType']['version'],
            "workflow type version")
        self.assertEqual(
            'REGISTERED',
            workflow_type['typeInfo']['status'],
            "workflow type status")
        self.assertEqual(
            'task_list',
            workflow_type['configuration']['defaultTaskList']['name'],
            "default task list name")


        # TODO implement DeprecateWorkflowType then add tests


    def test_ListActivityTypes_RegisterActivityType_DescribeActivityType_DeprecateActivityType(self):
        swf = create_client('swf')
        new_domain_name = uuid.uuid4().urn
        swf.register_domain(
            name=new_domain_name,
            description='domain for ' + new_domain_name,
            workflowExecutionRetentionPeriodInDays='1'
        )

        # ListActivityTypes
        activity_type_pager = swf.get_paginator('list_activity_types')
        known_activity_types = []
        for page in activity_type_pager.paginate(
                domain=new_domain_name,
                registrationStatus='REGISTERED',
                reverseOrder=True):
            if 'typeInfos' in page:
                for type_info in page['typeInfos']:
                    known_activity_types.append(type_info['activityType']['name'])

        # RegisterActivityType
        # :: boto3 does not return anything
        new_activity_type_name = uuid.uuid4().urn
        swf.register_activity_type(
            domain=new_domain_name,
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

        # Rerun ListActivityTypes to ensure it was registered
        activity_type_pager = swf.get_paginator('list_activity_types')
        found = False
        for page in activity_type_pager.paginate(
                domain=new_domain_name,
                registrationStatus='REGISTERED',
                reverseOrder=False):
            if 'typeInfos' in page:
                for type_info in page['typeInfos']:
                    name = type_info['activityType']['name']
                    self.assertTrue(
                        name in known_activity_types or name == new_activity_type_name,
                        'Found unexpected activity type {0}'.format(name))
                    found = found or name == new_activity_type_name
        self.assertTrue(found, 'Did not find new activity type')

        # DescribeActivityType
        activity_type = swf.describe_activity_type(
            domain=new_domain_name,
            activityType={
                'name': new_activity_type_name,
                'version': 'abcd'
            }
        )
        self.assertEqual(
            new_activity_type_name,
            activity_type['typeInfo']['activityType']['name'],
            "activity type name")
        self.assertEqual(
            'abcd',
            activity_type['typeInfo']['activityType']['version'],
            "activity type version")
        self.assertEqual(
            'REGISTERED',
            activity_type['typeInfo']['status'],
            "type status")
        self.assertEqual(
            "activity_task list",
            activity_type['configuration']['defaultTaskList']['name'],
            "default task list")

        # TODO implement DeprecateActivityType and add tests

    def test_ExecuteWorkflow_MissingDefault(self):
        swf = create_client('swf')
        new_domain_name = uuid.uuid4().urn
        swf.register_domain(
            name=new_domain_name,
            description='domain for ' + new_domain_name,
            workflowExecutionRetentionPeriodInDays='1'
        )
        new_workflow_type_name = uuid.uuid4().urn
        swf.register_workflow_type(
            domain=new_domain_name,
            name=new_workflow_type_name,
            version='1.0',
            description='workflow type ' + new_workflow_type_name,
            # defaultTaskStartToCloseTimeout='1000',
            # defaultExecutionStartToCloseTimeout='2000',
            # defaultTaskList={'name': 'task_list'},
            defaultTaskPriority='-2',
            defaultChildPolicy='TERMINATE',
            defaultLambdaRole='lambda-role')
        new_activity_type_name = uuid.uuid4().urn
        swf.register_activity_type(
            domain=new_domain_name,
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

        workflow_id = uuid.uuid4().urn.replace(":", "-")
        try:
            swf.start_workflow_execution(
                domain=new_domain_name,
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


    def test_StartWorkflowExecution_ListOpenWorkflowExecutions_TerminateWorkflow_ListClosedWorkflowExecutions(self):
        swf = create_client('swf')
        new_domain_name = uuid.uuid4().urn
        swf.register_domain(
            name=new_domain_name,
            description='domain for ' + new_domain_name,
            workflowExecutionRetentionPeriodInDays='1'
        )
        new_workflow_type_name = uuid.uuid4().urn
        task_list_name = new_workflow_type_name.replace(':', '_')
        swf.register_workflow_type(
            domain=new_domain_name,
            name=new_workflow_type_name,
            version='1.0',
            description='workflow type ' + new_workflow_type_name,
            defaultTaskStartToCloseTimeout='1000',
            defaultExecutionStartToCloseTimeout='2000',
            defaultTaskList={'name': task_list_name},
            defaultTaskPriority='-2',
            defaultChildPolicy='TERMINATE',
            defaultLambdaRole='lambda-role')
        workflow_id = uuid.uuid4().urn.replace(":", "-")

        # StartWorkflowExecution
        run_id = swf.start_workflow_execution(
            domain=new_domain_name,
            workflowId=workflow_id,
            workflowType={
                'name': new_workflow_type_name,
                'version': '1.0'
            },
            tagList=[ 'exec_' + workflow_id ]
        )['runId']

        # ListOpenWorkflowExecutions, filter on workflow id
        info_count = 0
        open_exec_pager = swf.get_paginator('list_open_workflow_executions')
        for page in open_exec_pager.paginate(
                domain=new_domain_name,
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
                        new_workflow_type_name,
                        exec_info['workflowType']['name'],
                        "type name")
                    self.assertEqual(
                        exec_info['workflowType']['version'],
                        '1.0',
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
                        [ 'exec_' + workflow_id ],
                        exec_info['tagList'],
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


        swf.terminate_workflow_execution(
            domain=new_domain_name,
            workflowId=workflow_id,
            reason='Stop test',
            details='Stopped'
        )

        # ListOpenWorkflowExecutions, filter on tag list
        open_exec_pager = swf.get_paginator('list_open_workflow_executions')
        for page in open_exec_pager.paginate(
                domain=new_domain_name,
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
        close_exec_pager = swf.get_paginator('list_closed_workflow_executions')
        for page in close_exec_pager.paginate(
                domain=new_domain_name,
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
                        new_workflow_type_name,
                        exec_info['workflowType']['name'],
                        "type name")
                    self.assertEqual(
                        exec_info['workflowType']['version'],
                        '1.0',
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
                        [ 'exec_' + workflow_id ],
                        exec_info['tagList'],
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



    def test_PollForDecisionTask_terminated(self):
        swf = create_client('swf')
        domain_name = uuid.uuid4().urn
        swf.register_domain(
            name=domain_name,
            description='domain for ' + domain_name,
            workflowExecutionRetentionPeriodInDays='1')
        workflow_type_name = uuid.uuid4().urn
        task_list_name = workflow_type_name.replace(':', '_')
        swf.register_workflow_type(
            domain=domain_name,
            name=workflow_type_name,
            version='1.0',
            description='workflow type ' + workflow_type_name,
            defaultTaskStartToCloseTimeout='1000',
            defaultExecutionStartToCloseTimeout='2000',
            defaultTaskList={'name': task_list_name},
            defaultTaskPriority='-2',
            defaultChildPolicy='TERMINATE',
            defaultLambdaRole='lambda-role')
        workflow_id = uuid.uuid4().urn.replace(":", "-")
        run_id = swf.start_workflow_execution(
            domain=domain_name,
            workflowId=workflow_id,
            workflowType={
                'name': workflow_type_name,
                'version': '1.0'
            },
            tagList=[ 'exec_' + workflow_id ]
        )['runId']

        # Poll for a decision in the background.
        q = Queue()
        def decision_poller():
            q.put(0)
            results = []
            decision_pager = swf.get_paginator('poll_for_decision_task')
            try:
                for page in decision_pager.paginate(
                        domain=domain_name,
                        taskList={
                            'name': task_list_name
                        },
                        identity='test_PollForDecisionTask_terminated',
                        reverseOrder=True):
                    if ('events' in page and 'workflowType' in page and page['workflowType']['name'] == workflow_type_name):
                        results.extend(page['events'])
                q.put([True, results])
            except:
                q.put([False, sys.exc_info()[1]])

        t = threading.Thread(target=decision_poller)
        t.daemon = True
        t.start()

        # Wait for the decision poller to report that it's ready.
        q.get()
        # Request the workflow to die
        swf.terminate_workflow_execution(
            domain=domain_name,
            workflowId=workflow_id,
            reason='Stop test',
            details='Stopped'
        )
        events = q.get()
        if not events[0]:
            raise events[1]
        events = events[1]

        # It should have a started workflow and terminated workflow entries.
        self.assertTrue(len(events) > 1, "Not enough events: " + repr(events))

        # FIXME check result in more detail




class QTestCase(unittest.TestCase):



    def test_QuickCheck(self):
        pass


if __name__ == '__main__':
    unittest.main()
