# EasyCred — site

Site institucional da EasyCred (limpa nome, score, rating e Bacen).

No ar em: https://easycred.pages.dev

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar (Cloudflare Pages)

O site é exportado como estático (`output: "export"` no `next.config.mjs`) para a pasta `out/` e publicado no projeto `easycred` do Cloudflare Pages.

```bash
npm run deploy
```

Isso roda `next build` e `wrangler pages deploy out --project-name easycred --branch main` (publica em produção). É preciso estar logado na Cloudflare (`npx wrangler login`).

Os cabeçalhos de segurança ficam em `public/_headers`.

## Variáveis

- `NEXT_PUBLIC_WHATSAPP`: troca o número de atendimento (padrão `5595981014533`, definido em `lib/site.ts`). Como o site é estático, a variável só vale se existir **no momento do build**.
- `NEXT_PUBLIC_SITE_URL`: endereço final do site (padrão `https://easycred.pages.dev`), usado nas prévias de link.

## Consulta de CPF (desligada)

O componente `components/ConsultaScore.tsx` e os provedores em `lib/consulta/` continuam no projeto, mas fora da página. A rota de API (`app/api/consulta/route.ts`) foi removida porque o site estático não roda servidor; ela está no histórico do Git (commit `466e551`). Para reativar a consulta será preciso um servidor (Railway, ou Cloudflare Workers com o adaptador OpenNext).

## SEO

- Metadados (título, descrição, canonical, Open Graph e Twitter) em `app/layout.tsx`; a página de privacidade tem os seus próprios.
- `robots.txt`, `sitemap.xml` e `manifest.webmanifest` são gerados por `app/robots.ts`, `app/sitemap.ts` e `app/manifest.ts`.
- Dados estruturados (JSON-LD) em `components/DadosEstruturados.tsx`: empresa (FinancialService com CNPJ, cidade, WhatsApp e Instagram), site, serviços e perguntas frequentes.
- Imagem de compartilhamento (`public/og.jpg`) e ícones (`app/icon.png`, `app/apple-icon.png`, `public/icon-*.png`) são gerados a partir da logo e da foto com `npm run imagens`.
- Quando o domínio próprio estiver ligado, defina `NEXT_PUBLIC_SITE_URL` (ex.: `https://www.easycredrr.com.br`) antes do `npm run deploy` para que canonical, sitemap e JSON-LD usem o endereço novo, e cadastre o site no Google Search Console.

## Efeitos 3D

- `components/Hero3D.tsx`: cena WebGL (three.js) com os triângulos da logo e esferas no topo. O three.js só carrega depois que a página está pronta, a animação pausa quando o topo sai da tela e, sem WebGL, ficam os triângulos em SVG (`HeroShapes`).
- `components/Tilt.tsx`: inclinação 3D com reflexo nos elementos com `data-tilt` (o valor é o ângulo máximo).
- `components/FotoProfundidade.tsx`: a foto e os selos do topo se movem em camadas com o mouse.
- Tudo é desligado para quem pede menos movimento no sistema; inclinação e profundidade ficam desligadas em telas de toque.
