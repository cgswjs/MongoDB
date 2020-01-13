//initiate mongodb driver for NodeJS
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myproject';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
  assert.equal(null,err);
  console.log("connected successfully");

  // use target database with name of dbName
  const db= client.db(dbName);

  // //insert data
  // insertDocuments(db,function(){
  //     //close database once insert is done
  //     client.close();
  //   });

  //find data
  findDocuments(db,function(){
    client.close();
  });
});

//create insert function
const insertDocuments = function(db,callback){
  const collection = db.collection('Members');
  collection.insertMany([
    {name:"Yihan"},
    {name:"Jiani"},
    {name:"Roger"}],
    function(err,result){
      assert.equal(err,null);
      assert.equal(3,result.result.n);
      assert.equal(3,result.ops.length);
      console.log("Inserted 3 items");
      callback(result);
    });
}

//create find function
const findDocuments = function(db,callback){
  //use target collection
  const collection = db.collection('Members');
  //Find findDocuments
  collection.find({}).toArray(function(err,person){
    assert.equal(err,null);
    console.log('Found the following records');
    console.log(person);
    callback(person);
  });
}
