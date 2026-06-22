"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CompareSlider from "@/components/shared/CompareSlider";

const BLUEPRINT_IMAGE = "/moder-house-scetch.png";
const RESULT_IMAGE = "/modern-house.jpg";

type Stat = { value: string; label: string };

const fade: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DesignPromo() {
  const t = useTranslations("designPromo");
  const stats = t.raw("stats") as Stat[];

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
            gridTemplateColumns: { xs: "1fr", md: "1.15fr 1fr" },
            alignItems: "center",
          }}
        >
          <Box
            component={motion.div}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <CompareSlider
              beforeSrc={BLUEPRINT_IMAGE}
              afterSrc={RESULT_IMAGE}
              beforeAlt="Velar Development — архітектурне креслення"
              afterAlt="Velar Development — готовий будинок"
              beforeLabel={t("compareBefore")}
              afterLabel={t("compareAfter")}
              aspectRatio="4 / 3"
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "center", mt: 1.5 }}
            >
              {t("compareHint")}
            </Typography>
          </Box>

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
              {t("text")}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" },
                gap: { xs: 2, sm: 2 },
                py: 1,
              }}
            >
              {stats.map((stat) => (
                <Box key={stat.label}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.15rem", sm: "1.5rem" },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box>
              <Button
                component={Link}
                href="/design"
                variant="outlined"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{ px: 4 }}
              >
                {t("cta")}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
