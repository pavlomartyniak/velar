import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uk", "en", "de", "fr", "it", "pl"],
  defaultLocale: "uk",
  localePrefix: "always",
  // Сайт завжди відкривається українською — не визначаємо мову
  // з Accept-Language браузера чи кукі.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/** OpenGraph-формат локалі. */
export const OG_LOCALES: Record<Locale, string> = {
  uk: "uk_UA",
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
  pl: "pl_PL",
};
