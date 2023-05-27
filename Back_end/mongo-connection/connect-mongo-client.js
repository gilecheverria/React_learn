/*
 * Simple example to connect to a local Mongo Database
 *
 * References:
 * https://attacomsian.com/blog/nodejs-mongodb-local-connection
 *
 * Gilberto Echeverria
 * 2022-09-01
 */

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';

// Establish the connection
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, async (err, client) => {
    if(err) {
        return console.log(err);
    }

    // Connect to a database
    const db = client.db('learning');
    console.log(`Connected to Mongo ${url}`);


    // Insert new data in a collection
    const docs = db.collection('docs');

    docs.insertOne({
        caso: 11,
        folio: 935,
        materia: 'amparo'
    }, (err, result) => {});


    // Retrieve data from the collection
    //const results = docs.find().toArray((err, result) => console.log(result));

    const cursor = docs.find({});
    const allValues = await cursor.toArray();
    const data = JSON.stringify(allValues);
    console.log("DATA: " + data);

    // Close the connection
    //client.close();
});
