const express = require("express")
const https = require('https');
const fs = require('fs');
const app=express();
app.set('view engine', 'ejs')


app.get("/", (req, res)=>{
  res.render("pagina.ejs");
})



https.createServer({
    cert: fs.readFileSync('testLab.cer'),
    key: fs.readFileSync('testLab.key')
}, app).listen(443, () =>{
    console.log('Server started on port 443...');
});
