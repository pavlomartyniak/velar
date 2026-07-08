import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import ServicePageSection from "@/components/services/ServicePageSection";
import ServicesCta from "@/components/shared/ServicesCta";
import YardRoundedIcon from "@mui/icons-material/YardRounded";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.landscapeDesign" });
  return createMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/landscape-design",
  });
}

export default async function LandscapeDesignPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicePageSection
        namespace="landscapeDesignPage"
        ctaHref="/design-configurator"
        Icon={YardRoundedIcon}
      />
      <ServicesCta />
    </>
  );
}
