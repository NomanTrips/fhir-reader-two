'use strict';

/* Services */

var patientServices = angular.module('patientServices', ['ngResource']);

patientServices.factory('Patient', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/Patient/:id', {}, {
      query: {method:'GET', params:{id:'patients'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

var patientListServices = angular.module('patientListServices', ['ngResource']);

patientListServices.factory('PatientList', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/Patient', {}, {
      query: {method:'GET', params:{}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

var conditionListServices = angular.module('conditionListServices', ['ngResource']);

conditionListServices.factory('ConditionList', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/Condition?patient=:id', {}, {
      query: {method:'GET', params:{id:'patients'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

var prescriptionListServices = angular.module('prescriptionListServices', ['ngResource']);

prescriptionListServices.factory('PrescriptionList', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/MedicationPrescription?patient=:id', {}, {
      query: {method:'GET', params:{id:'patients'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

var medicationServices = angular.module('medicationServices', ['ngResource']);

medicationServices.factory('Medication', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/Medication/:id', {}, {
      query: {method:'GET', params:{id:'patients'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);

var procedureListServices = angular.module('procedureListServices', ['ngResource']);

procedureListServices.factory('ProcedureList', ['$resource',
  function($resource){
    return $resource('http://www.fhirbridge.net/Procedure?subject=:id', {}, {
      query: {method:'GET', params:{id:'patients'}, isArray:false, headers:{'Accept':'application/json; charset=UTF-8'} }
    });
  }]);


