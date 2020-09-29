import React, { useState } from "react";
import PriceList from "./components/PriceList";
import fruits from "./images/fruits.png";
import "./App.css";

const HOST_URL = "http://localhost:3001";

function App() {
  const [commodity, setCommodity] = useState("");
  const [price, setPrice] = useState(0);
  const [tons, setTons] = useState(0);
  const [priceQueryResults, setPriceQueryResults] = useState([]);
  const [validPrice, setValidPrice] = useState(true);
  const [validTons, setValidTons] = useState(true);
  const [validCommodity, setValidCommodity] = useState(true);

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

  const isNumeric = (val) => !(val === "" || isNaN(val));

  const validate = () => {
    if (!commodity) {
      setValidCommodity(false);
      return false;
    } else {
      setValidCommodity(true);
    }

    if (!isNumeric(price)) {
      setValidPrice(false);
      return false;
    } else {
      setValidPrice(true);
    }
    if (!isNumeric(tons)) {
      setValidTons(false);
      return false;
    } else {
      setValidTons(true);
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      commodity,
      price,
      tons,
    };
    if (validate()) {
      getPriceQuery(data);
    }
  };

  return (
    <main className="App">
      <h1>
        <img alt="fruit logo" className="fruits-img" src={fruits} />
        FruitPal
      </h1>

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
          {!validCommodity && (
            <span className="validation-err">Choose a fruit</span>
          )}
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
          {!validPrice && (
            <span className="validation-err">Must be numeric</span>
          )}
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
          {!validTons && (
            <span className="validation-err">Must be numeric</span>
          )}
        </div>
        <aside className="search-param">
          (The test values were: Commodity = mango , Price = 53 , and Tons =
          405)
        </aside>
        <br />
        <div>
          <input className="add-btn" type="submit" />
        </div>
      </form>
      <br />
      {priceQueryResults.length > 0 && (
        <PriceList priceQueryResults={priceQueryResults} />
      )}
    </main>
  );
}

export default App;
