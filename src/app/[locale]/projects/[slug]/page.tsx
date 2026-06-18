import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LinkButton from "@/components/ui/LinkButton";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { type Locale, routing } from "@/i18n/routing";
import {
  PROJECTS,
  getProjectBySlug,
  projectImage,
  projectMeta,
} from "@/data/projects";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Проєкт не знайдено" };

  return createMetadata({
    locale: locale as Locale,
    title: `${project.title} — ${projectMeta(project)}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: projectImage(project.cover, 1200),
  });
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const tp = await getTranslations({ locale, namespace: "project" });
  const tc = await getTranslations({ locale, namespace: "cta" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tn("home"), item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: tn("portfolio"),
            item: `${siteConfig.url}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${siteConfig.url}/projects/${project.slug}`,
          },
        ],
      },
      {
        "@type": "House",
        name: project.title,
        description: project.summary,
        image: projectImage(project.cover, 1200),
        numberOfRooms: project.bedrooms,
        floorSize: {
          "@type": "QuantitativeValue",
          value: project.area,
          unitCode: "MTK",
        },
      },
    ],
  };

  return (
    <Box component="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Обкладинка */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 320, md: 460 },
          display: "flex",
          alignItems: "flex-end",
          color: "common.white",
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15)), url('${projectImage(
            project.cover,
            1600,
          )}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ letterSpacing: 4, opacity: 0.85 }}>
            {projectMeta(project)}
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800 }}>
            {project.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>
            {project.location} · {project.year}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <LinkButton
          href="/projects"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ mb: 4 }}
        >
          {tp("allProjects")}
        </LinkButton>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 6 },
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            alignItems: "start",
          }}
        >
          {/* Опис */}
          <Stack spacing={3}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {tp("about")}
            </Typography>
            {project.description.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.05rem", lineHeight: 1.7 }}
              >
                {paragraph}
              </Typography>
            ))}

            <Divider sx={{ my: 1 }} />

            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {tp("features")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1.5,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              }}
            >
              {project.features.map((feature) => (
                <Stack
                  key={feature}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <CheckRoundedIcon color="primary" fontSize="small" />
                  <Typography variant="body1">{feature}</Typography>
                </Stack>
              ))}
            </Box>
          </Stack>

          {/* Характеристики */}
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              p: 3,
              position: { md: "sticky" },
              top: { md: 96 },
            }}
          >
            <Typography variant="overline" color="text.secondary">
              {tp("specsTitle")}
            </Typography>
            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2.5,
                mt: 2,
              }}
            >
              <Spec label={tp("specs.area")} value={`${project.area} м²`} />
              <Spec label={tp("specs.floors")} value={String(project.floors)} />
              <Spec label={tp("specs.bedrooms")} value={String(project.bedrooms)} />
              <Spec label={tp("specs.bathrooms")} value={String(project.bathrooms)} />
              <Spec label={tp("specs.style")} value={project.style} />
              <Spec label={tp("specs.year")} value={String(project.year)} />
            </Stack>
            <LinkButton
              href="/configurator"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
            >
              {tp("createSimilar")}
            </LinkButton>
          </Box>
        </Box>

        {/* Галерея */}
        <Typography variant="h4" sx={{ fontWeight: 700, mt: { xs: 6, md: 9 }, mb: 3 }}>
          {tp("gallery")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          }}
        >
          {project.gallery.map((photoId, index) => (
            <Box
              key={photoId}
              component="img"
              src={projectImage(photoId, 1000)}
              alt={tp("photoAlt", { title: project.title, n: index + 1 })}
              loading="lazy"
              sx={{
                width: "100%",
                aspectRatio: "4 / 3",
                objectFit: "cover",
                borderRadius: 2,
                display: "block",
                bgcolor: "action.hover",
              }}
            />
          ))}
        </Box>

        {/* Фінальний заклик */}
        <Box sx={{ textAlign: "center", mt: { xs: 8, md: 12 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {tp("likeTitle")}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 3 }}>
            {tp("likeText")}
          </Typography>
          <LinkButton
            href="/configurator"
            variant="contained"
            size="large"
            sx={{ px: 5, py: 1.5, fontSize: "1.05rem" }}
          >
            {tc("startConfig")}
          </LinkButton>
        </Box>
      </Container>
    </Box>
  );
}
