"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

const IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ShowcaseBanner() {
  const t = useTranslations("showcase");
  const tc = useTranslations("cta");

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        minHeight: { xs: 420, md: 560 },
        color: "common.white",
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.25) 100%), url('${IMAGE}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: { xs: "scroll", md: "fixed" },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          spacing={3}
          sx={{ maxWidth: 620 }}
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
            component={motion.h2}
            variants={item}
            variant="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              fontSize: { xs: "2.25rem", md: "3.25rem" },
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
          <Box component={motion.div} variants={item}>
            <Button
              component={Link}
              href="/projects"
              variant="outlined"
              size="large"
              sx={{
                color: "common.white",
                borderColor: "rgba(255,255,255,0.7)",
                px: 4,
                py: 1.5,
                "&:hover": { borderColor: "common.white" },
              }}
            >
              {tc("viewPortfolio")}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
