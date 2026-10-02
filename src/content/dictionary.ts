/** Formato dos textos de interface. Cada idioma em ./dictionaries implementa este tipo. */
export interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  location?: string;
  description?: string;
  highlights?: string[];
  tech?: string[];
}

export interface Dictionary {
  meta: { title: string; description: string; ogAlt: string };
  nav: {
    about: string;
    projects: string;
    stack: string;
    experience: string;
    contact: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    switchTheme: string;
    language: string;
    primaryNav: string;
  };
  hero: {
    availability: string;
    role: string;
    subtitle: string;
    ctaProjects: string;
    ctaResume: string;
    factsTitle: string;
    factRole: string;
    factStack: string;
    factStatus: string;
    factStatusValue: string;
    factContact: string;
  };
  projects: {
    title: string;
    intro: string;
    filterAll: string;
    filterLabel: string;
    repo: string;
    demo: string;
    empty: string;
    moreOnGithub: string;
  };
  about: { title: string; paragraphs: string[] };
  stack: { title: string; groups: { name: string; items: string[] }[] };
  /** Se `items` estiver vazio, a seção não aparece. Formação e idiomas aparecem junto dela. */
  experience: {
    title: string;
    items: TimelineItem[];
    technologies: string;
    educationTitle: string;
    education: TimelineItem[];
    languagesTitle: string;
    languages: { name: string; level: string }[];
  };
  contact: {
    title: string;
    intro: string;
    orWrite: string;
    social: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      success: string;
      errorValidation: string;
      errorRate: string;
      errorGeneric: string;
    };
  };
  footer: { rights: string; builtWith: string; source: string };
  emails: {
    confirmationSubject: string;
    greeting: string;
    body: string[];
    signoff: string;
  };
}
