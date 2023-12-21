const mysql = require('mysql');

const db = mysql.createConnection({
host: process.env.HOST || 'lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
user: process.env.USER || 'vgyb1e6tc22029gj',
password: process.env.PASSWORD || 'pkl6mmas5wvd31m9',
database: process.env.DATABASE ||  'geei9sek17g9jznr'
});

db.connect();

function getImageById(image_id, callback) {
  const query = `
  SELECT * 
  FROM images
  WHERE image_id=(${image_id})
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
}
exports.getImageById = getImageById;

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

function getContentById(content_id, callback) {
  const query = `
  SELECT * 
  FROM contents
  WHERE content_id=(${content_id})
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
}
exports.getContentById = getContentById;

function getContents(callback) {
  const query = `
  SELECT * FROM contents
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
  
}
exports.getContents = getContents;

function createContent(content_title, content_details, callback) {

  const query = `
    INSERT INTO contents(content_title, content_details)
    VALUES (?, ?)
  `;

  const params = [content_title, content_details];

  db.query(query, params, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result.insertId);
  });

}
exports.createContent = createContent;

function updateContent(content_id, content_title, content_details, callback) {

  const query = `
    UPDATE contents
    SET content_title = (?), 
    content_details = (?)
    WHERE content_id = (?)
  `

  const params = [content_title, content_details, content_id];

  db.query(query, params, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result);
  });
}
exports.updateContent = updateContent;

function deleteContent(content_id, callback) {
  const query = `
  DELETE FROM contents WHERE content_id=(?)
  `;

  const params = [content_id];

  db.query(query, params, (error, result) => {
    if(error) {
      return callback(error);
    }
    callback(null, result);
  });
} 
exports.deleteContent = deleteContent;

function getPresentById(present_id, callback) {
  const query = `
  SELECT * 
  FROM present
  WHERE present_id=(${present_id})
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
}
exports.getPresentById = getPresentById;

function getPresents(callback) {
  const query = `
  SELECT *
  FROM present p
  JOIN images i
  ON i.image_id = p.image_ref_id
  JOIN contents c
  ON c.content_id = p.content_ref_id
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
  
}
exports.getPresents = getPresents;

function createPresent(image_id, content_id, callback) {

  const query = `
    INSERT INTO present(image_ref_id, content_ref_id)
    VALUES (?, ?)
  `;

  const params = [image_id, content_id];

  db.query(query, params, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result.insertId);
  });

}
exports.createPresent = createPresent;

function updatePresent(present_id, image_id, content_id, callback) {
  const query = `
    UPDATE present
    SET image_ref_id = (${image_id}), content_ref_id = (${content_id})
    WHERE present_id = (${present_id})
  `

  db.query(query, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result);
  });
}
exports.updatePresent = updatePresent;

function deletePresent(present_id, callback) {
  const query = `
  DELETE FROM contents WHERE present_id=(?)
  `;

  const params = [present_id];

  db.query(query, params, (error, result) => {
    if(error) {
      return callback(error);
    }
    callback(null, result);
  });
} 
exports.deletePresent = deletePresent;






