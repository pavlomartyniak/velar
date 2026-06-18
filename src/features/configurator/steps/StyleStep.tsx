"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { type ConfiguratorValues, HOUSE_STYLES, formatCurrency } from "../schema";

export default function StyleStep() {
  const { control } = useFormContext<ConfiguratorValues>();
  const t = useTranslations("configurator.style");

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

      <Controller
        control={control}
        name="style"
        render={({ field, fieldState }) => (
          <>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
              }}
            >
              {HOUSE_STYLES.map((style) => {
                const selected = field.value === style.value;
                return (
                  <Card
                    key={style.value}
                    variant="outlined"
                    sx={{
                      position: "relative",
                      borderWidth: 2,
                      borderColor: selected ? "primary.main" : "divider",
                      transition:
                        "border-color 0.2s ease, box-shadow 0.2s ease",
                      boxShadow: selected ? 3 : 0,
                    }}
                  >
                    <CardActionArea
                      onClick={() => field.onChange(style.value)}
                      sx={{ height: "100%" }}
                    >
                      {selected && (
                        <CheckCircleRoundedIcon
                          color="primary"
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            zIndex: 1,
                            bgcolor: "background.paper",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                      <CardMedia
                        image={style.image}
                        sx={{ height: 160, bgcolor: "action.hover" }}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {t(`options.${style.value}.label`)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5, mb: 2 }}
                        >
                          {t(`options.${style.value}.description`)}
                        </Typography>
                        <Typography variant="subtitle2" color="primary">
                          {t("perM2", {
                            price: formatCurrency(style.pricePerM2),
                          })}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Box>
            {fieldState.error && (
              <Typography variant="body2" color="error">
                {t("error")}
              </Typography>
            )}
          </>
        )}
      />
    </Stack>
  );
}
