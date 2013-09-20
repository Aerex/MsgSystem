'use strict';

Udacity.service('MessageRequest', function MessageRequest($http,$q)
{
	var self = this;
	var shortSubject;
	self.send = function(msg, user)
	{
          if(msg.subject.length > 16)
          {
            shortSubject = msg.subject.substring(0,15) + "...";
          }
          else
          {
          	shortSubject = msg.subject;
          }
		var http_promise = $http({url: "/static/py/send.py/inboxPOST", method: "GET", params: {"msg": msg.message,  "shortSubject": shortSubject, "subject": msg.subject,  "from": user, "to": msg.to}}
			)
			.success(function(data, status, headers, config){
			})
			.error(function(data, status, headers, config){
				console.log("There was a problem sending data: " + status);
			});

			return http_promise;
	}

	self.get = function(user, viewid)
	{
		var http_promise = $http({url: "/static/py/send.py/inboxGET", method: "GET", params: {"user": user, "viewid":viewid}}
			)
			.success(function(data, status, headers, config){
				for(var i = 0; i < data.length; i++)
					{
						data[i]._id = data[i]._id.$oid;
						data[i].index = i;
					}
					return data;
			})
			.error(function(data, status, headers, config){
				console.log("There was a problem sending data: " + status);
			});

			return http_promise;
	}

	self.autoReadRequest = function(msgid, user, viewid)
	{
		var http_promise = $http({url: "/static/py/send.py/read", method: "GET", params: {"msgid": msgid, "user": user, "viweid":viewid}}
			)
			.success(function(data, status, headers, config)
			{

			})
			.error(function(data, status, headers, config){
				console.log("There was a problem sending data: " + status);
			});

			return http_promise;
	}

	self.autoUnreadRequest = function(msgid, user)
	{
		var http_promise = $http({url: "/static/py/send.py/unread", method: "GET", params: {"msgid": msgid, "user": user}}
			)
			.success(function(data, status, headers, config)
			{

			})
			.error(function(data, status, headers, config){
				console.log("There was a problem sending data: " + status);
			});

			return http_promise;
	}

	self.login = function(user,password)
	{
		var http_promise = $http({url: "/static/py/send.py/login", method: "GET", params: {"user": user, "password": password}}
			)
			.success(function(data, status, headers, config)
			{
				return data;
			})
			.error(function(data, status, headers, config){
				console.log("There was a problem sending data: " + status);
			});

			return http_promise;
	}

	self.register = function(user,password)
	{
		var http_promise = $http({url: "/static/py/send.py/register", method: "GET", params: {"user": user, "password": password}}
			)
			.success(function(data, status, headers, config)
			{
				return data;
			})
			.error(function(data, status, headers, config){
				console.log("There was a problem sending data: " + status);
			});

			return http_promise;
	}

	self.deleteMsg = function(msg,user)
	{
		var http_promise = $http({url: "/static/py/send.py/delete", method: "GET", params: {"msgid": msg._id, "user": user}}
			)
			.success(function(data, status, headers, config)
			{
				return data;
			})
			.error(function(data, status, headers, config){
				console.log("There was a problem sending data: " + status);
			});

			return http_promise;
	}

	self.draftMsg_old = function(msg,user)
	{
		var http_promise = $http({url: "/static/py/send.py/draft_old", method: "GET", params: {"msgid": msg._id, "user": user}}
			)
			.success(function(data, status, headers, config)
			{
				return data;
			})
			.error(function(data, status, headers, config){
				console.log("There was a problem sending data: " + status);
			});

			return http_promise;
	}

	self.draftMsg_new = function(msg,user)
	{
		if(msg.subject.length > 16)
	    {
	       shortSubject = msg.subject.substring(0,15) + "...";
	    }
        else
        {
          shortSubject = msg.subject;
        }

		var http_promise = $http({url: "/static/py/send.py/draft_new", method: "GET", params: {"msg": msg.message,  "shortSubject": shortSubject, "subject": msg.subject,  "from": user, "to": msg.to}}
			)
			.success(function(data, status, headers, config)
			{
				return data;
			})
			.error(function(data, status, headers, config){
				console.log("There was a problem sending data: " + status);
			});

			return http_promise;
	}
});