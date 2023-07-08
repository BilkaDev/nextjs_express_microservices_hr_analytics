import { ReactNode } from 'react';
import { AlertColor } from '@mui/material';

export type ShowSnackbarType = (notification: string, status?: AlertColor) => void

export type SnackbarContextValue = {
  showSnackbar: ShowSnackbarType;
};

export type SnackbarProviderProps = {
  children: ReactNode;
};
