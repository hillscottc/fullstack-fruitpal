const express = require("express");
const app = express();
const port = 3001;
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

app.get("/price_query", (req, res) => {
  const { commodity, price, tons } = req.query;

  console.log("GOT QUERY:", { commodity, price, tons });

  fruitprice_model
    .priceQuery(commodity, price, tons)
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
