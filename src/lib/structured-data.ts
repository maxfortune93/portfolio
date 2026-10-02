import type { Locale } from '@/content';
import { getDictionary, getProjects, profile } from '@/content';
import { getSiteUrl, localeUrl } from './site';

/** JSON-LD (schema.org) da página de um idioma: pessoa, site e lista de projetos. */
export function buildStructuredData(locale: Locale) {
  const dict = getDictionary(locale);
  const siteUrl = getSiteUrl();
  const pageUrl = localeUrl(locale);
  const personId = `${siteUrl}/#person`;
  const projects = getProjects(locale);
  const stack = dict.stack.groups.flatMap((group) => group.items);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        jobTitle: dict.hero.role,
        url: siteUrl,
        email: profile.showEmail ? `mailto:${profile.email}` : undefined,
        description: dict.meta.description,
        sameAs: Object.values(profile.links),
        knowsAbout: stack,
        seeks: { '@type': 'Demand', description: dict.hero.availability },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: dict.meta.title,
        inLanguage: locale,
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: dict.meta.title,
        inLanguage: locale,
        mainEntity: { '@id': personId },
        hasPart: {
          '@type': 'ItemList',
          name: dict.projects.title,
          itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareSourceCode',
              name: project.title,
              description: project.summary,
              codeRepository: project.links.repo,
              url: project.links.demo ?? project.links.repo,
              programmingLanguage: project.stack,
              dateCreated: project.year ? String(project.year) : undefined,
              author: { '@id': personId },
            },
          })),
        },
      },
    ],
  };
}
