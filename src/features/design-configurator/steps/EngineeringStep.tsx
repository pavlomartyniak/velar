"use client";

import { useTranslations } from "next-intl";
import { Box, Stack, Typography } from "@mui/material";
import { DESIGN_HEATING_OPTIONS, ENGINEERING_SYSTEMS } from "../schema";
import DesignChoiceQuestion from "./DesignChoiceQuestion";

export default function EngineeringStep() {
  const t = useTranslations("designConfigurator.engineering");

  const heating = DESIGN_HEATING_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`heating.options.${o.value}.label`),
    description: t(`heating.options.${o.value}.description`),
  }));
  const systems = ENGINEERING_SYSTEMS.map((s) => ({
    value: s.key,
    label: t(`systems.items.${s.key}`),
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

      <DesignChoiceQuestion
        name="heating"
        title={t("heating.title")}
        hint={t("heating.hint")}
        options={heating}
        multiple
        preventEmpty
      />
      <DesignChoiceQuestion
        name="systems"
        title={t("systems.title")}
        hint={t("systems.hint")}
        options={systems}
        multiple
      />
    </Stack>
  );
}
