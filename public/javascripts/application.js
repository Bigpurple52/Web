var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router','home','register','connection','userProfile','group','friend','side_menu']);

//Setup a state called home
mainApplicationModule.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      views : {wrapper_page : {templateUrl: 'javascripts/home/home.client.view.html', controller: 'HomeCtrl'},
      side_menu : {templateUrl: 'javascripts/side_menu/side_menu.html', controller: 'Side_menuCtrl'}},
      resolve: {
        homePromise: ['home', function(home){
          return home.getAll();
        }]
      }
    })
    .state('register', {
      url: '/register',
      views : {wrapper_page : {templateUrl: 'javascripts/register/register.client.view.html', controller: 'RegisterCtrl'}},
      resolve: {
        registerPromise: ['register', function(register){
          return register.getAll();
        }]
      }
    })
    .state('connection/q', {
      url: '/connection/:q',
      views : {wrapper_page : {templateUrl: 'javascripts/connection/connection.client.view.html', controller: 'ConnectionCtrl'}},
      resolve: {
        connectionPromise: ['connection', function(connection){
          return connection.getAll();
        }]
      }      
    })
    .state('connection', {
      url: '/connection',
      views : {wrapper_page : {templateUrl: 'javascripts/connection/connection.client.view.html', controller: 'ConnectionCtrl'}},
      resolve: {
        connectionPromise: ['connection', function(connection){
          return connection.getAll();
        }]
      }      
    })
    .state('userProfile/id/mail', {
      url: '/userProfile/:id/:mail',
      views : {wrapper_page : {templateUrl: 'javascripts/userProfile/userProfile.client.view.html', controller: 'UserProfileCtrl'},
               side_menu : {templateUrl: 'javascripts/side_menu/side_menu.html', controller: 'Side_menuCtrl'}},
      resolve: {
        connectionPromise: ['$stateParams','userProfile', function($stateParams, userProfile){
          return userProfile.getAll();
        }]
      }      
    })
    .state('userProfile/id/adduser', {
      url: '/userProfile/:id/:adduser',
      views : {wrapper_page : {templateUrl: 'javascripts/userProfile/userProfile.client.view.html', controller: 'UserProfileCtrl'},
            side_menu : {templateUrl: 'javascripts/side_menu/side_menu.html', controller: 'Side_menuCtrl'}},
      resolve: {
        connectionPromise: ['$stateParams','userProfile', function($stateParams, userProfile){
          return userProfile.getAll();
        }]
      }      
    })
    .state('userProfile/id', {
      url: '/userProfile/:id',
      views : {wrapper_page : {templateUrl: 'javascripts/userProfile/userProfile.client.view.html', controller: 'UserProfileCtrl'},
               side_menu : {templateUrl: 'javascripts/side_menu/side_menu.html', controller: 'Side_menuCtrl'}},
      resolve: {
        connectionPromise: ['$stateParams','userProfile', function($stateParams, userProfile){
          return userProfile.getAll();
        }]
      }      
    })
    .state('group/id', {
      url: '/group/:id',
      views : {wrapper_page : {templateUrl: 'javascripts/group/group.client.view.html', controller: 'GroupCtrl'},
               side_menu : {templateUrl: 'javascripts/side_menu/side_menu.html', controller: 'Side_menuCtrl'}},
      resolve: {
        groupPromise: ['$stateParams', 'group', function($stateParams, group){
          return group.getOne($stateParams.id);
        }]
      }     
    })
    .state('group', {
      url: '/group',
      views : {wrapper_page : {templateUrl: 'javascripts/group/group.client.view.html', controller: 'GroupCtrl'},
               side_menu : {templateUrl: 'javascripts/side_menu/side_menu.html', controller: 'Side_menuCtrl'}},
      resolve: {
        groupPromise: ['group', function(group){
          return group.getAll();
        }]
      }     
    })
    .state('friend/id', {
      url: '/friend/:id',
      views : {wrapper_page : {templateUrl: 'javascripts/friend/friend.client.view.html', controller: 'FriendCtrl'},
               side_menu : {templateUrl: 'javascripts/side_menu/side_menu.html', controller: 'Side_menuCtrl'}},    
      resolve: {
        groupPromise: ['$stateParams', 'friend', function($stateParams, friend){
          return friend.getAll($stateParams.id);
        }]
      }     
    })
    .state('friend', {
      url: '/friend',
      views : {wrapper_page : {templateUrl: 'javascripts/friend/friend.client.view.html', controller: 'FriendCtrl'},
               side_menu : {templateUrl: 'javascripts/side_menu/side_menu.html', controller: 'Side_menuCtrl'}},    
      resolve: {
        groupPromise: ['friend', function(friend){
          return friend.getAll();
        }]
      }     
    })
    // redirect unspecified routes
    $urlRouterProvider.otherwise('home');
}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
