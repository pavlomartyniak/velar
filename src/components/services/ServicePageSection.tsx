"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Snackbar,
  Alert,
  Stack,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import CallbackDialog from "@/features/configurator/CallbackDialog";

const TIER_KEYS = ["basic", "standard", "premium"] as const;
type TierKey = (typeof TIER_KEYS)[number];

type Tier = {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
};

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

/** Спільна секція для сторінок окремих послуг (інтер'єр, ландшафт) — доступні незалежно від того, хто проєктував/будував будинок. */
export default function ServicePageSection({
  namespace,
  service,
  Icon,
}: {
  namespace: string;
  service: "interior" | "landscape";
  Icon: SvgIconComponent;
}) {
  const t = useTranslations(namespace);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<TierKey | undefined>();
  const [successOpen, setSuccessOpen] = useState(false);

  const openDialog = (tier?: TierKey) => {
    setSelectedTier(tier);
    setDialogOpen(true);
  };

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
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

        <Container maxWidth="md" disableGutters>
          <Typography
            component={motion.p}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.05rem", lineHeight: 1.7, textAlign: "center", mb: { xs: 6, md: 8 } }}
          >
            {t("intro")}
          </Typography>
        </Container>

        <Typography variant="h5" sx={{ fontWeight: 800, textAlign: "center", mb: { xs: 4, md: 5 } }}>
          {t("tiersTitle")}
        </Typography>

        <Box
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            alignItems: "stretch",
          }}
        >
          {TIER_KEYS.map((key) => {
            const tier = t.raw(`tiers.${key}`) as Tier;
            const highlighted = key === "standard";

            return (
              <Card
                key={key}
                component={motion.div}
                variants={item}
                variant="outlined"
                sx={{
                  position: "relative",
                  overflow: "visible",
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                  borderColor: highlighted ? "primary.main" : "divider",
                  borderWidth: highlighted ? 2 : 1,
                  ...(highlighted && { boxShadow: 6 }),
                }}
              >
                {highlighted && (
                  <Chip
                    label={t("popular")}
                    color="primary"
                    size="small"
                    sx={{ position: "absolute", top: -14, right: 24, fontWeight: 700 }}
                  />
                )}

                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {tier.name}
                </Typography>

                <Box>
                  <Typography component="span" variant="h4" sx={{ fontWeight: 800 }}>
                    {t("perM2", { price: tier.price })}
                  </Typography>
                  {tier.priceNote && (
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                      {tier.priceNote}
                    </Typography>
                  )}
                </Box>

                <Stack spacing={1.25} sx={{ mt: 1, flexGrow: 1 }}>
                  {tier.features.map((feature) => (
                    <Stack
                      key={feature}
                      direction="row"
                      spacing={1.25}
                      sx={{ alignItems: "flex-start" }}
                    >
                      <CheckRoundedIcon
                        color={highlighted ? "primary" : "action"}
                        fontSize="small"
                        sx={{ mt: "2px" }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Button
                  variant={highlighted ? "contained" : "outlined"}
                  size="large"
                  onClick={() => openDialog(key)}
                  sx={{ mt: 1 }}
                >
                  {t("tierCta")}
                </Button>
              </Card>
            );
          })}
        </Box>

        <Stack spacing={1.5} sx={{ alignItems: "center", mt: { xs: 5, md: 7 } }}>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center", maxWidth: 640 }}>
            {t("note")}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, textAlign: "center" }}>
            {t("ctaTitle")}
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: "center", maxWidth: 480 }}>
            {t("ctaText")}
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PhoneInTalkRoundedIcon />}
            onClick={() => openDialog()}
            sx={{ px: 4, py: 1.5 }}
          >
            {t("ctaButton")}
          </Button>
        </Stack>
      </Container>

      <CallbackDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmitted={() => {
          setDialogOpen(false);
          setSuccessOpen(true);
        }}
        source={service === "interior" ? "interior-design" : "landscape-design"}
        lead={{ kind: "service", values: { service, tier: selectedTier } }}
      />

      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccessOpen(false)}>
          {t("success")}
        </Alert>
      </Snackbar>
    </Box>
  );
}
