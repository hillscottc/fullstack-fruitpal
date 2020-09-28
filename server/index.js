const express = require("express");
const app = express();
const port = 3001;
const album_model = require("./album_model");
const fruitprice_model = require("./fruitprice_model");
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

// Curl queries look like:
// curl -i -H "Accept: application/json" "localhost:3001/"


app.get("/fruitprices", (req, res) => {
  fruitprice_model
    .getFruitPrices()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});




// Return all albums
app.get("/", (req, res) => {
  album_model
    .getAlbums()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Return albums, can search LIKE artist
// /albums OR /albums?artist=foo
app.get("/albums", (req, res) => {
  const { artist } = req.query;
  if (artist) {
    album_model
      .findAlbumsByArtist(artist)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } else {
    album_model
      .getAlbums()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

app.post("/albums", (req, res) => {
  album_model
    .createAlbum(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/albums/:id", (req, res) => {
  album_model
    .deleteAlbum(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
