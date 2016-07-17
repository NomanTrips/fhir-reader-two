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

patientControllers.controller('PatientDetailCtrl', ['Patient', '$mdSidenav', '$routeParams', 'ConditionList', 'PrescriptionList', 'Medication', 'ProcedureList', '$location', '$anchorScroll',
  function (Patient, $mdSidenav, $routeParams, ConditionList, PrescriptionList, Medication, ProcedureList, $location, $anchorScroll) {
  var patientDetail = this;
  patientDetail.medications = [];
  var category = '';


  patientDetail.isSelectedCategory = function(category) {
    if (category == patientDetail.category) {
      return true;
    } else {
      return false;
    }

  };

  patientDetail.scrollTo = function(category) {
    
    if (category != patientDetail.category) {
      patientDetail.category = category;  
    } else {
      patientDetail.category = ''; // Clear the category if the button is clicked again
    }


    var old = $location.hash();
    $location.hash(category);
    $anchorScroll();
    $location.hash(old);
  };

  Patient.get({id: $routeParams.id})
    .$promise.then(function(patient) {
      patientDetail.patient = patient;
    });
  
  ConditionList.get({id: $routeParams.id})
    .$promise.then(function(conditions) {
      patientDetail.isConditionsReturned = conditions.$resolved;
      patientDetail.conditionEntries = conditions.entry;
    });

  ProcedureList.get({id: $routeParams.id})
    .$promise.then(function(procedures) {
      patientDetail.isProceduresReturned = procedures.$resolved;
      patientDetail.procedureEntries = procedures.entry;
    });

  PrescriptionList.get({id: $routeParams.id})
   .$promise.then(function(prescriptions) {
    patientDetail.isPrescriptionsReturned = prescriptions.$resolved;
    patientDetail.prescriptionEntries = prescriptions.entry;
    
    angular.forEach(patientDetail.prescriptionEntries, function(value, key) {
  
      var medicationRef = value.resource.medication.reference;
      var slashIndex = medicationRef.indexOf("/");
      var medicationId = medicationRef.substring((slashIndex +1), medicationRef.length);

      Medication.get({id: medicationId})
        .$promise.then(function(med) {
          patientDetail.medications.push(med);
      });
    });

  });

  patientDetail.tableOfContents = ['Conditions', 'Medications', 'Operations & Surgeries', 'Lab results', 'Problems', 'Allergies', 'Social status'];

}]);

