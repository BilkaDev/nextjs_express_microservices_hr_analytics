import { AxiosResponse } from 'axios';

import { HttpErrorMap } from '../error/http-error';

export type QueryState<T> =
  | {
      isLoading: true;
      errorMessage: undefined;
      data: undefined;
    }
  | {
      isLoading: false;
      errorMessage: string;
      data: undefined;
    }
  | {
      isLoading: false;
      errorMessage: undefined;
      data: T;
    };

export type UseQueryProps<T> = {
  url: string;
  initFetch?: boolean;
  onSuccess?: (arg: AxiosResponse<T>) => void;
  onError?: (error: unknown) => void;
  httpErrorMap?: HttpErrorMap;
};

export type InitAction = { type: 'init' };
export type ErrorAction = { type: 'error'; payload: string };
export type SuccessAction = { type: 'success'; payload: any };
export type UpdateAction = { type: 'optimisticUpdate'; payload: any };
export type QueryAction =
  | InitAction
  | ErrorAction
  | SuccessAction
  | UpdateAction;
