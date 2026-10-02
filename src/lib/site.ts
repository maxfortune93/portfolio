import type { Locale } from '@/content';
import { locales } from '@/content';

/** URL pública do site, sem barra final. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return 'http://localhost:3000';
}

export const localePath = (locale: Locale) => `/${locale}`;

export const localeUrl = (locale: Locale) => `${getSiteUrl()}${localePath(locale)}`;

/** Mapa para `alternates.languages` e sitemap. */
export function languageAlternates(): Record<string, string> {
  return Object.fromEntries(locales.map((locale) => [locale, localeUrl(locale)]));
}
