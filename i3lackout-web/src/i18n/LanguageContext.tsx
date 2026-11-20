import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { TRANSLATIONS, type Locale, type TranslationDictionary } from './translations';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  initialLocale?: Locale;
  children: ReactNode;
}

export function LanguageProvider({ initialLocale = 'de', children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: TRANSLATIONS[locale],
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: 'de',
      setLocale: () => {},
      t: TRANSLATIONS.de,
    };
  }
  return context;
}
