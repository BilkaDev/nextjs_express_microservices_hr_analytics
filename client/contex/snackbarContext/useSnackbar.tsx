'use client';
import { useContext } from 'react';

import { SnackbarContext } from './SnackbarContext';

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx)
    throw new Error('useSnackbar can only be used inside SnackbarProvider');
  return ctx;
};
