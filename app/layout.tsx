import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const descricaoBusca =
  "Aumento de rating para você e sua empresa, limpeza de nome, ação revisional, score e Bacen. Atendimento pelo WhatsApp em Boa Vista (RR) e todo o Brasil.";

const tituloPadrao = "EasyCred | Limpeza de nome, aumento de rating e ação revisional";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: tituloPadrao, template: "%s | EasyCred" },
  description: descricaoBusca,
  applicationName: "EasyCred",
  keywords: [
    "limpa nome",
    "limpeza de nome",
    "limpar nome CPF",
    "limpar CNPJ",
    "aumento de rating",
    "rating bancário",
    "rating pessoa jurídica",
    "ação revisional",
    "revisão de juros abusivos",
    "aumento de score",
    "Bacen",
    "Registrato",
    "SCR",
    "Boa Vista RR",
    "Roraima",
  ],
  authors: [{ name: "EasyCred" }],
  creator: "EasyCred",
  publisher: site.razaoSocial,
  category: "Serviços financeiros",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "EasyCred",
    title: tituloPadrao,
    description: descricaoBusca,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "EasyCred: limpe seu nome e resolva suas pendências" }],
  },
  twitter: {
    card: "summary_large_image",
    title: tituloPadrao,
    description: descricaoBusca,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#0B6BCB" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
