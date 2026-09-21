"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
      title={locale === "fr" ? t("lang.switchEn") : t("lang.switchFr")}
      aria-label="Toggle language"
    >
      <span className={locale === "fr" ? "text-blue-600 dark:text-blue-400 font-bold" : "text-zinc-400 dark:text-zinc-500"}>FR</span>
      <span className="text-zinc-400 dark:text-zinc-600 text-[10px]">/</span>
      <span className={locale === "en" ? "text-blue-600 dark:text-blue-400 font-bold" : "text-zinc-400 dark:text-zinc-500"}>EN</span>
    </button>
  );
}
