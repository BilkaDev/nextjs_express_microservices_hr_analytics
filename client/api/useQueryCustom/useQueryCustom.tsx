'use client';

import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@tanstack/query-core';

import { buildClient } from '../axios';
import { useParseError } from '../error/http-error';

import { UseQueryCustomProps } from './useQueryCustom.types';

export const useQueryCustom = <
  TQueryFnData extends unknown,
  TError = unknown,
  TData = AxiosResponse<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey
>({
  url,
  httpErrorMap,
  ...options
}: UseQueryCustomProps<TQueryFnData, TError, TData, TQueryKey>) => {
  const axios = buildClient();
  const parseError = useParseError();
  const { error, ...query } = useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryFn: () => axios.get(url),
    ...options
  });

  return {
    ...query,
    error: error ? parseError({ error, httpErrorMap }) : undefined
  };
};
