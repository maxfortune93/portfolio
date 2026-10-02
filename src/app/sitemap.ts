import type { MetadataRoute } from 'next';
import { defaultLocale, locales } from '@/content';
import { languageAlternates, localeUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === defaultLocale ? 1 : 0.8,
    alternates: { languages: languageAlternates() },
  }));
}
