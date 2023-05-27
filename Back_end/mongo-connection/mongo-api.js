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
const fileupload = require('express-fileupload');
const cors = require('cors');

// Encryption of the files uploaded
const fs = require('fs');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');

const app = express();

const url = 'mongodb://127.0.0.1:27017';
const port = 5000;

let db;

// Configuration for encryption and decryption
let key = "abcabcabcabcabcabcabcabcabcabc12"
let iv = "abcabcabcabcabc1"

// Configure the file upload middleware
app.use(
    fileupload({
        //createParentPath: true,
        useTempFiles : true,
        tempFileDir : __dirname + '/.temp/'
    }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
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

app.post('/api/addfile', async (req, res) => {
    try {
        //console.log("UPLOAD request: ", req.files.file_input, req.body.caso, req.body.folio);
        //console.log(req.files);
        //console.log("Uploaded file: " + req.files.file_input.name);
        //console.log("Uploaded file path: " + req.files.file_input.tempFilePath);

        // Prepare data for insertion into database
        // Name of the file reference stored in the database
        let fileName = req.body.caso + "_" + req.body.folio;
        let item = req.body;
        item = {...item, ...{filename: fileName }};
        add_document(item, 'docs');

        // Prepare file names for Encryption
        let tempFile = req.files.file_input.tempFilePath;
        let storeFile = __dirname + "/.storage/" + fileName;
        encrypt_file(tempFile, storeFile);

        res.json({'message': "Data inserted correctly."});
    } catch(error) {
        res.status(500);
        res.json(error);
        console.log(error);
    }
});

app.get('/api/getfile/:filename', (req, res) => {
    try {
        console.log("REQUEST FOR FILE: " + req.params.filename);
        let fileName = req.params.filename;
        let storeFile = __dirname + "/.storage/" + fileName;
        let downFile = __dirname + "/.temp/" + fileName + ".pdf";
        decrypt_file(storeFile, downFile, res);
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
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS);
    outputFS.on('finish', function() {
        fs.unlink(tempFile, (err) => {
            if (err) throw err;
            console.log("File uploaded and deleted");
        })
    })
}

function decrypt_file(storeFile, downFile, res) {
    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
    let inputFS = fs.createReadStream(storeFile);
    const outputFS = fs.createWriteStream(downFile);
    inputFS.pipe(decipher).pipe(outputFS);
    outputFS.on('finish', function() {
      console.log("File decrypted: " + downFile);
      res.download(downFile, (err) => {
          if (err) throw err;
          fs.unlink(downFile, (err) => {
              if (err) throw err;
              console.log("File processed and temp deleted");
          })
      })
    })
}
