"use client";

import { useTranslations } from "next-intl";
import { Box, Stack, Typography } from "@mui/material";
import {
  BATHROOMS_OPTIONS,
  DESIGN_BEDROOMS_OPTIONS,
  HOUSEHOLD_OPTIONS,
  RESIDENTS_OPTIONS,
} from "../schema";
import DesignChoiceQuestion from "./DesignChoiceQuestion";

export default function LifestyleStep() {
  const t = useTranslations("designConfigurator.lifestyle");

  const residents = RESIDENTS_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`residents.options.${o.value}`),
  }));
  const bedrooms = DESIGN_BEDROOMS_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`bedrooms.options.${o.value}`),
  }));
  const bathrooms = BATHROOMS_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`bathrooms.options.${o.value}`),
  }));
  const household = HOUSEHOLD_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`household.options.${o.value}.label`),
    description: t(`household.options.${o.value}.description`),
  }));

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {t("heading")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("subtitle")}
        </Typography>
      </Box>

      <DesignChoiceQuestion name="residents" title={t("residents.title")} options={residents} />
      <DesignChoiceQuestion name="bedrooms" title={t("bedrooms.title")} options={bedrooms} />
      <DesignChoiceQuestion name="bathrooms" title={t("bathrooms.title")} options={bathrooms} />
      <DesignChoiceQuestion
        name="household"
        title={t("household.title")}
        hint={t("household.hint")}
        options={household}
      />
    </Stack>
  );
}
