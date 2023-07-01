import { ReactNode } from 'react';

export type SnackbarContextValue = {
  showSnackbar: (message: string) => void;
};

export type SnackbarProviderProps = {
  children: ReactNode;
};
