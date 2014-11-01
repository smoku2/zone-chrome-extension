'use strict'

angular
	.config ($routeProvider) ->
		$routeProvider
			.when '/',
				templateUrl: 'views/main.html'
				controlar: 'MainCtrl'
