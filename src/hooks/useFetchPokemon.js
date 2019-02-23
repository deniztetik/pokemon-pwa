import usePromise from "@aslan-hooks/use-promise";

import range from "lodash/range";

import db from "../db";

const POKEMON_LIMIT = 807;

const useFetchPokemon = () => {
  const buildFetchPokemonDetailsPromise = async pokemonNo => {
    const pokemonDetailsRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNo}/`);

    return await pokemonDetailsRes.json();
  };

  const fetchPokemonList = async () => {
    const pokemonPromises = range(1, POKEMON_LIMIT).map(pokemonNo =>
      buildFetchPokemonDetailsPromise(pokemonNo),
    );
    const pokemon = await Promise.all(pokemonPromises);
    return pokemon.map(pokeman =>
      (({ id, species, sprites }) => ({ id, species, sprites }))(pokeman),
    );
  };

  const renameKeys = pokemen =>
    pokemen.map(pokemon => {
      const newPokemon = { ...pokemon };
      newPokemon.nationalNo = newPokemon.id;
      newPokemon.spriteUrl = newPokemon.sprites.front_default;
      newPokemon.name = newPokemon.species.name;
      delete newPokemon.id;
      delete newPokemon.sprites;
      delete newPokemon.species;
      return newPokemon;
    });

  const main = async () => {
    const pokemonInDb = await db.table("pokemon");

    if ((await pokemonInDb.count()) === 0) {
      let pokemen = await fetchPokemonList();
      pokemen = renameKeys(pokemen);

      await db.pokemon.bulkAdd(pokemen);
    }

    return await db.table("pokemon").toArray();
  };

  const [loading, result] = usePromise(main);

  return [loading, result];
};

export default useFetchPokemon;
