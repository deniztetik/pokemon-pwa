// import usePromise from "@aslan-hooks/use-promise";
import usePromise from "../util/usePromise";

import db from "../db";

const useFetchPokemonDetails = (id: number) => {
  const main = async () => {
    if (id) {
      const pokemonInDb = await db.table("pokemon").get(id);
      return pokemonInDb;
    }
    return null;
  };

  const [loading, result] = usePromise(main);

  return [loading, result];
};

export default useFetchPokemonDetails;
