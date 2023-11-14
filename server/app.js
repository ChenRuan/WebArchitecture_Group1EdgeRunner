#!/usr/bin/env node

// server/app.js

// Setup Express Server
var express = require('express');
var app = express();

// import cors module
const cors = require('cors');
app.use(cors());

// Import modules
const { CrimeData, DataAnalyze, MapData } = require('./databases/DatabaseAPI');
// Click event
app.get('/crime-data', CrimeData );
// Data Analyze Page
app.get('/analyze', DataAnalyze );
// Map initial 
app.get('/map-data', MapData );

//Static file serving
app.use(express.static('../website'));

// Setup the server and print a string to the screen when server is ready
var portNumber = 8848;

var server = app.listen(portNumber, function () {
    var port = server.address().port;
    console.log('App listening at http://casa0017.cetools.org:%s', port);
});