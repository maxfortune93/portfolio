// Comando padrão de build (`npm run build`).
// Dentro do Workers Builds da Cloudflare (WORKERS_CI=1) gera o site estático em out/,
// então não é preciso configurar um build command diferente no painel.
// Em qualquer outro lugar (Render, GitHub Actions, local) roda o build normal do Next.
import { spawnSync } from 'node:child_process';

const onWorkersBuilds = process.env.WORKERS_CI === '1';
const [command, args] = onWorkersBuilds
  ? ['node', ['scripts/build-cloudflare.mjs']]
  : ['npx', ['next', 'build']];

if (onWorkersBuilds) console.log('Workers Builds detectado: gerando o site estático (cf:build).');

const result = spawnSync(command, args, { stdio: 'inherit' });
process.exit(result.status ?? 1);
