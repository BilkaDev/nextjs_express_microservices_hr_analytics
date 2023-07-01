'use client';
import { useIntl } from 'react-intl';
import { useCallback } from 'react';

import { AvailableTranslationStrings } from '@/assets/languages/languages.types';

export const useTranslate = () => {
  const { formatMessage } = useIntl();
  return useCallback(
    (id: AvailableTranslationStrings) => formatMessage({ id }),
    [formatMessage]
  );
};
