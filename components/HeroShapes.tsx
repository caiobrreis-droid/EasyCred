"use client";

import { useEffect, useRef } from "react";

const TRI = "M40 20 Q20 8 20 32 L20 288 Q20 312 40 300 L290 178 Q312 160 290 142 Z";

/** Triângulos em camadas inspirados na logo, com parallax leve seguindo o mouse. */
export function HeroShapes() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        el.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="formas" ref={ref} aria-hidden="true">
      <svg className="forma forma--1" viewBox="0 0 320 320">
        <defs>
          <linearGradient id="gf1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B5E4FF" />
            <stop offset="1" stopColor="#5BBBFF" />
          </linearGradient>
        </defs>
        <path d={TRI} fill="url(#gf1)" />
      </svg>
      <svg className="forma forma--2" viewBox="0 0 320 320">
        <defs>
          <linearGradient id="gf2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3AA6F5" />
            <stop offset="1" stopColor="#0B6BCB" />
          </linearGradient>
        </defs>
        <path d={TRI} fill="url(#gf2)" />
      </svg>
      <svg className="forma forma--3" viewBox="0 0 320 320">
        <path d={TRI} fill="#ffffff" fillOpacity="0.5" />
      </svg>
    </div>
  );
}
