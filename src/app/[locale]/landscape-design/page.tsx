import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import ServicePageSection from "@/components/services/ServicePageSection";
import ServiceFaq from "@/components/services/ServiceFaq";
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

  const t = await getTranslations({ locale, namespace: "landscapeDesignPage" });
  const faqItems = t.raw("faq") as { question: string; answer: string }[];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faqItem) => ({
      "@type": "Question",
      name: faqItem.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqItem.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServicePageSection
        namespace="landscapeDesignPage"
        service="landscape"
        Icon={YardRoundedIcon}
      />
      <ServiceFaq namespace="landscapeDesignPage" />
      <ServicesCta />
    </>
  );
}
