"use client";

import { useTranslations } from "next-intl";
import { Box, Stack, Typography } from "@mui/material";
import { DESIGN_ROOF_OPTIONS, DESIGN_STYLE_OPTIONS, FACADE_OPTIONS } from "../schema";
import DesignChoiceQuestion from "./DesignChoiceQuestion";

export default function ArchitectureStep() {
  const t = useTranslations("designConfigurator.architecture");

  const style = DESIGN_STYLE_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`style.options.${o.value}.label`),
    description: t(`style.options.${o.value}.description`),
  }));
  const roof = DESIGN_ROOF_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`roof.options.${o.value}.label`),
    description: t(`roof.options.${o.value}.description`),
  }));
  const facade = FACADE_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`facade.options.${o.value}.label`),
    description: t(`facade.options.${o.value}.description`),
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

      <DesignChoiceQuestion name="style" title={t("style.title")} options={style} />
      <DesignChoiceQuestion name="roof" title={t("roof.title")} options={roof} />
      <DesignChoiceQuestion
        name="facade"
        title={t("facade.title")}
        hint={t("facade.hint")}
        options={facade}
      />
    </Stack>
  );
}
