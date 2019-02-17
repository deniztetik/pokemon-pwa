import useLocalStorage from "@aslan-hooks/use-local-storage";
import usePromise from "@aslan-hooks/use-promise";

const useFetchPokemonList = latestPokemonToFetch => {
  const [pokemonFromLocalStorage, setPokemonInLocalStorage] = useLocalStorage(
    "pokemon",
  );

  const fetchPokemonFromAPI = async limit => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    return await res.json();
  };

  const fetchPokemon = async () => {
    const latestPokemonInLocalStorage =
      pokemonFromLocalStorage &&
      pokemonFromLocalStorage.results.length >= latestPokemonToFetch;

    if (latestPokemonInLocalStorage) {
      return pokemonFromLocalStorage;
    } else {
      const res = await fetchPokemonFromAPI(latestPokemonToFetch);
      //   TODO: put somewhere else... need to better isolate local storage...
      setPokemonInLocalStorage(res);
      return res;
    }
  };

  const [loading, result] = usePromise(fetchPokemon, [latestPokemonToFetch]);

  return [loading, result];
};

export default useFetchPokemonList;
