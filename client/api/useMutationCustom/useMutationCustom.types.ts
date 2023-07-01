import { AxiosInstance } from 'axios';
import { MutationOptions } from '@tanstack/query-core/src/types';

import { HttpErrorMap } from '../error/http-error';

export interface UseMutationProps<TData, TError, TVariables, TContext>
  extends Omit<
    MutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  > {
  mutationFn: (axios: AxiosInstance) => (arg: TVariables) => Promise<TData>;
  httpErrorMap?: HttpErrorMap;
}
