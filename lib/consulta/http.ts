import { maskCpf } from "../cpf";
import { faixaDoScore, type ProvedorConsulta } from "./types";

/**
 * Adaptador para a API real de score/negativação (Serasa, Boa Vista, Quod
 * ou revendedor autorizado). Cada fornecedor tem um formato de resposta:
 * ajuste a função `mapear` quando o contrato for fechado.
 */
export const provedorHttp: ProvedorConsulta = {
  async consultar(cpf) {
    const url = process.env.CONSULTA_API_URL;
    const token = process.env.CONSULTA_API_TOKEN;
    if (!url || !token) {
      throw new Error("CONSULTA_API_URL e CONSULTA_API_TOKEN precisam estar configurados.");
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ cpf }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Fornecedor respondeu ${res.status}`);
    const data = (await res.json()) as Record<string, unknown>;
    return mapear(cpf, data);
  },
};

function mapear(cpf: string, data: Record<string, unknown>) {
  const score = typeof data.score === "number" ? data.score : null;
  const pendencias = Array.isArray(data.pendencias) ? data.pendencias.length : Number(data.pendencias ?? 0);
  const valor = typeof data.valorTotal === "number" ? data.valorTotal : null;
  return {
    modo: "real" as const,
    cpfMascarado: maskCpf(cpf),
    score,
    faixa: score === null ? null : faixaDoScore(score),
    negativado: pendencias > 0,
    pendencias,
    valorPendencias: valor,
    consultadoEm: new Date().toISOString(),
  };
}
