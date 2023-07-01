import { QueryKey } from '@tanstack/query-core/src/types';
import { UseQueryOptions } from '@tanstack/react-query/src/types';

import { HttpErrorMap } from '../error/http-error';

export interface UseQueryCustomProps<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'initialData' | 'queryFn'
  > {
  httpErrorMap?: HttpErrorMap;
  url: string;
}
