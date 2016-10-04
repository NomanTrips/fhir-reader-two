'use strict';

// Declare app level module which depends on views, and components

var patientApp = angular.module('patientApp', [
  'ngRoute',
  'ngMaterial',
  'ngResource',
  'angularSpinner',
]).directive('contentsButton', ['$location', '$anchorScroll', function(location, anchorScroll) {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        scope: {
          section: '=',
          controllerGetSelected: '&getFn',
          controllerSetSelected: '&setFn'
        },
        // which markup this directive generates
        template: '<md-list-item>'+
                    '<md-button class="md-raised md-primary md-hue-1" ng-click="tableOfContentButtonClick()" ng-class="isSelectedSection() ? \'selected\' : \'unselected\'">' +
                      '{{sectionName()}}' +
                    '</md-button>' +
                  '</md-list-item>',
        link: function(scope, element, attrs){

          scope.sectionName = function() {           
            return scope.section;
          }

          scope.isSelectedSection = function() {           
            var selectedSection = scope.controllerGetSelected({arg1: scope.section});
            if (selectedSection == scope.section) {
              return true;
            } else {
              return false;
            }
          }
          
          scope.tableOfContentButtonClick = function() {
            scope.controllerSetSelected({arg1: scope.section});
            var old = location.hash();
            location.hash(scope.section);
            anchorScroll();
            location.hash(old);
          }

        }
    };
}]);

patientApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/resources', {
        templateUrl: 'src/partials/resource-list.html',
        controller: 'ResourceCtrl as resources'
      }).
      when('/patients', {
        templateUrl: 'src/partials/patient-list.html',
        controller: 'PatientListCtrl as patients'
      }).
      when('/patients/:id', {
        templateUrl: 'src/partials/patient-detail.html',
        controller: 'PatientDetailCtrl as patientDetail'
      }).
      otherwise({
        redirectTo: '/patients'
      });
  
  }]);

patientApp.config(function($mdThemingProvider, $mdIconProvider){
  $mdIconProvider
    .defaultIconSet("./assets/svg/avatars.svg", 128)
    .icon("menu", "./assets/svg/menu.svg", 24)
    .icon("experiment-results", "./assets/svg/experiment-results.svg", 24)
    .icon("warning", "./assets/svg/warning.svg", 24)
    .icon("hospital", "./assets/svg/hospital.svg", 24)
    .icon("syringe", "./assets/svg/syringe.svg", 24)
    .icon("heart-beats", "./assets/svg/heart-beats.svg", 24)
    .icon("pills", "./assets/svg/pills.svg", 24)
    .icon("scalpel", "./assets/svg/scalpel.svg", 24)
    .icon("microscope", "./assets/svg/microscope.svg", 24)
    .icon("pulse", "./assets/svg/pulse.svg", 24)
    .icon("list", "./assets/svg/list.svg", 24)
    .icon("settings-work-tool", "./assets/svg/settings-work-tool.svg", 24);

  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '700',
      'hue-1': '50'
    })
    .accentPalette('grey', {
      'default': '700',
      'hue-1': '50'
    } )
    .warnPalette('deep-orange');

  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();


  });


                          



