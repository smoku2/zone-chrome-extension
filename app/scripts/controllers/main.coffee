'use strict'

angular.module('reposApp')
  .controller 'MainCtrl', ($scope) ->
    $scope.myStatus = {
      "name": "ham",
      "status": 0
    }
    $scope.memberStatus = [
      {"name": "endoo", "status": 0},
      {"name": "kosk", "status": 1}
    ]