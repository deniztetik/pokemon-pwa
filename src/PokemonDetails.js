import React from "react";

import "styled-components/macro";

import capitalize from "lodash/capitalize";

import useFetchPokemonDetails from "./hooks/useFetchPokemonDetails";

const PokemonDetails = ({ nationalNo }) => {
  const [loading, result] = useFetchPokemonDetails(nationalNo);

  return !loading ? (
    <div
      css={`
        display: grid;
        place-items: center;
        height: 100%;
      `}
    >
      <div>
        <img src={result.spriteUrl} alt={result.name} width={125} draggable="false" />
        <div>
          {result.nationalNo} - {capitalize(result.name)}
        </div>
      </div>
    </div>
  ) : null;
};

export default PokemonDetails;
