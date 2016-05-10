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

    def test_ListDomains_RegisterDomain_DescribeDomain_DeprecateDomain(self):
        swf = util.BasicSwfSetup(self)
        new_domain_name = util.create_new_name()

        # ListDomains
        domain_pager = swf.client.get_paginator('list_domains')
        known_domains = []
        for page in domain_pager.paginate(
                registrationStatus='REGISTERED',
                reverseOrder=False):
            if 'domainInfos' in page:
                for domainInfo in page['domainInfos']:
                    known_domains.append(domainInfo['name'])

        # RegisterDomain
        # :: boto3 doesn't return anything
        swf.client.register_domain(
            name=new_domain_name,
            description='domain for ' + new_domain_name,
            workflowExecutionRetentionPeriodInDays='1'
        )

        # ListDomains
        domain_pager = swf.client.get_paginator('list_domains')
        found = False
        for page in domain_pager.paginate(
                registrationStatus='REGISTERED',
                maximumPageSize=10,
                reverseOrder=False):
            if 'domainInfos' in page:
                for domainInfo in page['domainInfos']:
                    self.assertTrue(
                        domainInfo['name'] in known_domains or domainInfo['name'] == new_domain_name,
                        'Found unexpected domain {0}'.format(domainInfo['name']))
                    found = found or domainInfo['name'] == new_domain_name
        self.assertTrue(found, 'Did not find new domain')

        # DescribeDomain
        domain = swf.client.describe_domain(name=new_domain_name)
        self.assertEqual(new_domain_name, domain['domainInfo']['name'],
            'incorrect name')
        self.assertEqual('REGISTERED', domain['domainInfo']['status'],
            'incorrect status')
        self.assertEqual('domain for ' + new_domain_name, domain['domainInfo']['description'],
            'incorrect description')

        # TODO implement DeprecateDomain then add tests

    def test_Page_ListDomains(self):
        """Test the paging controls, which is fairly common functionality
        reused by lots of different APIs."""
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


if __name__ == '__main__':
    unittest.main()
