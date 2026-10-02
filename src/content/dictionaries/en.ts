import type { Dictionary } from '../dictionary';

export const en: Dictionary = {
  meta: {
    title: 'Marouane Pondikpa · Full Stack Developer',
    description:
      'Portfolio of Marouane Pondikpa, a full stack developer working with JavaScript, TypeScript, React, Next.js, Node.js and PostgreSQL. Projects, stack and contact.',
    ogAlt: 'Marouane Pondikpa, Full Stack Developer',
  },
  nav: {
    about: 'About',
    projects: 'Projects',
    stack: 'Stack',
    experience: 'Experience',
    contact: 'Contact',
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchTheme: 'Switch between light and dark theme',
    language: 'Language',
    primaryNav: 'Primary navigation',
  },
  hero: {
    availability: 'Open to new opportunities',
    role: 'Full Stack Developer',
    subtitle:
      'I build complete web applications, from the database to the interface, with JavaScript and TypeScript. Organized code, clear APIs and fast interfaces.',
    ctaProjects: 'View projects',
    ctaResume: 'Download résumé (FR)',
    factsTitle: 'At a glance',
    factRole: 'Role',
    factStack: 'Main stack',
    factStatus: 'Status',
    factStatusValue: 'Open to jobs and projects',
    factContact: 'Email',
  },
  projects: {
    title: 'Projects',
    intro:
      'Each project lists the stack used and links to the code and, when there is one, a live demo.',
    filterAll: 'All',
    filterLabel: 'Filter by technology',
    repo: 'Code',
    demo: 'Demo',
    empty: 'No projects with this technology.',
    moreOnGithub: 'See all repositories on GitHub',
  },
  about: {
    title: 'About me',
    paragraphs: [
      'I am a full stack developer working in the JavaScript ecosystem: React and Next.js on the front end, Node.js and Express on the back end, PostgreSQL with Sequelize for data.',
      'This portfolio is one of my projects. It is built with Next.js, TypeScript and Tailwind CSS, has three languages and a contact form that sends email. The code is open on GitHub.',
      'I am open to new opportunities. To talk about a role or a project, use the form or write to me directly.',
    ],
  },
  stack: {
    title: 'Stack',
    groups: [
      {
        name: 'Front end',
        items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
      },
      { name: 'Back end', items: ['Node.js', 'Express', 'REST APIs'] },
      { name: 'Data', items: ['PostgreSQL', 'Sequelize'] },
      { name: 'Tools', items: ['Git', 'GitHub', 'Vercel'] },
    ],
  },
  experience: { title: 'Experience', items: [] },
  contact: {
    title: 'Contact',
    intro:
      'Want to talk about a role or a project? Send a message and I will reply by email.',
    orWrite: 'Or write directly',
    social: 'Profiles',
    form: {
      name: 'Name',
      email: 'Your email',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'What should I call you',
      emailPlaceholder: 'you@company.com',
      subjectPlaceholder: 'A role, a project, or just hello',
      messagePlaceholder: 'Tell me a little about what you need',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent. I will reply by email soon.',
      errorValidation: 'Check the fields and try again.',
      errorRate: 'Too many attempts in a row. Please wait a few minutes.',
      errorGeneric: 'Could not send right now. Try again or write to my email directly.',
    },
  },
  footer: {
    rights: 'All rights reserved.',
    builtWith: 'Built with Next.js and Tailwind CSS',
    source: 'Source code',
  },
  emails: {
    confirmationSubject: 'I received your message',
    greeting: 'Hello',
    body: [
      'Thank you for getting in touch and for your interest in my work.',
      'I received your message and will reply as soon as I can. If a project in the portfolio caught your eye, tell me and I will share more details.',
    ],
    signoff: 'Best regards,',
  },
};
