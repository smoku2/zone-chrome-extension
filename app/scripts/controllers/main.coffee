'use strict'

angular.module('reposApp')
	.controller 'MainCtrl', ($scope) ->
		$scope.myStatus = {
			"name": "ham",
			"status": false
		}
		$scope.memberStatus = [
			{"name": "endoo", "status": 0},
			{"name": "kosk", "status": 1}
		]
		$scope.toggleStatus = () ->
			console.log('hogehoge', $scope.myStatus.status);
			$scope.myStatus.status = !$scope.myStatus.status
