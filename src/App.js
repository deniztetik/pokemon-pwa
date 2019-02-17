import React, { useState, useEffect } from "react";
import "./App.css";

import styled from "styled-components";

import useLocalStorage from "@aslan-hooks/use-local-storage";

import Pokemon from "./Pokemon";

const PokemonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const getPokemonFromLocalStorage = () =>
  JSON.parse(window.localStorage.getItem("pokemon"));

const setPokemonInLocalStorage = pokemon =>
  window.localStorage.setItem("pokemon", JSON.stringify(pokemon));

const App = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  const [latestPokemonToFetch, setLatestPokemonToFetch] = useState(151);

  const fetchPokemon = async latestPokemonToFetch => {
    let res;
    setLoading(true);

    const pokemonFromLocalStorage = getPokemonFromLocalStorage();

    if (
      pokemonFromLocalStorage &&
      pokemonFromLocalStorage.results.length >= latestPokemonToFetch
    ) {
      res = pokemonFromLocalStorage;
    } else {
      res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${latestPokemonToFetch}`,
      );
      res = await res.json();
      setPokemonInLocalStorage(res);
    }

    setResult(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(latestPokemonToFetch);
  }, []);

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
