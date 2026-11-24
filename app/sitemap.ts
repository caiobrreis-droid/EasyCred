import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: `${site.url}/`, lastModified: agora, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/privacidade`, lastModified: agora, changeFrequency: "yearly", priority: 0.3 },
  ];
}
