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

## Deploy (Render)
O repositório já vem com:

- **`.github/workflows/ci.yml`**: a cada push e PR roda lint, typecheck e build. Em push para `main`, se tudo passar, o job `deploy` chama o Render.
- **`render.yaml`**: Blueprint do Render com o serviço web (Node, plano free, health check em `/api/health`). `autoDeploy` fica desligado de propósito: quem faz o deploy é o CI, só depois dos checks.

Passo a passo:

1. No Render: **New +** → **Blueprint**, aponte para este repositório (branch `main`) e confirme.
2. Em **Environment** do serviço, preencha `RESEND_API_KEY` (e, se tiver domínio próprio, `NEXT_PUBLIC_SITE_URL`). Sem `NEXT_PUBLIC_SITE_URL`, o site usa a URL do Render.
3. Em **Settings → Deploy Hook**, copie a URL e salve no GitHub como secret `RENDER_DEPLOY_HOOK_PORTFOLIO` (**Settings → Secrets and variables → Actions**). Sem o secret, o CI roda normalmente e só pula o deploy.
4. Se mudar a URL do site depois (domínio novo), dispare um novo deploy: o sitemap, o canonical e o `llms.txt` são gerados no build.

O plano free do Render dorme sem tráfego, então o primeiro acesso depois de um tempo pode demorar alguns segundos.

## Feito para ser encontrado
O site gera `/llms.txt`, `/llms-full.txt`, `/profile.json`, `/sitemap.xml`, `/robots.txt`,
JSON-LD e metadados por idioma, tudo a partir do mesmo conteúdo.

## Scripts
`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run format`
