"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Chip, Stack, Typography } from "@mui/material";
import ThreeDRotationRoundedIcon from "@mui/icons-material/ThreeDRotationRounded";
import { HOUSE_MODELS } from "@/lib/models";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Легка сітка карток без WebGL — сама 3D-модель вантажиться лише на сторінці конкретного будинку. */
export default function GalleryGrid({ excludeId }: { excludeId?: string } = {}) {
  const t = useTranslations("gallery");
  const houses = excludeId
    ? HOUSE_MODELS.filter((house) => house.id !== excludeId)
    : HOUSE_MODELS;

  return (
    <Box
      component={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
      sx={{
        display: "grid",
        gap: { xs: 3, md: 3.5 },
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
      }}
    >
      {houses.map((house) => (
        <Box
          key={house.id}
          component={motion.div}
          variants={item}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            transition: "box-shadow .25s ease, transform .25s ease",
            "&:hover": { boxShadow: 4, transform: "translateY(-2px)" },
          }}
        >
          <Box
            component={Link}
            href={`/gallery/${house.id}`}
            sx={{ display: "block", textDecoration: "none", color: "inherit" }}
          >
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
              <Image
                src={house.thumbnail}
                alt={t(`houses.${house.id}.title`)}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <Chip
                icon={<ThreeDRotationRoundedIcon sx={{ fontSize: 16 }} />}
                label={t("badge")}
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  bgcolor: "rgba(0,0,0,0.65)",
                  color: "common.white",
                  fontWeight: 700,
                  "& .MuiChip-icon": { color: "common.white" },
                }}
              />
            </Box>
            <Stack spacing={0.75} sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t(`houses.${house.id}.title`)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t(`houses.${house.id}.description`)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "primary.main", pt: 0.5 }}
              >
                {t("viewIn3d")} →
              </Typography>
            </Stack>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
