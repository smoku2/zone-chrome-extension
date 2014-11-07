'use strict'

angular.module('reposApp')
.controller 'MainCtrl', ($scope, $http) ->
	$scope.getStatus = () ->
		console.log 'Getting member status..'

		url = 'http://dmtc-baio.herokuapp.com/status/all'
		$http.get(url).success((data) ->
			console.log('Success.')
			$scope.memberStatus = data
		)
