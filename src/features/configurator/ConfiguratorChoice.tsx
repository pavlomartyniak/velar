"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SectionHeading from "@/components/ui/SectionHeading";

const CARDS = [
  { key: "build", href: "/configurator/build", Icon: ConstructionRoundedIcon },
  { key: "design", href: "/design-configurator", Icon: ArchitectureRoundedIcon },
] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ConfiguratorChoice() {
  const t = useTranslations("configuratorChoice");

  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          overline={t("overline")}
          title={t("title")}
          subtitle={t("subtitle")}
          titleVariant="h2"
          as="h1"
          animateOn="mount"
        />

        <Box
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            alignItems: "stretch",
            mt: { xs: 5, md: 7 },
          }}
        >
          {CARDS.map(({ key, href, Icon }) => {
            const bullets = t.raw(`${key}.bullets`) as string[];

            return (
              <Card
                key={key}
                component={motion.div}
                variants={item}
                variant="outlined"
                sx={{
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                  borderColor: "divider",
                }}
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
                  <Icon fontSize="medium" />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {t(`${key}.title`)}
                </Typography>

                <Typography color="text.secondary">{t(`${key}.description`)}</Typography>

                <Stack spacing={1.25} sx={{ mt: 1, flexGrow: 1 }}>
                  {bullets.map((bullet) => (
                    <Stack key={bullet} direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
                      <CheckRoundedIcon color="primary" fontSize="small" sx={{ mt: "2px" }} />
                      <Typography variant="body2">{bullet}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Button
                  component={Link}
                  href={href}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ mt: 1, alignSelf: "flex-start", px: 4, py: 1.5 }}
                >
                  {t(`${key}.cta`)}
                </Button>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
