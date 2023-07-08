import { ReactNode } from 'react';

import { AvailableLocale } from '@/language';
import { AvailableTranslationStrings } from '@/assets/languages/languages.types';

export type LanguageContextType = {
  changeLanguage: (v: AvailableLocale) => void;
  language: Language;
};

export type Language = {
  lang: Record<string, string>;
  locale: AvailableLocale;
};

export type TranslationProviderTypes = {
  children: ReactNode;
};

export type TranslateType = (messageId: AvailableTranslationStrings) => string;
