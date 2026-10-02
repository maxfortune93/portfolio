/**
 * Dados da pessoa que não mudam por idioma.
 * Textos traduzíveis ficam em src/content/dictionaries/*.ts.
 * Projetos ficam em src/content/projects.ts.
 */
export const profile = {
  name: 'Marouane Pondikpa',
  shortName: 'Marouane',
  githubUser: 'maxfortune93',
  email: 'marouanemiramax4@gmail.com',
  /** Mostra o email em texto na página de contato. */
  showEmail: true,
  links: {
    github: 'https://github.com/maxfortune93',
    linkedin: 'https://www.linkedin.com/in/marouane-pondikpa',
  },
  /** Repositório deste site. */
  siteRepo: 'https://github.com/maxfortune93/portfolio',
  /** CV em PDF dentro de /public. Hoje só existe em francês. */
  resume: {
    href: '/pdf/resume_fr.pdf',
    language: 'fr',
    filename: 'Marouane_Pondikpa_CV_FR.pdf',
  },
  /** Foto de perfil opcional, ex.: '/images/profile.jpg'. Sem foto, usa as iniciais. */
  photo: null as string | null,
  /** Tecnologias que aparecem no resumo do topo e no JSON-LD. */
  mainStack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL'],
} as const;
