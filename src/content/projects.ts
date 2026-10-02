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
    slug: 'curtinho',
    year: 2026,
    featured: true,
    stack: [
      'NestJS',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'JWT',
      'Next.js',
      'Tailwind CSS',
      'Docker',
    ],
    links: { repo: 'https://github.com/maxfortune93/url_shortener_challenge' },
    image: '/images/projects/curtinho.png',
    text: {
      pt: {
        title: 'Curtinho, encurtador de links',
        summary:
          'Encurtador de URLs full stack em microsserviços: autenticação com JWT, alias personalizado, expiração, contagem de cliques e um painel com estatísticas.',
        highlights: [
          'Dois serviços NestJS independentes (auth e url-shortener), cada um com seu schema Prisma e suas migrations no mesmo Postgres',
          'O JWT é assinado pelo auth e validado pelo url-shortener com o mesmo segredo, sem chamada entre os serviços',
          'CI com lint, build e testes dos três apps e Blueprint do Render para publicar tudo',
        ],
      },
      en: {
        title: 'Curtinho, link shortener',
        summary:
          'Full stack URL shortener built as microservices: JWT authentication, custom aliases, expiration, click counting and a stats dashboard.',
        highlights: [
          'Two independent NestJS services (auth and url-shortener), each with its own Prisma schema and migrations on the same Postgres',
          'The JWT is signed by auth and validated by url-shortener with the same secret, with no call between services',
          'CI with lint, build and tests for the three apps and a Render Blueprint to ship everything',
        ],
      },
      fr: {
        title: 'Curtinho, raccourcisseur de liens',
        summary:
          'Raccourcisseur d’URL full stack en microservices : authentification JWT, alias personnalisés, expiration, comptage de clics et tableau de bord de statistiques.',
        highlights: [
          'Deux services NestJS indépendants (auth et url-shortener), chacun avec son schéma Prisma et ses migrations sur le même Postgres',
          'Le JWT est signé par auth et validé par url-shortener avec le même secret, sans appel entre les services',
          'CI avec lint, build et tests des trois apps et Blueprint Render pour tout publier',
        ],
      },
    },
  },
  {
    slug: 'ibm-bank-challenge',
    year: 2026,
    featured: true,
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Flyway', 'Angular', 'Docker'],
    links: { repo: 'https://github.com/maxfortune93/ibm-_bank_challenge' },
    text: {
      pt: {
        title: 'IBM Bank Challenge',
        summary:
          'Aplicação bancária do desafio da IBM: cadastro de clientes, depósitos, saques, transferências e extrato com saldo. API REST em Spring Boot e front-end em Angular.',
        highlights: [
          'Alterações de saldo em uma única transação, com bloqueio das contas (SELECT ... FOR UPDATE) para evitar saldo negativo em saques e transferências simultâneos',
          'Transferências travam as duas contas em ordem fixa, evitando deadlock',
          'Migrations com Flyway, testes de integração, CI no GitHub Actions e deploy no Render',
        ],
      },
      en: {
        title: 'IBM Bank Challenge',
        summary:
          'Banking app for the IBM challenge: customer registration, deposits, withdrawals, transfers and an account statement with balance. Spring Boot REST API and Angular front end.',
        highlights: [
          'Balance changes in a single transaction, locking the accounts (SELECT ... FOR UPDATE) so concurrent withdrawals and transfers cannot overdraw',
          'Transfers lock both accounts in a fixed order, avoiding deadlocks',
          'Flyway migrations, integration tests, CI on GitHub Actions and deploy on Render',
        ],
      },
      fr: {
        title: 'IBM Bank Challenge',
        summary:
          'Application bancaire du défi IBM : enregistrement des clients, dépôts, retraits, virements et relevé de compte avec solde. API REST Spring Boot et front-end Angular.',
        highlights: [
          'Modifications de solde dans une seule transaction, avec verrouillage des comptes (SELECT ... FOR UPDATE) pour éviter un solde négatif lors de retraits et virements simultanés',
          'Les virements verrouillent les deux comptes dans un ordre fixe, évitant les interblocages',
          'Migrations Flyway, tests d’intégration, CI sur GitHub Actions et déploiement sur Render',
        ],
      },
    },
  },
  {
    slug: 'portfolio',
    year: 2026,
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
