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
import { ADDONS, type ConfiguratorValues, formatCurrency } from "../schema";

export default function OptionsStep() {
  const { control } = useFormContext<ConfiguratorValues>();
  const t = useTranslations("configurator.options");

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {t("heading")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("subtitle")}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        {ADDONS.map((addon) => (
          <Controller
            key={addon.key}
            control={control}
            name={`addons.${addon.key}`}
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
                        {t(`items.${addon.key}.label`)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t(`items.${addon.key}.description`)}
                      </Typography>
                      <Typography variant="caption" color="primary">
                        {t("plus", { price: formatCurrency(addon.price) })}
                      </Typography>
                    </Box>
                  }
                />
              </Card>
            )}
          />
        ))}
      </Box>
    </Stack>
  );
}
