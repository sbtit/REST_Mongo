var express = require("express");
var app = express();
var restapi = require( './restapi' );

var server = app.listen(3001, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.use(restapi);
