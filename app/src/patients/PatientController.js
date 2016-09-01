'use strict';
     
var patientControllers = angular.module('patientControllers', []);

patientControllers.controller('PatientListCtrl', ['PatientList', '$mdSidenav', '$location',
  function (PatientList, $mdSidenav, $location) {
  this.selected = null;
  this.showTableOfContents = false;

  this.togglePatientsList = function() {
      $mdSidenav('left').toggle();
    };

  this.selectPatient = function(patient) {
     var url = $location.url() +'/'+patient.resource.id;
      console.log(url);
      $location.path(url);
      this.selected = patient;
      this.showTableOfContents = true;
    };

  this.patientlist = PatientList.query();
    this.patientEntries = function() {
      return this.patientlist.entry;
    };


}]);

patientControllers.controller('PatientDetailCtrl', ['$routeParams', 'fhirCalls',
  function ($routeParams, fhirCalls) {
  var patientDetail = this;
  var section = '';

  fhirCalls.fhirSearch($routeParams.id, 'AllergyIntolerance')
     .then(function(entries){
        patientDetail.allergyEntries = entries;
     });

  fhirCalls.fhirSearch($routeParams.id, 'Encounter')
     .then(function(entries){
        patientDetail.encounterEntries = entries;
     });

  fhirCalls.fhirSearch($routeParams.id, 'Condition')
     .then(function(entries){
        patientDetail.conditionEntries = entries;
     });

  fhirCalls.fhirSearch($routeParams.id, 'Procedure')
     .then(function(entries){
        patientDetail.procedureEntries = entries;
     });

  fhirCalls.fhirGet($routeParams.id, 'Patient')
     .then(function(patient){
        patientDetail.patient = patient;
     });

  fhirCalls.fhirSearch($routeParams.id, 'MedicationPrescription')
    .then(function(entries){
      patientDetail.prescriptions = entries;
     
      angular.forEach(patientDetail.prescriptions, function(value, key) {
        var medicationRef = value.resource.medication.reference;
        var slashIndex = medicationRef.indexOf("/");
        var medicationId = medicationRef.substring((slashIndex +1), medicationRef.length);

        fhirCalls.fhirGet(medicationId, 'Medication')
          .then(function(med){
            value.medication = med;
          });

      });

    });

  patientDetail.getSelectedSection = function() {
    return patientDetail.section;
  };

  patientDetail.setSelectedSection = function(section) {
    patientDetail.section = section;
  };

}]);

