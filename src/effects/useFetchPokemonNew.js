import usePromise from "@aslan-hooks/use-promise";
import useLocalStorage from "@aslan-hooks/use-local-storage";

import range from "lodash/range";

const POKEMON_LIMIT = 807;

const useFetchPokemon = () => {
  const [pokemonLocalStorage, setPokemonLocalStorage] = useLocalStorage(
    "pokemon",
    window.localStorage.pokemon
      ? JSON.parse(window.localStorage.pokemon)
      : null,
  );

  const fetchPokemonListFromAPI = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`,
    );
    return await res.json();
  };

  const buildFetchPokemonDetailsPromise = async pokemonNo => {
    const pokemonDetailsRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNo}/`,
    );

    return await pokemonDetailsRes.json();
  };

  const fetchPokemonList = async () => {
    const pokemonPromises = range(1, POKEMON_LIMIT).map(pokemonNo =>
      buildFetchPokemonDetailsPromise(pokemonNo),
    );
    const pokemon = await Promise.all(pokemonPromises);
    return pokemon.map(pokeman =>
      (({ id, name, sprites }) => ({ id, name, sprites }))(pokeman),
    );
  };

  const main = async () => {
    const pokemon = pokemonLocalStorage
      ? pokemonLocalStorage
      : await fetchPokemonList();
    setPokemonLocalStorage(pokemon);
    return pokemon;
  };

  const [loading, result] = usePromise(main);

  return [loading, result];
};

export default useFetchPokemon;
