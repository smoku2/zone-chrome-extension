'use strict'

angular.module('reposApp')
.controller 'MainCtrl', ($scope, $http) ->
	$scope.myStatus = {
		"username": "tossy",
		"status": "0"
	}

	$scope.userStatus = {
		"0": "話しかけても大丈夫",
		"1": "集中！！"
	}

	$scope.getStatus = () ->
		console.log 'Getting status..'
		url = 'http://dmtc-baio.herokuapp.com/status/all'
		$http.get(url).success((data) ->
			console.log('success')
			$scope.memberStatus = data
		)

	$scope.updateStatus = () ->
		console.log 'Updating status...'
		$scope.postData = angular.copy($scope.myStatus)

		if $scope.postData.status == "0"
			$scope.postData.status = "1"
		else
			$scope.postData.status = "0"

		url = 'http://dmtc-baio.herokuapp.com/status/update'
		$http.post(url, $scope.postData).success((data) ->
			$scope.myStatus = data
		)