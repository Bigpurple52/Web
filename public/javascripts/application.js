var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router','home','register','connection','userProfile']);

//Setup a state called home
mainApplicationModule.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'javascripts/home/home.client.view.html',
      controller: 'HomeCtrl',
  	  resolve: {
    		homePromise: ['home', function(home){
          return home.getAll();
    		}]
  	  }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'javascripts/register/register.client.view.html',
      controller: 'RegisterCtrl',
      resolve: {
        registerPromise: ['register', function(register){
          return register.getAll();
        }]
      }
    })
    .state('connection/q', {
      url: '/connection/:q',
      templateUrl: 'javascripts/connection/connection.client.view.html',
      controller: 'ConnectionCtrl',
      resolve: {
        connectionPromise: ['connection', function(connection){
          return connection.getAll();
        }]
      }      
    })
    .state('connection', {
      url: '/connection',
      templateUrl: 'javascripts/connection/connection.client.view.html',
      controller: 'ConnectionCtrl',
      resolve: {
        connectionPromise: ['connection', function(connection){
          return connection.getAll();
        }]
      }      
    })
    .state('userProfile/id/mail', {
      url: '/userProfile/:id/:mail',
      templateUrl: 'javascripts/userProfile/userProfile.client.view.html',
      controller: 'UserProfileCtrl',
      resolve: {
        connectionPromise: ['$stateParams','userProfile', function($stateParams, userProfile){
          return userProfile.getAll();
        }]
      }      
    })
    .state('userProfile/id/adduser', {
      url: '/userProfile/:id/:adduser',
      templateUrl: 'javascripts/userProfile/userProfile.client.view.html',
      controller: 'UserProfileCtrl',
      resolve: {
        connectionPromise: ['$stateParams','userProfile', function($stateParams, userProfile){
          return userProfile.getAll();
        }]
      }      
    })
    .state('userProfile/id', {
      url: '/userProfile/:id',
      templateUrl: 'javascripts/userProfile/userProfile.client.view.html',
      controller: 'UserProfileCtrl',
      resolve: {
        connectionPromise: ['$stateParams','userProfile', function($stateParams, userProfile){
          return userProfile.getAll();
        }]
      }      
    })

    // redirect unspecified routes
    $urlRouterProvider.otherwise('home');
}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});