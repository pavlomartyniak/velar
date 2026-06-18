import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import ConfiguratorForm from "@/features/configurator/ConfiguratorForm";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.configurator" });
  return createMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/configurator",
  });
}

export default async function ConfiguratorPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ConfiguratorForm />;
}
