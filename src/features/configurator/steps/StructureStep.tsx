"use client";

import { useTranslations } from "next-intl";
import { Box, Stack, Typography } from "@mui/material";
import { BASEMENT_OPTIONS, WINDOWS_OPTIONS } from "../schema";
import ChoiceQuestion from "./ChoiceQuestion";

export default function StructureStep() {
  const t = useTranslations("configurator.structure");

  const basement = BASEMENT_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`basement.options.${o.value}.label`),
    description: t(`basement.options.${o.value}.description`),
  }));
  const windows = WINDOWS_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`windows.options.${o.value}.label`),
    description: t(`windows.options.${o.value}.description`),
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

      <ChoiceQuestion
        name="basement"
        title={t("basement.title")}
        hint={t("basement.hint")}
        options={basement}
      />
      <ChoiceQuestion
        name="windows"
        title={t("windows.title")}
        hint={t("windows.hint")}
        options={windows}
      />
    </Stack>
  );
}
