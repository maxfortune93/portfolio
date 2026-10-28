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
3. Em **Settings → Deploy Hook**, copie a URL e salve no GitHub como secret `RENDER_DEPLOY_HOOK_PORTFOLIO` (**Settings → Secrets and variables → Actions**). Sem o secret, o CI roda e o job de deploy termina com um **aviso amarelo** ("Render deploy skipped") na página da execução, sem atualizar o site. Com o secret, ele mostra "Render deploy triggered".
4. Se mudar a URL do site depois (domínio novo), dispare um novo deploy: o sitemap, o canonical e o `llms.txt` são gerados no build.

O plano free do Render dorme sem tráfego, então o primeiro acesso depois de um tempo pode demorar alguns segundos.

## Deploy (Cloudflare Workers)
Alternativa ao Render, sem "dormir" por falta de tráfego: o site é gerado como arquivos estáticos e servido pela Cloudflare; um Worker minúsculo cuida só do que é dinâmico.

- `npm run cf:build` gera o site estático em `out/` (o script tira a API e o middleware do caminho durante o build e os devolve no final).
- `cloudflare/worker.ts`: redireciona `/` para `/pt`, `/en` ou `/fr`, recebe o formulário em `/api/contact` (mesma lógica de `src/lib/contact.ts`, usada também pelo Next no Render) e responde `/api/health`. O resto é servido direto dos arquivos.
- `wrangler.jsonc`: configuração do Worker e dos arquivos estáticos. `public/_headers`: tipo e cache dos arquivos.
- `.github/workflows/cloudflare.yml`: valida o build em todo PR; em push na `main` publica.

Passo a passo:

1. Crie uma conta em cloudflare.com (não precisa de cartão para o plano grátis dos Workers).
2. Em **My Profile → API Tokens → Create Token**, use o modelo **Edit Cloudflare Workers** e copie o token. O **Account ID** aparece na página inicial da conta.
3. No GitHub: **Settings → Secrets and variables → Actions**:
   - Secrets: `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID`
   - Variable: `SITE_URL` com o endereço final, ex.: `https://marouane-portfolio.<seu-subdominio>.workers.dev` (entra no canonical, sitemap e `llms.txt`)
4. Rode o workflow **Cloudflare** (aba Actions → Run workflow) ou faça push na `main`. O primeiro deploy cria o Worker `marouane-portfolio`; a URL aparece no resumo da execução.
5. Guarde a chave do e-mail como segredo do Worker (uma vez): `npx wrangler secret put RESEND_API_KEY`, ou no painel em **Workers → marouane-portfolio → Settings → Variables and secrets**. `CONTACT_TO_EMAIL` é opcional.

Sem os secrets do passo 3, o workflow só valida o build e termina com um aviso amarelo. Para testar localmente: `npm run cf:dev` (http://localhost:8787).

### E-mail na Cloudflare
O formulário envia pela API do Resend (um `fetch`, funciona no Render e na Cloudflare). A Cloudflare tem serviço próprio de e-mail, mas ele exige um domínio próprio configurado na Cloudflare; sem domínio, use o Resend.

## Feito para ser encontrado
O site gera `/llms.txt`, `/llms-full.txt`, `/profile.json`, `/sitemap.xml`, `/robots.txt`,
JSON-LD e metadados por idioma, tudo a partir do mesmo conteúdo.

## Scripts
`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run format` · `npm run cf:build` · `npm run cf:dev` · `npm run cf:deploy`
