import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutServices from "@/components/about/AboutServices";
import AboutValues from "@/components/about/AboutValues";
import AboutCta from "@/components/about/AboutCta";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return createMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/about",
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutServices />
      <AboutValues />
      <AboutCta />
    </>
  );
}
