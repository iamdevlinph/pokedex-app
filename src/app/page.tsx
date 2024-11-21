import { Text } from '@/components/text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-60px)] items-center justify-center">
      <main>
        <Text as="h1" className="text-center">
          Welcome to the world of Pokemon!
        </Text>
        <Text as="h4" className="mb-4 text-center">
          See all the pokemon in the world and know their types.
        </Text>
        <Link href="/pokedex" className="flex justify-center">
          <Button>Start using the Pokedex</Button>
        </Link>
      </main>
    </div>
  );
}
