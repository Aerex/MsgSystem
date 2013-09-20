'use strict';

function ChatCtrl($rootScope,$scope, MessageRequest) {



  $scope.templates =
  [{
    name: "login_message.html",
    url: "login_message.html"
  },
  {
  	name: "register_message.html",
  	url:  "register_message.html"
  },
  {
  	name: "logged_message.html",
  	url: "logged_message.html"

  }];

  	if(typeof($rootScope.user_id) !== "undefined")
	{
		$scope.template = $scope.templates[2];
		$scope.user = $rootScope.user;
	}
	else
	{
		$scope.template = $scope.templates[0];
		$scope.user = "Guest";

	}

   /*Start Ctrl*/
}