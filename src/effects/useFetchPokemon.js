import useLocalStorage from "@aslan-hooks/use-local-storage";
import usePromise from "@aslan-hooks/use-promise";

const useFetchPokemon = name => {
  const [pokemonFromLocalStorage, setPokemonInLocalStorage] = useLocalStorage(
    "pokemonDetails",
  );

  const fetchPokemonFromAPI = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return await res.json();
  };

  const fetchPokemon = async () => {
    if (pokemonFromLocalStorage[name]) {
      return pokemonFromLocalStorage[name];
    } else {
      const res = await fetchPokemonFromAPI();
      //   TODO: put somewhere else... need to better isolate local storage...
      setPokemonInLocalStorage({ ...pokemonFromLocalStorage, [name]: res });
      return res;
    }
  };

  const [loading, result] = usePromise(fetchPokemon);

  return [loading, result];
};

export default useFetchPokemon;
