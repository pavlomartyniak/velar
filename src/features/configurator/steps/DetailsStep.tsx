"use client";

import { useTranslations } from "next-intl";
import { Box, Stack, Typography } from "@mui/material";
import {
  BEDROOMS_OPTIONS,
  FINISH_OPTIONS,
  FLOORS_OPTIONS,
  TIMELINE_OPTIONS,
} from "../schema";
import ChoiceQuestion from "./ChoiceQuestion";

export default function DetailsStep() {
  const t = useTranslations("configurator.details");

  const floors = FLOORS_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`floors.options.${o.value}`),
  }));
  const bedrooms = BEDROOMS_OPTIONS.map((o) => ({
    value: o.value,
    label: o.value,
  }));
  const finish = FINISH_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`finish.options.${o.value}.label`),
    description: t(`finish.options.${o.value}.description`),
  }));
  const timeline = TIMELINE_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`timeline.options.${o.value}.label`),
    description: t(`timeline.options.${o.value}.description`),
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

      <ChoiceQuestion name="floors" title={t("floors.title")} options={floors} />
      <ChoiceQuestion
        name="bedrooms"
        title={t("bedrooms.title")}
        options={bedrooms}
      />
      <ChoiceQuestion
        name="finish"
        title={t("finish.title")}
        hint={t("finish.hint")}
        options={finish}
      />
      <ChoiceQuestion
        name="timeline"
        title={t("timeline.title")}
        options={timeline}
      />
    </Stack>
  );
}
