const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

const db = require('./db');

app.get('/images', (req, res) => {
  db.getImages((error, images) => {
    if (error) {
      res.send({error: error.message})
      return
    }
    res.send({images});
  });
});

app.post('/images', (req, res) => {
  db.createImages(image_name, image_src, (error, insertId) => {
    if (error) {
      res.send({error: error.message})
      return
    }
    res.send({
      image_id: insertId,
      image_name,
      image_src
    });
  });


});

app.get('/contents', (req, res) => {

});

app.post('/contents', (req, res) => {

});


app.use(express.static(__dirname + '/dist/'));

app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log("server started");