import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});
const body = Figtree({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://easycred.pages.dev"),
  title: "EasyCred | Limpe seu nome, destrave seu crédito",
  description:
    "A EasyCred limpa o nome de CPF e CNPJ, aumenta score e rating e resolve pendências no Bacen. Atendimento pelo WhatsApp em todo o Brasil.",
  openGraph: {
    title: "EasyCred | Limpe seu nome",
    description: "Limpeza de nome, aumento de score e rating e Bacen. Atendimento em todo o Brasil.",
    locale: "pt_BR",
    type: "website",
    images: ["/logo@2x.png"],
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
