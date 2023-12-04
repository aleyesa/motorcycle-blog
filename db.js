const mysql = require('mysql');

const db = mysql.createConnection({
host: process.env.HOST || 'lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
user: process.env.USER || 'vgyb1e6tc22029gj',
password: process.env.PASSWORD || 'pkl6mmas5wvd31m9',
database: process.env.DATABASE ||  'geei9sek17g9jznr'
});

db.connect();

function createImages(image_name, image_src, callback) {

  const query = `
    INSERT INTO images(image_name, image_src)
    VALUES (?, ?)
  `;

  const params = [image_name, image_src];

  db.query(query, params, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result.insertId);
  });

}
exports.createImages = createImages;

function getImages(callback) {
  const query = `
  SELECT * FROM images
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
  
}
exports.getImages = getImages;

function deleteImages(image_id, callback) {
  const query = `
  DELETE FROM images WHERE image_id=(?)
  `;

  const params = [image_id];

  db.query(query, params, (error, result) => {
    if(error) {
      return callback(error);
    }
    callback(null, result);
  });

  
} 

exports.deleteImages = deleteImages;
