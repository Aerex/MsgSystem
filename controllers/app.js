var Udacity = angular.module('Udacity', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'templates/msg.html',   controller: MsgCtrl}).
      when('/inbox', {templateUrl: 'templates/msg.html', controller: MsgCtrl}).
      when('/login', {templateUrl: 'templates/login.html', controller: LoginCtrl}).
      when('/chat', {templateUrl: 'templates/chat.html', controller: ChatCtrl}).
      otherwise({redirectTo: '/'});
}]);