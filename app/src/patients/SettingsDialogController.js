'use strict';

patientApp.controller('SettingsDialogController', ['$mdDialog', 'ServerConn',
  function ($mdDialog, ServerConn) {
    var self = this;
    self.fhirServerAddress = ServerConn.fhirServerURL();
    self.authServerAddress = ServerConn.authServerURL();
    self.ClientName = ServerConn.clientName();
    self.hide = function() {
      $mdDialog.hide();
    };

    self.cancel = function() {
      $mdDialog.cancel();
    };

    self.answer = function(answer) {
      $mdDialog.hide(answer);
    };

}]);