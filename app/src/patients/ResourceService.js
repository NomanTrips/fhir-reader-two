'use strict';

/* Services */

var resourceServices = angular.module('resourceServices', ['ngResource']);

resourceServices.factory('ResourceList', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/:type', {}, {
      query: {method:'GET', params:{type:''}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

