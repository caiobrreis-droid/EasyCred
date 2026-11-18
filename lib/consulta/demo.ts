import { maskCpf } from "../cpf";
import { faixaDoScore, type ProvedorConsulta } from "./types";

/**
 * Provedor de demonstração: gera um resultado fixo por CPF, sem consultar
 * nenhum birô. A interface sempre avisa que o resultado é simulado.
 */
export const provedorDemo: ProvedorConsulta = {
  async consultar(cpf) {
    let h = 7;
    for (const c of cpf) h = (h * 31 + Number(c)) % 100003;
    const score = 120 + (h % 820);
    const negativado = score < 450;
    const pendencias = negativado ? 1 + (h % 5) : 0;
    await new Promise((r) => setTimeout(r, 900));
    return {
      modo: "demo",
      cpfMascarado: maskCpf(cpf),
      score,
      faixa: faixaDoScore(score),
      negativado,
      pendencias,
      valorPendencias: negativado ? Math.round(((h % 97) + 3) * 137.5) : 0,
      consultadoEm: new Date().toISOString(),
    };
  },
};
