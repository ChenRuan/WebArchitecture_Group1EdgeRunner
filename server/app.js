#!/usr/bin/env node

// server/app.js

// Setup Express Server
var express = require('express');
var app = express();

const { getInformation } = require('./databases/DatabaseAPI');

app.get('/getInformation', getInformation);

// Setup the server and print a string to the screen when server is ready
var portNumber = 8847;

var server = app.listen(portNumber, function () {
    var port = server.address().port;
    console.log('App listening at http://casa0017.cetools.org:%s', port);
});