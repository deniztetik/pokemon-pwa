/* 
TODO:
1. Store images in db
2. Create page covering information on the Pokemon
*/

import React, { useState } from "react";

import styled, { createGlobalStyle } from "styled-components";
import "styled-components/macro";

import { Grommet, Box, TextInput, InfiniteScroll, Heading } from "grommet";

import useDebounce from "@aslan-hooks/use-debounce";

import Pokemon from "./Pokemon";

import useFetchPokemon from "./hooks/useFetchPokemon";

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
  const [input, setInput] = useState("");

  const [loading, result] = useFetchPokemon();

  const debouncedInput = useDebounce(input, 1000);

  const renderPokemon = () => {
    if (!result) {
      return null;
    }

    const filteredPokemon = result.filter(pokemon => {
      if (debouncedInput === "") return true;
      return (
        pokemon.name.match(new RegExp(debouncedInput, "gi")) ||
        pokemon.nationalNo === Number(debouncedInput)
      );
    });

    return (
      <InfiniteScroll items={filteredPokemon}>
        {pokemon => (
          <Pokemon
            key={pokemon.name}
            name={pokemon.name}
            sprite={pokemon.spriteUrl}
            id={pokemon.id}
          />
        )}
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
            <Box width="small" css="margin: 20px">
              <TextInput
                css={`
                  background: white;
                  opacity: 0.5;
                `}
                onChange={e => setInput(e.target.value)}
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
