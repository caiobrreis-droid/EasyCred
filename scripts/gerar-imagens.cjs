// Gera a imagem de compartilhamento (public/og.jpg) e os ícones (app/icon.png, app/apple-icon.png)
// a partir da logo e da foto. Rode com: node scripts/gerar-imagens.cjs
const path = require("path");
const sharp = require("sharp");

const raiz = path.join(__dirname, "..");
const pub = (f) => path.join(raiz, "public", f);

async function og() {
  const W = 1200, H = 630;
  const fundo = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#F4FAFF"/><stop offset="1" stop-color="#D6ECFF"/>
      </linearGradient>
      <linearGradient id="t1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#B5E4FF"/><stop offset="1" stop-color="#5BBBFF"/>
      </linearGradient>
      <linearGradient id="t2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3AA6F5"/><stop offset="1" stop-color="#0B6BCB"/>
      </linearGradient>
      <radialGradient id="aura" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stop-color="#B5E4FF"/><stop offset="0.45" stop-color="#3AA6F5"/><stop offset="1" stop-color="#0B6BCB"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <g transform="translate(760 -40) rotate(-12)">
      <path d="M40 20 Q20 8 20 32 L20 488 Q20 512 40 500 L460 278 Q482 260 460 242 Z" fill="url(#t1)"/>
    </g>
    <g transform="translate(700 210) rotate(-22)">
      <path d="M30 15 Q15 6 15 24 L15 296 Q15 314 30 305 L285 170 Q302 157 285 144 Z" fill="url(#t2)" opacity="0.9"/>
    </g>
    <circle cx="1005" cy="400" r="215" fill="url(#aura)" stroke="#ffffff" stroke-opacity="0.7" stroke-width="12"/>

    <g font-family="Arial Black, Arial, sans-serif" font-style="italic" font-weight="900">
      <text x="64" y="300" font-size="72" fill="#0E2350" stroke="#ffffff" stroke-width="14" paint-order="stroke" stroke-linejoin="round">Limpe seu nome.</text>
      <text x="64" y="388" font-size="56" fill="#0B6BCB" stroke="#ffffff" stroke-width="12" paint-order="stroke" stroke-linejoin="round">Resolva suas</text>
      <text x="64" y="456" font-size="56" fill="#0B6BCB" stroke="#ffffff" stroke-width="12" paint-order="stroke" stroke-linejoin="round">pendências.</text>
    </g>
    <g font-family="Arial, sans-serif">
      <text x="66" y="520" font-size="24" font-weight="700" fill="#0E2350">Aumento de rating, limpeza de nome e ação revisional</text>
      <rect x="64" y="545" width="330" height="50" rx="25" fill="#16A352"/>
      <text x="229" y="578" font-size="23" font-weight="700" fill="#ffffff" text-anchor="middle">WhatsApp (95) 98101-4533</text>
    </g>
  </svg>`;

  const logo = await sharp(pub("logo@2x.png")).resize({ height: 150 }).toBuffer();
  const foto = await sharp(pub("dono.webp")).resize({ height: 600 }).toBuffer();
  const fotoMeta = await sharp(foto).metadata();

  await sharp(Buffer.from(fundo))
    .composite([
      { input: logo, left: 56, top: 40 },
      { input: foto, left: Math.round(1005 - fotoMeta.width / 2), top: H - 600 + 30 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(pub("og.jpg"));
  console.log("public/og.jpg");
}

async function icones() {
  const fundoIcone = (s, r) =>
    Buffer.from(`<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><rect width="${s}" height="${s}" rx="${r}" fill="#ffffff"/></svg>`);
  const logo512 = await sharp(pub("logo@2x.png")).resize(440, 440, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp(fundoIcone(512, 112)).composite([{ input: logo512, left: 36, top: 36 }]).png().toFile(path.join(raiz, "app", "icon.png"));
  const logo180 = await sharp(pub("logo@2x.png")).resize(156, 156, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp(fundoIcone(180, 0)).composite([{ input: logo180, left: 12, top: 12 }]).png().toFile(path.join(raiz, "app", "apple-icon.png"));
  // ícones para o manifest
  await sharp(path.join(raiz, "app", "icon.png")).resize(192).png().toFile(pub("icon-192.png"));
  await sharp(path.join(raiz, "app", "icon.png")).toFile(pub("icon-512.png"));
  console.log("app/icon.png, app/apple-icon.png, public/icon-192.png, public/icon-512.png");
}

(async () => {
  await og();
  await icones();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
