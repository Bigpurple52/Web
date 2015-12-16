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
  	  // anytime our home state is entered, we will automatically check if the user is connected and if he is then diplay the main screen
  	  resolve: {
    		homePromise: ['home', function(home){
    		  return home.isConnected();
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
    .state('userProfile/id', {
      url: '/userProfile/:id',
      templateUrl: 'javascripts/userProfile/userProfile.client.view.html',
      controller: 'UserProfileCtrl',
      resolve: {
        connectionPromise: ['$stateParams','userProfile', function($stateParams, userProfile){
          userProfile.setIdUser($stateParams.id);
          return userProfile.get($stateParams.id);
        }]
      }      
    })

    // redirect unspecified routes
    $urlRouterProvider.otherwise('home');
}]);

function loadSession(){
  if(sessionStorage.getItem('id') != null){
    document.getElementById("getPseudo").innerHTML = sessionStorage.getItem('pseudo')+" ";
    document.getElementById("hideConnected").classList.add('ng-hide');
    document.getElementById("hideNotConnected").classList.remove('ng-hide');
  }else if(document.location.href!="http://localhost:3000/#/register"){
    document.location.href = "http://localhost:3000/#/connection";
    document.getElementById("hideConnected").classList.remove('ng-hide');
    document.getElementById("hideNotConnected").classList.add('ng-hide');
  }
};

function userProfile(){
  document.location.href = "#/userProfile/"+sessionStorage.getItem('id');
}

function deleteSession(){
  sessionStorage.clear();
  alert('Deconnexion réussie !');
  document.location.href = "/"
}

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});