#!/usr/bin/python3

import unittest
from botocore.exceptions import ClientError
import sys
import datetime
import threading
from queue import Queue

from . import util


class LambdaTaskTestCase(unittest.TestCase):
    # ========================================================================
    # ========================================================================
    # ========================================================================
    def test_PollForActivityTask(self):
        swf = util.BasicSwfSetup(self)
        function_name = swf.upload_lambda('SimpleLambda', 'simple_lambda.js')
        domain_name = swf.create_domain()
        workflow_type = swf.create_workflow_type()
        workflow_id, run_id = swf.start_workflow_execution(workflow_type)

        decision_task = swf.poll_for_decision()
        swf.assert_workflow_state(decision_task)
        swf.assert_has_event(decision_task, 'WorkflowExecutionStarted')
        lambda_activity_id = 'Simple Lambda Invocation'
        lambda_input = 'Test Input'
        swf.client.respond_decision_task_completed(
            taskToken=decision_task['taskToken'],
            decisions=[
                {
                    'decisionType': 'ScheduleLambdaFunction',
                    'scheduleLambdaFunctionDecisionAttributes': {
                        'id': lambda_activity_id,
                        'input': lambda_input,
                        'name': 'SimpleLambda'
                    }
                }
            ]
        )

        lambda_ordered_events = [
            'LambdaFunctionScheduled',
            'LambdaFunctionStarted',
            'LambdaFunctionCompleted'
        ]
        decision_task = swf.poll_for_decision()
        # FIXME DEBUG
        print('Decision Events:')
        for event in decision_task['events']:
            print(' - ' + event['eventType'])
        for lambda_event_name in lambda_ordered_events:
            swf.assert_workflow_state(decision_task)
            print('... checking for ' + lambda_event_name)
            event, attributes = util.get_event(lambda_event_name, decision_task['events'])
            if event is None:
                # Need to complete the previous decision first
                swf.client.respond_decision_task_completed(
                    taskToken=decision_task['taskToken'],
                    decisions=[]
                )
                print('... needing to poll again')
                decision_task = swf.poll_for_decision()
                swf.assert_workflow_state(decision_task)
                # FIXME DEBUG
                print('Decision Events:')
                for event in decision_task['events']:
                    print(' - ' + event['eventType'])
                event, attributes = util.get_event(lambda_event_name, decision_task['events'])
            self.assertIsNotNone(event, 'Did not find ' + lambda_event_name)
        self.assertIn('result', attributes, '[result] not in completed lambda function')
        self.assertEqual(lambda_input, attributes['result'], 'Did not return correct lambda result')
        swf.client.respond_decision_task_completed(
            taskToken=decision_task['taskToken'],
            decisions=[
                {
                    'decisionType': 'CompleteWorkflowExecution',
                    'completeWorkflowExecutionDecisionAttributes': {}
                }
            ]
        )

    # ========================================================================
    # ========================================================================
    # ========================================================================
    def test_LambdaInvokingWorkflow(self):
        swf = util.BasicSwfSetup(self)
        function_name = swf.upload_lambda('SignalLambda', 'signal_lambda.js')
        domain_name = swf.create_domain()
        workflow_type = swf.create_workflow_type()
        workflow_id, run_id = swf.start_workflow_execution(workflow_type)

        decision_task = swf.poll_for_decision()
        swf.assert_workflow_state(decision_task)
        swf.assert_has_event(decision_task, 'WorkflowExecutionStarted')
        lambda_activity_id = 'Signal Workflow Lambda Invocation'
        signal_input = util.create_new_name()
        signal_name = 'Lambda signal'
        lambda_input = ('{"domain": "' + domain_name +
            '","workflowId": "' + workflow_id +
            '","signalName": "' + signal_name +
            '","input": "' + signal_input +
            '"}')
        swf.client.respond_decision_task_completed(
            taskToken=decision_task['taskToken'],
            decisions=[
                {
                    'decisionType': 'ScheduleLambdaFunction',
                    'scheduleLambdaFunctionDecisionAttributes': {
                        'id': lambda_activity_id,
                        'name': 'SignalLambda',
                        'input': lambda_input
                    }
                }
            ]
        )

        lambda_ordered_events = [
            'LambdaFunctionScheduled',
            'LambdaFunctionStarted',
            'WorkflowExecutionSignaled',
            'LambdaFunctionCompleted'
        ]
        decision_task = swf.poll_for_decision()
        # FIXME DEBUG
        print('Decision Events:')
        for event in decision_task['events']:
            print(' - ' + event['eventType'])
        for lambda_event_name in lambda_ordered_events:
            swf.assert_workflow_state(decision_task)
            print('... checking for ' + lambda_event_name)
            event, attributes = util.get_event(lambda_event_name, decision_task['events'])
            if event is None:
                # Need to complete the previous decision first
                swf.client.respond_decision_task_completed(
                    taskToken=decision_task['taskToken'],
                    decisions=[]
                )
                print('... needing to poll again')
                decision_task = swf.poll_for_decision()
                swf.assert_workflow_state(decision_task)
                # FIXME DEBUG
                print('Decision Events:')
                for event in decision_task['events']:
                    print(' - ' + event['eventType'])
                event, attributes = util.get_event(lambda_event_name, decision_task['events'])
            self.assertIsNotNone(event, 'Did not find ' + lambda_event_name)
        swf.client.respond_decision_task_completed(
            taskToken=decision_task['taskToken'],
            decisions=[
                {
                    'decisionType': 'CompleteWorkflowExecution',
                    'completeWorkflowExecutionDecisionAttributes': {}
                }
            ]
        )
        event, attributes = util.get_event('WorkflowExecutionSignaled', decision_task['events'])
        self.assertIsNotNone(event, 'Could not find WorkflowExecutionSignaled in history')
        self.assertIn('signalName', attributes, 'signalName not in signal event')
        self.assertEqual(attributes['signalName'], signal_name, 'signalName not set right')
        self.assertIn('input', attributes, 'input not in signal event')
        self.assertEqual(attributes['input'], signal_input, 'input not set right')






if __name__ == '__main__':
    unittest.main()
