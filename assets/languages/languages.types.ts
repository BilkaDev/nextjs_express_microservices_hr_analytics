import { english } from './en';

export type AvailableTranslationStrings = keyof typeof english;

export type LanguagesRecord = Record<AvailableTranslationStrings, string>;
