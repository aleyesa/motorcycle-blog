const express = require('express');
const port = process.env.PORT || 8080;
const app = express();


const mysql = require('mysql');

const jawsDB = 'mysql://vgyb1e6tc22029gj:pkl6mmas5wvd31m9@lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/geei9sek17g9jznr';

const connection = mysql.createConnection(jawsDB);
connection.connect();
 
connection.query('SELECT * FROM contents', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
// connection.end();

app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/cors', (req, res) => {
  res.send('This has CORS enabled 🎈')
});

app.listen(port);

console.log("server started");