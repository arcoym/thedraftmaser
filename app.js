
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request'); // library to make requests to remote urls


var app = module.exports = express();

// the ExpressJS App
var app = express();
var newValue;
var tempValue;
	
app.configure( function() { 
	/*
	   use a directory called js in your project directory
	   to serve static files. This is so you can serve client-side
	   javaScript files with your index page.
	   
	   If you want to serve CSS, and/or lots of HTML files, it's 
	   useful to set up a static directory for them. express.js 
	   will then serve files from those directories like a regular
	   webserver.
	*/
  app.use('/js', express.static(__dirname + '/js')); 
  console.log("Express configured. Listening on port 8080");
});


// if the request is for /state without a value, return the current
// value of state. If there is no value for state,
// return a message to that effect:
app.get('/state/:value', function (req, res) {

	 newValue = req.params.value;

	//send a response to the client:
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(newValue);
	res.end();
});

app.get('/state', function (req, res) {
	//send a response to the client:
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(newValue);
	res.end();
});

app.get('/temp/:value', function (req, res) {
	tempValue = req.params.value;

	//DO TEMPERATURE MATH HERE
	
});
app.get('/angle/:value', function (req, res) {
	
	currentAngle = req.params.value;

	//DO ANGLE MATH HERE

});

// function for serving index.html, or index. anything:
app.get('/index*', function (req, res) {
   res.sendfile('index.html');
});

// respond to web GET requests with the index.html page.
// this is how you serve a file that's not in a static directory:
app.get('/', function (req, res) {
   res.sendfile('index.html');
});


// start listening on port 8080:
app.listen(8080);

