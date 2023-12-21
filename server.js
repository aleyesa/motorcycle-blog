const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  const readStream = fs.createReadStream(path.join(__dirname, 'uploads', `${filename}`));
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

app.post('/api/image', upload.single('image'), (req, res) => {


  // const { filename, path } = req.file;
  const { filename, path } = req.file;

  const image_name = req.body.image_name;
  const image_src = `/api/image/${filename}`;

  console.log(image_src);

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

app.delete(`/api/del/:image_id`, (req, res) => {
  const image_id = req.params.image_id;

  db.deleteImages(image_id, (error, insertId) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({insertId});
  });
});

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

app.put('/api/content/:content_id', (req, res) => {
  const content_id = req.body.content_id;
  const content_title = req.body.content_title;
  const content_details = req.body.content_details;

  db.updateContent(content_id, content_title, content_details, (error, results) => {
    if (error) {
      return res.send({error: error});
    }
    res.send({results});    
  });
});

app.delete('/api/content/:content_id', (req, res) => {
  const content_id = req.params.content_id;
  db.deleteContent(content_id, (error, insertId) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({insertId});
  });
});

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
  const image_id = req.body.image_id;
  const content_id = req.body.content_id;

  db.createContent(image_id, content_id, (error, insertId) => {
    if (error) {
      return res.send({error: error});
    }
    res.send({
      present_id: insertId,
      image_ref_id: image_id,
      content_ref_id: content_id
    });
  });

});

app.put('/api/present/:present_id', (req, res) => {
  const present_id = req.body.present_id;
  const image_id = req.body.image_ref_id;
  const content_id = req.body.content_ref_id;

  db.updatePresent(present_id, image_id, content_id, (error, results) => {
    if (error) {
      return res.send({error: error});
    }
    res.send({results});
  });
})

app.delete('/api/present/:present_id', (req, res) => {
  const present_id = req.params.present_id;
  db.deletePresent(present_id, (error, insertId) => {
    if (error) {
      return res.send({error: error.message});
    }
    res.send({insertId});
  });
});
















app.get('/api/owner', (req, res) => {
  res.send('get owner info working.');
});

app.get('api/editor', (req, res) => {
  res.send('get editor infor working');
});

// FOR PRODUCTION
// app.use(express.static(__dirname + '/dist/'));

// app.get(/.*/, function (req, res) {
//   res.sendFile(__dirname + '/dist/index.html');
// });

app.listen(port);

console.log("server started");