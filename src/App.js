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
5. Fix structure of object.
*/

import React, { useState, useEffect } from "react";
import "./App.css";

import styled, { createGlobalStyle } from "styled-components";
import "styled-components/macro";

import { Grommet, Box, TextInput } from "grommet";

import Pokemon from "./Pokemon";

import useFetchPokemonList from "./effects/useFetchPokemonList";

const POKEMON_COUNT = 807;

const PokemonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: #e3350d;
  }
`;

const App = () => {
  const [inputExpr, setInputExpr] = useState("[^]*");

  const [latestPokemonToFetch, setLatestPokemonToFetch] = useState(20);

  const [loading, result] = useFetchPokemonList(latestPokemonToFetch);

  const handleScroll = e => {
    const lastPokemonEl = document.querySelector(
      ".pokemon-wrapper > .pokemon:last-child",
    );
    const lastPokemonElOffset =
      lastPokemonEl.offsetTop + lastPokemonEl.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastPokemonElOffset) {
      if (POKEMON_COUNT - latestPokemonToFetch <= 20) {
        setLatestPokemonToFetch(POKEMON_COUNT);
      } else {
        setLatestPokemonToFetch(latestPokemonToFetch + 20);
      }
    }
  };

  const onInputChange = e => {
    const value = e.target.value;
    setInputExpr(new RegExp(value, "g"));
  };

  const renderPokemon = () => {
    if (!result) {
      return null;
    }
    return result.results
      .filter(pokemon => pokemon.name.match(inputExpr))
      .map(pokemon => <Pokemon key={pokemon.name} name={pokemon.name} />);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [latestPokemonToFetch]);

  return (
    <Grommet>
      <GlobalStyle />
      {loading ? (
        <div>Loading</div>
      ) : (
        <Box align="center">
          <Box width="medium">
            <TextInput
              css={`
                background: white;
              `}
              onChange={onInputChange}
            />
          </Box>
          <PokemonWrapper className="pokemon-wrapper">
            {renderPokemon()}
          </PokemonWrapper>
        </Box>
      )}
    </Grommet>
  );
};

export default App;
