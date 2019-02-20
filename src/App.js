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

import React, { useState } from "react";
import "./App.css";

import styled, { createGlobalStyle } from "styled-components";
import "styled-components/macro";

import { Grommet, Box, TextInput, InfiniteScroll } from "grommet";

import Pokemon from "./Pokemon";

import useFetchPokemon from "./hooks/useFetchPokemon";
import useDebounce from "./hooks/useDebounce";

const PokemonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: #e3350d;
    user-select: none;
  }
`;

const App = () => {
  const [inputExpr, setInputExpr] = useState("[^]*");

  const [loading, result] = useFetchPokemon();

  const debouncedInputExpr = useDebounce(inputExpr, 1000);

  const onInputChange = e => {
    const value = e.target.value;
    setInputExpr(new RegExp(value, "g"));
  };

  const renderPokemon = () => {
    if (!result) {
      return null;
    }
    const filteredPokemon = result.filter(pokemon =>
      pokemon.name.match(debouncedInputExpr),
    );

    return (
      <InfiniteScroll items={filteredPokemon}>
        {pokemon => {
          return (
            <Pokemon
              key={pokemon.name}
              name={pokemon.name}
              sprite={pokemon.sprites.front_default}
              id={pokemon.id}
            />
          );
        }}
      </InfiniteScroll>
    );
  };

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
