"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Slider, Stack, Typography } from "@mui/material";
import { AREA_MAX, AREA_MIN, AREA_STEP, type ConfiguratorValues } from "../schema";

const marks = [
  { value: 80, label: "80" },
  { value: 300, label: "300" },
  { value: 600, label: "600" },
  { value: 1000, label: "1000" },
];

export default function AreaStep() {
  const { control } = useFormContext<ConfiguratorValues>();
  const t = useTranslations("configurator.area");

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
            <Typography
              variant="h2"
              sx={{ fontWeight: 800, textAlign: "center" }}
            >
              {field.value ?? AREA_MIN}
              <Typography
                component="span"
                variant="h5"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                {t("unit")}
              </Typography>
            </Typography>
            <Box sx={{ px: 2, mt: 4 }}>
              <Slider
                value={field.value ?? AREA_MIN}
                min={AREA_MIN}
                max={AREA_MAX}
                step={AREA_STEP}
                marks={marks}
                valueLabelDisplay="auto"
                onChange={(_, value) => field.onChange(value as number)}
              />
            </Box>
          </Box>
        )}
      />
    </Stack>
  );
}
