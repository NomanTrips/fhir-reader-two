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

  var fhirGet = function(id, resourceType) {
    $resource('http://www.fhirbridge.net/:resource?patient=:id', {}, {
      query: {method:'GET', params:{id:'id', resource: 'resourceType'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    }).$promise.then(function(bundle) {
      // patientDetail.isAllergiesReturned = allergies.$resolved;
      return bundle.entry;
    });


  }

  }]);

  var fhirServices = angular.module('fhirServices', ['ngResource']);
  fhirServices.factory("fhirCalls", function($resource){
    
    var Bundle = $resource('http://www.fhirbridge.net/:resource?patient=:id', {}, {
        query: {method:'GET', params:{id:'patients', resource: 'resource'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
      });

    var Res = $resource('http://www.fhirbridge.net/:resource/:id', {}, {
        query: {method:'GET', params:{id:'patients', resource: 'resource'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
      });

    return {
      fhirSearch: function(id, resourceType) {
        return Bundle.get({id: id, resource: resourceType})
          .$promise.then(function(bundle) {
          var data = bundle.entry;
          return data;
        });
      },
      
      fhirGet: function(id, resourceType) {
        return Res.get({id: id, resource: resourceType})
          .$promise.then(function(resource) {
          var data = resource;
          return data;
        });
      }  

    }

  });


var procedureListServices = angular.module('procedureListServices', ['ngResource']);

procedureListServices.factory('ProcedureList', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/Procedure?subject=:id', {}, {
      query: {method:'GET', params:{id:'patients'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

