"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";

const IMAGE = "/architect-steps.png";

const fade: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutStory() {
  const t = useTranslations("about.story");

  return (
    <Box
      component="section"
      sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 8 },
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            alignItems: "center",
          }}
        >
          <Stack
            component={motion.div}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            spacing={2.5}
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: 4 }}
            >
              {t("overline")}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.05rem", lineHeight: 1.7 }}
            >
              {t("p1")}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.05rem", lineHeight: 1.7 }}
            >
              {t("p2")}
            </Typography>
          </Stack>

          <Box
            component={motion.img}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            src={IMAGE}
            alt="Velar Development"
            loading="lazy"
            sx={{
              width: "100%",
              aspectRatio: "4 / 5",
              objectFit: "cover",
              borderRadius: 3,
              display: "block",
              bgcolor: "action.hover",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
