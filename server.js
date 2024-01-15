require('dotenv').config();
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const directoryPath = path.join(__dirname, 'uploads');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const s3 = require('./s3');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Images
app.get('/api/image/id/:image_id', (req, res) => {
  const image_id = req.params.image_id;
  db.getImageById(image_id, (error, image) => {
    if (error) {
      return res.send({error: error.message});

    }
  
    res.send({image});
  });
});

app.get('/api/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const readStream = s3.getFileStream(filename);
  readStream.pipe(res);
});

app.get('/api/images', (req, res) => {
  db.getImages((error, images) => {
    if (error) {
      return res.send({error: error.message});

    }
    res.send({images});
  });
});

app.post('/api/image', upload.single('image_file'), async (req, res) => {
  const { filename } = req.file;

  const image_name = req.body.image_name;
  const image_src = `/api/image/${filename}`;  
  const headerToken = req.headers.authorization.slice(7);

  await s3.uploadFile(req.file);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.createImages(image_name, image_src , (error, insertId) => {
      if (error) {
        return res.send({error: error.message});
      }
      res.send({
        image_id: insertId,
        image_name,
        image_src
      });
    });

  });
});

app.delete(`/api/image/delete/:image_id`, (req, res) => {
  const image_id = req.params.image_id;
  const image_src = req.body.image_src;
  const s3_key = image_src.slice(11);
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

      db.deleteImages(image_id, (error, insertId) => {
        if (error) {
          return res.send({error: error.message});
        }
        res.send({insertId});
      });
      s3.deleteObjects(s3_key);
      fs.unlink(directoryPath + image_src.slice(10), (err => { 
      if (err) console.log("no file found"); 
    })); 
  });
});

// Contents
app.get('/api/content/:content_id', (req, res) => {
  const content_id = req.params.content_id;

  db.getContentById(content_id, (error, content) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({content});
  });
});

app.get('/api/contents', (req, res) => {
  db.getContents((error, contents) => {
    if (error) {
      return res.send({error: error.message});

    }
    res.send({contents});
  });
});

app.post('/api/content', (req, res) => {
  const content_title = req.body.content_title;
  const content_details = req.body.content_details;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.createContent(content_title, content_details, (error, insertId) => {
      if (error) {
        return res.send({error: error});
      }
      res.send({
        content_id: insertId,
        content_title,
        content_details
      });
    });

  });
});

app.put('/api/content/:content_id', (req, res) => {
  const content_id = req.body.content_id;
  const content_title = req.body.content_title;
  const content_details = req.body.content_details;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.updateContent(content_id, content_title, content_details, (error, results) => {
      if (error) {
        return res.send({error: error});
      }
      res.send({results});    
    });
  });
});

app.delete('/api/content/:content_id', (req, res) => {
  const content_id = req.params.content_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.deleteContent(content_id, (error, insertId) => {
      if (error) {
        return res.send({error: error.message});
      }
      res.send({insertId});
    });
  });
});

// Home
app.get('/api/past/:home_id', (req, res) => {
  const home_id = req.params.home_id;

  db.getHomeById(home_id, (error, home) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({home});
  });
});

app.get('/api/home', (req, res) => {
  db.getHome((error, home) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({home});
  });
});

app.post('/api/home', (req, res) => {
  const image_ref_id = req.body.image_ref_id;
  const content_ref_id = req.body.content_ref_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.createHome(image_ref_id, content_ref_id, (error, insertId) => {
      if (error) {
        return res.send({error: error});
      }
      res.send({
        home_id: insertId,
        image_ref_id,
        content_ref_id
      });
    });

  });
});

app.put('/api/home/:home_id', (req, res) => {
  const home_id = req.body.home_id;
  const image_id = req.body.image_ref_id;
  const content_id = req.body.content_ref_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.updateHome(home_id, image_id, content_id, (error, results) => {
      if (error) {
        return res.send({error: error});
      }
      res.send({results});
    });

  });
});

app.delete('/api/home/:home_id', (req, res) => {
  const home_id = req.params.home_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.deleteHome(home_id, (error, insertId) => {
      if (error) {
        return res.send({error: error.message});
      }
      res.send({insertId});
      });
    });
});

// Past
app.get('/api/past/:past_id', (req, res) => {
  const past_id = req.params.past_id;

  db.getPastById(past_id, (error, past) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({past});
  });
});

app.get('/api/past', (req, res) => {
  db.getPast((error, past) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({past});
  });
});

app.post('/api/past', (req, res) => {
  const image_ref_id = req.body.image_ref_id;
  const content_ref_id = req.body.content_ref_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.createPast(image_ref_id, content_ref_id, (error, insertId) => {
      if (error) {
        return res.send({error: error});
      }
      res.send({
        past_id: insertId,
        image_ref_id,
        content_ref_id
      });
    });

  });
});

app.put('/api/past/:past_id', (req, res) => {
  const past_id = req.body.past_id;
  const image_id = req.body.image_ref_id;
  const content_id = req.body.content_ref_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.updatePast(past_id, image_id, content_id, (error, results) => {
      if (error) {
        return res.send({error: error});
      }
      res.send({results});
    });

  });
});

app.delete('/api/past/:past_id', (req, res) => {
  const past_id = req.params.past_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.deletePast(past_id, (error, insertId) => {
      if (error) {
        return res.send({error: error.message});
      }
      res.send({insertId});
      });
    });
});

//  Present
app.get('/api/present/:present_id', (req, res) => {
  const present_id = req.params.present_id;

  db.getPresentById(present_id, (error, present) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({present});
  });
});

app.get('/api/presents', (req, res) => {
  db.getPresents((error, presents) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({presents});
  });
});

app.post('/api/present', (req, res) => {
  const image_ref_id = req.body.image_ref_id;
  const content_ref_id = req.body.content_ref_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

      db.createPresent(image_ref_id, content_ref_id, (error, insertId) => {
        if (error) {
          return res.send({error: error});
        }
        res.send({
          present_id: insertId,
          image_ref_id,
          content_ref_id
        });
      });
    
    });
      
});

app.put('/api/present/:present_id', (req, res) => {
  const present_id = req.body.present_id;
  const image_id = req.body.image_ref_id;
  const content_id = req.body.content_ref_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.updatePresent(present_id, image_id, content_id, (error, results) => {
      if (error) {
        return res.send({error: error});
      }
      res.send({results});
    });
    });
     
});

app.delete('/api/present/:present_id', (req, res) => {
  const present_id = req.params.present_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.deletePresent(present_id, (error, insertId) => {
      if (error) {
        return res.send({error: error.message});
      }
      res.send({insertId});

    });

    });
    
});

//  Future
app.get('/api/future/:future_id', (req, res) => {
  const future_id = req.params.future_id;

  db.getFutureById(future_id, (error, future) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({future});
  });
});

app.get('/api/future', (req, res) => {
  db.getFuture((error, future) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({future});
  });
});

app.post('/api/future', (req, res) => {
  const image_ref_id = req.body.image_ref_id;
  const content_ref_id = req.body.content_ref_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

    db.createFuture(image_ref_id, content_ref_id, (error, insertId) => {
      if (error) {
        return res.send({error: error});
      }
      res.send({
        future_id: insertId,
        image_ref_id,
        content_ref_id
      });

    });

  });

});

app.put('/api/future/:future_id', (req, res) => {
  const future_id = req.body.future_id;
  const image_id = req.body.image_ref_id;
  const content_id = req.body.content_ref_id;

  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

      db.updateFuture(future_id, image_id, content_id, (error, results) => {
        if (error) {
          return res.send({error: error});
        }
        res.send({results});

  });

  });
})

app.delete('/api/future/:future_id', (req, res) => {

  const future_id = req.params.future_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

      db.deleteFuture(future_id, (error, insertId) => {
        if (error) {
          return res.send({error: error.message});
        }
        res.send({insertId});
  
      });

  });
  
});

//Editor
app.get('/api/editor/:editor_id', (req, res) => {
  const editor_id = req.params.editor_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

      db.getEditorById(editor_id, (error, response) => {
        if (error) {
          return res.send({error: error.message});
        }
        res.send(response);
      })

  });

});

app.post('/api/editor/creation', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.createEditorAccount(username, password, (error, response) => {

    if (error) {
      return res.send({error: error});
    }
    
    res.send(response);

  });
});

app.post('/api/editor/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.createLoginSession(username, password, (error, response) => {
  
    if(!response) {
      res.send({ invalid_credentials: true });
    } else if (response.length === 0) {

      res.send(response.logged_in);

    }
    else  {
      if (error) {

        return res.send({error: error});
        
      } else {

        const token = jwt.sign({ response }, JWT_SECRET);

        res.send({
            jwt: token,
            editor_id: response.editor_id,
            logged_in: response.logged_in
        });

      }
    }
  });
});

app.put('/api/editor/password/:editor_id', (req, res) => {
  const editor_id = req.body.editor_id;
  const password = req.body.password;

  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

      db.updatePassword(editor_id, password, (error, results) => {
        if (error) {
          return res.send({error: error});
        }
        res.send({results});

  });

  });
});

app.put('/api/editor/:editor_id', (req, res) => {
  const editor_id = req.body.editor_id;
  const logged_in = req.body.logged_in;

  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else 

      db.updateLoginStatus(editor_id, logged_in, (error, results) => {
        if (error) {
          return res.send({error: error});
        }
        res.send({results});

  });

  });
});

app.delete('/api/editor/delete/:editor_id', (req, res) => {

  const editor_id = req.params.editor_id;
  const headerToken = req.headers.authorization.slice(7);

  jwt.verify(headerToken, JWT_SECRET, function(err, decoded) {

    if (err) {

      console.log(err);
      res.send("Not authorized");

    } else {

      db.deleteEditor(editor_id, (error, insertId) => {
        if (error) {
          return res.send({error: error.message});
        }
        res.send({insertId});
  
      });
    }
  });

  
});

// Comments
app.get('/api/all/comments', (req, res) => {

  db.getAllComments((error, response) => {
    if(error) {
      res.send(error);
    }

    res.send(response);

  });

});

app.get('/api/main/comments', (req, res) => {

      db.getMainComments((error, response) => {
        if(error) {
          res.send(error);
        }

        res.send(response);

      });
  
});

app.get('/api/replies/:comment_ref', (req, res) => {

  const comment_ref = req.params.comment_ref;

  db.getReplies(comment_ref, (error, response) => {
    if(error) {
      res.send(error);
    }

    res.send(response);

  });

});

app.post('/api/create/comment', (req, res) => {
  const commentor = req.body.commentor;
  const comment = req.body.comment;
  const comment_ref = req.body.comment_ref;

      db.createComment(commentor, comment, comment_ref, (error, response) => {
        if(error) {
          res.send(error);
        }
        res.send({response});

      });
  
});

// FOR PRODUCTION
app.use(express.static(__dirname + '/dist/'));

app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log("server started");