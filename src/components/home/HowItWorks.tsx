"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import SectionHeading from "@/components/ui/SectionHeading";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import type { SvgIconComponent } from "@mui/icons-material";

const ICONS: SvgIconComponent[] = [
  DesignServicesRoundedIcon,
  ViewInArRoundedIcon,
  HomeWorkRoundedIcon,
];

type Step = { title: string; description: string };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  const tc = useTranslations("cta");
  const steps = t.raw("steps") as Step[];

  return (
    <Box
      component="section"
      id="how-it-works"
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
          viewport={{ once: true, amount: 0.3 }}
          sx={{
            display: "grid",
            gap: { xs: 4, md: 5 },
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          }}
        >
          {steps.map((step, index) => {
            const Icon = ICONS[index] ?? ICONS[0];
            return (
              <Stack
                key={step.title}
                component={motion.div}
                variants={item}
                spacing={2}
                sx={{ alignItems: "flex-start" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }}
                >
                  <Icon fontSize="medium" />
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: "background.paper",
                      color: "text.primary",
                      border: 1,
                      borderColor: "divider",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.description}
                </Typography>
              </Stack>
            );
          })}
        </Box>

        <Box sx={{ textAlign: "center", mt: { xs: 6, md: 8 } }}>
          <Button
            component={Link}
            href="/design"
            variant="contained"
            size="large"
            sx={{ px: 5, py: 1.5, fontSize: "1.05rem" }}
          >
            {tc("orderDesign")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
