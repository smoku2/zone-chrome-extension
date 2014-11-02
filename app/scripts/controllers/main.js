(function() {
  'use strict';
  angular.module('reposApp').controller('MainCtrl', function($scope, $http) {
    $scope.myStatus = {
      "username": "tossy",
      "status": "0"
    };
    $scope.userStatus = {
      "0": "話しかけても大丈夫",
      "1": "集中！！"
    };
    $scope.getStatus = function() {
      var url;
      console.log('Getting status..');
      url = 'http://dmtc-baio.herokuapp.com/status/all';
      return $http.get(url).success(function(data) {
        console.log('success');
        return $scope.memberStatus = data;
      });
    };
    return $scope.updateStatus = function() {
      var url;
      console.log('Updating status...');
      $scope.postData = angular.copy($scope.myStatus);
      if ($scope.postData.status === "0") {
        $scope.postData.status = "1";
      } else {
        $scope.postData.status = "0";
      }
      url = 'http://dmtc-baio.herokuapp.com/status/update';
      return $http.post(url, $scope.postData).success(function(data) {
        return $scope.myStatus = data;
      });
    };
  });

}).call(this);
