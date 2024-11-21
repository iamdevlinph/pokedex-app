import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const fetchTypes = () =>
  fetch(`/api/poke-types`)
    .then((res) => res.json())
    .then((data) => data.data);

const fetchPokemonsV2 = ({
  page = 1,
  pokemonName = '',
  pokemonTypes = [],
}: {
  page?: number;
  pokemonName?: string | null;
  pokemonTypes?: string[];
}) =>
  fetch(`/api/pokemon?page=${page}&pokemon=${pokemonName}&types=${pokemonTypes}`)
    .then((res) => res.json())
    .then((data) => data);

export const API = {
  fetchTypes,
  fetchPokemonsV2,
};
