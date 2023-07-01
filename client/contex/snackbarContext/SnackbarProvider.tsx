'use client';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

import { SnackbarProviderProps } from './Snackbar.types';
import { SnackbarContext } from './SnackbarContext';

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [message, setMessage] = useState('');

  const showSnackbar = useCallback(
    (notification: string) => setMessage(notification),
    []
  );

  const contextValue = useMemo(
    () => ({
      showSnackbar
    }),
    [showSnackbar]
  );
  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={() => setMessage('')}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
