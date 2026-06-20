"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Card, Chip, Container, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import SectionHeading from "@/components/ui/SectionHeading";

const TIER_KEYS = ["light", "basic", "premium"] as const;

type Tier = {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
};

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

export default function DesignPricing() {
  const t = useTranslations("design.pricing");

  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeading overline={t("overline")} title={t("title")} subtitle={t("subtitle")} />

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
            const highlighted = key === "premium";

            return (
              <Card
                key={key}
                component={motion.div}
                variants={item}
                variant="outlined"
                sx={{
                  position: "relative",
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
                  <Typography component="span" variant="h3" sx={{ fontWeight: 800 }}>
                    {t("perM2", { price: tier.price })}
                  </Typography>
                  {tier.priceNote && (
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                      {tier.priceNote}
                    </Typography>
                  )}
                </Box>

                <Stack spacing={1.25} sx={{ mt: 1 }}>
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
              </Card>
            );
          })}
        </Box>

        <Stack spacing={1.5} sx={{ alignItems: "center", mt: { xs: 5, md: 7 } }}>
          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            {t("calculatorHint")}
          </Typography>
          <Button
            component={Link}
            href="/design-configurator"
            variant="contained"
            size="large"
            startIcon={<CalculateRoundedIcon />}
            sx={{ px: 4, py: 1.5 }}
          >
            {t("calculatorCta")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
