#!/usr/bin/python3

import unittest
from botocore.exceptions import ClientError
import sys
import datetime
import threading
from queue import Queue

from . import util


class DomainTestCase(unittest.TestCase):
    """
    Integration tests for SWF domains
    """

    #def test_ListDomains_RegisterDomain_DescribeDomain_DeprecateDomain(self):
    #    swf = util.BasicSwfSetup(self)
    #    new_domain_name = util.create_new_name()

    #    # ListDomains
    #    domain_pager = swf.client.get_paginator('list_domains')
    #    known_domains = []
    #    for page in domain_pager.paginate(
    #            registrationStatus='REGISTERED',
    #            reverseOrder=False):
    #        if 'domainInfos' in page:
    #            for domainInfo in page['domainInfos']:
    #                known_domains.append(domainInfo['name'])

    #    # RegisterDomain
    #    # :: boto3 doesn't return anything
    #    swf.client.register_domain(
    #        name=new_domain_name,
    #        description='domain for ' + new_domain_name,
    #        workflowExecutionRetentionPeriodInDays='1'
    #    )

    #    # ListDomains
    #    domain_pager = swf.client.get_paginator('list_domains')
    #    found = False
    #    for page in domain_pager.paginate(
    #            registrationStatus='REGISTERED',
    #            maximumPageSize=10,
    #            reverseOrder=False):
    #        if 'domainInfos' in page:
    #            for domainInfo in page['domainInfos']:
    #                self.assertTrue(
    #                    domainInfo['name'] in known_domains or domainInfo['name'] == new_domain_name,
    #                    'Found unexpected domain {0}'.format(domainInfo['name']))
    #                found = found or domainInfo['name'] == new_domain_name
    #    self.assertTrue(found, 'Did not find new domain')

    #    # DescribeDomain
    #    domain = swf.client.describe_domain(name=new_domain_name)
    #    self.assertEqual(new_domain_name, domain['domainInfo']['name'],
    #        'incorrect name')
    #    self.assertEqual('REGISTERED', domain['domainInfo']['status'],
    #        'incorrect status')
    #    self.assertEqual('domain for ' + new_domain_name, domain['domainInfo']['description'],
    #        'incorrect description')

    #    # TODO implement DeprecateDomain then add tests

    def test_Page_ListDomains(self):
        swf = util.BasicSwfSetup(self)

        created_domain_names = []
        for i in range(0, 100):
            new_domain_name = util.create_new_name()
            created_domain_names.append(new_domain_name)
            swf.client.register_domain(
                name=new_domain_name,
                description='domain for ' + new_domain_name,
                workflowExecutionRetentionPeriodInDays='1'
            )

        # ListDomains
        domain_pager = swf.client.get_paginator('list_domains')
        for page in domain_pager.paginate(
                registrationStatus='REGISTERED',
                maximumPageSize=10,
                reverseOrder=False):
            if 'domainInfos' in page:
                for domainInfo in page['domainInfos']:
                    if domainInfo['name'] in created_domain_names:
                        created_domain_names.remove(domainInfo['name'])
        self.assertTrue(len(created_domain_names) <= 0,
            'Did not find new domains ' + repr(created_domain_names))


class WorkflowTypeTestCase(unittest.TestCase):
    def test_ListWorkflowTypes_RegisterWorkflowType_DescribeWorkflowType_DeprecateWorkflowType(self):
        swf = util.BasicSwfSetup(self)
        domain_name = swf.create_domain()

        # ListWorkflowTypes
        workflow_type_pager = swf.client.get_paginator('list_workflow_types')
        known_workflow_types = []
        for page in workflow_type_pager.paginate(
                domain=domain_name,
                registrationStatus='REGISTERED',
                reverseOrder=False):
            if 'typeInfos' in page:
                for type_info in page['typeInfos']:
                    known_workflow_types.append(type_info['workflowType']['name'])

        # RegisterWorkflowType
        # :: boto3 doesn't return anything
        new_workflow_type_name = util.create_new_name()
        swf.client.register_workflow_type(
            domain=domain_name,
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
        workflow_type_pager = swf.client.get_paginator('list_workflow_types')
        found = False
        for page in workflow_type_pager.paginate(
                domain=domain_name,
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
        workflow_type = swf.client.describe_workflow_type(
            domain=domain_name,
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


class AcitivityTypeTestCase(unittest.TestCase):
    def test_ListActivityTypes_RegisterActivityType_DescribeActivityType_DeprecateActivityType(self):
        swf = util.BasicSwfSetup(self)
        domain_name = swf.create_domain()

        # ListActivityTypes
        activity_type_pager = swf.client.get_paginator('list_activity_types')
        known_activity_types = []
        for page in activity_type_pager.paginate(
                domain=domain_name,
                registrationStatus='REGISTERED',
                reverseOrder=True):
            if 'typeInfos' in page:
                for type_info in page['typeInfos']:
                    known_activity_types.append(type_info['activityType']['name'])

        # RegisterActivityType
        # :: boto3 does not return anything
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

        # Rerun ListActivityTypes to ensure it was registered
        activity_type_pager = swf.client.get_paginator('list_activity_types')
        found = False
        for page in activity_type_pager.paginate(
                domain=domain_name,
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
        activity_type = swf.client.describe_activity_type(
            domain=domain_name,
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


class ActivityTaskTestCase(unittest.TestCase):
    def test_PollForActivityTask(self):
        swf = util.BasicSwfSetup(self)
        domain_name = swf.create_domain()
        workflow_type = swf.create_workflow_type()
        activity_type = swf.create_activity_type()
        workflow_id, run_id = swf.start_workflow_execution(workflow_type)

        # Poll for a decision in the background.
        # This is a very simple decision processor that starts an activity
        # task, waits for it to stop, and terminates the workflow.

        # The queue is used to indicate that the decision task is terminated
        # either by an error or a success.
        dq = Queue()
        def poll_for_decision():
            decision_pager = swf.client.get_paginator('poll_for_decision_task')
            task_token = None
            events = []
            try:
                for page in decision_pager.paginate(
                        domain=domain_name,
                        taskList={'name': workflow_type.task_list_name},
                        identity='poll_for_decision test_PollForActivityTask',
                        reverseOrder=True):
                    if ('events' in page and 'workflowType' in page and page['workflowType']['name'] == workflow_type.name):
                        if 'taskToken' in page:
                            task_token = page['taskToken']
                        events.extend(page['events'])
            except:
                dq.put([False, sys.exc_info()[1]])
            return [task_token, events]

        activity_id = 'Activity test_PollForActivityTask'
        activity_input = util.create_new_name()
        def decision_poller():
            try:
                task_token, events = poll_for_decision()
                # Raises an exception that will be caught and reported in dq.
                self.assertTrue(task_token is not None, 'Did not get a task token')
                swf.client.respond_decision_task_completed(
                    taskToken=task_token,
                    decisions=[
                        {
                            'decisionType': 'ScheduleActivityTask',
                            'scheduleActivityTaskDecisionAttributes': {
                                'activityType': {
                                    'name': activity_type.name,
                                    'version': activity_type.version
                                },
                                'activityId': activity_id,
                                'input': activity_input
                            }
                        }
                    ]
                )
                # Wait for activity to finish
                for i in range(0, 4):
                    task_token, events = poll_for_decision()
                    event, attributes = util.get_event('ScheduleActivityTaskFailed', events)
                    self.assertTrue(event is None, 'encountered ' + repr(event))
                    event, attributes = util.get_event('ActivityTaskTimedOut', events)
                    self.assertTrue(event is None, 'encountered ' + repr(event))
                    event, attributes = util.get_event('ActivityTaskFailed', events)
                    self.assertTrue(event is None, 'encountered ' + repr(event))
                    event, attributes = util.get_event('ActivityTaskCanceled', events)
                    self.assertTrue(event is None, 'encountered ' + repr(event))
                    event, attributes = util.get_event('ActivityTaskCompleted', events)
                    if event is not None:
                        # Horray!
                        dq.put([True, events])
                        return
                self.fail('Did not encounter an ActivityTaskCompleted event after 4 tries')
            except:
                dq.put([False, sys.exc_info()[1]])

        t = threading.Thread(target=decision_poller)
        t.daemon = True
        t.start()

        # Activity processor
        aq = Queue()
        def activity_poller():
            res = None
            try:
                for i in range(0, 4):
                    print('DEBUG: polling for activity task')
                    res = swf.client.poll_for_activity_task(
                        domain=domain_name,
                        taskList={ 'name': activity_type.task_list_name },
                        identity='activity_poller test_PollForActivityTask'
                    )
                    if res is not None and 'taskToken' in res:
                        break
                self.assertTrue(res is not None and 'taskToken' in res, 'Did not receive activity task from poll')
                self.assertTrue(res is not None, 'Did not receive an activity poll after 4 retries')
                self.assertEqual(res['activityId'], activity_id, 'Activity ID did not match')
                self.assertEqual(res['workflowExecution']['workflowId'], workflow_id, 'Workflow ID did not match')
                self.assertTrue(res['workflowExecution']['runId'] is not None, 'Workflow run ID does not exist')
                self.assertEqual(res['input'], activity_input, 'activity input does not match')
                swf.client.respond_activity_task_completed(
                    taskToken=res['taskToken'], result='Yay!'
                )
                aq.put([True, None])
            except:
                try:
                    if res is not None:
                        # mark the activity as failed, for consistency
                        swf.respond_activity_task_failed(
                            taskToken=res['taskToken'],
                            reason='Test failure'
                        )
                except:
                    # Not the source of the problem, so don't directly report
                    print(repr(sys.exc_info()[1]))
                print(repr(sys.exc_info()[1]))
                aq.put([False, sys.exc_info()[1]])

        t = threading.Thread(target=activity_poller)
        t.daemon = True
        t.start()

        passed, events = dq.get()
        if not passed:
            raise events

        # It should have a started workflow and terminated workflow entries.
        self.assertTrue(len(events) > 1, "Not enough events: " + repr(events))

        # FIXME check events in more detail

        passed, error = aq.get()
        if not passed:
            raise error



if __name__ == '__main__':
    unittest.main()
