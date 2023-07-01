'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import { theme } from '@/theme/theme';
import { SnackbarProvider } from '@/contex/snackbarContext/SnackbarProvider';

import { AppProvidersTypes } from './AppProviders.types';
import { TranslationProvider } from '@/contex/translations/translation';
import { useState } from 'react';

export const AppProviders = ({ children }: AppProvidersTypes) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>
        <ThemeProvider theme={theme}>
          <TranslationProvider>
            <CssBaseline />
            <SnackbarProvider>{children}</SnackbarProvider>
          </TranslationProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};
