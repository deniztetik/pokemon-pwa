import React from "react";

import { Box } from "grommet";

import "styled-components/macro";

import capitalize from "lodash/capitalize";

const Pokemon = ({ name, sprite, id }) => (
  <Box
    className="pokemon"
    css="margin: 20px"
    pad="large"
    align="center"
    background={{ color: "light-2", opacity: "strong" }}
    round
    gap="small"
  >
    <img src={sprite} alt={name} width={125} draggable="false" />
    <div css="text-align: center">{`#${id} ${capitalize(name)}`}</div>
  </Box>
);

export default Pokemon;
