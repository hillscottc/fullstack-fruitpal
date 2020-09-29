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

const priceQuery = (commodity, price, tons) => {
  console.log("API HANDLE QUERY:", { commodity, price, tons });
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT ctry_code, ($1 * ($2 + variable_cost)) + fixed_overhead as total_cost, $2 + variable_cost as variable_cost FROM fruitprices " +
        "WHERE commodity_id = (SELECT commodity_id FROM commodities WHERE commodity = $3)",
      [tons, price, commodity],
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
  priceQuery,
};
