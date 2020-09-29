import React, { useState } from "react";
import "./App.css";

const HOST_URL = "http://localhost:3001";

function QueryResult(queryResult) {
  const {
    ctry_code,
    total_cost,
    fixed_cost,
    variable_cost,
  } = queryResult.queryResult;
  return (
    <div style={{ margin: "10px" }}>
      <div>COUNTRY: {ctry_code}</div>
      <div>TOTAL COST: {total_cost && total_cost.toFixed(2)}</div>
      <div>FIXED COST: {fixed_cost}</div>
      <div>VARIABLE COST: {variable_cost}</div>
    </div>
  );
}

function App() {
  const [commodity, setCommodity] = useState("");
  const [price, setPrice] = useState(0);
  const [tons, setTons] = useState(0);
  const [priceQueryResults, setPriceQueryResults] = useState([]);

  const getPriceQuery = ({ commodity, price, tons }) => {
    const url = `${HOST_URL}/price_query?commodity=${commodity}&price=${price}&tons=${tons}`;
    console.log("CALL URL:", url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("GOT RESP:", data);
        setPriceQueryResults(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      commodity,
      price,
      tons,
    };
    console.log("DATA:", data);
    getPriceQuery(data);
  };

  return (
    <main className="App">
      <h1>FRUIT!</h1>

      <div>Try: COMMODITY = "mango" , PRICE = 53 , and TONS = 405</div>

      <form onSubmit={handleSubmit}>
        <div className="search-param">
          <label htmlFor="commodity">Commodity: </label>
          <select
            id="commodity"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="mango">mango</option>
            <option value="pineapple">pineapple</option>
            <option value="bannana">bannana</option>
            <option value="orange">orange</option>
            <option value="grapefruit">grapefruit</option>
          </select>
        </div>
        <div className="search-param">
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="text"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="search-param">
          <label htmlFor="tons">Tons: </label>
          <input
            id="tons"
            type="text"
            placeholder="0"
            value={tons}
            onChange={(e) => setTons(e.target.value)}
          />
        </div>
        <br />
        <div>
          <input className="add-btn" type="submit" />
        </div>
      </form>

      <div>
        {priceQueryResults.map((queryResult, ndx) => {
          return <QueryResult key={ndx} queryResult={queryResult} />;
        })}
      </div>
    </main>
  );
}

export default App;
