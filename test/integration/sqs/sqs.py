#!/usr/bin/python3

from boto3.session import Session
import os

def service(service_id, api_version=None):
    def service_decorator(func):
        def wrapper(config):
            config[service_id] = config['session'].resource(
                service_name=service_id,
                api_version=api_version,
                use_ssl=False,
                verify=False,
                region_name='moon-base-alpha',
                endpoint_url=config['endpoint'] + service_id + '/'
            )
            func(config)
        return wrapper
    return service_decorator




@service('sqs')
def test_ListQueues(config):
    sqs = config['sqs']

    for queue in sqs.queues.all():
        print(queue.url)



@service('sqs')
def test_manage_queues(config):
    sqs = config['sqs']

    known_queues = sqs.queues.all()
    new_queue = sqs.create_queue(QueueName='test', Attributes={'DelaySeconds': '5'})
    for queue in sqs.queues.all():
        print(queue.url)
        if queue not in known_queues and new_queue != queue:
            # FIXME Error
            raise Error("Unknown queue " + queue.ur)
    new_queue.delete()
    for queue in sqs.queues.all():
        print(queue.url)
        if queue not in known_queues:
            # FIXME Error
            raise Error("Unknown queue " + queue.ur)


def run(config):
    test_manage_queues(config)
    test_ListQueues(config)


if __name__ == '__main__':
    def env(key, default_value):
        return key in os.environ and os.environ[key] or default_value
    config = {
        'endpoint': env('AWS_ENDPOINT', 'http://localhost:3000/')
    }
    config['session'] = Session(
        aws_access_key_id='USER_ACCESS_KEY',
        aws_secret_access_key='SUPER_SECRET_KEY')
    run(config)
