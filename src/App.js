import React from "react";
import logo from "./logo.svg";
import "./App.css";

import usePromise from "@aslan-hooks/use-promise";

const App = () => {
  const fetchPokemon = async () => {
    const result = await fetch("https://pokeapi.co/api/v2/pokemon");
    return result.json();
  };

  const [loading, result] = usePromise(fetchPokemon);

  console.log("loading", loading);
  console.log("result", result);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
