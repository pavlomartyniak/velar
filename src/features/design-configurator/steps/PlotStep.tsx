"use client";

import { useTranslations } from "next-intl";
import { Box, Stack, Typography } from "@mui/material";
import { PLOT_STATUS_OPTIONS, SURVEY_OPTIONS, TERRAIN_OPTIONS } from "../schema";
import DesignChoiceQuestion from "./DesignChoiceQuestion";

export default function PlotStep() {
  const t = useTranslations("designConfigurator.plot");

  const status = PLOT_STATUS_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`status.options.${o.value}.label`),
    description: t(`status.options.${o.value}.description`),
  }));
  const terrain = TERRAIN_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`terrain.options.${o.value}.label`),
    description: t(`terrain.options.${o.value}.description`),
  }));
  const survey = SURVEY_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`survey.options.${o.value}.label`),
    description: t(`survey.options.${o.value}.description`),
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

      <DesignChoiceQuestion name="plotStatus" title={t("status.title")} options={status} />
      <DesignChoiceQuestion name="terrain" title={t("terrain.title")} options={terrain} />
      <DesignChoiceQuestion
        name="survey"
        title={t("survey.title")}
        hint={t("survey.hint")}
        options={survey}
      />
    </Stack>
  );
}
