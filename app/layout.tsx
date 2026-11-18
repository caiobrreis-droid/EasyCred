import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "EasyCred | Limpa nome, score e crédito",
  description:
    "Consulte grátis seu score e veja se seu nome está negativado. A EasyCred limpa CPF e CNPJ, aumenta score e rating e resolve pendências no Bacen. Atendimento em todo o Brasil.",
  openGraph: {
    title: "EasyCred | Limpa nome, score e crédito",
    description: "Consulte grátis seu score e descubra se seu nome está negativado.",
    locale: "pt_BR",
    type: "website",
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
