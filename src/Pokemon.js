import React from "react";

import Loader from "react-loader-spinner";

import "styled-components/macro";

import capitalize from "lodash/capitalize";

import useFetchPokemon from "./effects/useFetchPokemon";

const Pokemon = ({ name }) => {
  const [loading, pokemonInfo] = useFetchPokemon(name);

  const imgSrc = pokemonInfo ? pokemonInfo.sprites.front_default : null;
  const pokeNum = pokemonInfo ? `#${pokemonInfo.id}` : "";

  return (
    <div css="margin: 20px">
      {loading ? (
        <Loader type="Grid" color="grey" height={125} width={125} />
      ) : (
        <img src={imgSrc} alt={name} width={125} />
      )}
      <div css="text-align: center">{`${pokeNum} ${capitalize(name)}`}</div>
    </div>
  );
};

export default Pokemon;
