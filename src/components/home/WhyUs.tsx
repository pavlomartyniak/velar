"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import SectionHeading from "@/components/ui/SectionHeading";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded";
import type { SvgIconComponent } from "@mui/icons-material";

const ICONS: SvgIconComponent[] = [
  EngineeringRoundedIcon,
  ReceiptLongRoundedIcon,
  VerifiedRoundedIcon,
  ArchitectureRoundedIcon,
];

type TextItem = { title: string; description: string };
type Stat = { value: string; label: string };

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

export default function WhyUs() {
  const t = useTranslations("whyUs");
  const advantages = t.raw("advantages") as TextItem[];
  const stats = t.raw("stats") as Stat[];

  return (
    <Box
      component="section"
      id="why-us"
      sx={{ bgcolor: "background.default", py: { xs: 8, md: 12 } }}
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
          {advantages.map((advantage, index) => {
            const Icon = ICONS[index] ?? ICONS[0];
            return (
              <Stack
                key={advantage.title}
                component={motion.div}
                variants={item}
                spacing={1.5}
                sx={{ alignItems: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
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
                  {advantage.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {advantage.description}
                </Typography>
              </Stack>
            );
          })}
        </Box>

        {/* Статистика */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: 3,
            mt: { xs: 7, md: 10 },
            pt: { xs: 5, md: 6 },
            borderTop: 1,
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          {stats.map((stat) => (
            <Box key={stat.label}>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>
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
