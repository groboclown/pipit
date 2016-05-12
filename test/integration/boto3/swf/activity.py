#!/usr/bin/python3

import unittest
from botocore.exceptions import ClientError
import sys
import datetime
import threading
from queue import Queue

from . import util


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

        activity_id = workflow_type.name + ' Activity'
        activity_input = util.create_new_name()

        def decision_poller():
            response = swf.poll_for_decision(max_retry=3)
            self.assertIsNotNone(response, 'Did not get a response after 3 retries')
            swf.assert_workflow_state(response)
            self.assertIn('taskToken', response, 'Did not get a taskToken in ' + repr(response))
            task_token = response['taskToken']
            self.assertIsNotNone(task_token, 'Did not get a task token')
            self.assertIn('events', response, 'Did not get events in ' + repr(response))
            task_token = response['taskToken']
            events = response['events']

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

            activity_event_order = [
                'ActivityTaskScheduled',
                'ActivityTaskStarted',
                'ActivityTaskCompleted'
            ]
            response = swf.poll_for_decision(max_retry=4)
            swf.assert_workflow_state(response)
            print('Decision Events:')
            for event in response['events']:
                print(' - ' + event['eventType'])
            for activity_event_name in activity_event_order:
                event, attributes = util.get_event(activity_event_name, response['events'])
                if event is None:
                    print('... Polling for more events')
                    # First, close off this decision task.
                    swf.client.respond_decision_task_completed(
                        taskToken=response['taskToken'], decisions=[])
                    response = swf.poll_for_decision(max_retry=4)
                    print('Decision Events:')
                    for event in response['events']:
                        print(' - ' + event['eventType'])
                    event, attributes = util.get_event(activity_event_name, response['events'])
                    swf.assert_workflow_state(response)
                self.assertIsNotNone(event, 'did not find event for ' + activity_event_name)
            # Close the workflow
            swf.client.respond_decision_task_completed(
                taskToken=response['taskToken'],
                decisions=[
                    {
                        'decisionType': 'CompleteWorkflowExecution',
                        'completeWorkflowExecutionDecisionAttributes': {}
                    }
                ]
            )
            return response['events']


        # Activity processor which is activated by the decider
        def activity_poller():
            print('Activity task polling...')
            res = swf.poll_for_activity_task(max_retry=4)
            try:
                self.assertIsNotNone(res, 'Did not receive activity task after 4 retries')
                self.assertEqual(res['activityId'], activity_id, 'Activity ID did not match')
                self.assertEqual(res['workflowExecution']['workflowId'], workflow_id, 'Workflow ID did not match')
                self.assertIsNotNone(res['workflowExecution']['runId'], 'Workflow run ID does not exist')
                self.assertEqual(res['input'], activity_input, 'activity input does not match')
                print('Activity task response')
                swf.client.respond_activity_task_completed(
                    taskToken=res['taskToken'], result='Yay!'
                )
                return None
            except:
                if res is not None and 'taskToken' in res:
                    print('Activity task failed')
                    swf.client.respond_activity_task_failed(
                        taskToken=res['taskToken'],
                        reason='Test failure'
                    )
                raise

        dq = util.background_task(decision_poller)
        aq = util.background_task(activity_poller)

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
