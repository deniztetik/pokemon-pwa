import useLocalStorage from "@aslan-hooks/use-local-storage";
import usePromise from "@aslan-hooks/use-promise";

const useFetchPokemon = name => {
  // eslint-disable-next-line
  const [_, setPokemonInLocalStorage] = useLocalStorage("pokemonDetails");

  const fetchPokemonFromAPI = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    return await res.json();
  };

  const fetchPokemon = async () => {
    const pokemonFromLocalStorage = JSON.parse(
      window.localStorage.getItem("pokemonDetails"),
    );

    const specificPokemonFromLocalStorage =
      pokemonFromLocalStorage && pokemonFromLocalStorage[name];

    if (specificPokemonFromLocalStorage) {
      return specificPokemonFromLocalStorage;
    } else {
      const res = await fetchPokemonFromAPI();

      const picked = (({ id, sprites }) => ({ id, sprites }))(res);

      setPokemonInLocalStorage({
        ...(JSON.parse(window.localStorage.getItem("pokemonDetails")) || {}),
        [name]: picked,
      });
      return picked;
    }
  };

  const [loading, result] = usePromise(fetchPokemon);

  return [loading, result];
};

export default useFetchPokemon;
