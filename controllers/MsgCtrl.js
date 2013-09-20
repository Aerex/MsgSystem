'use strict';

function MsgCtrl($rootScope, $scope, $location, MessageRequest) {

  $scope.user = $rootScope.user;

  if($scope.user === "" || typeof($scope.user) === "undefined")
  {
    $scope.user = "Guest";
  }

$scope.templates = [{
    name: "show_messages.html",
    url: "show_messages.html"
  },
  {
  	name: "compose_message.html",
  	url: "compose_message.html"
  },
  {
    name: "preview_message.html",
    url: "preview_message.html"
  },
  {
    name: "edit_message.html",
    url: "edit_message.html"
  }]

 $scope.template = $scope.templates[0];
 //$scope.view = 0;

$scope.changeUrl = function(url)
{
    switch(url)
    {
      case 0:
        $scope.template = $scope.templates[0];
        $rootScope.view = 0;
        break;

      case 1:
        $scope.template = $scope.templates[0];
        $rootScope.view = 1;
        break;

      case 2:
        $scope.template = $scope.templates[0];
        $rootScope.view = 2;
        break;

      case 3:
        $scope.template = $scope.templates[0];
        $rootScope.view = 3;
        break;

    }
}

$scope.addSelectedMsg = function(index,msg)
{
  if(msg.selected)
  {
    $scope.selectedMsgs[index] = $scope.msgs[index];
  }
  else
  {
    $scope.selectedMsgs[index] = -1;
  }
}

$scope.deleteMsgs = function()
{
    for(var i = 0; i < $scope.selectedMsgs.length; i++ )
    {
      if($scope.selectedMsgs[i] !== -1 || typeof($scope.selectedMsgs) !== "undefined")
      {
            MessageRequest.deleteMsg($scope.selectedMsgs[i],$scope.user);
      }
    }
}

$scope.draftMsgs = function()
{
     for(var i = 0; i < $scope.selectedMsgs.length; i++ )
    {
      if($scope.selectedMsgs[i] !== -1 || typeof($scope.selectedMsgs) !== "undefined")
      {
            MessageRequest.draftMsg_old($scope.selectedMsgs[i],$scope.user);
      }
    }
}

$scope.markMsgRead = function()
{
    for(var i = 0; i < $scope.selectedMsgs.length; i++ )
    {
      if($scope.selectedMsgs[i] !== -1 || typeof($scope.selectedMsgs) !== "undefined")
      {
          MessageRequest.autoReadRequest($scope.selectedMsgs[i]._id,$scope.user,$rootScope.view);
      }
    }
}

$scope.markMsgUnread = function()
{
    for(var i = 0; i < $scope.selectedMsgs.length; i++ )
    {
      if($scope.selectedMsgs[i] !== -1 || typeof($scope.selectedMsgs) !== "undefined")
      {
          MessageRequest.autoUnreadRequest($scope.selectedMsgs[i]._id,$scope.user);
      }
    }
}

$scope.draftMsg = function()
{
    var p = MessageRequest.draftMsg_new($scope.msg,$scope.user);
     p.then(function(data){
      if(data.status === 200)
      {
         alert("Message Draft");
         $scope.template = $scope.templates[0];
      }
    });
}

$scope.random_gen = function(len)
{
  var string = "";
  var ch = 'abcdefghijkmnpqrstuvwzyx23456789#$%&';
  for(var i = 0; i < len; i++)
  {
    string += ch[Math.floor((Math.random()*(ch.length-1)))];
  }

  return string;
}

 $scope.composeMsg = function()
 {
 	$scope.template = $scope.templates[1];
 }

 $scope.sendMsg = function()
 {
 	var p = MessageRequest.send($scope.msg, $scope.user);
    p.then(function(data){
     	if(data.status === 200)
     	{
     		 alert("Message Sent");
         $scope.template = $scope.templates[0];
     	}
    });
 }

$scope.editMsg = function () 
{



}
$scope.$watch('viewMessage.read', function(newValue, oldValue) {

    if(typeof(newValue) !== "undefined" && newValue === "1")
    {
      MessageRequest.autoReadRequest($scope.viewMessage._id,$scope.user, $rootScope.view);
    } 
});

  $scope.$on('$viewContentLoaded', function () {
    $scope.viewMessage = {};
    $scope.msgs = [];
    $scope.msg = {};
    $scope.selectedMsgs = [];

    if(typeof($rootScope.view) === "undefined")
    {
      $rootScope.view = 0;
    }

    var p = MessageRequest.get($scope.user,$scope.view);
    var element_handler;
    p.then(function(data){
      if(data.status === 200)
      {
        for(var i = 0; i < data.data.length; i++)
        {
            $scope.msgs[i] = data.data[i];
        }
      }
    });



 });
  
  /*Start Ctrl*/
}