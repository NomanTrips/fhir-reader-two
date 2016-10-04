'use strict';

/* Services */

patientApp.factory('ResourceById', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/:resource/:id', {}, {
      query: {method:'GET', params:{id:'id', resource: 'resource'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

patientApp.factory('Resources', ['$resource',
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

patientApp.factory("fhirCalls", function($resource){
    
    var SearchById = $resource('http://www.fhirbridge.net/:resource?patient=:id', {}, {
        query: {method:'GET', params:{id:'patients', resource: 'resource'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
      });

    var Search = $resource('http://www.fhirbridge.net/:resource', {}, {
        query: {method:'GET', params:{id:'patients', resource: 'resource'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
      });

    var GetbyId = $resource('http://www.fhirbridge.net/:resource/:id', {}, {
        query: {method:'GET', params:{id:'patients', resource: 'resource'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
      });

    return {

      fhirSearchById: function(id, resourceType) {
        return SearchById.get({id: id, resource: resourceType})
          .$promise.then(function(bundle) {
            var data = bundle.entry;
            return data;
        });
      },

      fhirSearch: function(resourceType) {
        return Search.get({resource: resourceType})
          .$promise.then(function(bundle) {
            var data = bundle.entry;
            return data;
        });
      },
      
      fhirGetById: function(id, resourceType) {
        return GetbyId.get({id: id, resource: resourceType})
          .$promise.then(function(resource) {
            var data = resource;
            return data;
        });
      }  

    }

  });

  patientApp.factory("ServerConn", function($resource){
    
    return {

      fhirServerURL: function() {
        return "http://www.fhirbridge.net"
      },

      authServerURL: function() {
        return "http://www.mitre.auth.com"
      },

      clientName: function() {
        return "tarrytown-surgery-fhir"
      },
      
      clientSecret: function() {
        return "tarrytown-surgery-fhir"
      }

    }

  });

patientApp.factory('ProcedureList', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/Procedure?subject=:id', {}, {
      query: {method:'GET', params:{id:'patients'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);


