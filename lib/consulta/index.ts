import { provedorDemo } from "./demo";
import { provedorHttp } from "./http";
import type { ProvedorConsulta } from "./types";

export function getProvedor(): ProvedorConsulta {
  return process.env.CONSULTA_PROVIDER === "http" ? provedorHttp : provedorDemo;
}

export * from "./types";
