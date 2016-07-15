'use strict';
     
var patientControllers = angular.module('patientControllers', []);

patientControllers.controller('PatientListCtrl', ['$scope', 'PatientList',
  function($scope, PatientList) {
    $scope.patients = PatientList.query();
    $scope.patientEntries = function() {
        return $scope.patients.entry;
    };
    $scope.orderProp = 'name';
  }]);

patientControllers.controller('PatientDetailCtrl', ['$scope', '$routeParams', 'Patient', 'ConditionList',
  function($scope, $routeParams, Patient, ConditionList) {
    //$scope.conditions = ConditionList.query($routeParams.id);

    $scope.conditions = ConditionList.get({id: $routeParams.id}, function(patient) {
    	$scope.conditionEntries = function() {
        	return $scope.conditions.entry;
    	};
    });
	$scope.patient = Patient.get({id: $routeParams.id}, function(patient) {

    });
  }]);
