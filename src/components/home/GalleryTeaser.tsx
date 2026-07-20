"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import ThreeDRotationRoundedIcon from "@mui/icons-material/ThreeDRotationRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { HOUSE_MODELS } from "@/lib/models";

const HOUSE_SETS = {
  home: HOUSE_MODELS.slice(0, 3),
  design: HOUSE_MODELS.slice(-3),
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function GalleryTeaser({
  variant = "home",
}: {
  variant?: "home" | "design";
}) {
  const t = useTranslations("gallery");
  const tHome = useTranslations(variant === "design" ? "design.galleryTeaser" : "galleryTeaser");
  const houses = HOUSE_SETS[variant];

  return (
    <Box
      component="section"
      sx={{ py: { xs: 9, md: 12 }, bgcolor: "primary.main", color: "primary.contrastText" }}
    >
      <Container maxWidth="lg">
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 6 }}
          sx={{ alignItems: "center" }}
        >
          <Box
            component={motion.div}
            variants={item}
            sx={{
              flex: "0 0 auto",
              width: { xs: "100%", md: "38%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="overline" sx={{ letterSpacing: 4, opacity: 0.7 }}>
              {t("overline")}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              {tHome("title")}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>
              {tHome("subtitle")}
            </Typography>
            <Button
              component={Link}
              href="/gallery"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                px: 4,
                py: 1.5,
                bgcolor: "common.white",
                color: "text.primary",
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              {tHome("cta")}
            </Button>
          </Box>

          <Stack
            component={motion.div}
            variants={item}
            direction="row"
            spacing={2}
            sx={{ flex: 1, width: "100%" }}
          >
            {houses.map((house) => (
              <Box
                key={house.id}
                component={Link}
                href={`/gallery/${house.id}`}
                sx={{
                  position: "relative",
                  display: "block",
                  flex: 1,
                  aspectRatio: "3 / 4",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
                  transition: "transform .25s ease, box-shadow .25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 36px rgba(0,0,0,0.45)",
                  },
                }}
              >
                <Image
                  src={house.thumbnail}
                  alt={t(`houses.${house.id}.title`)}
                  fill
                  sizes="(max-width: 900px) 30vw, 220px"
                  style={{ objectFit: "cover" }}
                />
                <Chip
                  icon={<ThreeDRotationRoundedIcon sx={{ fontSize: 14 }} />}
                  label={t("badge")}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    bgcolor: "common.white",
                    color: "text.primary",
                    fontWeight: 700,
                    height: 22,
                    "& .MuiChip-icon": { color: "text.primary" },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
