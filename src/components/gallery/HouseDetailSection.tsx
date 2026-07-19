"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import HouseViewer from "@/components/gallery/HouseViewer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import type { Model3D } from "@/lib/models";

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HouseDetailSection({ house }: { house: Model3D }) {
  const t = useTranslations("gallery");

  return (
    <>
      <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg">
          <Stack
            component={motion.div}
            initial="hidden"
            animate="show"
            variants={item}
            spacing={1}
            sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}
          >
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 4 }}>
              {t("overline")}
            </Typography>
            <Typography component="h1" variant="h3" sx={{ fontWeight: 800 }}>
              {t(`houses.${house.id}.title`)}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 560, mx: "auto" }}
            >
              {t(`houses.${house.id}.description`)}
            </Typography>
          </Stack>

          <Box sx={{ maxWidth: 960, mx: "auto" }}>
            <HouseViewer house={house} />
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
            {t("otherHouses")}
          </Typography>
          <GalleryGrid excludeId={house.id} />
        </Container>
      </Box>
    </>
  );
}
