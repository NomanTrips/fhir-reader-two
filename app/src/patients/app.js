'use strict';

// Declare app level module which depends on views, and components

var patientApp = angular.module('patientApp', [
  'ngRoute',
  'ngMaterial',
  'patientControllers',
  'resourceControllers',
  'resourceServices',
  'angularSpinner',
  'resourceListServices',
  'resourceByIdServices',
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
                    '<md-button class="md-primary" ng-click="tableOfContentButtonClick()" ng-class="isSelectedSection() ? \'selected\' : \'unselected\'">' +
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
}]).directive('detailsCard', ['Resources', '$routeParams', function(Resources, $routeParams) {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        scope: {
          title: '=',
          resource: '='
        },
        link: function(scope, element, attrs){
          
          scope.getTitle = function() {
            return scope.title;
          }
          
        Resources.get({id: $routeParams.id, resource: scope.resource})
          .$promise.then(function(bundle) {
            //patientDetail.isAllergiesReturned = allergies.$resolved;
            scope.entries = bundle.entry;               
          });
          
        },
        // which markup this directive generates
        template: '<md-card>' +
                    '<section id="{{getTitle()}}">' +
                      '<md-subheader class="md-primary"><md-icon md-svg-icon=\'\' style="padding-right:10px;"></md-icon>{{getTitle()}}</md-subheader>' +
                      '<md-divider ></md-divider>' +
                      '<md-list class="md-dense" flex="">' +
                        '<md-list-item class="md-3-line" ng-repeat="entry in entries">' +
                          '<div class="md-list-item-text">' +          
                            '<h3>{{entry.resource.substance.coding[0].display + \' \' + entry.resource.substance.coding[0].code}}</h3>' +
                            '<p><b>Allergy type: </b> {{entry.resource.category}} </p>' +
                            '<p><b>Reaction: </b>{{entry.resource.reaction[0].manifestation[0].coding[0].display}}'+
                            '<b>Severity: </b>{{entry.resource.reaction[0].severity}}</p>' +
                            '<md-divider ></md-divider>'+
                          '</div>'+
                        '</md-list-item>'+
                      '</md-list>'+
                    '</section>'+
                  '</md-card>',
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


                          



