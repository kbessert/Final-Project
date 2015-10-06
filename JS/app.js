var app = angular.module("detroitMusicApp", ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/main-view',
		{
			templateUrl: 'partials/main-view.html',
			controller: 'mainCtrl', 
			
		});
	$routeProvider.when('/event-view',
		{
			templateUrl: 'partials/event-view.html',
			controller: 'eventCtrl'
		});
	$routeProvider.otherwise('/partials/404.html');
});

