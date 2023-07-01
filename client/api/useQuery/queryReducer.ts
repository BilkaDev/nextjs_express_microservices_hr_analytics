import { QueryState, QueryAction } from './useQuery.types';

export const defaultState: QueryState<any> = {
  isLoading: true,
  errorMessage: undefined,
  data: undefined
};

export const queryReducer = <T>(
  state: QueryState<T>,
  action: QueryAction
): QueryState<T> => {
  switch (action.type) {
    case 'init':
      return { isLoading: true, errorMessage: undefined, data: undefined };
    case 'success':
      return { ...state, isLoading: false, data: action.payload };
    case 'error':
      return {
        isLoading: false,
        errorMessage: action.payload,
        data: undefined
      };
    case 'optimisticUpdate':
      return { ...state, isLoading: false, data: action.payload };
    default:
      throw new Error('Wrong action type (useMutation state)');
  }
};
