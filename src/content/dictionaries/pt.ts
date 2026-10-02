import type { Dictionary } from '../dictionary';

export const pt: Dictionary = {
  meta: {
    title: 'Marouane Pondikpa · Desenvolvedor Full Stack',
    description:
      'Portfólio de Marouane Pondikpa, desenvolvedor full stack com JavaScript, TypeScript, React, Next.js, Node.js e PostgreSQL. Projetos, stack e contato.',
    ogAlt: 'Marouane Pondikpa, Desenvolvedor Full Stack',
  },
  nav: {
    about: 'Sobre',
    projects: 'Projetos',
    stack: 'Stack',
    experience: 'Trajetória',
    contact: 'Contato',
    skipToContent: 'Pular para o conteúdo',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    switchTheme: 'Alternar tema claro e escuro',
    language: 'Idioma',
    primaryNav: 'Navegação principal',
  },
  hero: {
    availability: 'Aberto a novas oportunidades',
    role: 'Desenvolvedor Full Stack',
    subtitle:
      'Construo aplicações web completas, do banco de dados à interface, com JavaScript e TypeScript. Código organizado, APIs claras e interfaces rápidas.',
    ctaProjects: 'Ver projetos',
    ctaResume: 'Baixar CV (FR)',
    factsTitle: 'Resumo',
    factRole: 'Função',
    factStack: 'Stack principal',
    factStatus: 'Status',
    factStatusValue: 'Aberto a vagas e projetos',
    factContact: 'Email',
  },
  projects: {
    title: 'Projetos',
    intro:
      'Cada projeto mostra a stack usada e leva para o código e, quando existe, para a demonstração.',
    filterAll: 'Todos',
    filterLabel: 'Filtrar por tecnologia',
    repo: 'Código',
    demo: 'Demo',
    empty: 'Nenhum projeto com essa tecnologia.',
    moreOnGithub: 'Ver todos os repositórios no GitHub',
  },
  about: {
    title: 'Sobre mim',
    paragraphs: [
      'Sou desenvolvedor full stack e trabalho com o ecossistema JavaScript: React e Next.js no front-end, Node.js e Express no back-end, PostgreSQL com Sequelize para dados.',
      'Este portfólio é um dos meus projetos. Foi feito com Next.js, TypeScript e Tailwind CSS, tem três idiomas e um formulário de contato com envio de email. O código está aberto no GitHub.',
      'Estou aberto a novas oportunidades. Se quiser conversar sobre uma vaga ou um projeto, use o formulário ou escreva direto para o meu email.',
    ],
  },
  stack: {
    title: 'Stack',
    groups: [
      {
        name: 'Front-end',
        items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
      },
      { name: 'Back-end', items: ['Node.js', 'Express', 'APIs REST'] },
      { name: 'Dados', items: ['PostgreSQL', 'Sequelize'] },
      { name: 'Ferramentas', items: ['Git', 'GitHub', 'Vercel'] },
    ],
  },
  experience: { title: 'Trajetória', items: [] },
  contact: {
    title: 'Contato',
    intro:
      'Quer conversar sobre uma vaga ou um projeto? Envie uma mensagem e respondo por email.',
    orWrite: 'Ou escreva direto',
    social: 'Perfis',
    form: {
      name: 'Nome',
      email: 'Seu email',
      subject: 'Assunto',
      message: 'Mensagem',
      namePlaceholder: 'Como devo te chamar',
      emailPlaceholder: 'voce@empresa.com',
      subjectPlaceholder: 'Vaga, projeto ou só um oi',
      messagePlaceholder: 'Conte um pouco sobre o que você precisa',
      send: 'Enviar mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada. Respondo por email em breve.',
      errorValidation: 'Confira os campos e tente de novo.',
      errorRate: 'Muitas tentativas seguidas. Aguarde alguns minutos.',
      errorGeneric:
        'Não foi possível enviar agora. Tente de novo ou escreva direto para o meu email.',
    },
  },
  footer: {
    rights: 'Todos os direitos reservados.',
    builtWith: 'Feito com Next.js e Tailwind CSS',
    source: 'Código-fonte',
  },
  emails: {
    confirmationSubject: 'Recebi sua mensagem',
    greeting: 'Olá',
    body: [
      'Obrigado por entrar em contato e pelo interesse no meu trabalho.',
      'Recebi sua mensagem e respondo o mais rápido possível. Se houver algum projeto do portfólio que chamou sua atenção, me conte e dou mais detalhes.',
    ],
    signoff: 'Atenciosamente,',
  },
};
