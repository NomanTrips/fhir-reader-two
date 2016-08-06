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

patientControllers.controller('PatientDetailCtrl', ['$routeParams', 'Resources', 'ResourceById',
  function ($routeParams, Resources, ResourceById) {
  var patientDetail = this;
  patientDetail.medications = [];
  var section = '';

  patientDetail.getSelectedSection = function() {
    return patientDetail.section;
  };

  patientDetail.setSelectedSection = function(section) {
    patientDetail.section = section;
  };

  ResourceById.get({id: $routeParams.id, resource: 'Patient'})
    .$promise.then(function(patient) {
      patientDetail.patient = patient;
    });

  Resources.get({id: $routeParams.id, resource: 'AllergyIntolerance'})
    .$promise.then(function(allergies) {
      patientDetail.isAllergiesReturned = allergies.$resolved;
      patientDetail.allergyEntries = allergies.entry;
    });

  Resources.get({id: $routeParams.id, resource: 'Encounter'})
    .$promise.then(function(encounters) {
      patientDetail.isEncountersReturned = encounters.$resolved;
      patientDetail.encounterEntries = encounters.entry;
    });
  
  Resources.get({id: $routeParams.id, resource: 'Condition'})
    .$promise.then(function(conditions) {
      patientDetail.isConditionsReturned = conditions.$resolved;
      patientDetail.conditionEntries = conditions.entry;
    });

  Resources.get({id: $routeParams.id, resource: 'Procedure'})
    .$promise.then(function(procedures) {
      patientDetail.isProceduresReturned = procedures.$resolved;
      patientDetail.procedureEntries = procedures.entry;
    });

  Resources.get({id: $routeParams.id, resource: 'MedicationPrescription'})
   .$promise.then(function(prescriptions) {
    patientDetail.isPrescriptionsReturned = prescriptions.$resolved;
    patientDetail.prescriptionEntries = prescriptions.entry;
    
    angular.forEach(patientDetail.prescriptionEntries, function(value, key) {
  
      var medicationRef = value.resource.medication.reference;
      var slashIndex = medicationRef.indexOf("/");
      var medicationId = medicationRef.substring((slashIndex +1), medicationRef.length);

      ResourceById.get({id: medicationId, resource: 'Medication'})
        .$promise.then(function(med) {
          patientDetail.medications.push(med);
      });
    });

  });

}]);

