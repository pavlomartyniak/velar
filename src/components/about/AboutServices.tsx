"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import VillaRoundedIcon from "@mui/icons-material/VillaRounded";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import WeekendRoundedIcon from "@mui/icons-material/WeekendRounded";
import YardRoundedIcon from "@mui/icons-material/YardRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import SectionHeading from "@/components/ui/SectionHeading";

const MotionLink = motion.create(Link);

const ICONS: SvgIconComponent[] = [
  ArchitectureRoundedIcon,
  HomeWorkRoundedIcon,
  VillaRoundedIcon,
  CottageRoundedIcon,
  RestoreRoundedIcon,
  WeekendRoundedIcon,
  YardRoundedIcon,
];

/** Індекс картки (0-based) -> шлях на окрему сторінку послуги, якщо є. */
const ITEM_LINKS: Record<number, string> = {
  5: "/interior-design",
  6: "/landscape-design",
};

type Service = { title: string; description: string };

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

export default function AboutServices() {
  const t = useTranslations("about.services");
  const services = t.raw("items") as Service[];

  return (
    <Box
      component="section"
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
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {services.map((service, index) => {
            const Icon = ICONS[index] ?? ICONS[0];
            const href = ITEM_LINKS[index];
            return (
              <Stack
                key={service.title}
                component={href ? MotionLink : motion.div}
                variants={item}
                spacing={1.5}
                {...(href && { href })}
                sx={{
                  alignItems: "flex-start",
                  p: 3,
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  height: "100%",
                  ...(href && {
                    textDecoration: "none",
                    transition: "border-color .2s ease, box-shadow .2s ease",
                    "&:hover": { borderColor: "primary.main", boxShadow: 2 },
                  }),
                }}
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
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "text.primary" }}
                >
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
                {href && (
                  <Typography
                    variant="body2"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    {t("readMore")}
                    <ArrowForwardRoundedIcon fontSize="small" />
                  </Typography>
                )}
              </Stack>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
