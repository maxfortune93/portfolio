import { NextResponse, type NextRequest } from 'next/server';
import { locales } from '@/content/locales';
import { pickLocale } from '@/lib/locale-detect';

// Redireciona / (e qualquer caminho sem idioma) para /pt, /en ou /fr.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = pickLocale(
    request.cookies.get('NEXT_LOCALE')?.value,
    request.headers.get('accept-language'),
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Ignora API, arquivos estáticos (qualquer caminho com ponto) e internos do Next.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
