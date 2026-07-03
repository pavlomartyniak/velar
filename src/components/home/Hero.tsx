"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

const MotionStack = motion.create(Stack);

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("cta");

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "100svh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        color: "common.white",
      }}
    >
      {/* Фоновий шар із делікатним зумом */}
      <Box
        component={motion.div}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        sx={{ position: "absolute", inset: 0 }}
      >
        <Image
          src="/hero-villa.png"
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </Box>
      {/* Затемнення для читабельності тексту */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <MotionStack
          variants={container}
          initial="hidden"
          animate="show"
          spacing={4}
          sx={{ maxWidth: 640 }}
        >
          <Typography
            component={motion.p}
            variants={item}
            variant="overline"
            sx={{ letterSpacing: 4, opacity: 0.8 }}
          >
            {t("overline")}
          </Typography>

          <Typography
            component={motion.h1}
            variants={item}
            variant="h1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.05,
              fontSize: { xs: "2.75rem", sm: "3.75rem", md: "4.5rem" },
            }}
          >
            {t("title")}
          </Typography>

          <Typography
            component={motion.p}
            variants={item}
            variant="h6"
            sx={{ fontWeight: 400, opacity: 0.85, maxWidth: 520 }}
          >
            {t("subtitle")}
          </Typography>

          <MotionStack
            variants={item}
            direction={{ xs: "column", sm: "row" }}
            spacing={2.5}
            sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
          >
            <Button
              component={Link}
              href="/design-configurator"
              variant="contained"
              size="large"
              startIcon={<ArchitectureRoundedIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              {tc("orderDesign")}
            </Button>
            <Button
              component={Link}
              href="/configurator/build"
              variant="outlined"
              color="inherit"
              size="large"
              startIcon={<ConstructionRoundedIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": {
                  borderColor: "common.white",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              {tc("calcConstruction")}
            </Button>
          </MotionStack>
        </MotionStack>
      </Container>
    </Box>
  );
}
