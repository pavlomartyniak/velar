"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import type { SvgIconComponent } from "@mui/icons-material";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Спільна секція для сторінок додаткових послуг (інтер'єр, ландшафт). */
export default function ServicePageSection({
  namespace,
  ctaHref,
  Icon,
}: {
  namespace: string;
  ctaHref: string;
  Icon: SvgIconComponent;
}) {
  const t = useTranslations(namespace);
  const includes = t.raw("includes") as string[];

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="md">
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          spacing={2}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}
        >
          <Box
            component={motion.div}
            variants={item}
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              mx: "auto",
            }}
          >
            <Icon fontSize="large" />
          </Box>
          <Typography
            component={motion.p}
            variants={item}
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 4 }}
          >
            {t("overline")}
          </Typography>
          <Typography component={motion.h1} variants={item} variant="h2" sx={{ fontWeight: 800 }}>
            {t("title")}
          </Typography>
          <Typography
            component={motion.p}
            variants={item}
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: 640, mx: "auto" }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>

        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          spacing={4}
        >
          <Typography
            component={motion.p}
            variants={item}
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.05rem", lineHeight: 1.7 }}
          >
            {t("intro")}
          </Typography>

          <Box component={motion.div} variants={item}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {t("includesTitle")}
            </Typography>
            <Stack spacing={1.5}>
              {includes.map((line) => (
                <Stack key={line} direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
                  <CheckCircleRoundedIcon color="primary" sx={{ fontSize: 20, mt: 0.2 }} />
                  <Typography variant="body1" color="text.secondary">
                    {line}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Card
            component={motion.div}
            variants={item}
            variant="outlined"
            sx={{ borderRadius: 3 }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="overline" color="text.secondary">
                {t("pricingTitle")}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
                {t("pricingValue")}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {t("pricingNote")}
              </Typography>
              <Button
                component={Link}
                href={ctaHref}
                variant="contained"
                size="large"
                startIcon={<CalculateRoundedIcon />}
              >
                {t("cta")}
              </Button>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
