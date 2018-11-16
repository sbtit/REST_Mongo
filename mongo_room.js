var db;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/classroom';
var result;

// Use connect method to connect to the Server
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
  console.log("Connected correctly to server");
  db = client.db("classroom");
});

var collection = function( name ) {
  return db.collection(name);
};

module.exports = collection;
