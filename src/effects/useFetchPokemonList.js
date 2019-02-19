import useLocalStorage from "@aslan-hooks/use-local-storage";
import usePromise from "@aslan-hooks/use-promise";

const useFetchPokemonList = latestPokemonToFetch => {
  const [pokemonFromLocalStorage, setPokemonInLocalStorage] = useLocalStorage(
    "pokemon",
  );

  const writePokemonToLocalStorage = () => {
    console.log("pokemonFromLocalStorage", pokemonFromLocalStorage);
  };

  const fetchPokemonListFromAPI = async limit => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    return await res.json();
  };

  const fetchPokemonList = async () => {
    const latestPokemonInLocalStorage =
      pokemonFromLocalStorage &&
      pokemonFromLocalStorage.results.length >= latestPokemonToFetch;

    if (latestPokemonInLocalStorage) {
      return pokemonFromLocalStorage;
    } else {
      const res = await fetchPokemonListFromAPI(latestPokemonToFetch);
      //   TODO: put somewhere else... need to better isolate local storage...
      writePokemonToLocalStorage();
      setPokemonInLocalStorage(res);
      return res;
    }
  };

  const [loading, result] = usePromise(fetchPokemonList, [
    latestPokemonToFetch,
    pokemonFromLocalStorage,
  ]);

  return [loading, result];
};

export default useFetchPokemonList;
