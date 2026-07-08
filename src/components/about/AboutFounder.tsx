"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

const fade: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Avatar завантажує /founder.jpg; поки файлу немає, MUI сам показує
 * фолбек-іконку (children). Достатньо покласти реальне фото за цим шляхом —
 * жодних змін коду не знадобиться.
 */
export default function AboutFounder() {
  const t = useTranslations("about.founder");

  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Stack
          component={motion.div}
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          spacing={3}
          sx={{ alignItems: "center", textAlign: "center" }}
        >
          <Avatar
            src="/founder.jpg"
            alt={t("name")}
            sx={{
              width: 120,
              height: 120,
              bgcolor: "primary.main",
              border: 1,
              borderColor: "divider",
            }}
          >
            <PersonRoundedIcon sx={{ fontSize: 56 }} />
          </Avatar>

          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 4 }}>
            {t("overline")}
          </Typography>

          <FormatQuoteRoundedIcon sx={{ fontSize: 36, color: "divider" }} />

          <Typography
            component="blockquote"
            variant="h6"
            sx={{
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.7,
              maxWidth: 720,
              m: 0,
            }}
          >
            {t("quote")}
          </Typography>

          <Box>
            <Typography sx={{ fontWeight: 700 }}>{t("name")}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t("title")}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
