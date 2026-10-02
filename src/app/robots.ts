import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

// Conteúdo público: rastreadores de busca e agentes de IA podem ler tudo, menos a API.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
