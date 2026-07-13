"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Slider, Stack, Typography } from "@mui/material";
import {
  BASEMENT_OPTIONS,
  DESIGN_AREA_MAX,
  DESIGN_AREA_MIN,
  DESIGN_AREA_STEP,
  DESIGN_FLOORS_OPTIONS,
  GARAGE_OPTIONS,
  type DesignConfiguratorValues,
} from "../schema";
import DesignChoiceQuestion from "./DesignChoiceQuestion";
import ArticleLinkHint from "@/components/shared/ArticleLinkHint";

const marks = [
  { value: 60, label: "60" },
  { value: 400, label: "400" },
  { value: 900, label: "900" },
  { value: 1500, label: "1500" },
];

export default function HouseStep() {
  const { control } = useFormContext<DesignConfiguratorValues>();
  const t = useTranslations("designConfigurator.house");

  const floors = DESIGN_FLOORS_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`floors.options.${o.value}.label`),
    description: t(`floors.options.${o.value}.description`),
  }));
  const basement = BASEMENT_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`basement.options.${o.value}.label`),
    description: t(`basement.options.${o.value}.description`),
  }));
  const garage = GARAGE_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`garage.options.${o.value}.label`),
    description: t(`garage.options.${o.value}.description`),
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

      <Controller
        control={control}
        name="area"
        render={({ field }) => (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t("area.title")}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, textAlign: "center", mt: 1 }}>
              {field.value ?? DESIGN_AREA_MIN}
              <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                {t("area.unit")}
              </Typography>
            </Typography>
            <Box sx={{ px: 2, mt: 2 }}>
              <Slider
                value={field.value ?? DESIGN_AREA_MIN}
                min={DESIGN_AREA_MIN}
                max={DESIGN_AREA_MAX}
                step={DESIGN_AREA_STEP}
                marks={marks}
                valueLabelDisplay="auto"
                onChange={(_, value) => field.onChange(value as number)}
              />
            </Box>
          </Box>
        )}
      />

      <DesignChoiceQuestion name="floors" title={t("floors.title")} options={floors} />
      <DesignChoiceQuestion name="basement" title={t("basement.title")} options={basement} />
      <ArticleLinkHint
        slug="tsokolnyi-poverh-chy-potriben"
        label={t("basement.articleLink")}
      />
      <DesignChoiceQuestion name="garage" title={t("garage.title")} options={garage} />
    </Stack>
  );
}
