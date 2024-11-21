import { ITEMS_PER_PAGE } from '@/constants';
import { ExpandRecursively } from '@/utils/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pokemon = searchParams.get('pokemon');
  const types = searchParams.get('types');

  // for types
  if (types) {
    const typesArr = types.split(',');

    const promises: Promise<ByTypeFetchResponse>[] = [];

    for (const type of typesArr) {
      promises.push(fetch(`https://pokeapi.co/api/v2/type/${type}`).then((res) => res.json()));
    }

    const typesPromises = await Promise.allSettled(promises);

    try {
      return Response.json({
        data: await formatFromTypesFetch(typesPromises, typesArr),
      });
    } catch (e) {
      return Response.json(
        {
          data: [],
          error: true,
        },
        { status: 500 },
      );
    }
  }

  // for pokemon name
  if (pokemon) {
    try {
      const data = await fetchPokemonInfo(pokemon);

      return Response.json({
        data: [
          {
            name: data.name,
            sprite: data.sprites.other['official-artwork'].front_default,
            types: getTypes(data.types),
          },
        ],
      });
    } catch (e) {
      return Response.json(
        {
          data: [],
          error: true,
        },
        { status: 500 },
      );
    }
  }

  // for paginated
  const offset = (page - 1) * ITEMS_PER_PAGE;

  try {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
    ).then((res) => res.json());

    return Response.json(await formatFromPageFetch(data));
  } catch (e) {
    return Response.json(
      {
        data: [],
        error: true,
      },
      { status: 500 },
    );
  }
}

// return in following format
// type PokemonData = {
//   name: string;
//   sprite: string;
//   type: string;
// }[];

async function formatFromPageFetch(byPageResult: ByPageFetchResponse) {
  const allPokemonNames: string[] = [];

  byPageResult.results.forEach((result) => allPokemonNames.push(result.name));

  return {
    count: byPageResult.count,
    data: await getPokeInfoFromNameArr(allPokemonNames),
  };
}

async function formatFromTypesFetch(byFetchResult: ByTypeFetchResponse[], typesArr: string[]) {
  const allPokemonNames: string[] = [];

  byFetchResult.forEach((data) => {
    // get all pokemon names
    for (const pokemon of data.value.pokemon) {
      const name = pokemon.pokemon.name;

      if (allPokemonNames.indexOf(name) < 0) {
        allPokemonNames.push(name);
      }
    }
  });

  const namesWithInfo = await getPokeInfoFromNameArr(allPokemonNames);

  /**
   * Matching criteria
   * 1. If only 1 type selected, return all pokemons that have at least that type
   * 2. If 2 are selected, return all pokemons that have at least 2 types matching
   * 3. And so on
   */
  const selectedCount = typesArr.length;
  const pokemonMatchTypes = namesWithInfo.filter((value) => {
    const matchingTypesCount = value.types.filter((type) => typesArr.includes(type)).length;
    // return value.types.sort().join(',') === typesArr.sort().join(',');
    return matchingTypesCount >= selectedCount;
  });

  return pokemonMatchTypes;
}

async function getPokeInfoFromNameArr(names: string[]) {
  const pokeInfoPromises = names.map((name) => fetchPokemonInfo(name));
  const pokeInfoResult = await Promise.allSettled(pokeInfoPromises);

  const pokemonData = pokeInfoResult.map((pokeInfo) => {
    return {
      name: pokeInfo.value.name as string,
      types: getTypes(pokeInfo.value.types) as string[],
      sprite: pokeInfo.value.sprites.other['official-artwork'].front_default as string,
    };
  });

  return pokemonData;
}

async function fetchPokemonInfo(name: string): Promise<ByNameFetchResponse> {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json());
}

function getTypes(typesArr: TypesObj) {
  const allTypes = typesArr.map((type) => {
    return type.type.name;
  });

  return allTypes;
}

type ByTypeFetchResponse = ExpandRecursively<{
  value: {
    pokemon: [
      {
        pokemon: {
          name: string;
        };
      },
    ];
  };
}>;

type ByNameFetchResponse = ExpandRecursively<{
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: [
    {
      type: {
        name: string;
      };
    },
  ];
}>;

type ByPageFetchResponse = ExpandRecursively<{
  count: number;
  results: [
    {
      name: string;
    },
  ];
}>;

// type ByFetchWithInfoResponse = ExpandRecursively<{
//   value: {
//     pokemon: [
//       pokemon: {
//         name: string;
//         sprites: {
//           other: {
//             'official-artwork': {
//               front_default: string;
//             };
//           };
//         };
//         types: TypesObj;
//       },
//     ];
//   };
// }>;

type TypesObj = ExpandRecursively<
  [
    {
      type: {
        name: string;
      };
    },
  ]
>;
