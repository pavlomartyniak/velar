"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS: SvgIconComponent[] = [
  VerifiedRoundedIcon,
  HandshakeRoundedIcon,
  LightbulbRoundedIcon,
  DiamondRoundedIcon,
];

type Value = { title: string; description: string };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutValues() {
  const t = useTranslations("about.values");
  const values = t.raw("items") as Value[];

  return (
    <Box
      component="section"
      sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          overline={t("overline")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <Box
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
          }}
        >
          {values.map((value, index) => {
            const Icon = ICONS[index] ?? ICONS[0];
            return (
              <Stack
                key={value.title}
                component={motion.div}
                variants={item}
                spacing={1.5}
                sx={{ alignItems: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }}
                >
                  <Icon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
