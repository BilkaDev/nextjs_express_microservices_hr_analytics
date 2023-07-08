import { useCallback, useReducer } from 'react';

import { buildClient } from '../axios';
import { useParseError } from '../error/http-error';

import { defaultState, mutationReducer } from './mutationReducer';
import { UseMutationProps } from './mutation.types';

export const useMutation = <T extends unknown, R extends unknown>({
  mutateFn,
  onSuccess,
  httpErrorMap
}: UseMutationProps<T, R>) => {
  const [state, dispatch] = useReducer(mutationReducer, defaultState);
  const axios = buildClient();
  const parseError = useParseError();

  const onMutate = useCallback(
    async (payload: T) => {
      try {
        dispatch({ type: 'init' });
        const res = await mutateFn(axios)(payload);
        if (onSuccess) {
          onSuccess(res, payload);
        }
      } catch (error) {
        const errorMessage = parseError({ error, httpErrorMap });
        dispatch({ type: 'error', payload: errorMessage });
      } finally {
        dispatch({ type: 'finish' });
      }
    },
    [axios, httpErrorMap, mutateFn, onSuccess, parseError]
  );
  return { state, onMutate };
};
