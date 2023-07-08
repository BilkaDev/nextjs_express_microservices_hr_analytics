'use client';

import { useMutation } from '@tanstack/react-query';

import { buildClient } from '../axios';
import { useParseError } from '../error/http-error';

import { UseMutationProps } from './useMutationCustom.types';

export const useMutationCustom = <
  TData extends unknown,
  TError extends unknown,
  TVariables = void,
  TContext = unknown
>({
  mutationFn,
  onError,
  httpErrorMap,
  ...options
}: UseMutationProps<TData, TError, TVariables, TContext>) => {
  const parseError = useParseError();
  const axios = buildClient();

  const { error, ...mutation } = useMutation({
    mutationFn: payload => mutationFn(axios)(payload),
    ...options
  });

  return {
    ...mutation,
    error: error ? parseError({ error, httpErrorMap }) : undefined
  };
};
