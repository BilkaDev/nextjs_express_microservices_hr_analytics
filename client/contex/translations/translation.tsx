import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { IntlProvider } from 'react-intl';
import { getUserLocale } from 'get-user-locale';

import {
  availableLanguages,
  AvailableLocale,
  DEFAULT_LOCALE
} from '@/language';

import {
  Language,
  LanguageContextType,
  TranslationProviderTypes
} from './translation.types';

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error('useLanguage can only be used inside TranslationProvider');
  return ctx;
};

function isExpectedLocale(locale: string): locale is AvailableLocale {
  return Object.keys(availableLanguages).includes(locale);
}

export const TranslationProvider = ({ children }: TranslationProviderTypes) => {
  const [language, setLanguage] = useState<Language>(() => {
    const userLocale = getUserLocale()?.split('-')[0];
    if (!userLocale) {
      return availableLanguages[DEFAULT_LOCALE];
    }

    if (isExpectedLocale(userLocale)) {
      return availableLanguages[userLocale];
    }

    return availableLanguages[DEFAULT_LOCALE];
  });

  const changeLanguage = useCallback((selectedLang: AvailableLocale) => {
    if (isExpectedLocale(selectedLang)) {
      setLanguage(availableLanguages[selectedLang]);
    }
  }, []);

  const contextValues = useMemo(
    () => ({ language, changeLanguage }),
    [changeLanguage, language]
  );

  return (
    <LanguageContext.Provider value={contextValues}>
      <IntlProvider locale={language.locale} messages={language.lang}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
