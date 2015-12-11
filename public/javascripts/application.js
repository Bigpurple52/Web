var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router','home','register']);

//Setup a state called home
mainApplicationModule.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'javascripts/home/views/home.client.view.html',
      controller: 'HomeCtrl',
  	  // anytime our home state is entered, we will automatically check if the user is connected and if he is then diplay the main screen
  	  resolve: {
    		homePromise: ['home', function(home){
    		  return home.isConnected();
    		}]
  	  }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'javascripts/register/views/register.client.view.html',
      controller: 'RegisterCtrl',
      // anytime our home state is entered, we will automatically check if the user is connected and if he is then diplay the main screen
      resolve: {
        testPromise: ['register', function(register){
          return register.getAll();
        }]
      }
    })
	
  // redirect unspecified routes
  $urlRouterProvider.otherwise('home');
}]);


angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});