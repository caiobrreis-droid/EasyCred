export const site = {
  nome: "EasyCred",
  instagram: "https://www.instagram.com/easycredrr/",
  linktree: "https://linktr.ee/easycredcontatos",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
};

/** Link do WhatsApp com mensagem pronta. Sem número configurado, cai no Linktree. */
export function linkWhatsApp(mensagem = "Olá! Vim pelo site da EasyCred e quero saber mais."): string {
  if (!site.whatsapp) return site.linktree;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
