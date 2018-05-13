const express = require('express');
const app = new express();

const appData = require('./data');
const PORT = 5000;

// allow client running on alternate port to access server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/albums', (req, res) => {
  res.send(appData.albums);
});

app.get('/api/albums/:id', (req, res) => {
  res.send(getAlbumItems(req.params.id));
});

app.listen(PORT, () => console.log(`API listening on port ${PORT}.`));


function getAlbumItems(id) {
  const albumId = parseInt(id);

  return appData.items
    .filter(item => item.albumIds.includes(albumId));
}