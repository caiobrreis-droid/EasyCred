"use client";

import { useEffect, useRef, useState } from "react";

/** Número que conta de 0 até `valor` quando aparece na tela. */
export function Contador({ valor, sufixo = "" }: { valor: number; sufixo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(valor);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let fim: ReturnType<typeof setTimeout>;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const inicio = performance.now();
      const passo = (t: number) => {
        const p = Math.min(1, (t - inicio) / 1600);
        setN(Math.round(valor * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(passo);
      };
      raf = requestAnimationFrame(passo);
      fim = setTimeout(() => setN(valor), 1800);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(fim);
    };
  }, [valor]);

  return (
    <span ref={ref} className="contador">
      {n}
      {sufixo}
    </span>
  );
}
