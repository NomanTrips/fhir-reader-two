'use strict';

/* Services */

var resourceByIdServices = angular.module('resourceByIdServices', ['ngResource']);

resourceByIdServices.factory('ResourceById', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/:resource/:id', {}, {
      query: {method:'GET', params:{id:'id', resource: 'resource'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

var resourceListServices = angular.module('resourceListServices', ['ngResource']);

resourceListServices.factory('Resources', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/:resource?patient=:id', {}, {
      query: {method:'GET', params:{id:'patients', resource: 'resource'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

var procedureListServices = angular.module('procedureListServices', ['ngResource']);

procedureListServices.factory('ProcedureList', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/Procedure?subject=:id', {}, {
      query: {method:'GET', params:{id:'patients'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);


