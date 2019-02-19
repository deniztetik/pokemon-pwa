/* 
TODO:
1. Progressively render new elements as you scroll down
   a. PROBLEM --> how to set new Pokemon to be fetched
    i. Respecting BOTH localStorage and fetch 
      (i.e. don't refetch new Pokemon that are already in local storage, ONLY fetch the new ones)
      - Right now (a) there isn't a way to set the new amount of Pokemon and have that cycle through the app
        and (b) there isn't a way to prioritize local storage over data over new data if SOME of it is in local storage
2. Style page properly 
3. Create page covering information on the Pokemon
4. Create process to basically download all the data for the app 
*/

import React, { useState, useEffect } from "react";
import "./App.css";

import styled from "styled-components";

import Pokemon from "./Pokemon";

import useFetchPokemonList from "./effects/useFetchPokemonList";

const POKEMON_COUNT = 807;

const PokemonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const pokemonFromLocalStorage = JSON.parse(
    window.localStorage.getItem("pokemon"),
  );

  const [latestPokemonToFetch, setLatestPokemonToFetch] = useState(
    pokemonFromLocalStorage ? pokemonFromLocalStorage.results.length : 25,
  );

  const [loading, result] = useFetchPokemonList(latestPokemonToFetch);

  const handleScroll = e => {
    const lastPokemonEl = document.querySelector(
      ".pokemon-wrapper > .pokemon:last-child",
    );
    const lastPokemonElOffset =
      lastPokemonEl.offsetTop + lastPokemonEl.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastPokemonElOffset) {
      if (POKEMON_COUNT - latestPokemonToFetch <= 25) {
        setLatestPokemonToFetch(POKEMON_COUNT);
      } else {
        setLatestPokemonToFetch(latestPokemonToFetch + 25);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [latestPokemonToFetch]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <PokemonWrapper className="pokemon-wrapper">
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
