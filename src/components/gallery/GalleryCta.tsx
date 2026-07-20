"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Chip, Container, Divider, Stack, Typography } from "@mui/material";
import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/**
 * Конверсійний CTA для галереї 3D-будинків: перетворює перегляд моделі на
 * заявку. Пропонує дві рівноцінні дії — індивідуальне проєктування "саме
 * такого" дому (з кресленнями й 3D-моделлю) або будівництво під ключ.
 */
export default function GalleryCta({ houseTitle }: { houseTitle?: string }) {
  const t = useTranslations("galleryCta");

  return (
    <Box
      component="section"
      sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: { xs: 8, md: 11 } }}
    >
      <Container maxWidth="md">
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          spacing={{ xs: 5, md: 6 }}
          sx={{ alignItems: "center", textAlign: "center" }}
        >
          <Stack component={motion.div} variants={reveal} spacing={1.5} sx={{ alignItems: "center" }}>
            <Typography variant="overline" sx={{ letterSpacing: 4, opacity: 0.8 }}>
              {t("overline")}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {houseTitle ? t("titleWithHouse", { house: houseTitle }) : t("title")}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.85, maxWidth: 620 }}>
              {t("subtitle")}
            </Typography>
          </Stack>

          <Stack
            component={motion.div}
            variants={reveal}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 4, sm: 5 }}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "rgba(255,255,255,0.25)", display: { xs: "none", sm: "block" } }}
              />
            }
            sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
          >
            <Stack spacing={1.5} sx={{ alignItems: "center", maxWidth: 300 }}>
              <Chip
                label={t("design.badge")}
                size="small"
                sx={{ bgcolor: "common.white", color: "primary.main", fontWeight: 700 }}
              />
              <ArchitectureRoundedIcon fontSize="large" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {t("design.title")}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                {t("design.description")}
              </Typography>
              <Button
                component={Link}
                href="/design-configurator"
                variant="contained"
                size="large"
                sx={{
                  mt: 1,
                  px: 4,
                  bgcolor: "common.white",
                  color: "text.primary",
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                {t("design.cta")}
              </Button>
            </Stack>

            <Stack spacing={1.5} sx={{ alignItems: "center", maxWidth: 300 }}>
              <Box sx={{ height: 24 }} />
              <ConstructionRoundedIcon fontSize="large" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {t("build.title")}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                {t("build.description")}
              </Typography>
              <Button
                component={Link}
                href="/configurator/build"
                variant="outlined"
                size="large"
                sx={{
                  mt: 1,
                  px: 4,
                  color: "common.white",
                  borderColor: "rgba(255,255,255,0.7)",
                  borderWidth: 2,
                  fontWeight: 700,
                  "&:hover": { borderColor: "common.white", borderWidth: 2, bgcolor: "rgba(255,255,255,0.08)" },
                }}
              >
                {t("build.cta")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
