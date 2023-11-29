const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'vgyb1e6tc22029gj',
  password : 'pkl6mmas5wvd31m9',
  database : 'geei9sek17g9jznr'
});
 
connection.connect();
 
connection.query('SELECT * FROM contents', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();
