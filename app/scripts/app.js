(function() {
  'use strict';
  angular.config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controlar: 'MainCtrl'
    });
  });

}).call(this);
