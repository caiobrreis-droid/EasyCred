/**
 * Site exportado como estático (pasta `out/`) para o Cloudflare Pages.
 * Os cabeçalhos de segurança ficam em `public/_headers`, que o Pages lê.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  poweredByHeader: false,
  images: { unoptimized: true },
};
export default nextConfig;
