var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router','home','register','connection']);

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

    // redirect unspecified routes
    $urlRouterProvider.otherwise('home');
}]);

function loadSession(){
  if(sessionStorage.getItem('id') != null){
    document.getElementById("getPseudo").innerHTML = sessionStorage.getItem('pseudo')+" ";
    document.getElementById("getId").innerHTML = sessionStorage.getItem('id');
  }else if(document.location.href!="http://localhost:3000/#/register"){
    document.location.href = "http://localhost:3000/#/connection;"
  }
};

function isConnected(){
  alert(sessionStorage.getItem('id'));
  if(sessionStorage.getItem('id') !=null){
    this.innerHTML = true;
  }else{
    this.innerHTML = true;
  }
}

function deleteSession(){
  sessionStorage.clear();
  alert('Deconnexion réussie !');
}

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});