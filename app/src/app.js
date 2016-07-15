'use strict';

// Declare app level module which depends on views, and components

var patientApp = angular.module('patientApp', [
  'ngRoute',
  'patientControllers',
  'patientServices',
  'patientListServices'
]);

patientApp.config(['$routeProvider',
  function($routeProvider, $mdThemingProvider, $mdIconProvider) {
    $routeProvider.
      when('/patients', {
        templateUrl: 'partials/patient-list.html',
        controller: 'PatientListCtrl'
      }).
      when('/patients/:id', {
        templateUrl: 'partials/patient-detail.html',
        controller: 'PatientDetailCtrl'
      }).
      otherwise({
        redirectTo: '/patients'
      });

                  $mdIconProvider
                      .defaultIconSet("./assets/svg/avatars.svg", 128)
                      .icon("menu"       , "./assets/svg/menu.svg"        , 24)
                      .icon("share"      , "./assets/svg/share.svg"       , 24)
                      .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
                      .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
                      .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
                      .icon("phone"      , "./assets/svg/phone.svg"       , 512);

                      $mdThemingProvider.theme('default')
                          .primaryPalette('brown')
                          .accentPalette('red');

  }]);
