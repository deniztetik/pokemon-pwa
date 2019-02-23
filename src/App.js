/* 
TODO:
1. Store images in db
2. Create page covering information on the Pokemon
*/

import React, { useState } from "react";
import "./App.css";

import styled, { createGlobalStyle } from "styled-components";
import "styled-components/macro";

import { Grommet, Box, TextInput, InfiniteScroll, Heading } from "grommet";

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
    background: #00739D;
    user-select: none;
  }
`;

const App = () => {
  const [inputExpr, setInputExpr] = useState("[^]*");

  const [loading, result] = useFetchPokemon();

  const debouncedInputExpr = useDebounce(inputExpr, 1000);

  const onInputChange = e => {
    const value = e.target.value;
    setInputExpr(new RegExp(value, "gi"));
  };

  const renderPokemon = () => {
    if (!result) {
      return null;
    }
    const filteredPokemon = result.filter(pokemon => pokemon.name.match(debouncedInputExpr));

    return (
      <InfiniteScroll items={filteredPokemon}>
        {pokemon => {
          return (
            <Pokemon
              key={pokemon.name}
              name={pokemon.name}
              sprite={pokemon.spriteUrl}
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
      <Box align="center">
        <Heading margin="none">Pokedex</Heading>
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <Box width="medium">
              <TextInput
                css={`
                  background: white;
                `}
                onChange={onInputChange}
              />
            </Box>
            <PokemonWrapper className="pokemon-wrapper">{renderPokemon()}</PokemonWrapper>
          </>
        )}
      </Box>
    </Grommet>
  );
};

export default App;
