import { createContext } from 'react';

import { SnackbarContextValue } from './Snackbar.types';

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(
  undefined
);
