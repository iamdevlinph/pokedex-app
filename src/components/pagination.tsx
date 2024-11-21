import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { LAST_PAGE } from '@/constants';
import usePagination from '@/hooks/use-pagination';
import { cn } from '@/lib/utils';

type PokedexPaginationProps = {
  currentPage: number;
  onPageClick: (page: number) => void;
  className?: string;
};

export const PokedexPagination = ({
  currentPage,
  onPageClick,
  className,
}: PokedexPaginationProps) => {
  const { pages } = usePagination({ currentPage });

  const mobileStyles = 'sticky left-1/2 -bottom-4 -translate-y-2/4 -translate-x-1/4';
  const notMobileStyles =
    'lg:relative lg:left-auto lg:bottom-auto lg:translate-x-0 lg:translate-y-0 lg:ml-auto';

  return (
    <Pagination className={cn(notMobileStyles, className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageClick(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={cn(
              currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined,
              'cursor-pointer',
            )}
          />
        </PaginationItem>

        {/* <PaginationItem>
          <PaginationEllipsis className={cn(pages[0] > 1 ? undefined : 'opacity-30')} />
        </PaginationItem> */}

        {pages.map((page) => {
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageClick(page)}
                aria-disabled={currentPage === page}
                tabIndex={currentPage === page ? -1 : undefined}
                className={cn(
                  currentPage === page ? 'pointer-events-none' : undefined,
                  'cursor-pointer',
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* <PaginationItem>
          <PaginationEllipsis
            className={cn(pages[pages.length - 1] < LAST_PAGE ? undefined : 'opacity-30')}
          />
        </PaginationItem> */}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageClick(currentPage + 1)}
            aria-disabled={currentPage >= LAST_PAGE}
            tabIndex={currentPage >= LAST_PAGE ? -1 : undefined}
            className={cn(
              currentPage >= LAST_PAGE ? 'pointer-events-none opacity-50' : undefined,
              'cursor-pointer',
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
