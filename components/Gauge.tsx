"use client";

import { useEffect, useState } from "react";

const FAIXAS = [
  { ate: 300, cor: "var(--faixa-baixo)" },
  { ate: 500, cor: "var(--faixa-regular)" },
  { ate: 700, cor: "var(--faixa-bom)" },
  { ate: 1000, cor: "var(--faixa-excelente)" },
];

const TICKS = 41;

/** Medidor semicircular de 0 a 1000. `score` null deixa o ponteiro em espera. */
export function Gauge({ score, carregando }: { score: number | null; carregando: boolean }) {
  const [exibido, setExibido] = useState(0);

  useEffect(() => {
    if (score === null) {
      setExibido(0);
      return;
    }
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) {
      setExibido(score);
      return;
    }
    let raf = 0;
    const inicio = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - inicio) / dur);
      const ease = 1 - Math.pow(1 - p, 4);
      setExibido(Math.round(score * ease));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Garante o valor final mesmo se o navegador pausar os frames (aba em segundo plano).
    const fim = setTimeout(() => setExibido(score), dur + 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fim);
    };
  }, [score]);

  const angulo = score === null ? -90 : -90 + (Math.min(score, 1000) / 1000) * 180;

  return (
    <div className={`gauge${carregando ? " gauge--carregando" : ""}`}>
      <svg viewBox="0 0 300 170" role="img" aria-label={score === null ? "Medidor de score aguardando consulta" : `Score ${score} de 1000`}>
        {Array.from({ length: TICKS }, (_, i) => {
          const valor = (i / (TICKS - 1)) * 1000;
          const a = Math.PI - (i / (TICKS - 1)) * Math.PI;
          const longo = i % 10 === 0;
          const r1 = longo ? 112 : 118;
          const r2 = 132;
          const p = (n: number) => Math.round(n * 100) / 100;
          const cor = FAIXAS.find((f) => valor <= f.ate)!.cor;
          const ativo = score !== null && valor <= exibido;
          return (
            <line
              key={i}
              x1={p(150 + r1 * Math.cos(a))}
              y1={p(150 - r1 * Math.sin(a))}
              x2={p(150 + r2 * Math.cos(a))}
              y2={p(150 - r2 * Math.sin(a))}
              stroke={ativo ? cor : "var(--trilho)"}
              strokeWidth={longo ? 5 : 4}
              strokeLinecap="round"
            />
          );
        })}
        <g className="gauge__ponteiro" style={{ transform: `rotate(${angulo}deg)` }}>
          <line x1="150" y1="150" x2="150" y2="52" stroke="var(--marinho)" strokeWidth="4" strokeLinecap="round" />
        </g>
        <circle cx="150" cy="150" r="9" fill="var(--marinho)" />
        <circle cx="150" cy="150" r="3.5" fill="#fff" />
        <text x="22" y="168" className="gauge__limite">0</text>
        <text x="278" y="168" textAnchor="end" className="gauge__limite">1000</text>
      </svg>
      <div className="gauge__valor" aria-live="polite">
        {score === null ? <span className="gauge__vazio">{carregando ? "…" : "?"}</span> : exibido}
      </div>
    </div>
  );
}
