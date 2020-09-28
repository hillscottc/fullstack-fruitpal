const Pool = require("pg").Pool;

const pool = new Pool({
  user: "fruitpal",
  host: "localhost",
  database: "fruitpal",
  password: "fruitpal",
  port: 5432,
});

const getFruitPrices = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM fruitprices ORDER BY fruitprice_id ASC",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getFruitPrices,
};
