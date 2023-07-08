import { useCallback, useEffect, useReducer } from 'react';

import { buildClient } from '../axios';
import { useParseError } from '../error/http-error';

import { defaultState, queryReducer } from './queryReducer';
import { QueryAction, QueryState, UseQueryProps } from './useQuery.types';

export const useQuery = <T extends unknown>({
  url,
  initFetch = true,
  onError,
  onSuccess,
  httpErrorMap
}: UseQueryProps<T>) => {
  const [state, dispatch] = useReducer<
    (state: QueryState<T>, action: QueryAction) => QueryState<T>
  >(queryReducer, defaultState);
  const axios = buildClient();
  const parseError = useParseError();

  const onQuery = useCallback(async () => {
    try {
      dispatch({ type: 'init' });
      const res = await axios.get<T>(url);
      if (onSuccess) {
        onSuccess(res);
      }
      dispatch({ type: 'success', payload: res.data });
    } catch (error: unknown) {
      onError?.(error);
      const errorMessage = parseError({ error, httpErrorMap });
      dispatch({ type: 'error', payload: errorMessage });
    }
  }, [axios, url, onSuccess, onError, parseError, httpErrorMap]);

  const onOptimisticUpdate = useCallback((newState: T) => {
    dispatch({ type: 'optimisticUpdate', payload: newState });
  }, []);

  useEffect(() => {
    if (initFetch) {
      onQuery();
    }
  }, [initFetch, onQuery]);
  return { state, onQuery, onOptimisticUpdate, onError };
};
