
from .aws_common import gen_service_runner
import unittest
import uuid


class CliSqsTestCase(unittest.TestCase):

    def test_ListQueues_CreateQueue_DeleteQueue(self):
        run_cli = gen_service_runner('sqs')
        new_name = uuid.uuid4().urn

        # ListQueues
        known_queues = get_list(run_cli('list-queues')['QueueUrls'])

        # CreateQueue
        new_queue = run_cli('create-queue', '--queue-name', new_name)['QueueUrl']

        # ListQueues
        found = False
        for queue in get_list(run_cli('list-queues')['QueueUrls']):
            self.assertTrue(queue in known_queues or queue == new_queue,
                'Found unexpected queue {0}'.format(queue))
            found = True
        self.assertTrue(found, 'Did not find new queue')

        # DeleteQueue
        run_cli('delete-queue', '--queue-url', new_queue)

        # ListQueues
        for queue in get_list(run_cli('list-queues')['QueueUrls']):
            self.assertTrue(queue in known_queues,
                'Found unexpected queue {0}'.format(queue))

def get_list(val):
    if val is None:
        return []
    return val
