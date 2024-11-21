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

const fetchPokemons = ({
  page,
  pokemonName,
  pokemonTypes,
}: {
  page: number;
  pokemonName?: string;
  pokemonTypes?: string[];
}) => {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  /**
   * NOTE: mutate data if searching by name to match if searching without name
   * to use the same react-query
   */
  if (pokemonName) {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
    )
      .then((res) => res.json())
      .then((res) => {
        return {
          count: 1302,
          next: 'https://pokeapi.co/api/v2/pokemon?offset=12&limit=12',
          previous: null,
          results: [
            {
              name: res.name,
              url: `https://pokeapi.co/api/v2/pokemon/${res.id}/`,
            },
          ],
        };
      });
  }

  if (pokemonTypes?.length > 0) {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
    )
      .then((res) => res.json())
      .then((res) => {
        return {
          count: 1302,
          next: 'https://pokeapi.co/api/v2/pokemon?offset=12&limit=12',
          previous: null,
          results: [
            {
              name: res.name,
              url: `https://pokeapi.co/api/v2/pokemon/${res.id}/`,
            },
          ],
        };
      });
  }

  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`).then(
    (res) => res.json(),
  );
};

const fetchPokemonByUrl = (url: string) => {
  return fetch(url).then((res) => res.json());
};

const fetchAllPokemonNames = () => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=2000`).then((res) => res.json());
};

const searchByType = ({ type }: { type: string[] }) => {};

export const API = {
  fetchTypes,
  fetchPokemons,
  searchByType,
  fetchPokemonByUrl,
  fetchAllPokemonNames,
  fetchPokemonsV2,
};
