import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";
import DesignPromo from "@/components/home/DesignPromo";
import ShowcaseBanner from "@/components/home/ShowcaseBanner";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesCta from "@/components/shared/ServicesCta";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return createMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "",
    absoluteTitle: true,
  });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <DesignPromo />
      <HowItWorks />
      <WhyUs />
      <ShowcaseBanner />
      <ServicesCta />
    </>
  );
}
