'use client';

import { FIRST_MIDDLE_PAGINATION, LAST_MIDDLE_PAGINATION } from '@/constants';
import { StateParams } from '@/hooks/use-param-state';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = ({
  currentPage,
  newPage,
  direction,
  total,
}: {
  currentPage: number;
  newPage?: number;
  direction?: 'next' | 'prev';
  total?: number;
}) => {
  const [searchParams, _setSearchParams] = useSearchParams();

  const [pages, setPages] = useState(generatePages(currentPage));

  const incrementPages = () => {
    const newPages = pages.map((page) => page++);
    setPages(newPages);
  };

  const decrementPagePages = () => {
    const newPages = pages.map((page) => page--);
    setPages(newPages);
  };

  // if (newPage) {

  // }

  // if (direction) {

  // }

  return { pages };
};

export default usePagination;

function generatePages(currentPage: number) {
  if (currentPage <= FIRST_MIDDLE_PAGINATION) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= LAST_MIDDLE_PAGINATION) {
    return [105, 106, 107, 108, 109];
  }

  return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
}
