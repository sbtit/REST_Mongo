var express = require( 'express' );
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var col;
var async = require('async');
var array;
// MongoDB用ファイルを指定
var collection = require( './mongo_con' );
var col_room = require('./mongo_room');
var dayNames = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

router.all( '/*',function ( req, res, next ) {
    res.contentType( 'json' );
    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
} );

// GET find
router.get( '/test/:id', function ( req, res ) {
  var COL = req.params.id;
  collection(COL).find({}).sort({_id:-1}).limit(1).toArray(function(err, docs){
    res.setHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.json(JSON.parse(JSON.stringify(docs)));
  })
} );

router.get("/test/",async function ( req,res){
  var now = new Date();
  var day = now.getDay();
  var dayName = dayNames[day];
  col = col_room(dayName);
  var hour = now.getHours();
  var min = now.getMinutes();
  if(min < 10){
    var times = Number(String(hour) + "0" +String(min));
  }else{
    var times = Number(String(hour) + String(min));
  }
  array = [];
  if(times >= 830 && times <= 1030){
    let resu = await getArray("0","1");
    res.json(resu);
  }else if(times > 1030 && times <= 1215){
    let resu = await getArray("1","2");
    res.json(resu);
  }else if(times >= 1300 && times <= 1445){
    let resu = await getArray("2","3");
    res.json(resu);
  }else if(times > 1445 && times <= 1630){
    let resu = await getArray("3","4");
    res.json(resu);
  }else if(times > 1630 && times <= 1815){
    let resu = await getArray("4","5");
    res.json(resu);
  }else{
    return {"key":"休み"};
  }
});

router.post('/post', function(req, res) {
    // リクエストボディを出力
    console.log(req.body);
    // パラメータ名、nameを出力
    console.log(req.body.name);

    res.send('POST request to the homepage');
})

async function getArray(str1,str2){  
  array = [];
  let arr1 = await func_1(str1,str2);
  for (let v of arr1) {
    let item = await collection("a").find({roomname:v}).toArray();
    if(item.length > 0){
      let item2 = await func_2(item);
    }
  }
  return array;
}

function func_1(str1,str2) {
    return new Promise((resolve) => {
        col.find({}).toArray(function(err,docs){
          resolve(docs[str1][str2]);
        });
    });
}

function func_2(items) {
    return new Promise((resolve) => {
        array.push(items[items.length-1]);
        resolve(items);
    });
}


module.exports = router;
