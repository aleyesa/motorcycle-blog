const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
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
  DELETE FROM present WHERE present_id=(?)
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

function getPastById(past_id, callback) {
  const query = `
  SELECT * 
  FROM past
  WHERE past_id=(${past_id})
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
}
exports.getPastById = getPastById;

function getPast(callback) {
  const query = `
  SELECT *
  FROM past p
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
exports.getPast = getPast;

function createPast(image_id, content_id, callback) {

  const query = `
    INSERT INTO past(image_ref_id, content_ref_id)
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
exports.createPast = createPast;

function updatePast(past_id, image_id, content_id, callback) {
  const query = `
    UPDATE past
    SET image_ref_id = (${image_id}), content_ref_id = (${content_id})
    WHERE past_id = (${past_id})
  `

  db.query(query, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result);
  });
}
exports.updatePast = updatePast;

function deletePast(past_id, callback) {
  const query = `
  DELETE FROM past WHERE past_id=(?)
  `;

  const params = [past_id];

  db.query(query, params, (error, result) => {
    if(error) {
      return callback(error);
    }
    callback(null, result);
  });
} 
exports.deletePast = deletePast;

function getFutureById(future_id, callback) {
  const query = `
  SELECT * 
  FROM future
  WHERE future_id=(${future_id})
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
}
exports.getFutureById = getFutureById;

function getFuture(callback) {
  const query = `
  SELECT *
  FROM future f
  JOIN images i
  ON i.image_id = f.image_ref_id
  JOIN contents c
  ON c.content_id = f.content_ref_id
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error);
    }
    callback(null, results);
  });
  
}
exports.getFuture = getFuture;

function createFuture(image_id, content_id, callback) {

  const query = `
    INSERT INTO future(image_ref_id, content_ref_id)
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
exports.createFuture = createFuture;

function updateFuture(future_id, image_id, content_id, callback) {
  const query = `
    UPDATE future
    SET image_ref_id = (${image_id}), content_ref_id = (${content_id})
    WHERE future_id = (${future_id})
  `

  db.query(query, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result);
  });
}
exports.updateFuture = updateFuture;

function deleteFuture(future_id, callback) {
  const query = `
  DELETE FROM future WHERE future_id=(?)
  `;

  const params = [future_id];

  db.query(query, params, (error, result) => {
    if(error) {
      return callback(error);
    }
    callback(null, result);
  });
} 
exports.deleteFuture = deleteFuture;

function getEditorById(editor_id, callback) {
  const query = `
  SELECT username, password
  FROM editors
  WHERE editor_id=(?)
  `;

  const params = [editor_id];

  db.query(query, params, (error, response) => {
    if (error) {
      return callback(error);
    }
    callback(null, response[0]);
  });
}
exports.getEditorById = getEditorById;

function createEditorAccount(username, password, callback) {
  const query = `
  INSERT INTO editors(username, password, logged_in)
  VALUES (?, ?, 0);
  `;

  const params = [username, password];

  db.query(query, params, (error, response) => {

    if (error) {
      return callback(error);
    }

    callback(null, response);
  });

}
exports.createEditorAccount = createEditorAccount;

function createLoginSession(username, password, callback) {
  const query = `
  SELECT editor_id, logged_in
  FROM editors
  WHERE username=(?) AND password=(?)
  `;

  const params = [username, password];

  
    db.query(query, params, (error, response) => {
      
      if (response == "" || error) {
        return callback("invalid username or password");
      } else {
        callback(null, {
          editor_id: response[0].editor_id,
          logged_in: response[0].logged_in
      });
      }


    });

}
exports.createLoginSession = createLoginSession;

function updatePassword(editor_id, password, callback) {

  const query = `
    UPDATE editors
    SET password= (?)
    WHERE editor_id = (?)
  `

  const params = [password, editor_id];

  db.query(query, params, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result);
  });
}
exports.updatePassword = updatePassword;

function updateLoginStatus(editor_id, logged_in, callback) {

  const query = `
    UPDATE editors
    SET logged_in= (${logged_in})
    WHERE editor_id = (${editor_id})
  `

  db.query(query, (error, result) => {
    if (error) {
      return callback(error);
    }
    callback(null, result);
  });
}
exports.updateLoginStatus = updateLoginStatus;

function deleteEditor(editor_id, callback) {
  const query = `
  DELETE FROM editors WHERE editor_id=(?)
  `;

  const params = [editor_id];

  db.query(query, params, (error, result) => {
    if(error) {
      return callback(error);
    }
    callback(null, result);
  });
} 
exports.deleteEditor = deleteEditor;

function getEditors(callback) {
  const query = `
  SELECT * 
  FROM editors
  `;

  db.query(query, (error, response) => {
    if (error) {
      return callback(error);
    }
    callback(null, response);
  });
}
exports.getEditors = getEditors;

function getAllComments(callback) {
  const query = `
  SELECT *
  FROM comments; 
  `;

  db.query(query, (error, response) => {
    if (error) {
      return callback(error);
    }
    callback(null, response);

  });
}
exports.getAllComments = getAllComments;

function getMainComments(callback) {
  const query = `
  SELECT *
  FROM comments
  WHERE comment_ref IS NULL;  
  `;

  db.query(query, (error, response) => {
    if (error) {
      return callback(error);
    }
    callback(null, response);

  });
}
exports.getMainComments = getMainComments;

function getReplies(comment_ref, callback) {
  const query = `
  SELECT *
  FROM comments
  WHERE comment_ref=${comment_ref};  
  `;

  db.query(query, (error, response) => {
    if (error) {
      return callback(error);
    }
    callback(null, response);

  });
}
exports.getReplies = getReplies;

function createComment(commentor, comment, comment_ref, callback) {
  const query = `
  INSERT INTO comments(commentor, comment, comment_ref)
  VALUES (?,?,?);
  `;

  const params = [commentor, comment, comment_ref];

  db.query(query, params, (error, response) => {
    if (error) {
      return callback(error);
    }
    callback(null, {
      response
    });

  });
}
exports.createComment = createComment;




