import { site } from "@/lib/site";

type Duvida = { p: string; r: string };

const SERVICOS = [
  { nome: "Aumento de rating", descricao: "Melhoria da classificação de risco (rating) de pessoa física e jurídica nos bancos." },
  { nome: "Limpeza de nome", descricao: "Retirada de restrições de CPF e CNPJ nos órgãos de proteção, como Serasa, SPC e Boa Vista." },
  { nome: "Ação revisional", descricao: "Revisão de contratos de financiamento, empréstimo ou cartão com juros ou cobranças abusivas." },
  { nome: "Aumento de score", descricao: "Análise de cadastro e histórico para tratar o que pesa no score." },
  { nome: "Bacen", descricao: "Atuação em apontamentos no Banco Central (Registrato e SCR)." },
  { nome: "Consulta completa de CPF e CNPJ", descricao: "Levantamento do que aparece no nome do cliente." },
];

/** JSON-LD para o Google: empresa, site, serviços e perguntas frequentes. */
export function DadosEstruturados({ duvidas }: { duvidas: Duvida[] }) {
  const empresaId = `${site.url}/#empresa`;
  const grafo = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": empresaId,
        name: site.nome,
        legalName: site.razaoSocial,
        taxID: site.cnpj,
        description: site.descricao,
        url: `${site.url}/`,
        logo: `${site.url}/icon-512.png`,
        image: `${site.url}/og.jpg`,
        telephone: `+${site.whatsapp}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.endereco.cidade,
          addressRegion: site.endereco.uf,
          addressCountry: site.endereco.pais,
        },
        areaServed: { "@type": "Country", name: "Brasil" },
        sameAs: [site.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${site.whatsapp}`,
          contactType: "customer service",
          availableLanguage: "Portuguese",
          areaServed: "BR",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços EasyCred",
          itemListElement: SERVICOS.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.nome, description: s.descricao, provider: { "@id": empresaId } },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#site`,
        url: `${site.url}/`,
        name: site.nome,
        inLanguage: "pt-BR",
        publisher: { "@id": empresaId },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#duvidas`,
        mainEntity: duvidas.map((d) => ({
          "@type": "Question",
          name: d.p,
          acceptedAnswer: { "@type": "Answer", text: d.r },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" escapado para o JSON não fechar a tag script por acidente
      dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo).replace(/</g, "\\u003c") }}
    />
  );
}
