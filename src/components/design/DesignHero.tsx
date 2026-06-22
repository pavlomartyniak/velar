"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";

const IMAGE = "/architector.avif";

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

export default function DesignHero() {
  const t = useTranslations("design.hero");

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        minHeight: { xs: 380, md: 480 },
        color: "common.white",
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.25) 100%), url('${IMAGE}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="lg">
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
          <Stack component={motion.div} variants={item} spacing={1.25}>
            <Button
              component={Link}
              href="/design-configurator"
              variant="contained"
              size="large"
              startIcon={<CalculateRoundedIcon />}
              sx={{
                px: 4,
                py: 1.5,
                alignSelf: "flex-start",
                boxShadow: 4,
                "&:hover": { boxShadow: 6, transform: "translateY(-1px)" },
              }}
            >
              {t("cta")}
            </Button>
            <Typography variant="body2" sx={{ opacity: 0.75 }}>
              {t("ctaHint")}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
