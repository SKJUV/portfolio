"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      className="inline-flex items-center gap-1 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-950 text-[11px] font-mono transition-colors"
      title={locale === "fr" ? t("lang.switchEn") : t("lang.switchFr")}
      aria-label="Toggle language"
    >
      <span className={locale === "fr" ? "text-zinc-950 dark:text-white font-semibold" : "text-zinc-400 dark:text-zinc-500"}>FR</span>
      <span className="text-zinc-300 dark:text-zinc-700">/</span>
      <span className={locale === "en" ? "text-zinc-950 dark:text-white font-semibold" : "text-zinc-400 dark:text-zinc-500"}>EN</span>
    </button>
  );
}
