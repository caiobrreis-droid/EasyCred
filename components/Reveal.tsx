"use client";

import { useEffect } from "react";

/** Mostra com uma entrada suave os elementos marcados com data-reveal quando entram na tela. */
export function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("com-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    // Garantia: nada fica escondido se o observer não disparar.
    const t = setTimeout(() => els.forEach((el) => el.classList.add("visivel")), 4000);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  return null;
}
