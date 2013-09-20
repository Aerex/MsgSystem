'use strict';

Udacity.directive('readunread', function read_unread ()
{
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			$scope.$watch('msg', function(val) {
				var  eles = [];

				if(val.read === "0")
				{
					eles = attrs.$$element[0].getElementsByTagName('td');

					for(var i = 1; i < eles.length; i++)
					{
						eles[i].innerHTML = '<b>' + eles[i].innerText + '</b>';
					}

					$scope.msgs[val.index].read = "1";
					
				}
			
			}, true);
		}	
	};
});

Udacity.directive('highlightmsg', function highlight_msg ()
{
	return function(scope, element, attrs) {
		var hoverInCallback = function() {
			var ele = attrs;
			ele.$$element[0].style.backgroundColor = '#E0EEEE';

		};

		var hoverOutCallback = function() {
			var ele = attrs;
			ele.$$element[0].style.backgroundColor = '';
		};

		element.bind('mouseenter', hoverInCallback);
		element.bind('mouseleave', hoverOutCallback);
	}
});

Udacity.directive('showmsg', function ($rootScope)
{
		return function(scope, element, attrs) {
			var clickingCallback = function() {
				var ele = attrs.$$element[0].id;
				var index = parseInt(ele.substring(2));
				var x;

			
				x = scope.msgs[index];
				scope.viewMessage.sender = x.sender;
				scope.viewMessage.message = x.message;
				scope.viewMessage.subject = x.subject;
				scope.viewMessage.index = index;
				scope.viewMessage.read = x.read;
				scope.viewMessage._id	= x._id;

				if($rootScope.view === 3)
				{
					scope.template.url = scope.templates[3].url;
					scope.template.name = scope.templates[3].name;
				}
				else
				{
					scope.template.url = scope.templates[2].url;
					scope.template.name = scope.templates[2].name;		
				}

				scope.$apply();
		
			console.log(scope);


			};
			element.bind('click', clickingCallback);
		}
});
	
Udacity.directive('login', function (MessageRequest, $rootScope)
{	
		return function(scope, element, attrs) {
			var clickingCallback = function() {
				var p = MessageRequest.login(scope.user,scope.password);

				p.then(function(data)
				{
					if(data.status === 200 && data.data === "-1")
					{
						document.getElementById('error_msg').innerHTML = "Login Error!";
					}
					else if(data.status === 200 && data.data !== "-1")
					{
						scope.template.url = scope.templates[2].url;
						scope.template.name = scope.templates[2].name;
						$rootScope.user_id = data.data.user_id;
						$rootScope.user = scope.user;
					}

				});

			
			};
				element.bind('click', clickingCallback);
		}
});

Udacity.directive('register', function (MessageRequest, $rootScope)
{
		return function(scope, element, attrs) {
			var clickingCallback = function() {
				var p = MessageRequest.register(scope.user,scope.password);

				p.then(function(data)
				{
					if(data.status === 200 && data.data !== -1)
					{
						scope.template.url = scope.templates[1].url;
						scope.template.name = scope.templates[1].name;
						$rootScope.user_id = data.data;
						$rootScope.user = scope.user;
					
					}
					else 
					{
						console.log("There was a problem with registering");
					}

					

				});

			
			};
				element.bind('click', clickingCallback);
		}
});




	

