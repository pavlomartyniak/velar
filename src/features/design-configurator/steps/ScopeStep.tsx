"use client";

import { useTranslations } from "next-intl";
import { Box, Stack, Typography } from "@mui/material";
import { DESIGN_EXTRAS, DESIGN_PACKAGES } from "../schema";
import DesignChoiceQuestion from "./DesignChoiceQuestion";

export default function ScopeStep() {
  const t = useTranslations("designConfigurator.scope");

  const packages = DESIGN_PACKAGES.map((p) => ({
    value: p.value,
    label: t(`package.options.${p.value}.label`),
    description: t(`package.options.${p.value}.description`),
  }));
  const extras = DESIGN_EXTRAS.map((e) => ({
    value: e.key,
    label: t(`extras.items.${e.key}`),
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

      <DesignChoiceQuestion name="package" title={t("package.title")} options={packages} />
      <DesignChoiceQuestion
        name="extras"
        title={t("extras.title")}
        hint={t("extras.hint")}
        options={extras}
        multiple
      />
    </Stack>
  );
}
