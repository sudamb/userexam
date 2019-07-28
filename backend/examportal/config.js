var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID
module.exports = {
    port:4000,
    connectToDB: new Promise(function(resolve,reject){
        var url = 'mongodb://localhost/examportal';
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Successfully connected to the database");
                resolve(db);
            }
            //db.close();
        });
    }),
    objectId: objectId
};