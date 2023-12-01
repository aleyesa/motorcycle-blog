const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

const db = require('./db');

app.get('/api/images/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log("test:" + __dirname);
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

app.post('/api/images', upload.single('image'), (req, res) => {
  const { filename, path } = req.file;
  console.log(req.file);
  console.log(req.body);
  const image_name = req.body.image_name;
  const image_src = `/api/images/${filename}`;

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

app.get('/api/contents', (req, res) => {

});

app.post('/api/contents', (req, res) => {
  res.send("Contents SENT!");

});

// FOR PRODUCTION
app.use(express.static(__dirname + '/dist/'));

app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log("server started");