# Portfólio · Marouane Pondikpa

Site pessoal em três idiomas (PT, EN, FR) feito com Next.js 14, TypeScript e Tailwind CSS.
Pensado para ser o link do LinkedIn: apresentação rápida, projetos com links de demo e repositório, stack e contato.

## Rodar localmente
```bash
npm install
cp .env.example .env.local   # preencha RESEND_API_KEY para testar o formulário
npm run dev
```

## Atualizar o conteúdo
Tudo fica em `src/content/`, sem mexer nos componentes:

- `profile.ts`: nome, email, links, CV
- `projects.ts`: projetos (copie um bloco, troque os campos, faça push)
- `dictionaries/pt|en|fr.ts`: textos, stack, trajetória

Detalhes e receitas em [AGENTS.md](./AGENTS.md).

## Deploy
Na Vercel, importe o repositório e configure as variáveis de `.env.example`
(`RESEND_API_KEY` e `NEXT_PUBLIC_SITE_URL` no mínimo). Cada push publica o site.

## Feito para ser encontrado
O site gera `/llms.txt`, `/llms-full.txt`, `/profile.json`, `/sitemap.xml`, `/robots.txt`,
JSON-LD e metadados por idioma, tudo a partir do mesmo conteúdo.

## Scripts
`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run format`
