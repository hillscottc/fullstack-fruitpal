import React, { useState } from "react";
import "./App.css";

const HOST_URL = "http://localhost:3001";

// fetch(`${HOST_URL}/fruitprices`)
//   .then((response) => response.text())
//   .then((data) => console.log({ data }));

function App() {
  const [commodity, setCommodity] = useState("");
  const [price, setPrice] = useState(0);
  const [tons, setTons] = useState(0);

  const getPriceQuery = ({ commodity, price, tons }) => {
    const url = `${HOST_URL}/price_query?commodity=${commodity}&price=${price}&tons=${tons}`;
    console.log("CALL URL:", url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("GOT RESP:", data);
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

      <form onSubmit={handleSubmit}>
        <div className="search-param">
          <label htmlFor="commodity">Commodity: </label>
          <select
            id="commodity"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          >
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
    </main>
  );
}

export default App;
