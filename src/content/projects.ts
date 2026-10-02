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
  /** Texto exibido no cartão no lugar do ano, ex.: '2024 – atual'. */
  period?: string;
  /** Empresa, para casos de trabalho sem repositório público. */
  company?: string;
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
    slug: 'movix-processamento',
    year: 2024,
    period: '2024 – atual',
    company: 'Teddy Open Finance',
    featured: true,
    stack: ['Node.js', 'NestJS', 'TypeScript', 'BullMQ', 'Redis', 'Amazon DynamoDB'],
    links: {},
    text: {
      pt: {
        title: 'Processamento assíncrono e observabilidade (Movix)',
        summary:
          'Reestruturei o processamento assíncrono do ecossistema Movix, de financiamento e refinanciamento de veículos, e otimizei o processamento da base Molicar.',
        highlights: [
          'Processamento da base Molicar de cerca de 7 horas para 10 minutos',
          'Dashboard de monitoramento de filas, com reprocessamento manual de jobs',
          'Falhas registradas no Amazon DynamoDB para debugging e suporte',
        ],
      },
      en: {
        title: 'Asynchronous processing and observability (Movix)',
        summary:
          'I restructured asynchronous processing in the Movix ecosystem, for vehicle financing and refinancing, and optimized the processing of the Molicar dataset.',
        highlights: [
          'Molicar dataset processing from about 7 hours to 10 minutes',
          'Queue monitoring dashboard with manual job reprocessing',
          'Failures logged in Amazon DynamoDB for debugging and support',
        ],
      },
      fr: {
        title: 'Traitement asynchrone et observabilité (Movix)',
        summary:
          "J'ai restructuré le traitement asynchrone de l'écosystème Movix, pour le financement et le refinancement de véhicules, et optimisé le traitement de la base Molicar.",
        highlights: [
          'Traitement de la base Molicar d’environ 7 heures à 10 minutes',
          'Tableau de bord de suivi des files, avec retraitement manuel des jobs',
          'Échecs enregistrés dans Amazon DynamoDB pour le debugging et le support',
        ],
      },
    },
  },
  {
    slug: 'consorcios-automacao',
    year: 2024,
    period: '2024 – atual',
    company: 'Teddy Open Finance',
    featured: true,
    stack: [
      'Node.js',
      'NestJS',
      'TypeScript',
      'AWS SQS',
      'Redis',
      'PostgreSQL',
      'TypeORM',
      'Jest',
    ],
    links: {},
    text: {
      pt: {
        title: 'Consórcios (Conkey): microsserviços e automação',
        summary:
          'Microsserviços, APIs REST e integrações com RPA, SFTP, CRM e parceiros externos para os fluxos de simulação e propostas de consórcios.',
        highlights: [
          'Automação da mesa de operações: cerca de 60% menos trabalho manual e contribuição para cerca de 40% de crescimento no lucro do produto',
          'Boilerplate base dos microsserviços da squad, padronizando a arquitetura',
          'Testes unitários, de integração e e2e com Jest',
        ],
      },
      en: {
        title: 'Consórcios (Conkey): microservices and automation',
        summary:
          'Microservices, REST APIs and integrations with RPA, SFTP, CRM and external partners for the quote and proposal flows of consortium products.',
        highlights: [
          'Operations desk automation: about 60% less manual work and a contribution to about 40% growth in product profit',
          'Base boilerplate for the squad’s microservices, standardizing the architecture',
          'Unit, integration and e2e tests with Jest',
        ],
      },
      fr: {
        title: 'Consórcios (Conkey) : microservices et automatisation',
        summary:
          'Microservices, API REST et intégrations avec RPA, SFTP, CRM et partenaires externes pour les flux de simulation et de propositions de consórcios.',
        highlights: [
          'Automatisation de la table d’opérations : environ 60 % de travail manuel en moins et contribution à environ 40 % de croissance du profit du produit',
          'Boilerplate de base des microservices de la squad, standardisant l’architecture',
          'Tests unitaires, d’intégration et e2e avec Jest',
        ],
      },
    },
  },
  {
    slug: 'portfolio',
    year: 2024,
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
  period?: string;
  company?: string;
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
      period: project.period,
      company: project.company,
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
