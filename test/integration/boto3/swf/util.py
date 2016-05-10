import uuid
import sys
from queue import Queue
import threading
from ..aws_common import create_client

def create_new_name():
    return uuid.uuid4().urn.replace(':', '_')


def background_task(task_func):
    """
    Run a task in the background.  This will return a Queue object that
    will have a value when the task_func exits.  If the task_func raises an
    error, then the Queue will return [False, error].  If it passes, then it
    will return [True, return value].
    """
    q = Queue()
    def background():
        try:
            ret  = task_func()
            q.put([True, ret])
        except:
            q.put([False, sys.exc_info()[1]])

    t = threading.Thread(target=background)
    t.daemon = True
    t.start()

    return q



class BasicSwfSetup(object):
    def __init__(self, test_instance):
        self.test_name = test_instance.__class__.__name__
        self.client = create_client('swf')
        self.domain_name = None
        self.workflow_types = []
        self.activity_types = []
        self.workflow_execution_count = 0

    @property
    def workflow_type(self):
        if len(self.workflow_types) <= 0:
            return None
        return self.workflow_types[0]

    @property
    def activity_type(self):
        if len(self.activity_types) <= 0:
            return None
        return self.activity_types[0]

    def create_domain(self, name=None):
        assert self.domain_name is None
        self.domain_name = name or create_new_name()
        self.client.register_domain(
            name=self.domain_name,
            description='domain for ' + self.domain_name,
            workflowExecutionRetentionPeriodInDays='1')
        return self.domain_name

    def create_workflow_type(self):
        workflow_type = WorkflowTypeDef(self.test_name, len(self.workflow_types))
        workflow_type.register(self.client, self.domain_name)
        self.workflow_types.append(workflow_type)
        return workflow_type

    def create_activity_type(self):
        activity_type = ActivityTypeDef(self.test_name, len(self.activity_types))
        activity_type.register(self.client, self.domain_name)
        self.activity_types.append(activity_type)
        return activity_type

    def start_workflow_execution(self, workflow_type, tagList=None):
        workflow_id = 'WorkflowRun ' + self.test_name + ' ' + workflow_type.index + '.' + str(self.workflow_execution_count)
        self.workflow_execution_count += 1
        run_id = self.client.start_workflow_execution(
            domain=self.domain_name,
            workflowId=workflow_id,
            workflowType={
                'name': workflow_type.name,
                'version': workflow_type.version
            },
            tagList=tagList or []
        )['runId']
        return workflow_id, run_id

    def poll_for_decision(self, task_list=None, max_retry=4, reverse_order=True, max_page_size=10):
        """Poll in the current thread.  This is different than the pager
        in that it doesn't loop forever performing the poll."""
        if task_list is None:
            task_list = self.workflow_type.task_list_name
        identity = 'Decider ' + task_list
        for i in range(0, max_retry):
            response = self.client.poll_for_decision_task(
                domain=self.domain_name,
                taskList={ "name": task_list },
                identity=identity,
                maximumPageSize=max_page_size,
                reverseOrder=reverse_order
            )
            if response is not None and 'taskToken' in response and len(response['taskToken']) > 0:
                events = []
                ret = {}
                ret['taskToken'] = response['taskToken']
                ret['startedEventId'] = response['startedEventId']
                ret['workflowExecution'] = response['workflowExecution']
                ret['workflowType'] = response['workflowType']
                ret['previousStartedEventId'] = ('previousStartedEventId' in response) and response['previousStartedEventId'] or None

                events.extend(response['events'])
                # page results
                while 'nextPageToken' in response and response['nextPageToken'] is not None:
                    nextPageToken = response['nextPageToken']
                    response = self.client.poll_for_decision_task(
                        domain=self.domain_name,
                        taskList={ "name": task_list },
                        identity=identity,
                        maximumPageSize=max_page_size,
                        reverseOrder=reverse_order,
                        nextPageToken=nextPageToken
                    )
                    if 'events' in response:
                        events.extend(response['events'])

                ret['events'] = events
                return ret
        return None



class WorkflowTypeDef(object):
    def __init__(self, test_name, index):
        self.name = 'WorkflowType ' + test_name + ' ' + str(index)
        self.index = str(index)
        self.version = '1.0'
        self.task_list_name = 'DecisionTaskList ' + test_name

    def register(self, swf, domain_name):
        swf.register_workflow_type(
            domain=domain_name,
            name=self.name,
            version=self.version,
            description='The ' + self.name,
            defaultTaskStartToCloseTimeout='60',
            defaultExecutionStartToCloseTimeout='120',
            defaultTaskList={'name': self.task_list_name},
            defaultTaskPriority='-2',
            defaultChildPolicy='TERMINATE',
            defaultLambdaRole='lambda-role')


class ActivityTypeDef(object):
    def __init__(self, test_name, index):
        self.name = 'ActivityType ' + test_name + ' ' + str(index)
        self.index = str(index)
        self.version = '1.0'
        self.task_list_name = 'ActivityTaskList ' + test_name

    def register(self, swf, domain_name):
        swf.register_activity_type(
            domain=domain_name,
            name=self.name,
            version=self.version,
            description='The ' + self.name,
            defaultTaskStartToCloseTimeout='60',
            defaultTaskHeartbeatTimeout='60',
            defaultTaskList={'name': self.task_list_name},
            defaultTaskScheduleToStartTimeout='60',
            defaultTaskScheduleToCloseTimeout='60')



def get_event(name, event_list):
    attr_name = name[0].lower() + name[1:] + 'EventAttributes';
    for event in event_list:
        if event['eventType'] == name and attr_name in event:
            return (event, event[attr_name])
    return (None, None)
