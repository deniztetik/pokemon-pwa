/* 
TODO:
1. Store images in db
2. Update modal covering information on the Pokemon
3. Fix scroll issue when wide screen so 
*/

import React, { useState, useEffect } from "react";

import styled, { createGlobalStyle } from "styled-components";
import "styled-components/macro";
import * as types from "styled-components/cssprop";

import { Grommet, Box, TextInput, InfiniteScroll, Heading } from "grommet";
import Modal from "react-modal";

import useDebounce from "@aslan-hooks/use-debounce";

import Pokemon from "./Pokemon";
import PokemonDetails from "./PokemonDetails";

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

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// interface Pokemon {
//   name: string;
//   nationalNo: number;
// }

const onAfterOpen = () => {
  window.document.getElementsByTagName("body")[0].style.overflow = "hidden";
};

const onAfterClose = () => {
  window.document.getElementsByTagName("body")[0].style.overflow = "";
};

Modal.setAppElement("#root");

const App = () => {
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPokemonNo, setSelectedPokemonNo] = useState<number | null>(null);

  const { loading, result } = useFetchPokemon();

  const debouncedInput = useDebounce(input, 1000);

  const openModal = (nationalNo: number) => {
    setSelectedPokemonNo(nationalNo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPokemonNo(null);
    setModalOpen(false);
  };

  const renderPokemon = () => {
    if (!result) {
      return null;
    } else {
      const filteredPokemon = result.filter((pokemon: Pokemon) => {
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
              onClick={() => openModal(pokemon.id)}
              key={pokemon.name}
              name={pokemon.name}
              sprite={pokemon.spriteUrl}
              id={pokemon.id}
            />
          )}
        </InfiniteScroll>
      );
    }
  };

  useEffect(() => {
    const setModalOpenIfEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", setModalOpenIfEscape);

    return () => document.removeEventListener("keydown", setModalOpenIfEscape);
  }, [modalOpen]);

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
            <Modal
              isOpen={modalOpen}
              onAfterOpen={onAfterOpen}
              onAfterClose={onAfterClose}
              style={customModalStyles}
            >
              <PokemonDetails nationalNo={selectedPokemonNo} />
            </Modal>
          </>
        )}
      </Box>
    </Grommet>
  );
};

export default App;
