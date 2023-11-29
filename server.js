const express = require('express');
const port = process.env.PORT || 8080 || 3306;
const app = express();

const db = require('./webpack/db');

db.query("SELECT * FROM images", (err,result)=>{
  if(err) {
  console.log(err)
  } 
res.send(result)
});  

app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
})
app.listen(port);

console.log("server started");