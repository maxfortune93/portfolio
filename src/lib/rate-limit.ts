/**
 * Limite simples em memória. Em ambiente serverless cada instância tem seu próprio
 * contador, então isto reduz abuso mas não substitui um limite de borda (ex.: Upstash).
 */
const hits = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [storedKey, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(storedKey);
    }
  }
  return recent.length > limit;
}
