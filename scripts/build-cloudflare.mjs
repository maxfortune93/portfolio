// Gera o site estático em out/ para a Cloudflare.
// O export estático do Next não aceita rotas de API nem middleware (eles ficam no Worker,
// em cloudflare/worker.ts), então saem do caminho durante o build e voltam no final.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';

const stash = '.cf-stash';
const moves = [
  ['src/app/api', `${stash}/api`],
  ['src/middleware.ts', `${stash}/middleware.ts`],
];

const restore = () => {
  for (const [original, stashed] of moves) {
    if (existsSync(stashed) && !existsSync(original)) renameSync(stashed, original);
  }
  rmSync(stash, { recursive: true, force: true });
};

process.on('SIGINT', () => {
  restore();
  process.exit(130);
});

mkdirSync(stash, { recursive: true });
let status = 1;
try {
  for (const [original, stashed] of moves) {
    if (existsSync(original)) renameSync(original, stashed);
  }
  const result = spawnSync('npx', ['next', 'build'], {
    stdio: 'inherit',
    env: { ...process.env, STATIC_EXPORT: '1' },
  });
  status = result.status ?? 1;
} finally {
  restore();
}
process.exit(status);
