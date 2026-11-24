"use client";

import { useEffect } from "react";

/**
 * Inclinação 3D com reflexo para os elementos com data-tilt.
 * O valor do atributo é o ângulo máximo em graus (padrão 8).
 */
export function Tilt() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const saidas: Array<() => void> = [];

    for (const el of els) {
      const max = Number(el.dataset.tilt) || 8;
      const brilho = document.createElement("span");
      brilho.className = "tilt-brilho";
      brilho.setAttribute("aria-hidden", "true");
      el.appendChild(brilho);
      let raf = 0;

      const onMove = (e: PointerEvent) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transition = "transform 0.18s ease-out, box-shadow 0.4s ease";
          el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px) scale(1.01)`;
          el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
          el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
          el.classList.add("tilt-ativo");
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(raf);
        el.style.transition = "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease";
        el.style.transform = "";
        el.classList.remove("tilt-ativo");
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      saidas.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        brilho.remove();
        el.style.transform = "";
        el.style.transition = "";
      });
    }
    return () => saidas.forEach((f) => f());
  }, []);
  return null;
}
