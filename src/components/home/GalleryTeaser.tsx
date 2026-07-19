"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import ThreeDRotationRoundedIcon from "@mui/icons-material/ThreeDRotationRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { HOUSE_MODELS } from "@/lib/models";

const PREVIEW_HOUSES = HOUSE_MODELS.slice(0, 3);

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function GalleryTeaser() {
  const t = useTranslations("gallery");
  const tHome = useTranslations("galleryTeaser");

  return (
    <Box component="section" sx={{ py: { xs: 9, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
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
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 4 }}>
              {t("overline")}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              {tHome("title")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {tHome("subtitle")}
            </Typography>
            <Button
              component={Link}
              href="/gallery"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              {tHome("cta")}
            </Button>
          </Box>

          <Box
            component={motion.div}
            variants={item}
            sx={{
              flex: 1,
              width: "100%",
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {PREVIEW_HOUSES.map((house) => (
              <Box
                key={house.id}
                component={Link}
                href={`/gallery/${house.id}`}
                sx={{
                  position: "relative",
                  display: "block",
                  aspectRatio: "3 / 4",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform .25s ease",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <Image
                  src={house.thumbnail}
                  alt={t(`houses.${house.id}.title`)}
                  fill
                  sizes="(max-width: 900px) 33vw, 220px"
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
                    bgcolor: "rgba(0,0,0,0.65)",
                    color: "common.white",
                    fontWeight: 700,
                    height: 22,
                    "& .MuiChip-icon": { color: "common.white" },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
