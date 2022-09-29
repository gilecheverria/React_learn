const express = require("express")
const MongoClient=require('mongodb').MongoClient
const https = require('https');
const bodyParser=require("body-parser")
const bcrypt=require("bcrypt")
const fs = require('fs');
const session=require("express-session")
const MongoStore= require("connect-mongo")

let db;
const app=express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
  secret: "secretVal",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: "mongodb://localhost/documentos" })
}))

async function connectDB(){
    let client=new MongoClient("mongodb://localhost/documentos")
    await client.connect();
    db=client.db();
}

app.get("/login", (req, res)=>{
  res.render("login.ejs");
})

app.get("/", (req, res)=>{
  res.render("login.ejs");
})

app.post("/login", (req, res)=>{
  let user=req.body.usuario;
  let pass=req.body.password;
  db.collection("usuarios").findOne({usuario:user}, (err, result)=>{
    if(result!=null){
      bcrypt.compare(pass, result.password, (err, result)=>{
        if(result){
          req.session.usuario=user;
          res.redirect("/pagina")
        }else{
          console.log("Error en password")
          res.redirect("/")
        }
      })
    }else{
      console.log("El usuario no existe")
      res.redirect("/")
    }
  })
})

app.get("/pagina", (req, res)=>{
  if(req.session.usuario){
    console.log("Entro el usuario", req.session.usuario)
    res.render("pagina.ejs")
  }else{
    res.redirect("/")
  }
  
})


app.get("/logout", (req, res)=>{
  req.session.destroy();
  res.redirect("/");
})

app.get("/registro", (req, res)=>{
  res.render("registro.ejs");
})

app.post("/registro", (req, res)=>{
    let user=req.body.usuario;
    let pass=req.body.password;
    console.log("usuario recibido")
    db.collection("usuarios").findOne({usuario:user}, (err, result)=>{
      if(result!=null){
        console.log("El usuario ya existe")
      }else{
        bcrypt.hash(pass, 10, (err, hash)=>{
          let aAgregar={usuario:user, password:hash}
          db.collection("usuarios").insertOne(aAgregar, (err, result)=>{
            if (err) throw err;
            console.log("Usuario agregado")
            res.redirect("/")
          })
        })
      }
  })
})


/*https.createServer({
    cert: fs.readFileSync('testLab.cer'),
    key: fs.readFileSync('testLab.key')
}, app).listen(443, () =>{
   connectDB()
    console.log('Server started on port 443...');
});
*/

app.listen(80, () =>{
  connectDB()
   console.log('Server started on port 443...');
});