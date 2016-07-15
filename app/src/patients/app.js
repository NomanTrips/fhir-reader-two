'use strict';

// Declare app level module which depends on views, and components

var patientApp = angular.module('patientApp', [
  'ngRoute',
  'ngMaterial',
  'patientControllers',
  'patientServices',
  'patientListServices',
  'conditionListServices',
  'prescriptionListServices',
  'medicationServices',
  'procedureListServices',
  'resourceControllers',
  'resourceServices',
  'angularSpinner'
]);

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
    .icon("menu", "./assets/svg/menu.svg"        , 24)
    .icon("search_black", "./assets/svg/search_black.svg"        , 24)
    .icon("search_white", "./assets/svg/search_white.svg"        , 24)
    .icon("share", "./assets/svg/share.svg"       , 24)
    .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
    .icon("hangouts", "./assets/svg/hangouts.svg"    , 512)
    .icon("twitter", "./assets/svg/twitter.svg"     , 512)
    .icon("phone", "./assets/svg/phone.svg"       , 512);

  var customBlueMap =     $mdThemingProvider.extendPalette('deep-orange', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });

  var customGreyMap =     $mdThemingProvider.extendPalette('grey', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });

  $mdThemingProvider.definePalette('customGrey', customGreyMap);
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('customGrey', {
      'default': '800',
      'hue-1': '700'
    })
    .warnPalette('red');

  $mdThemingProvider.theme('button', 'default')
    .primaryPalette('orange')

  $mdThemingProvider.theme('sidenav', 'default')
    .primaryPalette('grey')

  $mdThemingProvider.theme('input', 'default')
    .primaryPalette('red')
  });


                          



