import useLocalStorage from "@aslan-hooks/use-local-storage";
import usePromise from "@aslan-hooks/use-promise";

import uniqBy from "lodash/uniqBy";

const slicePokemon = (pokemon, startIndex, endIndex) => {
  return {
    ...pokemon,
    results: pokemon.results.slice(startIndex, endIndex),
  };
};

const useFetchPokemonList = latestPokemonToFetch => {
  const [pokemonFromLocalStorage, setPokemonInLocalStorage] = useLocalStorage(
    "pokemon",
  );

  const fetchPokemonListFromAPI = async offset => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}`,
    );
    return await res.json();
  };

  const removeDuplicatedPokemon = pokemon => {
    const newPokemon = { ...pokemon };
    newPokemon.results = uniqBy(newPokemon.results, "name");
    return newPokemon;
  };

  const writePokemonToLocalStorageAndReturnMergedPokemon = pokemon => {
    let mergedPokemon = pokemonFromLocalStorage
      ? {
          ...pokemonFromLocalStorage,
          results: [...pokemonFromLocalStorage.results, ...pokemon.results],
        }
      : pokemon;

    mergedPokemon = removeDuplicatedPokemon(mergedPokemon);

    setPokemonInLocalStorage(mergedPokemon);
    return mergedPokemon;
  };

  const fetchPokemonList = async () => {
    const latestPokemonInLocalStorage =
      pokemonFromLocalStorage &&
      pokemonFromLocalStorage.results.length >= latestPokemonToFetch;

    if (latestPokemonInLocalStorage) {
      return slicePokemon(pokemonFromLocalStorage, 0, latestPokemonToFetch);
    } else {
      const res = await fetchPokemonListFromAPI(latestPokemonToFetch - 20);
      //   TODO: put somewhere else... need to bettser isolate local storage...
      const mergedPokemon = writePokemonToLocalStorageAndReturnMergedPokemon(
        res,
      );
      return mergedPokemon;
    }
  };

  const [loading, result] = usePromise(fetchPokemonList, [
    latestPokemonToFetch,
    pokemonFromLocalStorage,
  ]);

  return [loading, result];
};

export default useFetchPokemonList;
