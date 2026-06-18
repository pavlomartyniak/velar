import type { Metadata } from "next";
import { siteConfig } from "./site";
import { OG_LOCALES, type Locale, routing } from "@/i18n/routing";

type CreateMetadataArgs = {
  locale: Locale;
  title: string;
  description?: string;
  /** Шлях без префікса локалі, напр. "/about" або "" для головної. */
  path?: string;
  image?: string;
  /** true — використати title як є (без суфікса «— Velar»). */
  absoluteTitle?: boolean;
};

/** Будує локалізовані metadata з canonical та hreflang-альтернативами. */
export function createMetadata({
  locale,
  title,
  description = siteConfig.description,
  path = "",
  image = siteConfig.ogImage,
  absoluteTitle = false,
}: CreateMetadataArgs): Metadata {
  const canonical = `/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/${routing.defaultLocale}${path}`;

  const ogTitle = absoluteTitle ? title : `${title} — ${siteConfig.shortName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale],
      siteName: siteConfig.name,
      url: canonical,
      title: ogTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}
