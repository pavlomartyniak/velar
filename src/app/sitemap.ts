import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = [
  { path: "", changeFrequency: "monthly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/design", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/configurator", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/configurator/build", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/design-configurator", changeFrequency: "monthly" as const, priority: 0.8 },
];

/** Альтернативні мовні версії для одного шляху (hreflang у sitemap). */
function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${siteConfig.url}/${locale}${path}`;
  }
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const { path, changeFrequency, priority } of STATIC_PATHS) {
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
