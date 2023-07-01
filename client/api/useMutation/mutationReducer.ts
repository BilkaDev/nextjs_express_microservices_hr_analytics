import { MutationAction, MutationState } from './mutation.types';

export const defaultState: MutationState = {
  isLoading: false,
  errorMessage: undefined
};

export const mutationReducer = (
  state: MutationState,
  action: MutationAction
): MutationState => {
  switch (action.type) {
    case 'init':
      return { isLoading: true, errorMessage: undefined };
    case 'finish':
      return { ...state, isLoading: false };
    case 'error':
      return { isLoading: false, errorMessage: action.payload };
    default:
      throw new Error('Wrong action type (useMutation state)');
  }
};
