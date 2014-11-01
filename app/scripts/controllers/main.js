(function() {
  'use strict';
  angular.module('reposApp').controller('MainCtrl', function($scope) {
    $scope.myStatus = {
      "name": "ham",
      "status": 0
    };
    return $scope.memberStatus = [
      {
        "name": "endoo",
        "status": 0
      }, {
        "name": "kosk",
        "status": 1
      }
    ];
  });

}).call(this);
