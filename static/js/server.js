
var express = require('express'),
	http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var databaseUrl = "NC";
var collections = ["shinobi_cards", "event_cards"];
var db = require("mongojs").connect(databaseUrl,collections);

var shinobiCards = [];
var x = 0;
db.shinobi_cards.find(function(err, cards) {
	//console.log(shinobiCards);
	shinobiCards = cards;
	x++;
	console.log("X--: " + x);

});


//var io = require("socket.io");
console.log("X: " + x);
server.listen(1222);
//var socket = io.listen("1.1.1.1", 1222);
//socket.set("log level", 1);



io.sockets.on('connection', function(client) {
	client.on('addPlayer', function(player) {
		//players[client.id] = player;
		console.log("Player " + player + "with id: " + client.id + "has connected.");
	});

	client.on('disconnect', function() {
		console.log("Player with id: " + client.id + "has disconnected");
	//	delete players[client.id];
	});

	client.on('send:message', function(data){
		client.broadcast.emit('send:message', {
			user: "nana",
			text: data.message
		});
	});
});