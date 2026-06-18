"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const IMAGE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=75";

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
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 8 },
            gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
            alignItems: "center",
          }}
        >
          <Box
            component={motion.img}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            src={IMAGE}
            alt="Velar Development — проєктування"
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

          <Stack
            component={motion.div}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            spacing={2.5}
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
                    sx={{ fontWeight: 800, fontSize: { xs: "1.15rem", sm: "1.5rem" } }}
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
