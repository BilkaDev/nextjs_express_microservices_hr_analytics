import { polish } from '@/assets/languages/pl';
import { english } from '@/assets/languages/en';

export const pl = {
  lang: polish,
  locale: 'pl'
} as const;
export const en = {
  lang: english,
  locale: 'en'
} as const;

export const availableLanguages = { pl, en };

export const DEFAULT_LOCALE = 'en';
export type AvailableLocale = keyof typeof availableLanguages;
