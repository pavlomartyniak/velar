import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import ServicePageSection from "@/components/services/ServicePageSection";
import ServicesCta from "@/components/shared/ServicesCta";
import WeekendRoundedIcon from "@mui/icons-material/WeekendRounded";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.interiorDesign" });
  return createMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/interior-design",
  });
}

export default async function InteriorDesignPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicePageSection
        namespace="interiorDesignPage"
        ctaHref="/design-configurator"
        Icon={WeekendRoundedIcon}
      />
      <ServicesCta />
    </>
  );
}
