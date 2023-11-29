const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

const cors = require('cors');

const mysql = require('mysql');


const JAWSDB_URL = 'mysql://vgyb1e6tc22029gj:pkl6mmas5wvd31m9@lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/geei9sek17g9jznr';
const db = mysql.createPool(JAWSDB_URL);

app.use(cors());

// app.get('/', (req, res) => {
//   db.query("SELECT * FROM images", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//   });
// });

app.use(express.static(__dirname + '/dist/'));

app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log("server started");