export const site = {
  nome: "EasyCred",
  razaoSocial: "V. H Empreendimentos Ltda",
  cnpj: "23.338.475/0001-98",
  cidade: "Boa Vista, RR",
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
