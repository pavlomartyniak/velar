"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import GalleryGrid from "@/components/gallery/GalleryGrid";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function GallerySection() {
  const t = useTranslations("gallery");

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          spacing={1.5}
          sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}
        >
          <Typography
            component={motion.p}
            variants={item}
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 4 }}
          >
            {t("overline")}
          </Typography>
          <Typography component={motion.h1} variants={item} variant="h2" sx={{ fontWeight: 800 }}>
            {t("title")}
          </Typography>
          <Typography
            component={motion.p}
            variants={item}
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: 640, mx: "auto" }}
          >
            {t("subtitle")}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 560, mx: "auto" }}>
            {t("disclaimer")}
          </Typography>
        </Stack>

        <GalleryGrid />
      </Container>
    </Box>
  );
}
