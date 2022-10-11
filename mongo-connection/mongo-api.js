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
const multer = require('multer');
const body_parser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');

const app = express();
const upload = multer({ dest: '.temp/' });

const url = 'mongodb://127.0.0.1:27017';
const port = 5000;

let db;

app.use(express.json());

app.listen(port, () => {
    connectDB();
    console.log(`App listening on port ${port}`)
});

app.post('/api/login', async(req, res) => {
    console.log("Login request: ", req.body);
    try {
        let cursor = await db.collection('users').findOne(req.body,
            { projection: { _id: 0, user: 1, name: 1 } });
        const data = await cursor;
        console.log("RESULTS TO SEND: " + data);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


app.get('/api/docs', async (req, res) => {
    try {
        console.log("REQUEST FOR ALL DOCS");
        // Filter to not receive the internal id
        const cursor = db.collection('docs').find({}, {projection: {_id: 0}});
        const data = await cursor.toArray();
        //console.log("RESULTS TO SEND: " + data);
        res.json(data);
    } catch(error) {
        res.status(500);
        res.json(error);
        console.log(error);
    }
});

app.post('/api/getdocs', async (req, res) => {
    try {
        console.log("REQUEST FOR FILTER: " + JSON.stringify(req.body));
        // Filter to not receive the internal id
        const cursor = db.collection('docs').find(req.body, {projection: {_id: 0}});
        const data = await cursor.toArray();
        console.log("RESULTS TO SEND: " + data);
        res.json(data);
    } catch(error) {
        res.status(500);
        res.json(error);
        console.log(error);
    }
});

app.post('/api/addfile', upload.single("file_input"), (req, res) => {
    try {
        console.log("UPLOAD request: ", req.file.filename, req.body.caso, req.body.folio);
        //console.log("REQUEST FOR NEW DOC: " + req.body);
        //console.log("REQUEST FOR NEW DOC: " + JSON.stringify(req.body));

        // Prepare data for insertion into database
        let fileName = req.body.caso + "_" + req.body.folio;
        let item = req.body;
        item = {...item, ...{filename: fileName }};
        add_document(item, 'files_test');

        let tempFile = __dirname + "/.temp/" + req.file.filename;
        let storeFile = __dirname + "/.storage/" + fileName;
        encrypt_file(tempFile, storeFile);

        //res.render('/newFile');
        res.json({'message': "Data inserted correctly."});
    } catch(error) {
        res.status(500);
        res.json(error);
        console.log(error);
    }
});

app.post('/api/adddoc', (req, res) => {
    try {
        //console.log("REQUEST FOR NEW DOC: " + req.body);
        console.log("REQUEST FOR NEW DOC: " + JSON.stringify(req.body));
        add_document(req.body, 'docs');
        res.json({'message': "Data inserted correctly."});
        console.log("ADDED NEW DOCUMENT");
    } catch(error) {
        res.status(500);
        res.json(error);
        console.log(error);
    }
});

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
    })
}


// TODO: This function does not work yet
async function get_data() {
    // Retrieve data from the collection
    const cursor = docs.find({});
    const data = await cursor.toArray();
    return data;
}

// Add a new document into the collection
// The document must be in JSON format
function add_document(doc, collection) {
    db.collection(collection).insertOne(doc, (err, result) => {
        if(err) {
            return console.log(err);
        }
    });
}

function encrypt_file(tempFile, storeFile) {
    console.log("tempFile: " + tempFile);
    console.log("storeFile: " + storeFile);
    let inputFS = fs.createReadStream(tempFile);
    let outputFS = fs.createWriteStream(storeFile);
    let key = "abcabcabcabcabcabcabcabcabcabc12"
    let iv = "abcabcabcabcabc1"
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS);
    outputFS.on('finish', function() {
        fs.unlink(tempFile, (err) => {
            if (err) throw err;
            console.log("File uploaded and deleted");
        })
    })
}
