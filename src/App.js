import React from "react";
import "./App.css";

import styled from "styled-components";

import useFetch from "@aslan-hooks/use-fetch";

import Pokemon from "./Pokemon";

const PokemonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const App = () => {
  const [loading, result] = useFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151",
  );

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <PokemonWrapper>
          {result &&
            result.results.map(pokemon => (
              <Pokemon key={pokemon.name} name={pokemon.name} />
            ))}
        </PokemonWrapper>
      )}
    </>
  );
};

export default App;
