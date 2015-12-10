var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router','home','test']);

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
    .state('test', {
      url: '/test',
      templateUrl: 'javascripts/test/views/test.client.view.html',
      controller: 'TestCtrl',
      // anytime our home state is entered, we will automatically check if the user is connected and if he is then diplay the main screen
      resolve: {
        testPromise: ['test', function(test){
          return test.isConnected();
        }]
      }
    })
	
  // redirect unspecified routes
  $urlRouterProvider.otherwise('home');
}]);


angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});