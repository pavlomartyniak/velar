import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { HOUSE_MODELS } from "@/lib/models";
import HouseDetailSection from "@/components/gallery/HouseDetailSection";
import GalleryCta from "@/components/gallery/GalleryCta";

type PageProps = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return HOUSE_MODELS.map((house) => ({ id: house.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const house = HOUSE_MODELS.find((h) => h.id === id);
  if (!house) return {};

  const t = await getTranslations({ locale, namespace: "gallery" });

  return createMetadata({
    locale: locale as Locale,
    title: `${t(`houses.${id}.title`)} — ${t("overline")}`,
    description: t(`houses.${id}.description`),
    path: `/gallery/${id}`,
    image: house.thumbnail,
  });
}

export default async function HouseDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const house = HOUSE_MODELS.find((h) => h.id === id);
  if (!house) notFound();

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "gallery" });
  const houseUrl = `${siteConfig.url}/${locale}/gallery/${id}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "3DModel",
    name: t(`houses.${id}.title`),
    description: t(`houses.${id}.description`),
    url: houseUrl,
    thumbnailUrl: `${siteConfig.url}${house.thumbnail}`,
    encodingFormat: "model/gltf-binary",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <HouseDetailSection key={id} house={house} />
      <GalleryCta houseTitle={t(`houses.${id}.title`)} />
    </>
  );
}
