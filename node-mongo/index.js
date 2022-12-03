const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

const dboper = require('./operations')
MongoClient.connect(url, (err,client) => {
const db = client.db(dbname)
    dboper.insertDocument(db, {name: "DasDonut", description: "Test1", date: Date()},
     "dishes", (result) => {
        console.log('Inserted Document: \n' + result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Document: " + docs);

                dboper.updateDocument(db, {name: "Vandonut"}, {description: "Updated Test"}, "dishes", (result) => {
                    console.log("Updated document " , result.result);

                    dboper.findDocuments(db, "dishes", (docs) => {
                        console.log("Found document " , docs);

                            dboper.removeDocument(db, {name: "Vandonut"},"dishes", (result) => {
                                console.log("Dropped Collection\n" , result);
                                client.close();
                    });
                });
            });
        });
     });
});
