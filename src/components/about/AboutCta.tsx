"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import LinkButton from "@/components/ui/LinkButton";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutCta() {
  const t = useTranslations("about.cta");
  const tc = useTranslations("cta");

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        py: { xs: 8, md: 11 },
      }}
    >
      <Container maxWidth="md">
        <Stack
          component={motion.div}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          spacing={3}
          sx={{ alignItems: "center", textAlign: "center" }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {t("title")}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.85, maxWidth: 560 }}>
            {t("subtitle")}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <LinkButton
              href="/configurator"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "common.white",
                color: "text.primary",
                px: 4,
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              {tc("startConfig")}
            </LinkButton>
            <LinkButton
              href="/projects"
              variant="outlined"
              size="large"
              sx={{
                color: "common.white",
                borderColor: "rgba(255,255,255,0.7)",
                px: 4,
                "&:hover": { borderColor: "common.white" },
              }}
            >
              {tc("viewPortfolio")}
            </LinkButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
