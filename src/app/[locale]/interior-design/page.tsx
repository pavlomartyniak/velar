import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import ServicePageSection from "@/components/services/ServicePageSection";
import ServiceFaq from "@/components/services/ServiceFaq";
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

  const t = await getTranslations({ locale, namespace: "interiorDesignPage" });
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
        namespace="interiorDesignPage"
        service="interior"
        Icon={WeekendRoundedIcon}
      />
      <ServiceFaq namespace="interiorDesignPage" />
      <ServicesCta />
    </>
  );
}
