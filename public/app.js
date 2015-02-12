var app = angular.module('gitHub', ['ngRoute'])

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'templates/main.html',
		controller: 'mainCtrl' 
	})

	.when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'homeCtrl',
		// resolve: {
		// 	friends: function(githubService) {
		// 		return githubService.getFollowing();
		// 	}
		// }
	})

	.when('/friend/:github_username', {
		templateUrl: 'templates/friend.html',
		controller: 'friendCtrl'
			})

	.otherwise({
		redirectTo: '/'
	})

})
