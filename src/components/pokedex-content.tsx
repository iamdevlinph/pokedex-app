import { PokemonCard } from '@/components/pokemon-card';
import { PokePageResponse } from '@/utils/types';

type PokedexContentProps = {
  data: PokePageResponse['data'];
};

export const PokedexContent = ({ data }: PokedexContentProps) => {
  return (
    <div className="text-center">
      <div className="mb-4">
        {data.map((pokemon) => {
          return <PokemonCard pokemon={pokemon} key={pokemon.name} className="mb-2" />;
        })}
      </div>
    </div>
  );
};
