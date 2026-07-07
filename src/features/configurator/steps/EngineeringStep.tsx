"use client";

import { useTranslations } from "next-intl";
import { Box, Stack, Typography } from "@mui/material";
import { HEATING_OPTIONS, ROOF_OPTIONS, WALL_OPTIONS } from "../schema";
import ChoiceQuestion from "./ChoiceQuestion";
import ArticleLinkHint from "@/components/shared/ArticleLinkHint";

export default function EngineeringStep() {
  const t = useTranslations("configurator.engineering");

  const wall = WALL_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`wall.options.${o.value}.label`),
    description: t(`wall.options.${o.value}.description`),
  }));
  const roof = ROOF_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`roof.options.${o.value}.label`),
    description: t(`roof.options.${o.value}.description`),
  }));
  const heating = HEATING_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`heating.options.${o.value}.label`),
    description: t(`heating.options.${o.value}.description`),
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

      <ChoiceQuestion name="wallMaterial" title={t("wall.title")} options={wall} />
      <ChoiceQuestion name="roof" title={t("roof.title")} options={roof} />
      <ChoiceQuestion
        name="heating"
        title={t("heating.title")}
        hint={t("heating.hint")}
        options={heating}
        multiple
      />
      <ArticleLinkHint
        slug="teplovyi-nasos-chy-gazovyi-kotel"
        label={t("heating.articleLink")}
      />
    </Stack>
  );
}
