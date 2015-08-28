angular.module('OWMApp', ['ngRoute', 'ngAnimate'])
	.value('owmCities', ['New York', 'Dallas', 'Chicago'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl'
		}).when('/cities/:city', {
			templateUrl: 'city.html',
			controller: 'CityCtrl', 
			resolve: {
				city: function (owmCities, $route, $location) {
					var city = $route.current.params.city.replace('_', ' ');
					if (owmCities.indexOf(city) === -1) {
						console.log('error')
						$location.path('/error');
					}
					return city;
				}
			}
		})
		.when('/error', {
			template: '<p>Error - Page Not Found</p>'
		});
	}])
	.run(function ($rootScope, $location, $timeout) {
		$rootScope.$on('$routeChangeError', function () {
			$location.path('/error');
		});

		$rootScope.$on('$routeChangeStart', function () {
			$rootScope.isLoading = true;
		});
		$rootScope.$on('$routeChangeSuccess', function () {
			$timeout(function () {
				$rootScope.isLoading = false;
			}, 1000);
		});
	})
	.controller('HomeCtrl', function ($scope) {

	})
	.controller('CityCtrl', function ($scope, city) {
		$scope.city = city;
	});