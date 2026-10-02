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
  location: { city: 'São Paulo', region: 'SP', country: 'BR', remote: true },
  /**
   * CV em PDF dentro de /public/pdf, por idioma da página.
   * `language` é o idioma do arquivo; o botão avisa quando difere do idioma da página.
   */
  resumes: {
    pt: {
      href: '/pdf/CV_Marouane_Pondikpa_Backend.pdf',
      language: 'pt',
      filename: 'CV_Marouane_Pondikpa_Backend.pdf',
    },
    en: {
      href: '/pdf/CV_Marouane_Pondikpa_Backend.pdf',
      language: 'pt',
      filename: 'CV_Marouane_Pondikpa_Backend.pdf',
    },
    fr: {
      href: '/pdf/resume_fr.pdf',
      language: 'fr',
      filename: 'Marouane_Pondikpa_CV_FR.pdf',
    },
  },
  /**
   * WhatsApp opcional. Com um número (só dígitos, com DDI, ex.: '5511999999999'), a página de
   * contato mostra um botão que abre a conversa. O número fica visível no link (wa.me).
   */
  whatsapp: null as string | null,
  /** Foto de perfil opcional, ex.: '/images/profile.jpg'. Sem foto, usa as iniciais. */
  photo: null as string | null,
  /** Tecnologias que aparecem no resumo do topo e no JSON-LD. */
  mainStack: ['Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'AWS'],
} as const;
