'use strict';

var resourceControllers = angular.module('resourceControllers', []);

resourceControllers.controller('ResourceCtrl', ['$mdSidenav', '$routeParams', 'ResourceList', '$location', 'fhirCalls', '$timeout', '$q', '$mdDialog',
  function ($mdSidenav, $routeParams, ResourceList, $location, fhirCalls, $timeout, $q, $mdDialog) {
  var self = this;
  //var resourceType = '';
  //resourceDetail.resList = false;

  self.status = '  ';
  self.customFullscreen = false;
  
  self.setSearchText = setSearchText;

  fhirCalls.fhirSearch('Patient')
     .then(function(entries){
        self.patientEntries = entries;
     });

  function setSearchText(text){
    self.searchText = text;
  }
      self.clientName = 'Tarrytown Surgery';
      self.servers = {"servers": [ {"server":{"name": "fhirbridge"}} , {"server":{"name": "hapi-fhir-public"}} ]};
      self.selectedServer;
      self.getSelectedServer = function() {
        if (self.selectedServer !== undefined) {
          return self.selectedServer.server.name;
        } else {
          return "Please select an server";
        }
      };
  self.setSelectedServer = function(server) {
    self.selectedServer = server;
  }


  /* resourceDetail.isSelectedType = function(type) {
    if (type == resourceDetail.resourceType) {
      return true;
    } else {
      return false;
    }

  };

  resourceDetail.isNoneSelected = function() {
    if (resourceDetail.resourceType == '') {
      return true;
    } else {
      return false;
    }

  };

  resourceDetail.loadResources = function(type) {  
    resourceDetail.resList = false; 
    if (type != resourceDetail.resourceType) {
      resourceDetail.resourceType = type;  
    } else {
      resourceDetail.resourceType = ''; // Clear the type if the button is clicked again
    }

  ResourceList.get({type: type})
      .$promise.then(function(resources) {
        resourceDetail.resList = resources.$resolved;
        resourceDetail.resourceEntries = resources.entry;
      });
  };
 */

  self.navToPatient = function(id) {
     var url = '/patients/'+ id;
      $location.path(url);
    };

  self.showFhirSettings = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      self.status = 'You said the information was "' + answer + '".';
    }, function() {
      self.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
   

}]);

