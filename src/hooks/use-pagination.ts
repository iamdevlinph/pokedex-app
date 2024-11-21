'use client';

import { FIRST_MIDDLE_PAGINATION, LAST_MIDDLE_PAGINATION } from '@/constants';
import { useState } from 'react';

const usePagination = ({
  currentPage,
}: {
  currentPage: number;
  newPage?: number;
  direction?: 'next' | 'prev';
  total?: number;
}) => {
  const [pages, setPages] = useState(generatePages(currentPage));

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
