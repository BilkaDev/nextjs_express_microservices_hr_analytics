'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from '@/client/theme/theme';

import { SnackbarProvider } from '@/client/contex/snackbarContext/SnackbarProvider';
import { AppProvidersTypes } from './AppProviders.types';
import { TranslationProvider } from '@/client/contex/translations/translation';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';

export const AppProviders = ({
  children,
  locale,
  messages
}: AppProvidersTypes) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <IntlProvider locale={locale} messages={messages}>
          <CssBaseline />
          <SnackbarProvider>{children}</SnackbarProvider>
        </IntlProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
