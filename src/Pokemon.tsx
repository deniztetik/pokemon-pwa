import React from "react";

import { Box } from "grommet";

import "styled-components/macro";
import * as types from "styled-components/cssprop";

import capitalize from "lodash/capitalize";

interface PokemonProps {
  name: string;
  sprite: string;
  id: number;
  onClick: () => void;
}

const Pokemon = ({ name, sprite, id, ...props }: PokemonProps): JSX.Element => (
  <Box
    className="pokemon"
    css={`
      margin: 10px;
      cursor: pointer;
    `}
    pad="medium"
    align="center"
    background={{ color: "light-2", opacity: "medium" }}
    round
    gap="small"
    {...props}
  >
    <img src={sprite} alt={name} width={125} draggable={false} />
    <div css="text-align: center">{`#${id} ${capitalize(name)}`}</div>
  </Box>
);

export default Pokemon;
