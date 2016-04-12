'use strict';

const awsCommon = require('../../lib/aws-common');

/**
 * Amazon CloudSearch version 2013-01-01
 *
 * --- TODO REMOVE WHEN IMPLEMENTED ---
 * AUTOGENERATED BY build-api.py
 */

// Setup input and output to use AWS protocol query
require('../../lib/aws-common/shape_http')('query', module.exports, 'http://cloudsearch.amazonaws.com/doc/2013-01-01/')
// -----------------------------------
module.exports.DescribeSuggesters = function DescribeSuggesters(aws) {
  var DomainName = aws.params['DomainName'];
  var SuggesterNames = aws.params['SuggesterNames'];
  var Deployed = aws.params['Deployed'] /* Type boolean */;
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    Suggesters: [ /*S1t*/{
      Options: /*S1p*/{
        DocumentSuggesterOptions: {
          SourceField: '',
          FuzzyMatching: '',
          SortExpression: '',
        },
        SuggesterName: '',
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DefineExpression = function DefineExpression(aws) {
  var Expression = aws.params['Expression'];
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!Expression) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Expression'];
  }


  // TODO implement code

  var ret = {
    Expression: /*S11*/{
      Options: /*Sy*/{
        ExpressionValue: '',
        ExpressionName: '',
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DefineIndexField = function DefineIndexField(aws) {
  var DomainName = aws.params['DomainName'];
  var IndexField = aws.params['IndexField'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!IndexField) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter IndexField'];
  }


  // TODO implement code

  var ret = {
    IndexField: /*S1n*/{
      Options: /*S13*/{
        LiteralOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: '',
        },
        TextArrayOptions: {
          HighlightEnabled: false,
          SourceFields: '',
          ReturnEnabled: false,
          DefaultValue: '',
          AnalysisScheme: '',
        },
        IndexFieldType: '',
        DateArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: '',
          SearchEnabled: false,
        },
        IndexFieldName: '',
        TextOptions: {
          SourceField: '',
          AnalysisScheme: '',
          SortEnabled: false,
          DefaultValue: '',
          ReturnEnabled: false,
          HighlightEnabled: false,
        },
        DoubleOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: 0.0 /*Double*/,
        },
        DoubleArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: 0.0 /*Double*/,
          SearchEnabled: false,
        },
        IntOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: 0 /*Long*/,
        },
        DateOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: '',
        },
        IntArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: 0 /*Long*/,
          SearchEnabled: false,
        },
        LiteralArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: '',
          SearchEnabled: false,
        },
        LatLonOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: '',
        },
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeScalingParameters = function DescribeScalingParameters(aws) {
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    ScalingParameters: /*S2p*/{
      Options: /*S2q*/{
        DesiredPartitionCount: 0,
        DesiredInstanceType: '',
        DesiredReplicationCount: 0,
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteDomain = function DeleteDomain(aws) {
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    DomainStatus: /*S8*/{
      SearchService: /*Sc*/{
        Endpoint: '',
      },
      Deleted: false,
      Limits: {
        MaximumPartitionCount: 0,
        MaximumReplicationCount: 0,
      },
      DomainName: '',
      DocService: /*Sc*/{
        Endpoint: '',
      },
      SearchInstanceType: '',
      RequiresIndexDocuments: false,
      DomainId: '',
      SearchInstanceCount: 0,
      Created: false,
      Processing: false,
      ARN: '',
      SearchPartitionCount: 0,
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteSuggester = function DeleteSuggester(aws) {
  var SuggesterName = aws.params['SuggesterName'];
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!SuggesterName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter SuggesterName'];
  }


  // TODO implement code

  var ret = {
    Suggester: /*S1t*/{
      Options: /*S1p*/{
        DocumentSuggesterOptions: {
          SourceField: '',
          FuzzyMatching: '',
          SortExpression: '',
        },
        SuggesterName: '',
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteIndexField = function DeleteIndexField(aws) {
  var IndexFieldName = aws.params['IndexFieldName'];
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!IndexFieldName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter IndexFieldName'];
  }


  // TODO implement code

  var ret = {
    IndexField: /*S1n*/{
      Options: /*S13*/{
        LiteralOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: '',
        },
        TextArrayOptions: {
          HighlightEnabled: false,
          SourceFields: '',
          ReturnEnabled: false,
          DefaultValue: '',
          AnalysisScheme: '',
        },
        IndexFieldType: '',
        DateArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: '',
          SearchEnabled: false,
        },
        IndexFieldName: '',
        TextOptions: {
          SourceField: '',
          AnalysisScheme: '',
          SortEnabled: false,
          DefaultValue: '',
          ReturnEnabled: false,
          HighlightEnabled: false,
        },
        DoubleOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: 0.0 /*Double*/,
        },
        DoubleArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: 0.0 /*Double*/,
          SearchEnabled: false,
        },
        IntOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: 0 /*Long*/,
        },
        DateOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: '',
        },
        IntArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: 0 /*Long*/,
          SearchEnabled: false,
        },
        LiteralArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: '',
          SearchEnabled: false,
        },
        LatLonOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: '',
        },
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateServiceAccessPolicies = function UpdateServiceAccessPolicies(aws) {
  var AccessPolicies = aws.params['AccessPolicies'];
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!AccessPolicies) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AccessPolicies'];
  }


  // TODO implement code

  var ret = {
    AccessPolicies: /*S2u*/{
      Options: '',
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DefineSuggester = function DefineSuggester(aws) {
  var Suggester = aws.params['Suggester'];
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!Suggester) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter Suggester'];
  }


  // TODO implement code

  var ret = {
    Suggester: /*S1t*/{
      Options: /*S1p*/{
        DocumentSuggesterOptions: {
          SourceField: '',
          FuzzyMatching: '',
          SortExpression: '',
        },
        SuggesterName: '',
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAnalysisSchemes = function DescribeAnalysisSchemes(aws) {
  var DomainName = aws.params['DomainName'];
  var Deployed = aws.params['Deployed'] /* Type boolean */;
  var AnalysisSchemeNames = aws.params['AnalysisSchemeNames'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    AnalysisSchemes: [ /*Ss*/{
      Options: /*Sl*/{
        AnalysisSchemeName: '',
        AnalysisSchemeLanguage: '',
        AnalysisOptions: {
          AlgorithmicStemming: '',
          StemmingDictionary: '',
          Stopwords: '',
          JapaneseTokenizationDictionary: '',
          Synonyms: '',
        },
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateScalingParameters = function UpdateScalingParameters(aws) {
  var DomainName = aws.params['DomainName'];
  var ScalingParameters = aws.params['ScalingParameters'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!ScalingParameters) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ScalingParameters'];
  }


  // TODO implement code

  var ret = {
    ScalingParameters: /*S2p*/{
      Options: /*S2q*/{
        DesiredPartitionCount: 0,
        DesiredInstanceType: '',
        DesiredReplicationCount: 0,
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeAvailabilityOptions = function DescribeAvailabilityOptions(aws) {
  var DomainName = aws.params['DomainName'];
  var Deployed = aws.params['Deployed'] /* Type boolean */;
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    AvailabilityOptions: /*S2a*/{
      Options: false,
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.CreateDomain = function CreateDomain(aws) {
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    DomainStatus: /*S8*/{
      SearchService: /*Sc*/{
        Endpoint: '',
      },
      Deleted: false,
      Limits: {
        MaximumPartitionCount: 0,
        MaximumReplicationCount: 0,
      },
      DomainName: '',
      DocService: /*Sc*/{
        Endpoint: '',
      },
      SearchInstanceType: '',
      RequiresIndexDocuments: false,
      DomainId: '',
      SearchInstanceCount: 0,
      Created: false,
      Processing: false,
      ARN: '',
      SearchPartitionCount: 0,
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.UpdateAvailabilityOptions = function UpdateAvailabilityOptions(aws) {
  var DomainName = aws.params['DomainName'];
  var MultiAZ = aws.params['MultiAZ'] /* Type boolean */;
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!MultiAZ) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter MultiAZ'];
  }


  // TODO implement code

  var ret = {
    AvailabilityOptions: /*S2a*/{
      Options: false,
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeServiceAccessPolicies = function DescribeServiceAccessPolicies(aws) {
  var DomainName = aws.params['DomainName'];
  var Deployed = aws.params['Deployed'] /* Type boolean */;
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    AccessPolicies: /*S2u*/{
      Options: '',
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteAnalysisScheme = function DeleteAnalysisScheme(aws) {
  var AnalysisSchemeName = aws.params['AnalysisSchemeName'];
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!AnalysisSchemeName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AnalysisSchemeName'];
  }


  // TODO implement code

  var ret = {
    AnalysisScheme: /*Ss*/{
      Options: /*Sl*/{
        AnalysisSchemeName: '',
        AnalysisSchemeLanguage: '',
        AnalysisOptions: {
          AlgorithmicStemming: '',
          StemmingDictionary: '',
          Stopwords: '',
          JapaneseTokenizationDictionary: '',
          Synonyms: '',
        },
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DefineAnalysisScheme = function DefineAnalysisScheme(aws) {
  var DomainName = aws.params['DomainName'];
  var AnalysisScheme = aws.params['AnalysisScheme'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!AnalysisScheme) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter AnalysisScheme'];
  }


  // TODO implement code

  var ret = {
    AnalysisScheme: /*Ss*/{
      Options: /*Sl*/{
        AnalysisSchemeName: '',
        AnalysisSchemeLanguage: '',
        AnalysisOptions: {
          AlgorithmicStemming: '',
          StemmingDictionary: '',
          Stopwords: '',
          JapaneseTokenizationDictionary: '',
          Synonyms: '',
        },
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeExpressions = function DescribeExpressions(aws) {
  var DomainName = aws.params['DomainName'];
  var Deployed = aws.params['Deployed'] /* Type boolean */;
  var ExpressionNames = aws.params['ExpressionNames'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    Expressions: [ /*S11*/{
      Options: /*Sy*/{
        ExpressionValue: '',
        ExpressionName: '',
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeDomains = function DescribeDomains(aws) {
  var DomainNames = aws.params['DomainNames'] /* Type list */;


  // TODO implement code

  var ret = {
    DomainStatusList: [ /*S8*/{
      SearchService: /*Sc*/{
        Endpoint: '',
      },
      Deleted: false,
      Limits: {
        MaximumPartitionCount: 0,
        MaximumReplicationCount: 0,
      },
      DomainName: '',
      DocService: /*Sc*/{
        Endpoint: '',
      },
      SearchInstanceType: '',
      RequiresIndexDocuments: false,
      DomainId: '',
      SearchInstanceCount: 0,
      Created: false,
      Processing: false,
      ARN: '',
      SearchPartitionCount: 0,
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.ListDomainNames = function ListDomainNames(aws) {


  // TODO implement code

  var ret = {
    DomainNames: {} /*Map*/,
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DescribeIndexFields = function DescribeIndexFields(aws) {
  var FieldNames = aws.params['FieldNames'] /* Type list */;
  var DomainName = aws.params['DomainName'];
  var Deployed = aws.params['Deployed'] /* Type boolean */;
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    IndexFields: [ /*S1n*/{
      Options: /*S13*/{
        LiteralOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: '',
        },
        TextArrayOptions: {
          HighlightEnabled: false,
          SourceFields: '',
          ReturnEnabled: false,
          DefaultValue: '',
          AnalysisScheme: '',
        },
        IndexFieldType: '',
        DateArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: '',
          SearchEnabled: false,
        },
        IndexFieldName: '',
        TextOptions: {
          SourceField: '',
          AnalysisScheme: '',
          SortEnabled: false,
          DefaultValue: '',
          ReturnEnabled: false,
          HighlightEnabled: false,
        },
        DoubleOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: 0.0 /*Double*/,
        },
        DoubleArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: 0.0 /*Double*/,
          SearchEnabled: false,
        },
        IntOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: 0 /*Long*/,
        },
        DateOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: '',
        },
        IntArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: 0 /*Long*/,
          SearchEnabled: false,
        },
        LiteralArrayOptions: {
          ReturnEnabled: false,
          SourceFields: '',
          FacetEnabled: false,
          DefaultValue: '',
          SearchEnabled: false,
        },
        LatLonOptions: {
          SourceField: '',
          FacetEnabled: false,
          SearchEnabled: false,
          SortEnabled: false,
          ReturnEnabled: false,
          DefaultValue: '',
        },
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    }, /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.DeleteExpression = function DeleteExpression(aws) {
  var ExpressionName = aws.params['ExpressionName'];
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }
  if (!ExpressionName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter ExpressionName'];
  }


  // TODO implement code

  var ret = {
    Expression: /*S11*/{
      Options: /*Sy*/{
        ExpressionValue: '',
        ExpressionName: '',
      },
      Status: /*St*/{
        State: '',
        UpdateDate: awsCommon.timestamp(),
        PendingDeletion: false,
        UpdateVersion: 0,
        CreationDate: awsCommon.timestamp(),
      },
    },
  };
  return [200, ret];
};
// -----------------------------------
module.exports.IndexDocuments = function IndexDocuments(aws) {
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    FieldNames: /*S4*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
// -----------------------------------
module.exports.BuildSuggesters = function BuildSuggesters(aws) {
  var DomainName = aws.params['DomainName'];
  if (!DomainName) {
    return [400, 'Sender', 'MissingParameter', 'Did not specify parameter DomainName'];
  }


  // TODO implement code

  var ret = {
    FieldNames: /*S4*/[ '', /* ...*/ ],
  };
  return [200, ret];
};
