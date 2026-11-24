"use client";

import { useEffect } from "react";

/** Dá profundidade à foto do topo: a foto gira de leve e os selos flutuam em camadas diferentes com o mouse. */
export function FotoProfundidade() {
  useEffect(() => {
    const foto = document.querySelector<HTMLElement>(".hero__foto");
    if (!foto || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    let raf = 0;
    const alvo = { x: 0, y: 0 };
    const atual = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      alvo.x = e.clientX / window.innerWidth - 0.5;
      alvo.y = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(passo);
    };
    const passo = () => {
      atual.x += (alvo.x - atual.x) * 0.08;
      atual.y += (alvo.y - atual.y) * 0.08;
      foto.style.setProperty("--fx", atual.x.toFixed(4));
      foto.style.setProperty("--fy", atual.y.toFixed(4));
      raf = Math.abs(alvo.x - atual.x) + Math.abs(alvo.y - atual.y) > 0.001 ? requestAnimationFrame(passo) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
