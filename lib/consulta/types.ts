export type FaixaScore = "baixo" | "regular" | "bom" | "excelente";

export interface ResultadoConsulta {
  /** "demo" = resultado simulado; "real" = veio do birô contratado */
  modo: "demo" | "real";
  cpfMascarado: string;
  score: number | null;
  faixa: FaixaScore | null;
  negativado: boolean;
  pendencias: number;
  valorPendencias: number | null;
  consultadoEm: string;
}

export interface ProvedorConsulta {
  consultar(cpf: string): Promise<ResultadoConsulta>;
}

export function faixaDoScore(score: number): FaixaScore {
  if (score < 300) return "baixo";
  if (score < 500) return "regular";
  if (score < 700) return "bom";
  return "excelente";
}
