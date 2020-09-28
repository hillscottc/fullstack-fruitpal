import React from "react";
import "./App.css";

const HOST_URL = "http://localhost:3001";

fetch(`${HOST_URL}/fruitprices`)
  .then((response) => response.text())
  .then((data) => console.log({ data }));

function App() {
  return (
    <main className="App">
      <h1>FRUIT!</h1>
    </main>
  );
}

export default App;
