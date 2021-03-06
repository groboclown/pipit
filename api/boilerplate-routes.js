'use strict';

const normalize = require('../lib/aws-common/normalize-route');
const normalizeVersions = normalize.normalizeVersions;

/**
* Maps the route from the URL path to the service's ActionMap.
* ----- AUTO-GENERATED CODE -----
*/
module.exports = {
  '/acm': normalize(require('./acm/boilerplate-2015-12-08.js')),
  '/apigateway': normalize(require('./apigateway/boilerplate-2015-07-09.js')),
  '/autoscaling': normalize(require('./autoscaling/boilerplate-2011-01-01.js')),
  '/cloudformation': normalize(require('./cloudformation/boilerplate-2010-05-15.js')),
  '/cloudfront/2016-01-28': normalizeVersions('2016-01-28', [require('./cloudfront/boilerplate-2016-01-28.js')]),
  '/cloudhsm': normalize(require('./cloudhsm/boilerplate-2014-05-30.js')),
  '/cloudsearch': normalize(require('./cloudsearch/boilerplate-2011-02-01.js')),
  '/cloudsearchdomain/2013-01-01': normalizeVersions('2013-01-01', [require('./cloudsearchdomain/boilerplate-2013-01-01.js')]),
  '/cloudtrail': normalize(require('./cloudtrail/boilerplate-2013-11-01.js')),
  '/codecommit': normalize(require('./codecommit/boilerplate-2015-04-13.js')),
  '/codedeploy': normalize(require('./codedeploy/boilerplate-2014-10-06.js')),
  '/codepipeline': normalize(require('./codepipeline/boilerplate-2015-07-09.js')),
  '/config': normalize(require('./config/boilerplate-2014-11-12.js')),
  '/datapipeline': normalize(require('./datapipeline/boilerplate-2012-10-29.js')),
  '/devicefarm': normalize(require('./devicefarm/boilerplate-2015-06-23.js')),
  '/directconnect': normalize(require('./directconnect/boilerplate-2012-10-25.js')),
  '/dms': normalize(require('./dms/boilerplate-2016-01-01.js')),
  '/ds': normalize(require('./ds/boilerplate-2015-04-16.js')),
  '/dynamodb': normalize(require('./dynamodb/boilerplate-2011-12-05.js')),
  '/ec2': normalize(require('./ec2/boilerplate-2015-10-01.js')),
  '/ecr': normalize(require('./ecr/boilerplate-2015-09-21.js')),
  '/ecs': normalize(require('./ecs/boilerplate-2014-11-13.js')),
  '/elasticache': normalize(require('./elasticache/boilerplate-2015-02-02.js')),
  '/elasticbeanstalk': normalize(require('./elasticbeanstalk/boilerplate-2010-12-01.js')),
  '/elasticfilesystem/2015-02-01': normalizeVersions('2015-02-01', [require('./elasticfilesystem/boilerplate-2015-02-01.js')]),
  '/elasticloadbalancing': normalize(require('./elasticloadbalancing/boilerplate-2012-06-01.js')),
  '/elasticmapreduce': normalize(require('./elasticmapreduce/boilerplate-2009-03-31.js')),
  '/elastictranscoder/2012-09-25': normalizeVersions('2012-09-25', [require('./elastictranscoder/boilerplate-2012-09-25.js')]),
  '/email': normalize(require('./email/boilerplate-2010-12-01.js')),
  '/es/2015-01-01': normalizeVersions('2015-01-01', [require('./es/boilerplate-2015-01-01.js')]),
  '/events': normalize(require('./events/boilerplate-2015-10-07.js')),
  '/firehose': normalize(require('./firehose/boilerplate-2015-08-04.js')),
  '/gamelift': normalize(require('./gamelift/boilerplate-2015-10-01.js')),
  '/glacier': normalize(require('./glacier/boilerplate-2012-06-01.js')),
  '/iam': normalize(require('./iam/boilerplate-2010-05-08.js')),
  '/importexport': normalize(require('./importexport/boilerplate-2010-06-01.js')),
  '/inspector': normalize(require('./inspector/boilerplate-2016-02-16.js')),
  '/iot': normalize(require('./iot/boilerplate-2015-05-28.js')),
  '/kinesis': normalize(require('./kinesis/boilerplate-2013-12-02.js')),
  '/kms': normalize(require('./kms/boilerplate-2014-11-01.js')),
  '/lambda/2014-11-13': normalizeVersions('2014-11-13', [require('./lambda/boilerplate-2014-11-11.js'), require('./lambda/boilerplate-2015-03-31.js')]),
  '/lambda/2015-03-31': normalizeVersions('2015-03-31', [require('./lambda/boilerplate-2015-03-31.js')]),
  '/logs': normalize(require('./logs/boilerplate-2014-03-28.js')),
  '/machinelearning': normalize(require('./machinelearning/boilerplate-2014-12-12.js')),
  '/marketplacecommerceanalytics': normalize(require('./marketplacecommerceanalytics/boilerplate-2015-07-01.js')),
  '/meteringmarketplace': normalize(require('./meteringmarketplace/boilerplate-2016-01-14.js')),
  '/mobileanalytics/2014-06-05': normalizeVersions('2014-06-05', [require('./mobileanalytics/boilerplate-2014-06-05.js')]),
  '/monitoring': normalize(require('./monitoring/boilerplate-2010-08-01.js')),
  '/opsworks': normalize(require('./opsworks/boilerplate-2013-02-18.js')),
  '/rds': normalize(require('./rds/boilerplate-2014-10-31.js')),
  '/redshift': normalize(require('./redshift/boilerplate-2012-12-01.js')),
  '/route53/2013-04-01': normalizeVersions('2013-04-01', [require('./route53/boilerplate-2013-04-01.js')]),
  '/route53domains': normalize(require('./route53domains/boilerplate-2014-05-15.js')),
  '/s3': normalize(require('./s3/boilerplate-2006-03-01.js')),
  '/sdb': normalize(require('./sdb/boilerplate-2009-04-15.js')),
  '/sns': normalize(require('./sns/boilerplate-2010-03-31.js')),
  '/sqs': normalize(require('./sqs/boilerplate-2012-11-05.js')),
  '/ssm': normalize(require('./ssm/boilerplate-2014-11-06.js')),
  '/storagegateway': normalize(require('./storagegateway/boilerplate-2013-06-30.js')),
  '/streams.dynamodb': normalize(require('./streams.dynamodb/boilerplate-2012-08-10.js')),
  '/sts': normalize(require('./sts/boilerplate-2011-06-15.js')),
  '/support': normalize(require('./support/boilerplate-2013-04-15.js')),
  '/swf': normalize(require('./swf/boilerplate-2012-01-25.js')),
  '/waf': normalize(require('./waf/boilerplate-2015-08-24.js')),
  '/workspaces': normalize(require('./workspaces/boilerplate-2015-04-08.js')),
};