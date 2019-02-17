import React, { useState, useEffect } from "react";
import "./App.css";

import styled from "styled-components";

import useLocalStorage from "@aslan-hooks/use-local-storage";

import Pokemon from "./Pokemon";
import useFetch from "@aslan-hooks/use-fetch";

const PokemonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const useFetchPokemon = (latestPokemonToFetch, setLoading, setResult) => {
  const getPokemonFromLocalStorage = () =>
    JSON.parse(window.localStorage.getItem("pokemon"));

  const setPokemonInLocalStorage = pokemon =>
    window.localStorage.setItem("pokemon", JSON.stringify(pokemon));

  const fetchPokemonFromAPI = async limit => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    return await res.json();
  };

  const fetchPokemon = async () => {
    let res;
    setLoading(true);

    const pokemonFromLocalStorage = getPokemonFromLocalStorage();
    const latestPokemonInLocalStorage =
      pokemonFromLocalStorage &&
      pokemonFromLocalStorage.results.length >= latestPokemonToFetch;

    if (latestPokemonInLocalStorage) {
      res = pokemonFromLocalStorage;
    } else {
      res = await fetchPokemonFromAPI(latestPokemonToFetch);
      setPokemonInLocalStorage(res);
    }

    setResult(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(latestPokemonToFetch, setLoading, setResult);
  }, [latestPokemonToFetch]);
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  const [latestPokemonToFetch, setLatestPokemonToFetch] = useState(151);

  useFetchPokemon(latestPokemonToFetch, setLoading, setResult);

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
