import React from "react";
import "./App.css";

import styled from "styled-components";

import useFetch from "@aslan-hooks/use-fetch";

const App = () => {
  const [loading, result] = useFetch("https://pokeapi.co/api/v2/pokemon");

  return (
    <ul>
      {result &&
        result.results.map(pokemon => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
    </ul>
  );
};

export default App;
