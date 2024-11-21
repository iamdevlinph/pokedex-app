/**
 * v0 by Vercel.
 * @see https://v0.dev/t/hRlVqWqw0Y6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PokePageResponse } from '@/utils/types';
import { toSentenceCase } from 'common-utils-pkg';
import Image from 'next/image';

type PokemonCardProps = {
  pokemon: PokePageResponse['data'][0];
  className: string;
};

export const PokemonCard = ({ pokemon, className }: PokemonCardProps) => {
  const imageUrl = pokemon.sprite;

  return (
    <Card className={cn('me-2 inline-block h-52 w-44 cursor-pointer', className)}>
      <div className="relative mt-4 flex justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={pokemon.name}
            width={100}
            height={100}
            style={{ aspectRatio: '20/20', objectFit: 'cover' }}
          />
        ) : (
          <Image
            src="https://iam.devlin.ph/images/logo-no-margin.svg"
            alt={`${pokemon.name} no image`}
            width={50}
            height={100}
            style={{ aspectRatio: '50/100', objectFit: 'cover' }}
          />
        )}
      </div>
      <CardHeader className="grid gap-1 p-4">
        <CardTitle>{toSentenceCase(pokemon.name)}</CardTitle>
        <CardDescription>{displayTypes(pokemon.types)}</CardDescription>
      </CardHeader>
    </Card>
  );
};

function displayTypes(types: PokePageResponse['data'][0]['types']) {
  const typesString = types.map((type) => {
    return toSentenceCase(type);
  });

  return typesString.join(', ');
}
