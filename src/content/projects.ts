import type { Locale } from './locales';
import { profile } from './profile';

/**
 * COMO ADICIONAR UM PROJETO
 * 1. Copie um bloco do array `projects` abaixo.
 * 2. Troque slug, stack, links e os textos dos três idiomas.
 * 3. (Opcional) coloque a imagem em /public/images/projects/<slug>.png e preencha `image`.
 * 4. Faça commit e push. O deploy atualiza o site, o sitemap, o llms.txt e o JSON-LD.
 *
 * `draft: true` esconde o projeto em todo o site (página, JSON-LD, llms.txt, profile.json).
 */
export interface ProjectText {
  title: string;
  summary: string;
  /** Pontos curtos: o que foi feito ou resultado. 2 a 3 itens. */
  highlights?: string[];
}

export interface Project {
  slug: string;
  year?: number;
  featured?: boolean;
  draft?: boolean;
  stack: string[];
  links: { repo?: string; demo?: string };
  /** Caminho em /public, ex.: '/images/projects/portfolio.png'. */
  image?: string;
  text: Record<Locale, ProjectText>;
}

export const projects: Project[] = [
  {
    slug: 'portfolio',
    year: 2024,
    featured: true,
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Resend'],
    links: { repo: profile.siteRepo },
    text: {
      pt: {
        title: 'Portfólio pessoal',
        summary:
          'Site em três idiomas (PT, EN, FR) com tema claro e escuro, formulário de contato com envio de email e dados estruturados para buscadores e agentes de IA.',
        highlights: [
          'Conteúdo em arquivos TypeScript: atualizar não exige mexer nos componentes',
          'Uma página estática por idioma, com sitemap, llms.txt e JSON-LD',
          'API de contato validada com zod e com limite de requisições',
        ],
      },
      en: {
        title: 'Personal portfolio',
        summary:
          'Three-language site (PT, EN, FR) with light and dark themes, a contact form that sends email, and structured data for search engines and AI agents.',
        highlights: [
          'Content lives in TypeScript files, so updating never touches components',
          'One static page per language, with sitemap, llms.txt and JSON-LD',
          'Contact API validated with zod and rate limited',
        ],
      },
      fr: {
        title: 'Portfolio personnel',
        summary:
          "Site en trois langues (PT, EN, FR) avec thème clair et sombre, formulaire de contact avec envoi d'email et données structurées pour les moteurs de recherche et les agents IA.",
        highlights: [
          'Le contenu vit dans des fichiers TypeScript : aucune modification des composants pour le mettre à jour',
          'Une page statique par langue, avec sitemap, llms.txt et JSON-LD',
          'API de contact validée avec zod et limitée en fréquence',
        ],
      },
    },
  },

  // ---- Modelo para copiar. Fica oculto enquanto `draft: true`. ----
  {
    slug: 'exemplo-api',
    draft: true,
    year: 2024,
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize'],
    links: { repo: 'https://github.com/maxfortune93/NOME-DO-REPOSITORIO' },
    text: {
      pt: {
        title: 'Nome do projeto',
        summary: 'Uma ou duas frases: qual problema ele resolve e o que você construiu.',
        highlights: ['Resultado ou decisão técnica 1', 'Resultado ou decisão técnica 2'],
      },
      en: {
        title: 'Project name',
        summary: 'One or two sentences: the problem it solves and what you built.',
        highlights: ['Result or technical decision 1', 'Result or technical decision 2'],
      },
      fr: {
        title: 'Nom du projet',
        summary:
          'Une ou deux phrases : le problème résolu et ce que vous avez construit.',
        highlights: [
          'Résultat ou décision technique 1',
          'Résultat ou décision technique 2',
        ],
      },
    },
  },
];

export interface ResolvedProject {
  slug: string;
  year?: number;
  featured: boolean;
  stack: string[];
  links: { repo?: string; demo?: string };
  image?: string;
  title: string;
  summary: string;
  highlights: string[];
}

export function getProjects(locale: Locale): ResolvedProject[] {
  return projects
    .filter((project) => !project.draft)
    .map((project) => ({
      slug: project.slug,
      year: project.year,
      featured: Boolean(project.featured),
      stack: project.stack,
      links: project.links,
      image: project.image,
      title: project.text[locale].title,
      summary: project.text[locale].summary,
      highlights: project.text[locale].highlights ?? [],
    }))
    .sort(
      (a, b) => Number(b.featured) - Number(a.featured) || (b.year ?? 0) - (a.year ?? 0),
    );
}
