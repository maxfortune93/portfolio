# AGENTS.md

Guia para agentes de código e pessoas que editam este repositório.
Portfólio pessoal de Marouane Pondikpa. Next.js 14 (App Router), TypeScript, Tailwind CSS, Resend.

## Regra principal
Conteúdo e interface são separados. Para atualizar o site, edite os arquivos de `src/content/`.
Não é preciso mexer em componentes para trocar textos, projetos, stack ou links.

## Onde está cada coisa

| Quero mudar | Arquivo |
|---|---|
| Nome, email, links (GitHub/LinkedIn), CV, foto, stack do resumo | `src/content/profile.ts` |
| Adicionar ou editar **projetos** | `src/content/projects.ts` (leia o comentário no topo) |
| Textos da página, stack por grupo, trajetória, mensagens do formulário (PT/EN/FR) | `src/content/dictionaries/{pt,en,fr}.ts` |
| Formato dos textos (ao criar um campo novo) | `src/content/dictionary.ts` |
| Idiomas disponíveis | `src/content/locales.ts` |
| Cores e tema | variáveis CSS em `src/app/globals.css` + `tailwind.config.ts` |
| Metadados, SEO, idiomas alternativos | `src/app/[lang]/layout.tsx` |
| Dados estruturados (JSON-LD) | `src/lib/structured-data.ts` |
| `llms.txt`, `llms-full.txt`, `profile.json` | `src/lib/agents.ts` (gerados do conteúdo, não edite à mão) |
| Formulário de contato (API) | `src/app/api/contact/route.ts`, emails em `src/emails/` |

## Tarefas comuns

**Adicionar um projeto**: em `src/content/projects.ts`, copie um objeto do array `projects`, troque `slug`, `stack`, `links` e os textos `pt`/`en`/`fr`. Remova `draft: true` se houver. Imagem opcional em `public/images/projects/<slug>.png` com `image: '/images/projects/<slug>.png'`.

**Adicionar trajetória (experiência, formação, certificações)**: preencha `experience.items` nos três dicionários. Com a lista vazia, a seção some da página e do menu.

**Adicionar um idioma**: inclua o código em `locales` (`locales.ts`), crie `dictionaries/<codigo>.ts` com o tipo `Dictionary`, registre em `src/content/index.ts` e preencha `text.<codigo>` em cada projeto. O TypeScript aponta o que faltar.

**Trocar o CV**: coloque o PDF em `public/pdf/` e ajuste `profile.resume`.

## Como o site é montado
- Uma página estática por idioma: `/pt`, `/en`, `/fr` (`src/app/[lang]/page.tsx`). `src/middleware.ts` redireciona `/` pelo cookie `NEXT_LOCALE` ou `Accept-Language`.
- Componentes de servidor por padrão. Client components só onde há estado: `Header`, `ProjectGrid`, `ContactForm`.
- Tema claro/escuro por variáveis CSS (`data-theme` no `<html>` ou `prefers-color-scheme`). Use as cores do Tailwind (`bg-bg`, `text-muted`, `border-line`, `text-accent`), nunca cores literais.

## Descoberta por agentes e buscadores
Gerados automaticamente a partir de `src/content/`:
- `/llms.txt` e `/llms-full.txt`: resumo e texto completo em Markdown
- `/profile.json`: dados estruturados com os três idiomas
- `/sitemap.xml`, `/robots.txt`
- JSON-LD (`Person`, `WebSite`, `ProfilePage`, `SoftwareSourceCode`) em cada página
- `hreflang`, canonical e Open Graph por idioma; imagem OG em `src/app/[lang]/opengraph-image.tsx`

Ao mudar o conteúdo, nada disso precisa de edição manual.

## Variáveis de ambiente
Veja `.env.example`. Obrigatória em produção para o formulário: `RESEND_API_KEY`. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final.

## Comandos
```bash
npm run dev         # desenvolvimento em http://localhost:3000
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
npm run build       # build de produção (valida tipos e gera as páginas)
```
Antes de commitar: `npm run lint && npm run typecheck && npm run build`.

## Convenções
- TypeScript estrito. Sem `any`.
- Texto visível vive nos dicionários, não nos componentes.
- Nunca invente dados pessoais (cargos, empresas, certificações, números). Só publique o que a pessoa confirmou.
- Não registre segredos em log. A API de contato não imprime o cliente do Resend nem a chave.
