/**
 * Worker da Cloudflare: serve o site estático (binding ASSETS) e cuida só do que é dinâmico.
 *  - /               → redireciona para /pt, /en ou /fr (cookie NEXT_LOCALE, depois Accept-Language)
 *  - /api/contact    → formulário de contato (mesma lógica da rota do Next, em src/lib/contact.ts)
 *  - /api/health     → health check
 * Todo o resto vem dos arquivos gerados por `npm run cf:build` (pasta out/).
 */
import { type ContactEnv, handleContact } from '../src/lib/contact';
import { pickLocale, readCookie } from '../src/lib/locale-detect';

// Tipos mínimos, para não misturar @cloudflare/workers-types com os tipos DOM do projeto.
interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

interface Env extends ContactEnv {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return Response.json({ status: 'ok', service: 'portfolio-worker' });
    }

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return new Response(null, { status: 405, headers: { Allow: 'POST' } });
      }
      return handleContact(request, env);
    }

    if (url.pathname === '/') {
      const locale = pickLocale(
        readCookie(request.headers.get('cookie'), 'NEXT_LOCALE'),
        request.headers.get('accept-language'),
      );
      return Response.redirect(`${url.origin}/${locale}`, 307);
    }

    return env.ASSETS.fetch(request);
  },
};
