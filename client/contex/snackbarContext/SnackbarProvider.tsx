'use client';
import { useCallback, useMemo, useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

import { ShowSnackbarType, SnackbarProviderProps } from './Snackbar.types';
import { SnackbarContext } from './SnackbarContext';

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');


  const showSnackbar: ShowSnackbarType = useCallback(
    (notification: string, status?: AlertColor) => {
      setMessage(notification);
      if (status) setSeverity(status);
    },
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
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
