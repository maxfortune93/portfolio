import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, locales, type Locale } from '@/content/locales';

function pickLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get('accept-language') ?? '';
  for (const part of header.split(',')) {
    const code = part.trim().split(/[-;]/)[0]?.toLowerCase();
    if (code && isLocale(code)) return code;
  }
  return defaultLocale;
}

// Redireciona / (e qualquer caminho sem idioma) para /pt, /en ou /fr.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Ignora API, arquivos estáticos (qualquer caminho com ponto) e internos do Next.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
