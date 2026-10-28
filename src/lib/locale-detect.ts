import { defaultLocale, isLocale, type Locale } from '@/content/locales';

/** Lê um cookie simples de um cabeçalho `Cookie`. */
export function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(';')) {
    const [key, ...value] = part.trim().split('=');
    if (key === name) return decodeURIComponent(value.join('='));
  }
  return undefined;
}

/**
 * Escolhe o idioma: cookie NEXT_LOCALE, depois Accept-Language, depois o padrão.
 * Usado pelo middleware do Next (Render) e pelo Worker (Cloudflare).
 */
export function pickLocale(
  cookieLocale: string | undefined,
  acceptLanguage: string | null,
): Locale {
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  for (const part of (acceptLanguage ?? '').split(',')) {
    const code = part.trim().split(/[-;]/)[0]?.toLowerCase();
    if (code && isLocale(code)) return code;
  }
  return defaultLocale;
}
