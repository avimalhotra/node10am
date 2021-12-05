const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

    // Connection URL
const url = 'mongodb://localhost:27017';

    // Enter Database Name
const dbName = 'node';
const collection = db.collection('suzuki');

    // Create a new MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true });


const findDocuments = function(db, callback) {
   
  // Get the documents collection
  const collection = db.collection('suzuki');
 
   // Find some documents
  collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
  });
}


const insertDocuments = function(db, callback) {
  // Get the documents collection


  // Insert some documents
collection.insertMany([
  {name : "alto",type : "hatchback",price : 400000}
], function(err, result) {
  assert.equal(err, null);
 // assert.equal(1, result.result.n);
  assert.equal(1, result.ops.length);
  console.log("Inserted 1 documents in collection");
  callback(result);
});
}

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  // insertDocuments(db, function() {
  //   client.close();
  // });

  collection.find({type:'hatchback'}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
});

  //client.close();
});