"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";

type Stat = { value: string; label: string };

const fade: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DesignIntro() {
  const t = useTranslations("design.intro");
  const stats = t.raw("stats") as Stat[];

  return (
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Stack
          component={motion.div}
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          spacing={2.5}
          sx={{ textAlign: "center", alignItems: "center" }}
        >
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 4 }}>
            {t("overline")}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {t("title")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 680 }}
          >
            {t("text")}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: 3,
            mt: { xs: 6, md: 8 },
            pt: { xs: 5, md: 6 },
            borderTop: 1,
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          {stats.map((stat) => (
            <Box key={stat.label}>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
