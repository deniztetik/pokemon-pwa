import React, { useState, useEffect } from "react";
import "./App.css";

import styled from "styled-components";

import Pokemon from "./Pokemon";

import useFetchPokemon from "./effects/useFetchPokemon";

const PokemonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [latestPokemonToFetch, setLatestPokemonToFetch] = useState(151);

  const [loading, result] = useFetchPokemon(latestPokemonToFetch);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <PokemonWrapper>
            {result &&
              result.results.map(pokemon => (
                <Pokemon key={pokemon.name} name={pokemon.name} />
              ))}
          </PokemonWrapper>
        </>
      )}
    </>
  );
};

export default App;
