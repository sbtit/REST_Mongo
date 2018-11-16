var ObjectID = require('mongodb').ObjectID;
var collection = require( './mongo_con' );
var col_room = require('./mongo_room');
var col;
var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
console.log(retArray());

function getArray(str1,str2){
  var array = [];
  col.find({}).toArray(function(err,docs){
      //res.json(docs['2']["3"]);
    for (var i = 0; i < docs[str1][str2].length; i++) {
        collection("a").find({roomname:docs[str1][str2][i]}).toArray(function(err2,docs2){
        if(docs2.length > 0){
           //console.log(docs2[docs2.length-1]);
           array.push(docs2[docs2.length-1]);
        }
      });
    }
  }); 
}

function retArray(){
  var now = new Date();
  var day = now.getDay();
  var dayName = dayNames[day];
  console.log(dayName);
  col = col_room(dayName);
  var hour = now.getHours();
  var min = now.getMinutes();
  var times = Number(String(hour) + String(min));

  if(times >= 900 && times <= 1030){
    return getArray("0","1");
  }else if(times >= 1045 && times <= 1215){
    return getArray("1","2");
  }else if(times >= 1215 && times <= 2000){
    return getArray("2","3");
  }else if(times >= 1700 && times <= 1630){
    return getArray("3","4");
  }else if(times >= 1945 && times <= 1815){
    return getArray("4","5");
  }else{
      return {"key":"休み"};
  }
}
