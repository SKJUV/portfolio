"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      className="px-2 py-1.5 rounded-lg text-xs font-medium glass hover:bg-primary/10 transition-all flex items-center gap-1.5"
      title={locale === "fr" ? "Switch to English" : "Passer en Français"}
    >
      <span className={locale === "fr" ? "opacity-100" : "opacity-40"}>🇫🇷</span>
      <span className="text-muted-foreground">/</span>
      <span className={locale === "en" ? "opacity-100" : "opacity-40"}>🇬🇧</span>
    </button>
  );
}
