import { useCallback, useMemo, useState } from 'react';

type UseSearchProps<Data, SearchBy extends keyof Data> = {
  searchBy: SearchBy;
  data: Data[] | undefined;
};
export const useSearch = <Data, SearchBy extends keyof Data>({
  data,
  searchBy
}: UseSearchProps<Data, SearchBy>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = useCallback((term: string) => setSearchTerm(term), []);

  const searchResult = useMemo(() => {
    if (!data) return undefined;
    return data.filter(item => {
      const searchByField = item[searchBy];

      if (typeof searchByField !== 'string') {
        throw new Error('SearchBy is only allowed for string properties');
      }

      return searchByField
        .toLocaleLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase());
    });
  }, [data, searchBy, searchTerm]);

  return { searchTerm, searchResult, onSearchTerm };
};
