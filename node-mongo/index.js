const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

const dboper = require('./operations')
MongoClient.connect(url)
.then((client) => {
        console.log("Connected Correctly to the Server");
        const db = client.db(dbname);

    dboper.insertDocument(db, {"name": "DasDonuts", "description": "Testing promises", "Date": Date()}, 
    "Dishes").then((result) => {
        console.log("Insert Document", result);
        return dboper.findDocuments(db, "Dishes");
    })
    .then((docs)=> {
        console.log("Found Documents: ", docs);

        return dboper.updateDocument(db, {"name": "DasDonuts"}, {"description": "Description Updated"}, "Dishes");
    })
    .then((result) => {
        console.log("Update document", result);
        return dboper.findDocuments(db, "Dishes");
    })
    .then((result) => {
        console.log("Found update documents: ", result);

        return db.dropCollection("Dishes");
    })
    .then((result) => {
        console.log("Dropped Collection: ", result);

        client.close();
    })
    .catch((err) => console.log(err));

})
.catch((err) => console.log(err));
