import React from "react";

import { Button } from "grommet";
import { Close, Analytics } from "grommet-icons";

import "styled-components/macro";
import * as types from "styled-components/cssprop";

import capitalize from "lodash/capitalize";

import useFetchPokemonDetails from "./hooks/useFetchPokemonDetails";

const PokemonDetails = ({ nationalNo, closeModal }: { nationalNo: number | null, closeModal: () => void }): JSX.Element | null => {
  const { loading, result } = useFetchPokemonDetails(nationalNo);
``
  return !loading && result ? (
    <div
      css={`
        display: grid;
        place-items: center;
        height: 100%;
      `}
    >
      <Button
        icon={<Close size="small" />}
        onClick={closeModal}
        css={`
          padding: 0;
          position: absolute;
          left: 143px;
          top: 6px;
        `}
      />
      <div>
        <img src={result.spriteUrl} alt={result.name} width={125} draggable={false} />
        <div>
          {result.nationalNo} - {capitalize(result.name)}
        </div>
      </div>
    </div>
  ) : null;
};

export default PokemonDetails;
