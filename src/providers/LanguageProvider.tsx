"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import frTranslations from "@/i18n/fr.json";
import enTranslations from "@/i18n/en.json";
import dataEnTranslations from "@/i18n/data-en.json";

export type Locale = "fr" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  td: (text: string, enOverride?: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  fr: frTranslations as Record<string, string>,
  en: enTranslations as Record<string, string>,
};

const dataTranslationsEN = dataEnTranslations as Record<string, string>;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-locale", l);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-locale") as Locale;
    if (saved === "fr" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[locale]?.[key] || translations.fr?.[key] || key;
    },
    [locale]
  );

  const td = useCallback(
    (text: string, enOverride?: string) => {
      if (!text || locale === "fr") return text;
      if (enOverride) return enOverride;
      return dataTranslationsEN[text] || text;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, td }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
