"use client";

import { useTranslations } from "next-intl";
import { Box, Container } from "@mui/material";
import SectionHeading from "@/components/ui/SectionHeading";
import LinkButton from "@/components/ui/LinkButton";
import ProjectsGallery from "@/components/projects/ProjectsGallery";

export default function FeaturedProjects() {
  const t = useTranslations("featured");
  const tc = useTranslations("cta");

  return (
    <Box
      component="section"
      sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          overline={t("overline")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ProjectsGallery limit={3} />

        <Box sx={{ textAlign: "center", mt: { xs: 5, md: 7 } }}>
          <LinkButton
            href="/projects"
            variant="outlined"
            size="large"
            sx={{ px: 4 }}
          >
            {tc("viewAllProjects")}
          </LinkButton>
        </Box>
      </Container>
    </Box>
  );
}
