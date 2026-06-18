import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@mui/material";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectsGallery from "@/components/projects/ProjectsGallery";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.projects" });
  return createMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
      <SectionHeading
        overline={t("overline")}
        title={t("title")}
        subtitle={t("subtitle")}
        titleVariant="h2"
        animateOn="mount"
      />
      <ProjectsGallery />
    </Container>
  );
}
