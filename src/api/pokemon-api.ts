import { ITEMS_PER_PAGE } from '@/constants';

const fetchTypes = () =>
  fetch(`http://localhost:3000/api/poke-types`)
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
  fetch(
    `http://localhost:3000/api/pokemon?page=${page}&pokemon=${pokemonName}&types=${pokemonTypes}`,
  )
    .then((res) => res.json())
    .then((data) => data);

const fetchPokemonByUrl = (url: string) => {
  return fetch(url).then((res) => res.json());
};

const fetchAllPokemonNames = () => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=2000`).then((res) => res.json());
};

const searchByType = ({ type }: { type: string[] }) => {};

export const API = {
  fetchTypes,
  searchByType,
  fetchPokemonByUrl,
  fetchAllPokemonNames,
  fetchPokemonsV2,
};
