"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";

const IMAGE = "/modern-house.jpg";
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        minHeight: { xs: 380, md: 480 },
        color: "common.white",
        overflow: "hidden",
      }}
    >
      <Image
        src={IMAGE}
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.25) 100%)",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          spacing={2.5}
          sx={{ maxWidth: 680 }}
        >
          <Typography
            component={motion.p}
            variants={item}
            variant="overline"
            sx={{ letterSpacing: 4, opacity: 0.85 }}
          >
            {t("overline")}
          </Typography>
          <Typography
            component={motion.h1}
            variants={item}
            variant="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            component={motion.p}
            variants={item}
            variant="h6"
            sx={{ fontWeight: 400, opacity: 0.9 }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
