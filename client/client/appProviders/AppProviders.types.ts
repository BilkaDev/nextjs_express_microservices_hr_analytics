import { LanguagesRecord } from '@/assets/languages/languages.types';
import { ReactNode } from 'react';

export type AppProvidersTypes = {
  children: ReactNode;
  locale: string;
  messages: LanguagesRecord;
};
