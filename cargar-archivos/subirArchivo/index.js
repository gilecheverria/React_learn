const express = require("express")
const multer  = require('multer')
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');

const app = express();
const uploads = multer({ dest: '.temp/' })
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get("/upload", (req, res) => {
    res.render("upload.ejs")
})

app.post("/upload", uploads.single("myFile"), (req, res) => {
    console.log("UPLOAD request: ", req.file.filename, req.body.nombre);
    let tempFile = __dirname + "/.temp/" + req.file.filename;
    let storeFile = __dirname + "/.storage/" + req.body.nombre;
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
            console.log("guardado archivo y borrado subido")
        })
    })
    res.render("upload.ejs")
})

app.get("/descargar", (req, res) => {
    fs.readdir(__dirname + "/.storage", (err, files) => {
        if (err) throw err;
        res.render("archivos.ejs", {archivos: files})
    });
})

app.post("/descargar", (req, res) => {
    let archivoTemporal = __dirname + "/.temp/" + req.body.documentos + ".pdf";
    let storeFile = __dirname + "/.storage/" + req.body.documentos;
    const inputFS = fs.createReadStream(storeFile);
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
                console.log("Borrado archivo despues de descargar")
            })
        })
       console.log("creado el archivo a abrir");
    });
})

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
