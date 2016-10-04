'use strict';

patientApp.controller('PatientListCtrl', ['PatientList', '$mdSidenav', '$location',
  function (PatientList, $mdSidenav, $location) {
  this.selected = null;
  this.showTableOfContents = false;

  self.toggleSideNav = function() {
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

patientApp.controller('PatientDetailCtrl', ['$routeParams', 'fhirCalls',
  function ($routeParams, fhirCalls) {
  var patientDetail = this;
  var section = '';

  fhirCalls.fhirSearchById($routeParams.id, 'AllergyIntolerance')
     .then(function(entries){
        patientDetail.allergyEntries = entries;
     });

  fhirCalls.fhirSearchById($routeParams.id, 'Encounter')
     .then(function(entries){
        patientDetail.encounterEntries = entries;
     });

  fhirCalls.fhirSearchById($routeParams.id, 'Immunization')
     .then(function(entries){
        patientDetail.immunizationEntries = entries;
     });

  fhirCalls.fhirSearchById($routeParams.id, 'Condition')
     .then(function(entries){
        patientDetail.conditionEntries = entries;
     });

  fhirCalls.fhirSearchById($routeParams.id, 'Procedure')
     .then(function(entries){
        patientDetail.procedureEntries = entries;
     });

  fhirCalls.fhirGetById($routeParams.id, 'Patient')
     .then(function(patient){
        patientDetail.patient = patient;
     });

  fhirCalls.fhirSearchById($routeParams.id, 'MedicationPrescription')
    .then(function(entries){
      patientDetail.prescriptions = entries;
     
      angular.forEach(patientDetail.prescriptions, function(value, key) {
        var medicationRef = value.resource.medication.reference;
        var slashIndex = medicationRef.indexOf("/");
        var medicationId = medicationRef.substring((slashIndex +1), medicationRef.length);

        fhirCalls.fhirGetById(medicationId, 'Medication')
          .then(function(med){
            value.medication = med;
          });

      });

    });

  fhirCalls.fhirSearchById($routeParams.id, 'DiagnosticReport')
     .then(function(entries){
        patientDetail.diagnosticReportEntries = entries;
     });

  fhirCalls.fhirSearchById($routeParams.id, 'Observation')
     .then(function(entries){
        patientDetail.observationEntries = entries;
     });

  patientDetail.getSelectedSection = function() {
    return patientDetail.section;
  };

  patientDetail.setSelectedSection = function(section) {
    patientDetail.section = section;
  };

}]);

