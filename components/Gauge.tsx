"use client";

import { useEffect, useState } from "react";

const ARCO = "M30 150 A120 120 0 0 1 270 150";
const p2 = (n: number) => Math.round(n * 100) / 100;

/** Medidor semicircular de 0 a 1000. `score` null deixa o medidor em espera. */
export function Gauge({ score, carregando }: { score: number | null; carregando: boolean }) {
  const [exibido, setExibido] = useState(0);

  useEffect(() => {
    if (score === null) {
      setExibido(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExibido(score);
      return;
    }
    let raf = 0;
    const inicio = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - inicio) / dur);
      setExibido(Math.round(score * (1 - Math.pow(1 - p, 4))));
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

  const v = Math.min(exibido, 1000);
  const ang = Math.PI - (v / 1000) * Math.PI;
  const kx = p2(150 + 120 * Math.cos(ang));
  const ky = p2(150 - 120 * Math.sin(ang));

  return (
    <div className={`gauge${carregando ? " gauge--carregando" : ""}${score !== null ? " gauge--ativo" : ""}`}>
      <svg viewBox="0 0 300 172" role="img" aria-label={score === null ? "Medidor de score aguardando consulta" : `Score ${score} de 1000`}>
        <defs>
          <linearGradient id="g-score" gradientUnits="userSpaceOnUse" x1="30" y1="0" x2="270" y2="0">
            <stop offset="0" stopColor="var(--faixa-baixo)" />
            <stop offset="0.35" stopColor="var(--faixa-regular)" />
            <stop offset="0.62" stopColor="var(--faixa-bom)" />
            <stop offset="1" stopColor="var(--faixa-excelente)" />
          </linearGradient>
          <filter id="g-brilho" x="-20%" y="-20%" width="140%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {Array.from({ length: 11 }, (_, i) => {
          const a = Math.PI - (i / 10) * Math.PI;
          return (
            <line
              key={i}
              x1={p2(150 + 140 * Math.cos(a))}
              y1={p2(150 - 140 * Math.sin(a))}
              x2={p2(150 + 146 * Math.cos(a))}
              y2={p2(150 - 146 * Math.sin(a))}
              className="gauge__marca"
            />
          );
        })}

        <path d={ARCO} className="gauge__trilho" pathLength={1000} />
        <path d={ARCO} className="gauge__busca" pathLength={1000} />
        <path
          d={ARCO}
          className="gauge__brilho"
          pathLength={1000}
          strokeDasharray="1000"
          strokeDashoffset={1000 - v}
          filter="url(#g-brilho)"
        />
        <path d={ARCO} className="gauge__progresso" pathLength={1000} strokeDasharray="1000" strokeDashoffset={1000 - v} />
        {score !== null && (
          <>
            <circle cx={kx} cy={ky} r="13" className="gauge__knob-halo" />
            <circle cx={kx} cy={ky} r="8" className="gauge__knob" />
          </>
        )}
        <text x="30" y="172" textAnchor="middle" className="gauge__limite">
          0
        </text>
        <text x="270" y="172" textAnchor="middle" className="gauge__limite">
          1000
        </text>
      </svg>
      <div className="gauge__valor" aria-live="polite">
        {score === null ? <span className="gauge__vazio">{carregando ? "···" : "???"}</span> : exibido}
        <small>{score === null ? "seu score" : "de 1000"}</small>
      </div>
    </div>
  );
}
