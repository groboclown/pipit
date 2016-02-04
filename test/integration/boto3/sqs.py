#!/usr/bin/python3

import unittest
from .aws_common import create_service
import uuid


class Boto3SqsTestCase(unittest.TestCase):
    """
    Integration tests for an SQS message server.
    """

    def test_ListQueues_CreateQueue_DeleteQueue(self):
        sqs = create_service('sqs')
        new_name = uuid.uuid4().urn

        # ListQueues
        known_queues = sqs.queues.all()

        # CreateQueue
        new_queue = sqs.create_queue(QueueName=new_name, Attributes={'DelaySeconds': '5'})

        # ListQueues
        found = False
        for queue in sqs.queues.all():
            self.assertTrue(queue in known_queues or queue == new_queue,
                'Found unexpected queue {0}'.format(queue.url))
            found = True
        self.assertTrue(found, 'Did not find new queue')

        # DeleteQueue
        new_queue.delete()

        # Ensure we have the non-cached queue list
        sqs = create_service('sqs')
        # ListQueues
        for queue in sqs.queues.all():
            self.assertTrue(queue in known_queues,
                'Found unexpected queue {0}'.format(queue.url))


    def test_AddPermission_RemovePermission(self):
        sqs = create_service('sqs')
        new_name = uuid.uuid4().urn
        new_queue = sqs.create_queue(QueueName=new_name)
        try:
            new_queue.add_permission(
                Label='AliceSendMessage',
                AWSAccountIds=['USER1', 'USER2'],
                Actions=['SendMessage', 'ReceiveMessage'])

            new_queue.remove_permission(Label='AliceSendMessage')
        finally:
            new_queue.delete()

    # Mock server doesn't actually care about permission policies, so that's not tested.



    def test_GetQueueAttributes_SetQueueAttributes(self):
        sqs = create_service('sqs')
        new_name = uuid.uuid4().urn
        new_queue = sqs.create_queue(QueueName=new_name)
        try:
            orig_attributes = new_queue.attributes
            self.assertNotEqual(orig_attributes['DelaySeconds'], '90',
                'test setup invalid: default queue delay seconds = 90')
            new_queue.set_attributes(Attributes={
                'DelaySeconds': '90'
            })
            # Reresh the attributes from the server
            new_queue.reload()
            new_attributes = new_queue.attributes
            self.assertEqual(new_attributes['DelaySeconds'], '90',
                'Delay seconds did not change')
        finally:
            new_queue.delete()


    def test_SendMessage_DeleteMessage_nodelay(self):
        sqs = create_service('sqs')
        new_name = uuid.uuid4().urn
        new_queue = sqs.create_queue(QueueName=new_name)
        try:
            message_body = 'My Message'
            message_keys = new_queue.send_message(MessageBody=message_body,
                DelaySeconds=0,
                MessageAttributes={
                    'AttrName': {
                        'StringValue': 'blah blah blah',
                        'DataType': 'String.Mine'
                    }
                })
            messages = new_queue.receive_messages()
            self.assertEqual(len(messages), 1,
                'incorrect message read count')
            self.assertEqual(messages[0].queue_url, new_queue.url,
                'did not match message queue url and source queue')
            # Attributes don't seem to be supported by boto3 right now.
            #self.assertNotEqual(messages[0].message_attributes, None,
            #    'no message attributes')
            #self.assertNotEqual(messages[0].message_attributes.get('AttrName'), None,
            #    'no AttrName message attribute')
            #self.assertEqual(messages[0].message_attributes.get('AttrName').get('StringValue'), "blah blah blah",
            #    'incorrect AttrName value')

            # Is the message acknowledged as existing?
            messages[0].change_visibility(VisibilityTimeout=10)

            messages[0].delete()
            try:
                messages[0].change_visibility(VisibilityTimeout=10)
                self.fail('Did not encounter problem changing visibility of deleted message; does it still exist?')
            except:
                pass
        finally:
            new_queue.delete()


    #def test_ChangeMessageVisibilityBatch(self):
    #    sqs = create_service('sqs')
    #    new_name = uuid.uuid4().urn
    #    new_queue = sqs.create_queue(QueueName=new_name)
    #    message_body = 'My Message'
    #    message_keys = new_queue.send_message(MessageBody=message_body,
    #        DelaySeconds=123,
    #        MessageAttributes={
    #            'AttrName': {
    #                'StringValue': 'blah blah blah',
    #                'DataType': 'String.Mine'
    #            }
    #        })
    #    message = None
    #    try:
    #        message = sqs.Message(new_queue.url, message_keys['MessageId'])
    #        message.change_visibility(VisibilityTimeout=10);
    #    finally:
    #        if message is not None:
    #            message.delete()
    #        new_queue.delete()






if __name__ == '__main__':
    unittest.main()
