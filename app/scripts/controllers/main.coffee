'use strict'

angular.module('reposApp')
  .controller 'MainCtrl', ($scope) ->
    $scope.tasks = [
      {"body": "do this one", "done": false},
      {"body": "do this two", "done": false},
      {"body": "do this three", "done": false},
      {"body": "do this four", "done": false}
    ]