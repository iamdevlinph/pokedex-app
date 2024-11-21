'use client';

import { Text } from '@/components/text';
import { TypeBadge } from '@/components/type-badge';
import { ReactNode, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PokeTypesResponse } from '@/utils/types';
import { StateParams } from '@/hooks/use-param-state';

type PokedexSidebarProps = {
  isTypesPending?: boolean;
  typesData?: PokeTypesResponse;
  onSearch?: ({
    name,
    types,
    activeTab,
  }: {
    name: string | null;
    types: string[];
    activeTab: 'name' | 'types';
  }) => void;
  stateParams: StateParams;
};

export const PokedexSidebar = ({
  isTypesPending,
  typesData,
  onSearch,
  stateParams,
}: PokedexSidebarProps) => {
  const initialTypes = stateParams.types ? stateParams.types : [];
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
  const [activeTab, setActiveTab] = useState<'name' | 'types'>('name');

  let typesElemArr: ReactNode[] = [];
  if (typesData) {
    typesElemArr = typesData.results.map(({ name }) => {
      return (
        <TypeBadge
          type={name}
          key={name}
          className="inline-flex w-max"
          onClick={() => {
            setSelectedTypes(
              (prevItems) =>
                prevItems.includes(name)
                  ? prevItems.filter((i) => i !== name) // Remove the item
                  : [...prevItems, name], // Add the item
            );
          }}
          selected={selectedTypes.includes(name)}
        />
      );
    });
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    onSearch?.({
      name: activeTab === 'name' ? inputRef.current && inputRef.current.value : '',
      types: activeTab === 'types' ? selectedTypes : [],
      activeTab,
    });

    if (activeTab === 'name') {
      setSelectedTypes([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={stateParams.types && stateParams.types.length > 0 ? 'type' : 'name'}
          className=""
        >
          <TabsList>
            <TabsTrigger
              value="name"
              onClick={() => {
                setActiveTab('name');
                setSelectedTypes(initialTypes);
              }}
            >
              By name
            </TabsTrigger>
            <TabsTrigger
              value="type"
              onClick={() => {
                setActiveTab('types');
              }}
            >
              By types
            </TabsTrigger>
          </TabsList>
          <TabsContent value="name" className="mt-4">
            <Input
              placeholder="Search pokemon"
              defaultValue={stateParams?.name ?? ''}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </TabsContent>
          <TabsContent value="type" className="mt-4">
            {isTypesPending && <Text>Loading...</Text>}

            {typesData && <PokeTypesList>{typesElemArr}</PokeTypesList>}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter>
        <Button className="mt-4 w-full" onClick={handleSearch}>
          Search
        </Button>
      </CardFooter>
    </Card>
  );
};

const PokeTypesList = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};
