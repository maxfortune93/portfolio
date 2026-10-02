import type { Dictionary } from '../dictionary';

export const fr: Dictionary = {
  meta: {
    title: 'Marouane Pondikpa · Développeur Full Stack',
    description:
      'Portfolio de Marouane Pondikpa, développeur full stack avec JavaScript, TypeScript, React, Next.js, Node.js et PostgreSQL. Projets, stack et contact.',
    ogAlt: 'Marouane Pondikpa, Développeur Full Stack',
  },
  nav: {
    about: 'À propos',
    projects: 'Projets',
    stack: 'Stack',
    experience: 'Parcours',
    contact: 'Contact',
    skipToContent: 'Aller au contenu',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    switchTheme: 'Basculer entre thème clair et sombre',
    language: 'Langue',
    primaryNav: 'Navigation principale',
  },
  hero: {
    availability: 'Ouvert aux nouvelles opportunités',
    role: 'Développeur Full Stack',
    subtitle:
      "Je construis des applications web complètes, de la base de données à l'interface, avec JavaScript et TypeScript. Code organisé, API claires et interfaces rapides.",
    ctaProjects: 'Voir les projets',
    ctaResume: 'Télécharger le CV',
    factsTitle: 'En bref',
    factRole: 'Poste',
    factStack: 'Stack principale',
    factStatus: 'Statut',
    factStatusValue: 'Ouvert aux postes et projets',
    factContact: 'Email',
  },
  projects: {
    title: 'Projets',
    intro:
      'Chaque projet indique la stack utilisée et renvoie vers le code et, quand il existe, vers une démo.',
    filterAll: 'Tous',
    filterLabel: 'Filtrer par technologie',
    repo: 'Code',
    demo: 'Démo',
    empty: 'Aucun projet avec cette technologie.',
    moreOnGithub: 'Voir tous les dépôts sur GitHub',
  },
  about: {
    title: 'À propos',
    paragraphs: [
      "Je suis développeur full stack et je travaille dans l'écosystème JavaScript : React et Next.js côté front, Node.js et Express côté back, PostgreSQL avec Sequelize pour les données.",
      "Ce portfolio est l'un de mes projets. Il est construit avec Next.js, TypeScript et Tailwind CSS, existe en trois langues et propose un formulaire de contact qui envoie des emails. Le code est ouvert sur GitHub.",
      'Je suis ouvert aux nouvelles opportunités. Pour parler d’un poste ou d’un projet, utilisez le formulaire ou écrivez-moi directement.',
    ],
  },
  stack: {
    title: 'Stack',
    groups: [
      {
        name: 'Front-end',
        items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
      },
      { name: 'Back-end', items: ['Node.js', 'Express', 'API REST'] },
      { name: 'Données', items: ['PostgreSQL', 'Sequelize'] },
      { name: 'Outils', items: ['Git', 'GitHub', 'Vercel'] },
    ],
  },
  experience: { title: 'Parcours', items: [] },
  contact: {
    title: 'Contact',
    intro:
      'Envie de parler d’un poste ou d’un projet ? Envoyez un message et je réponds par email.',
    orWrite: 'Ou écrivez directement',
    social: 'Profils',
    form: {
      name: 'Nom',
      email: 'Votre email',
      subject: 'Sujet',
      message: 'Message',
      namePlaceholder: 'Comment dois-je vous appeler',
      emailPlaceholder: 'vous@entreprise.com',
      subjectPlaceholder: 'Un poste, un projet, ou simplement bonjour',
      messagePlaceholder: 'Dites-moi en quelques mots ce dont vous avez besoin',
      send: 'Envoyer le message',
      sending: 'Envoi...',
      success: 'Message envoyé. Je réponds par email très bientôt.',
      errorValidation: 'Vérifiez les champs et réessayez.',
      errorRate: 'Trop de tentatives d’affilée. Patientez quelques minutes.',
      errorGeneric:
        'Envoi impossible pour le moment. Réessayez ou écrivez-moi directement par email.',
    },
  },
  footer: {
    rights: 'Tous droits réservés.',
    builtWith: 'Construit avec Next.js et Tailwind CSS',
    source: 'Code source',
  },
  emails: {
    confirmationSubject: 'J’ai bien reçu votre message',
    greeting: 'Bonjour',
    body: [
      'Merci de m’avoir contacté et de l’intérêt porté à mon travail.',
      'J’ai bien reçu votre message et je réponds dès que possible. Si un projet du portfolio vous a intéressé, dites-le-moi et je donnerai plus de détails.',
    ],
    signoff: 'Cordialement,',
  },
};
