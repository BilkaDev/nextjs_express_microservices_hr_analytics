import { useCallback, useMemo, useState } from 'react';

type UsePaginationProps<T> = {
  rows: number;
  data: T;
};
export const usePagination = <T extends Array<unknown>>({
  data,
  rows
}: UsePaginationProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows);

  const getCurrentPage = useCallback(
    (checkPage: number) => {
      const maxPage = Math.ceil(data.length / rowsPerPage) - 1;
      return checkPage > maxPage ? maxPage : checkPage;
    },
    [data.length, rowsPerPage]
  );

  const onPaginate = useCallback(
    ({
      nextPage = page,
      countRows = rowsPerPage
    }: {
      nextPage?: number;
      countRows?: number;
    }) => {
      const currentPage = getCurrentPage(nextPage);
      const offset = currentPage * countRows;

      const paginatedData = data.slice(offset, offset + countRows) as T;
      return { paginatedData, currentPage };
    },
    [data, getCurrentPage, page, rowsPerPage]
  );

  const { paginatedData, currentPage } = useMemo(
    () => onPaginate({}),
    [onPaginate]
  );

  const onPageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const onRowsChange = useCallback((countRows: number) => {
    setRowsPerPage(countRows);
  }, []);

  return {
    rowsPerPage,
    paginatedData,
    currentPage,
    onPageChange,
    onRowsChange
  };
};
