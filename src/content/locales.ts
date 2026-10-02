export const locales = ['pt', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

export const localeLabels: Record<Locale, string> = { pt: 'PT', en: 'EN', fr: 'FR' };
export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  fr: 'Français',
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
