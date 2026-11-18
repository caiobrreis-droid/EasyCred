"use client";

import { useState } from "react";
import { Gauge } from "./Gauge";
import { formatCpf, formatPhone, isValidCpf } from "@/lib/cpf";
import { linkWhatsApp } from "@/lib/site";
import type { ResultadoConsulta } from "@/lib/consulta/types";

const TEXTO_FAIXA: Record<string, string> = {
  baixo: "Score baixo",
  regular: "Score regular",
  bom: "Score bom",
  excelente: "Score excelente",
};

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function ConsultaScore() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [whats, setWhats] = useState("");
  const [aceite, setAceite] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoConsulta | null>(null);

  async function consultar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!isValidCpf(cpf)) return setErro("Esse CPF não é válido. Confira os números.");
    if (!aceite) return setErro("Para consultar, confirme que o CPF é seu e aceite a política de privacidade.");

    setCarregando(true);
    try {
      const res = await fetch("/api/consulta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cpf, whatsapp: whats, consentimento: aceite }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.erro ?? "Não foi possível consultar agora.");
      setResultado(data);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível consultar agora.");
    } finally {
      setCarregando(false);
    }
  }

  function novaConsulta() {
    setResultado(null);
    setCpf("");
    setAceite(false);
  }

  const mensagemWhats = resultado
    ? `Olá! Fiz a consulta no site da EasyCred (CPF ${resultado.cpfMascarado}). ${
        resultado.negativado ? "Meu nome apareceu com pendências e" : "Meu score deu " + (resultado.score ?? "") + " e"
      } quero ajuda.`
    : undefined;

  return (
    <section className="consulta" id="consulta" aria-labelledby="consulta-titulo">
      <h2 id="consulta-titulo" className="consulta__titulo">
        {resultado ? "Resultado da sua consulta" : "Consulte seu CPF agora"}
      </h2>

      <Gauge score={resultado?.score ?? null} carregando={carregando} />

      {resultado ? (
        <div className="resultado">
          {resultado.modo === "demo" && (
            <p className="aviso-demo" role="note">
              Resultado de demonstração. A consulta real nos birôs de crédito será ligada em breve.
            </p>
          )}
          <p className="resultado__faixa">
            {resultado.faixa ? TEXTO_FAIXA[resultado.faixa] : "Score indisponível"}
            <small>CPF {resultado.cpfMascarado}</small>
          </p>

          <div className={`status ${resultado.negativado ? "status--negativado" : "status--limpo"}`}>
            <strong>{resultado.negativado ? "Seu nome está negativado" : "Nenhuma pendência encontrada"}</strong>
            <span>
              {resultado.negativado
                ? `${resultado.pendencias} ${resultado.pendencias === 1 ? "pendência" : "pendências"}${
                    resultado.valorPendencias ? `, somando ${moeda.format(resultado.valorPendencias)}` : ""
                  }. A gente pode resolver isso com você.`
                : "Quer subir seu score para conseguir crédito melhor? A gente te mostra o caminho."}
            </span>
          </div>

          <a className="botao botao--cheio" href={linkWhatsApp(mensagemWhats)} target="_blank" rel="noopener noreferrer">
            {resultado.negativado ? "Quero limpar meu nome" : "Quero aumentar meu score"}
          </a>
          <button type="button" className="botao botao--texto" onClick={novaConsulta}>
            Fazer outra consulta
          </button>
        </div>
      ) : (
        <form className="form" onSubmit={consultar} noValidate>
          <label className="campo">
            <span>Nome completo</span>
            <input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" required />
          </label>
          <div className="form__linha">
            <label className="campo">
              <span>CPF</span>
              <input
                value={cpf}
                onChange={(e) => setCpf(formatCpf(e.target.value))}
                inputMode="numeric"
                placeholder="000.000.000-00"
                required
              />
            </label>
            <label className="campo">
              <span>WhatsApp</span>
              <input
                value={whats}
                onChange={(e) => setWhats(formatPhone(e.target.value))}
                inputMode="tel"
                autoComplete="tel"
                placeholder="(95) 99999-9999"
                required
              />
            </label>
          </div>
          <label className="aceite">
            <input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} />
            <span>
              Confirmo que o CPF é meu e aceito a <a href="/privacidade">política de privacidade</a>.
            </span>
          </label>
          {erro && (
            <p className="erro" role="alert">
              {erro}
            </p>
          )}
          <button className="botao botao--cheio" type="submit" disabled={carregando}>
            {carregando ? "Consultando…" : "Consultar grátis"}
          </button>
          <p className="form__nota">Consultar o próprio CPF não baixa o seu score.</p>
        </form>
      )}
    </section>
  );
}
