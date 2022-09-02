/*
 * Simple exampe to connect to a local Mongo Database
 * and provide an API to perform operations on it
 *
 * References:
 * https://attacomsian.com/blog/nodejs-mongodb-local-connection
 * https://expressjs.com/en/starter/hello-world.html
 * https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/cursor/
 *
 * Gilberto Echeverria
 * 2022-09-01
 */

const express = require('express');
const app = express();
const port = 5000;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

let db;
let coll;

app.use(express.json());

app.get('/api/docs', async (req, res) => {
    console.log("RECEIVED A REQUEST");
    const cursor = coll.find({});
    const data = await cursor.toArray();
    console.log("RESULTS TO SEND: " + data);
    res.json(data);
})

app.listen(port, () => {
    connectDB();
    console.log(`App listening on port ${port}`)
})

function connectDB() {
    // Establish the connection
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        if(err) {
            return console.log(err);
        }

        // Connect to a database
        db = client.db('learning');
        console.log(`Connected to Mongo ${url}`);

        // Insert new data in a collection
        coll = db.collection('docs');
    })
}


// TODO: This function does not work yet
async function get_data() {
    // Retrieve data from the collection
    const cursor = docs.find({});
    const data = await cursor.toArray();
    return data;
}

// TODO: This function does not work yet
function add_record() {
    /*
        docs.insertOne({
            caso: 11,
            folio: 935,
            materia: 'amparo'
        }, (err, result) => {});
        */
}
