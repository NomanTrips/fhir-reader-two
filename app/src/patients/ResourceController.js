'use strict';

var resourceControllers = angular.module('resourceControllers', []);

resourceControllers.controller('ResourceCtrl', ['$mdSidenav', '$routeParams', 'ResourceList', '$location',
  function ($mdSidenav, $routeParams, ResourceList, $location) {
  var resourceDetail = this;
  var resourceType = '';
  resourceDetail.resList = false;

  resourceDetail.isSelectedType = function(type) {
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

  resourceDetail.navigateToResource = function(id) {
     var url = '/patients/'+ id;
      $location.path(url);
    };
    

}]);

