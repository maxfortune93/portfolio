import { getDictionary, getProjects, locales, profile } from '@/content';
import type { Locale } from '@/content';
import { getSiteUrl, localeUrl } from './site';

const EN: Locale = 'en';

/** /llms.txt: índice curto em Markdown para agentes de IA (convenção llmstxt.org). */
export function buildLlmsTxt(): string {
  const dict = getDictionary(EN);
  const projects = getProjects(EN);
  const siteUrl = getSiteUrl();

  const lines = [
    `# ${profile.name}`,
    '',
    `> ${dict.hero.role}. ${dict.hero.subtitle} ${dict.hero.availability}.`,
    '',
    `Main stack: ${profile.mainStack.join(', ')}.`,
    '',
    '## Pages',
    ...locales.map(
      (locale) =>
        `- [Portfolio (${locale})](${localeUrl(locale)}): same content in ${locale}`,
    ),
    '',
    '## Machine-readable',
    `- [Full text version](${siteUrl}/llms-full.txt): all portfolio content in one Markdown file`,
    `- [profile.json](${siteUrl}/profile.json): structured data (profile, stack, projects in all languages)`,
    `- [sitemap.xml](${siteUrl}/sitemap.xml)`,
    '',
    '## Projects',
    ...projects.map((project) => {
      const url = project.links.repo ?? project.links.demo ?? siteUrl;
      return `- [${project.title}](${url}): ${project.summary}`;
    }),
    '',
    '## Profiles',
    `- [GitHub](${profile.links.github})`,
    `- [LinkedIn](${profile.links.linkedin})`,
    '',
    '## Contact',
    `- Contact form: ${localeUrl(EN)}#contact`,
    ...(profile.showEmail ? [`- Email: ${profile.email}`] : []),
    '',
  ];
  return lines.join('\n');
}

/** /llms-full.txt: todo o conteúdo do portfólio em inglês, em um único arquivo. */
export function buildLlmsFullTxt(): string {
  const dict = getDictionary(EN);
  const projects = getProjects(EN);

  const lines = [
    `# ${profile.name}: ${dict.hero.role}`,
    '',
    dict.hero.subtitle,
    '',
    `Status: ${dict.hero.factStatusValue}.`,
    `Location: ${profile.location.city}, ${profile.location.region}, Brazil${profile.location.remote ? ' (remote)' : ''}.`,
    '',
    `## ${dict.about.title}`,
    '',
    ...dict.about.paragraphs.flatMap((paragraph) => [paragraph, '']),
    `## ${dict.stack.title}`,
    '',
    ...dict.stack.groups.map((group) => `- ${group.name}: ${group.items.join(', ')}`),
    '',
    `## ${dict.projects.title}`,
    '',
    ...projects.flatMap((project) => [
      `### ${project.title}${project.year ? ` (${project.year})` : ''}`,
      '',
      project.summary,
      '',
      `- Stack: ${project.stack.join(', ')}`,
      ...(project.links.repo ? [`- Repository: ${project.links.repo}`] : []),
      ...(project.links.demo ? [`- Live demo: ${project.links.demo}`] : []),
      ...project.highlights.map((highlight) => `- ${highlight}`),
      '',
    ]),
    ...(dict.experience.items.length
      ? [
          `## ${dict.experience.title}`,
          '',
          ...dict.experience.items.flatMap((item) => [
            `### ${item.title}, ${item.organization} (${item.period})`,
            '',
            ...(item.location ? [`${item.location}`, ''] : []),
            ...(item.description ? [item.description, ''] : []),
            ...(item.highlights ?? []).map((highlight) => `- ${highlight}`),
            ...(item.tech?.length ? ['', `Technologies: ${item.tech.join(', ')}`] : []),
            '',
          ]),
          `## ${dict.experience.educationTitle}`,
          '',
          ...dict.experience.education.map(
            (item) => `- ${item.title}, ${item.organization} (${item.period})`,
          ),
          '',
          `## ${dict.experience.languagesTitle}`,
          '',
          ...dict.experience.languages.map(
            (language) => `- ${language.name}: ${language.level}`,
          ),
          '',
        ]
      : []),
    '## Links',
    '',
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    ...locales.map((locale) => {
      const resume = profile.resumes[locale];
      return `- Résumé for the ${locale} page (PDF, language: ${resume.language}): ${getSiteUrl()}${resume.href}`;
    }),
    ...(profile.showEmail ? [`- Email: ${profile.email}`] : []),
    '',
  ];
  return lines.join('\n');
}

/** /profile.json: mesmos dados em formato estruturado, com todos os idiomas. */
export function buildProfileJson() {
  const siteUrl = getSiteUrl();
  return {
    name: profile.name,
    siteUrl,
    updatedFrom: profile.siteRepo,
    email: profile.showEmail ? profile.email : undefined,
    links: profile.links,
    location: profile.location,
    resumes: Object.fromEntries(
      locales.map((locale) => [
        locale,
        {
          url: `${siteUrl}${profile.resumes[locale].href}`,
          language: profile.resumes[locale].language,
        },
      ]),
    ),
    mainStack: profile.mainStack,
    pages: Object.fromEntries(locales.map((locale) => [locale, localeUrl(locale)])),
    content: Object.fromEntries(
      locales.map((locale) => {
        const dict = getDictionary(locale);
        return [
          locale,
          {
            title: dict.meta.title,
            role: dict.hero.role,
            summary: dict.hero.subtitle,
            availability: dict.hero.availability,
            about: dict.about.paragraphs,
            stack: dict.stack.groups,
            experience: dict.experience.items,
            education: dict.experience.education,
            languages: dict.experience.languages,
            projects: getProjects(locale),
          },
        ];
      }),
    ),
  };
}
