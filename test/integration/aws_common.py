
import os
from boto3.session import Session


def create_service(service_id, api_version=None, user='USER_ACCESS_KEY'):
    def env(key, default_value):
        return key in os.environ and os.environ[key] or default_value
    session = Session(
        aws_access_key_id=user,
        aws_secret_access_key='SUPER_SECRET_KEY')
    endpoint = env('AWS_ENDPOINT', 'http://localhost:3000/')
    return session.resource(
        service_name=service_id,
        api_version=api_version,
        use_ssl=False,
        verify=False,
        region_name='moon-base-alpha',
        endpoint_url=endpoint + service_id + '/'
    )
