const hits = new Map<string, number[]>();

/** Limite simples em memória: `max` consultas por `janelaMs` por chave. */
export function rateLimit(key: string, max = 5, janelaMs = 60 * 60 * 1000): boolean {
  const agora = Date.now();
  const lista = (hits.get(key) ?? []).filter((t) => agora - t < janelaMs);
  if (lista.length >= max) {
    hits.set(key, lista);
    return false;
  }
  lista.push(agora);
  hits.set(key, lista);
  if (hits.size > 5000) hits.clear();
  return true;
}
