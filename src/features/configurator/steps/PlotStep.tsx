"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Card,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import {
  FOUNDATION_OPTIONS,
  PLOT_OPTIONS,
  TERRAIN_OPTIONS,
  UTILITIES,
  type ConfiguratorValues,
  formatCurrency,
} from "../schema";
import ChoiceQuestion from "./ChoiceQuestion";
import ArticleLinkHint from "@/components/shared/ArticleLinkHint";

export default function PlotStep() {
  const { control } = useFormContext<ConfiguratorValues>();
  const t = useTranslations("configurator.plot");

  const status = PLOT_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`status.options.${o.value}.label`),
    description: t(`status.options.${o.value}.description`),
  }));
  const terrain = TERRAIN_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`terrain.options.${o.value}.label`),
    description: t(`terrain.options.${o.value}.description`),
  }));
  const foundation = FOUNDATION_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`foundation.options.${o.value}.label`),
    description: t(`foundation.options.${o.value}.description`),
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
        name="plotStatus"
        title={t("status.title")}
        hint={t("status.hint")}
        options={status}
      />
      <ChoiceQuestion name="terrain" title={t("terrain.title")} options={terrain} />
      <ChoiceQuestion
        name="foundation"
        title={t("foundation.title")}
        hint={t("foundation.hint")}
        options={foundation}
      />
      <ArticleLinkHint
        slug="strichkovyi-plytnyi-chy-palovyi-fundament"
        label={t("foundation.articleLink")}
      />

      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {t("utilities.title")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {t("utilities.hint")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          {UTILITIES.map((utility) => (
            <Controller
              key={utility.key}
              control={control}
              name={`utilities.${utility.key}`}
              render={({ field }) => (
                <Card
                  variant="outlined"
                  sx={{
                    borderWidth: 2,
                    borderColor: field.value ? "primary.main" : "divider",
                    p: 2,
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <FormControlLabel
                    sx={{
                      m: 0,
                      width: "100%",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label={
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                          {t(`utilities.items.${utility.key}`)}
                        </Typography>
                        <Typography variant="caption" color="primary">
                          {t("utilities.plus", {
                            price: formatCurrency(utility.price),
                          })}
                        </Typography>
                      </Box>
                    }
                  />
                </Card>
              )}
            />
          ))}
        </Box>
      </Box>
    </Stack>
  );
}
