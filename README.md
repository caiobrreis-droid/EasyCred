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

Isso roda `next build` e `wrangler pages deploy out --project-name easycred`. É preciso estar logado na Cloudflare (`npx wrangler login`).

Os cabeçalhos de segurança ficam em `public/_headers`.

## Variáveis

- `NEXT_PUBLIC_WHATSAPP`: troca o número de atendimento (padrão `5595981014533`, definido em `lib/site.ts`). Como o site é estático, a variável só vale se existir **no momento do build**.
- `NEXT_PUBLIC_SITE_URL`: endereço final do site (padrão `https://easycred.pages.dev`), usado nas prévias de link.

## Consulta de CPF (desligada)

O componente `components/ConsultaScore.tsx` e os provedores em `lib/consulta/` continuam no projeto, mas fora da página. A rota de API (`app/api/consulta/route.ts`) foi removida porque o site estático não roda servidor; ela está no histórico do Git (commit `466e551`). Para reativar a consulta será preciso um servidor (Railway, ou Cloudflare Workers com o adaptador OpenNext).
