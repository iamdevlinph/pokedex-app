'use client';

import { useSearchParams } from 'react-router-dom';

export type StateParams = {
  name?: string | null;
  page: number;
  types?: string[];
};

const useURLState = (defaultParams: StateParams) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL parameters into a Params object
  const getParams = (): StateParams => {
    const name = searchParams.get('name') || undefined;
    const page = parseInt(searchParams.get('page') || `${defaultParams.page}`, 10);
    const types = searchParams.get('types')
      ? searchParams.get('types')?.split(',')
      : defaultParams.types || [];

    return { name, page, types };
  };

  // Update specific parameters and sync to the URL
  const setParams = (updatedParams: Partial<StateParams>) => {
    const currentParams = getParams();
    const newParams = { ...currentParams, ...updatedParams };

    const newSearchParams = new URLSearchParams();

    if (newParams.name) newSearchParams.set('name', newParams.name);
    if (newParams.page) newSearchParams.set('page', newParams.page.toString());
    if (newParams.types && newParams.types.length > 0)
      newSearchParams.set('types', newParams.types.join(','));

    setSearchParams(newSearchParams);
  };

  return { params: getParams(), setParams };
};

export default useURLState;
