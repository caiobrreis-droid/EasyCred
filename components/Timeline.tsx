"use client";

import { useEffect, useRef, useState } from "react";

type Passo = { titulo: string; texto: string };

/** Linha do tempo que vai se preenchendo conforme a pessoa rola a página. */
export function Timeline({ passos }: { passos: Passo[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgresso(1);
      return;
    }
    let raf = 0;
    const calc = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.8 - r.top) / (r.height + vh * 0.2);
      setProgresso(Math.max(0, Math.min(1, p)));
    };
    const agendar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol className="timeline" ref={ref} style={{ "--p": progresso } as React.CSSProperties}>
      {passos.map((p, i) => {
        const ativo = progresso >= (i + 0.2) / passos.length;
        return (
          <li key={p.titulo} className={`etapa${ativo ? " etapa--ativa" : ""}`}>
            <span className="etapa__num" aria-hidden="true">
              {i + 1}
            </span>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </li>
        );
      })}
      <li className="timeline__trilho" aria-hidden="true">
        <span className="timeline__barra" />
      </li>
    </ol>
  );
}
