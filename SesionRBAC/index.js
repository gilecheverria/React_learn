const express = require("express")
const https = require('https');
const multer  = require('multer')
const fs= require('fs');
const crypto = require('crypto');
const session=require("express-session")
const bodyParser=require("body-parser")
const MongoClient=require('mongodb').MongoClient
const MongoStore= require("connect-mongo")
const bcrypt=require("bcrypt")


let db;
const uploads = multer({ dest: '.temp/' })
const app=express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
  secret: "secretVal",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: "mongodb://localhost/documentosRBAC" })
}))

async function connectDB(){
    let client=new MongoClient("mongodb://localhost/documentosRBAC")
    await client.connect();
    db=client.db();
}

async function subirArchivo(tipo, req, res, key, iv){
    let inputFS=fs.createReadStream(__dirname+"/.temp/"+req.file.filename);
    let nombreArchivo=req.body.nombre;
    let personaDocumento=req.body.persona;
    let lugarGuardar=__dirname+"/.storage/"+req.body.nombre;
    let outputFS=fs.createWriteStream(lugarGuardar);
    let cipher=crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS);
    outputFS.on('finish', function() {
        fs.unlink(__dirname+"/.temp/"+req.file.filename, (err)=>{
            if (err) throw err;
            let valoresInsertar={nombre : nombreArchivo, persona: personaDocumento, archivo: lugarGuardar};
            db.collection(tipo).insertOne(valoresInsertar, (err, res)=>{
                if (err) throw err;
                console.log("guardado archivo y borrado subido")
            })
        })
    })
    res.render("cargar.ejs", {tipo: tipo, msg:"Archivo "+nombreArchivo+" subido con exito"})
}

app.get("/cargartipo1", (req, res)=>{
    res.render("cargar.ejs", {tipo: "tipo1", msg:""})
})


app.post("/cargartipo1", uploads.single('archivo'), (req, res)=>{
    let key="abcabcabcabcabcabcabcabcabcabc12"
    let iv="abcabcabcabcabc1"
    subirArchivo("tipo1",  req, res)
})


app.get("/descargartipo1", (req, res)=>{
    db.collection("tipo1").find({}).project({"nombre":1, "persona":1, "_id":0}).toArray( (err, result) => {
        if (err) throw err;
        res.render("descargar.ejs", {tipo:"tipo1",documentos: result})
    });
})

async function descargarArchivo(tipo, req, res, key, iv){
    db.collection(tipo).findOne({"nombre":req.body.nombre}, (err, result)=>{
        if (err) throw err;
        let archivoTemporal=__dirname+"/.temp/"+req.body.nombre+".pdf";
        const inputFS=fs.createReadStream(result.archivo);
        const outputFS=fs.createWriteStream(archivoTemporal);
        const decipher=crypto.createDecipheriv("aes-256-cbc", key, iv)
        inputFS.pipe(decipher).pipe(outputFS);
        outputFS.on('finish', function() {
            res.download(archivoTemporal, (err)=>{
                if (err) throw err;
                fs.unlink(archivoTemporal, (err)=>{
                    if (err) throw err;
                    console.log("Borrado archivo despues de descargar")
                })
            })
        });
    })
}

app.post("/descargartipo1", (req, res)=>{
    let key="abcabcabcabcabcabcabcabcabcabc12"
    let iv="abcabcabcabcabc1"
    descargarArchivo("tipo1", req, res, key, iv)
})



https.createServer({
    cert: fs.readFileSync('testLab.cer'),
    key: fs.readFileSync('testLab.key')
}, app).listen(443, () =>{
   connectDB()
    console.log('Server started on port 443...');
});