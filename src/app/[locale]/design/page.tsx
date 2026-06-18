import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import DesignHero from "@/components/design/DesignHero";
import DesignIntro from "@/components/design/DesignIntro";
import DesignPricing from "@/components/design/DesignPricing";
import DesignPayment from "@/components/design/DesignPayment";
import DesignAdvantages from "@/components/design/DesignAdvantages";
import DesignCta from "@/components/design/DesignCta";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.design" });
  return createMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/design",
  });
}

export default async function DesignPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "design" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: t("hero.title"),
    provider: { "@type": "GeneralContractor", name: siteConfig.name },
    areaServed: "UA",
    offers: [
      {
        "@type": "Offer",
        name: t("pricing.tiers.light.name"),
        price: t("pricing.tiers.light.price").replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: t("pricing.tiers.basic.name"),
        price: t("pricing.tiers.basic.price").replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: t("pricing.tiers.premium.name"),
        price: t("pricing.tiers.premium.price").replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DesignHero />
      <DesignIntro />
      <DesignPricing />
      <DesignPayment />
      <DesignAdvantages />
      <DesignCta />
    </>
  );
}
