# EasyCred — site

Site institucional da EasyCred (limpa nome, score, rating e Bacen) com consulta de CPF.

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Consulta de CPF

A rota `POST /api/consulta` valida o CPF, exige consentimento (LGPD), limita 5 consultas por IP por hora e chama o provedor configurado:

- `CONSULTA_PROVIDER=demo` (padrão): resultado simulado. O site avisa o visitante de que é uma demonstração.
- `CONSULTA_PROVIDER=http`: chama a API contratada (`CONSULTA_API_URL` + `CONSULTA_API_TOKEN`). Ajuste `mapear()` em `lib/consulta/http.ts` ao formato do fornecedor escolhido.

Cada consulta pode ser enviada como lead para `LEAD_WEBHOOK_URL`.

## Deploy no Railway

1. Novo projeto → Deploy from GitHub → este repositório.
2. Variáveis: as do `.env.example` (no mínimo `NEXT_PUBLIC_WHATSAPP`).
3. O Railway detecta Node, roda `npm run build` e `npm start` (usa a variável `PORT`).
