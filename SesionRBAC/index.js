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
  store: MongoStore.create({mongoUrl: "mongodb://localhost/documentosDAC" })
}))

async function connectDB(){
    let client=new MongoClient("mongodb://localhost/documentosDAC")
    await client.connect();
    db=client.db();
}

async function subirArchivo(tipo, req, res, key, iv){
    let inputFS=fs.createReadStream(__dirname+"/.temp/"+req.file.filename);
    let nombreArchivo=req.body.nombre;
    let personaDocumento=req.body.persona;
    let lugarGuardar=__dirname+"/.storage/"+req.body.nombre;
    let outputFS=fs.createWriteStream(lugarGuardar);
    console.log(key.length)
    console.log(iv.length)
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
    if (req.session.usuario){
        if(req.session.tipo1){
            res.render("cargar.ejs", {tipo: "tipo1", msg:""})
        }else{
            res.redirect("/forbidden")
        }
    }else{
        res.redirect("/login")
    }
})


app.post("/cargartipo1", uploads.single('archivo'), (req, res)=>{
    if (req.session.usuario){
        if(req.session.tipo1){
            db.collection("roles").findOne({rol:"tipo1"}, (err, resultQuery)=>{
                fs.readFile('testLab.key', (err, key)=>{
                    let keySym=Buffer.from(crypto.privateDecrypt(key, Buffer.from(resultQuery.llave, 'hex')))
                    let iv=crypto.privateDecrypt(key, Buffer.from(resultQuery.iv, 'hex'));
                    subirArchivo("tipo1",  req, res, keySym, iv);
                });  
            });
        }else{
            res.redirect("/forbidden")
        }
    }else{
        res.redirect("/login")
    }
})


app.get("/descargartipo1", (req, res)=>{
    if (req.session.usuario){
        if(req.session.tipo1){
            db.collection("tipo1").find({}).project({"nombre":1, "persona":1, "_id":0}).toArray( (err, result) => {
                if (err) throw err;
                res.render("descargar.ejs", {tipo:"tipo1",documentos: result})
            });
        }else{
            res.redirect("/forbidden")
        }
    }else{
        res.redirect("/login")
    }
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
    if (req.session.usuario){
        if(req.session.tipo1){
            db.collection("roles").findOne({rol:"tipo1"}, (err, resultQuery)=>{
                fs.readFile('testLab.key', (err, key)=>{
                    let keySym=Buffer.from(crypto.privateDecrypt(key, Buffer.from(resultQuery.llave, 'hex')))
                    let iv=crypto.privateDecrypt(key, Buffer.from(resultQuery.iv, 'hex'));
                    descargarArchivo("tipo1", req, res, keySym, iv)
                });
            });
        }else{
            res.redirect("/forbidden")
        }
        
    }else{
        res.redirect("/login")
    }
})


app.get("/test", (req, res)=>{
    res.render("forbidden.ejs")
    let privKey=fs.readFileSync('testLab.key')
    let llave=Buffer.from(crypto.randomBytes(32).toString('ascii'))
    let cifrado=crypto.publicEncrypt(privKey, llave)
    let cifradoEncoded=cifrado.toString('ascii')
    let cifradoDecoded=Buffer.from(cifrado, 'ascii')
    let descifrado=Buffer.from(crypto.privateDecrypt(privKey, cifradoDecoded))
    console.log("original: "+llave+" tam:"+llave.length)
    console.log("cifrado: "+cifrado)
    console.log("cifrado Encoded: "+cifradoEncoded)
    console.log("cifrado Decoded: "+cifradoEncoded)
    console.log("descifrado Raw: "+descifrado)
})
app.get("/setup", (req, res)=>{
    res.render("setup.ejs")
})

app.post("/setup", (req, res)=>{
    let pass=req.body.pass;
    let roles=["tipo1", "tipo2", "tipo3"]
    let privKey=fs.readFileSync('testLab.key')
    for(i=0; i<roles.length; i++){
        let key=crypto.publicEncrypt(privKey, Buffer.from(crypto.randomBytes(16).toString('hex'))).toString('hex');
        let iv=crypto.publicEncrypt(privKey,Buffer.from(crypto.randomBytes(8).toString('hex'))).toString('hex');
        let aInsertar={rol: roles[i], llave: key, iv: iv}
        db.collection("roles").insertOne(aInsertar, (err, result)=>{
            if (err) throw err;
        })
    }
    bcrypt.hash(pass, 10, (err, hash)=>{
        let aAgregar={usuario:"admin", password:hash, tipo1: false, tipo2: false, tipo3: false, admin: true}
        db.collection("usuarios").insertOne(aAgregar, (err, result)=>{
            if (err) throw err;
            res.redirect("/")
        })
    })
})

app.get("/", (req, res)=>{
    res.render("login.ejs", {msg:""})
})


app.get("/login", (req, res)=>{
    res.render("login.ejs", {msg:""})
})

app.post("/login", (req, res)=>{
    let user=req.body.usuario;
    let pass=req.body.password;
    db.collection("usuarios").findOne({usuario:user}, (err, resultQuery)=>{
      if(resultQuery!=null){
        bcrypt.compare(pass, resultQuery.password, (err, result)=>{
          if(result){
            req.session.usuario=user;
            req.session.tipo1=resultQuery.tipo1;
            req.session.tipo2=resultQuery.tipo2;
            req.session.tipo3=resultQuery.tipo3;
            req.session.admin=resultQuery.admin;
            res.redirect("/descargartipo1")
          }else{
            console.log("Usuario no existe")
            res.render("login.ejs", {msg: "Usuario o password incorrect"})
          }
        })
      }else{
        res.render("login.ejs", {msg: "Usuario o password incorrecto"})
      }
    })
  })


app.get("/logout", (req, res)=>{
    req.session.destroy();
    res.redirect("/");
})

app.get("/forbidden", (req, res)=>{
    res.render("forbidden.ejs")
});

app.get("/agregarUsuario", (req, res)=>{
    if (req.session.usuario){
        if(req.session.admin){
            db.collection("roles").find({}).project({"rol":1, "_id":0}).toArray( (err, result) => {
                res.render("agregarUsuario.ejs", {roles: result})
            });
        }else{
            res.redirect("/forbidden")
        }
    }else{
        res.redirect("/login")
    }
})

app.post("/agregarUsuario", (req, res)=>{
    let user=req.body.usuario;
    let pass=req.body.pass;
    bcrypt.hash(pass, 10, (err, hash)=>{
        let aAgregar={usuario:user, password: hash}
        db.collection("roles").find({}).project({"rol":1, "_id":0}).toArray( (err, rolesExistentes) => {
            for(i=0; i<rolesExistentes.length; i++){
                console.log(rolesExistentes[i])
                if(req.body[rolesExistentes[i].rol]){
                    aAgregar[rolesExistentes[i].rol]=true
                }else{
                    aAgregar[rolesExistentes[i].rol]=false;
                }
            }
            db.collection("usuarios").insertOne(aAgregar, (err, result)=>{
                if (err) throw err;
                res.redirect("/")
            })
        });
    });
})

https.createServer({
    cert: fs.readFileSync('testLab.cer'),
    key: fs.readFileSync('testLab.key')
}, app).listen(443, () =>{
   connectDB()
    console.log('Server started on port 443...');
});