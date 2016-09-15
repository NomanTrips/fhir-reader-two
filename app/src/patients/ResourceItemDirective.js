var resourceDirective = angular.module('resourceDirective', []);

resourceDirective.directive('resourceItem', ['$routeParams', '$http', '$templateCache', '$compile', function($routeParams, $http, $templateCache, $compile) {
  var getTemplate = function(contentType) {
    var templateLoader,
    baseUrl = 'src/partials/',
    templateMap = {
      AllergyIntolerance: 'allergy.html',
      Encounter: 'encounter.html',
      Condition: 'condition.html',
      Procedure: 'procedure.html',
      MedicationPrescription: 'prescription.html',
      Patient: 'patient.html',
      Immunization: 'immunization.html',
      DiagnosticReport: 'diagnosticreport.html',
      Observation: 'observation.html',
    };

    var templateUrl = baseUrl + templateMap[contentType];
    templateLoader = $http.get(templateUrl, {cache: $templateCache});

    return templateLoader;

  }

  var insertIntoItemHtml = function(itemHtml) {
    return '<div class="md-list-item-text" layout="column">' +        
              itemHtml +
              '<md-divider ng-hide="last"></md-divider>' +
            '</div>'
  }

  return {
    // can be used as attribute or element
    restrict: 'AE',
    scope: {
      resource: '=',
      entry: '=',
      last: '='
    },
    link: function(scope, element, attrs){

      var loader = getTemplate(scope.resource);
      var promise = loader.success(function(html) {
        html = insertIntoItemHtml(html);
        element.html(html);
      }).then(function (response) {
        element.replaceWith($compile(element.html())(scope));
      });    
      },
    };

}]);