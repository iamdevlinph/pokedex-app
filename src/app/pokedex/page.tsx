'use client';

import { API } from '@/api/pokemon-api';
import { PokedexPagination } from '@/components/pagination';
import { PokedexContent } from '@/components/pokedex-content';
import { PokedexSidebar } from '@/components/pokedex-sidebar';
import { Text } from '@/components/text';
import useURLState from '@/hooks/use-param-state';
import { PokeTypesResponse, PokePageResponse } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

export default function PokedexPage() {
  const defaultParams = { page: 1, types: [], name: '' };
  const { params, setParams } = useURLState(defaultParams);

  const { isPending: isTypesPending, data: typesData } = useQuery<PokeTypesResponse>({
    queryKey: ['API.fetchTypes'],
    queryFn: API.fetchTypes,
    staleTime: Infinity,
  });

  const {
    data: pokemonListdata,
    isPending: isPokemonListDataPending,
    isError: isPokemonListError,
  } = useQuery<PokePageResponse>({
    queryKey: ['API.fetchPokemons', params.name, params.types, params.page],
    queryFn: () =>
      API.fetchPokemonsV2({
        page: params.page,
        pokemonName: params.name,
        pokemonTypes: params.types,
      }),
    staleTime: Infinity,
  });

  return (
    <div className="container mx-auto mb-4">
      <Text as="h1">Pokedex</Text>

      <div
        className="grid-rows-custom-max-4fr lg:grid-cols-custom-1fr-4fr grid gap-1"
        // style={{
        //   gridTemplateColumns: '1fr 4fr',
        // }}
      >
        <div>
          <PokedexSidebar
            isTypesPending={isTypesPending}
            typesData={typesData}
            onSearch={({ name, types, activeTab }) => {
              setParams({
                name: activeTab === 'name' ? name : undefined,
                page: undefined,
                types: activeTab === 'types' ? types : undefined,
              });
            }}
            stateParams={params}
          />
        </div>
        <div>
          {isPokemonListDataPending && (
            <div className="mb-4 text-center lg:mb-auto">Loading...</div>
          )}

          {!isPokemonListDataPending &&
            pokemonListdata?.data &&
            pokemonListdata?.data.length < 1 &&
            !isPokemonListError && <div>No pokemon matching with the search criteria</div>}

          {!isPokemonListDataPending && isPokemonListError && <div>Something went wrong</div>}

          {!isPokemonListDataPending &&
            pokemonListdata?.data &&
            pokemonListdata?.data.length > 0 && <PokedexContent data={pokemonListdata.data} />}

          {/* Hide pagination if there is search */}
          {!params.name && (!params.types || params.types.length === 0) && (
            <PokedexPagination
              key={params.page}
              currentPage={params.page}
              onPageClick={async (page) => {
                setParams({ page: page });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
