const express = require("express")
const multer  = require('multer')
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const Binary = require('mongodb').Binary

const uploads = multer({ dest: '.temp/' })
const app = express();

let db;

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

async function connectToDb() {
    const client = new MongoClient('mongodb://localhost/mybooks2');
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db();
}

app.get("/upload", (req, res) => {
    res.render("upload.ejs")
})

app.post("/upload", uploads.single("myFile"), (req, res) => {
    console.log(req.file.filename, req.body.nombre);
    let inputFS = fs.createReadStream(__dirname+"/.temp/"+req.file.filename);
    let nombreArchivo = req.body.nombre;
    let lugarGuardar = __dirname+"/.temp/"+req.body.nombre;
    let outputFS = fs.createWriteStream(lugarGuardar);
    let key = "abcabcabcabcabcabcabcabcabcabc12"
    let iv = "abcabcabcabcabc1"
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS);
    outputFS.on('finish', function() {
        fs.unlink(__dirname+"/.temp/"+req.file.filename, (err) => {
            if (err) throw err;
            let valoresInsertar = {};
            valoresInsertar.nombre = nombreArchivo;
            let archivoCargado = fs.readFileSync(lugarGuardar);
            valoresInsertar.archivo = Binary(archivoCargado);
            db.collection("books").insertOne(valoresInsertar, (err, res) => {
                if (err) throw err;
                fs.unlink(nombreArchivo, (err) => {
                    console.log("guardado archivo y borrado subido")
                });
            })
        })
    })
    res.render("upload.ejs")
})

app.get("/descargar", (req, res) => {
    db.collection("books").find({}).project({"nombre":1, "_id":0}).toArray( (err, result) => {
        if (err) throw err;
        res.render("archivos.ejs", {archivos: result})
        /*fs.readdir(__dirname+"/.storage", (err, files) => {
            if (err) throw err;
            res.render("archivos.ejs", {archivos: files})
        });*/
    });
})

app.post("/descargar", (req, res) => {
    db.collection("books").findOne({"nombre":req.body.documentos}, (err, result) => {
        if (err) throw err;
        let archivoTemporalCifrado = __dirname+"/.temp/"+req.body.documentos
        let archivoTemporal = __dirname+"/.temp/"+req.body.documentos+".pdf";
        fs.writeFileSync(archivoTemporalCifrado, result.archivo.buffer);
        const inputFS = fs.createReadStream(archivoTemporalCifrado);
        const outputFS = fs.createWriteStream(archivoTemporal);
        const key = "abcabcabcabcabcabcabcabcabcabc12"
        const iv = "abcabcabcabcabc1"
        const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
        inputFS.pipe(decipher).pipe(outputFS);
        outputFS.on('finish', function() {
            res.download(archivoTemporal, (err) => {
                if (err) throw err;
                fs.unlink(archivoTemporal, (err) => {
                    if (err) throw err;
                    fs.unlink(archivoTemporalCifrado, (err) => {
                        if (err) throw err;
                        console.log("Borrado archivo despues de descargar")
                    })
                })
            })
        });
    })
})

app.listen(3000,() => {
    connectToDb();
    console.log('Server started on port 3000...');
});
