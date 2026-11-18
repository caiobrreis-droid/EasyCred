"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Seta } from "./Seta";
import { linkWhatsApp } from "@/lib/site";

export function Header() {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topo${rolou ? " topo--rolou" : ""}`}>
      <div className="topo__ilha">
        <a href="/" aria-label="EasyCred, página inicial" className="topo__marca">
          <Logo altura={66} />
        </a>
        <nav className="topo__nav" aria-label="Principal">
          <a href="/#servicos">Serviços</a>
          <a href="/#como-funciona">Como funciona</a>
          <a href="/#duvidas">Dúvidas</a>
        </nav>
        <a className="btn btn--pequeno" href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
          <span>
            Falar<span className="so-desktop"> no WhatsApp</span>
          </span>
          <Seta />
        </a>
      </div>
    </header>
  );
}
