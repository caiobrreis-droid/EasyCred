export const site = {
  nome: "EasyCred",
  /** Endereço público do site (troque por NEXT_PUBLIC_SITE_URL quando o domínio próprio estiver ligado). */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://easycred.pages.dev").replace(/\/$/, ""),
  descricao:
    "A EasyCred cuida do seu CPF e do CNPJ da sua empresa: aumento de rating, limpeza de nome, ação revisional, score e pendências no Bacen. Atendimento pelo WhatsApp em Boa Vista (RR) e em todo o Brasil.",
  razaoSocial: "V. H Empreendimentos Ltda",
  cnpj: "23.338.475/0001-98",
  cidade: "Boa Vista, RR",
  endereco: { cidade: "Boa Vista", uf: "RR", pais: "BR" },
  instagram: "https://www.instagram.com/easycredrr/",
  linktree: "https://linktr.ee/easycredcontatos",
  /** WhatsApp de atendimento, só números com DDI e DDD. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5595981014533",
  whatsappExibicao: "(95) 98101-4533",
};

/** Link do WhatsApp com mensagem pronta. */
export function linkWhatsApp(mensagem = "Olá! Vim pelo site da EasyCred e quero saber mais."): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
