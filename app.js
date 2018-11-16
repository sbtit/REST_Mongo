var express = require("express");
var app = express();
//var restapi = require( './restapi' );
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});


var str = '{"temp": 20,"pre": 1000,"hum": 100}';
//app.use(restapi);
app.get("/test/b", function(req, res, next){
    res.json(JSON.parse(str));
});
