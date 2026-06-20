"use client";

import { useTranslations } from "next-intl";
import { Box, Stack, Typography } from "@mui/material";
import { KITCHEN_OPTIONS, SPECIAL_ROOMS } from "../schema";
import DesignChoiceQuestion from "./DesignChoiceQuestion";

export default function RoomsStep() {
  const t = useTranslations("designConfigurator.rooms");

  const kitchen = KITCHEN_OPTIONS.map((o) => ({
    value: o.value,
    label: t(`kitchen.options.${o.value}.label`),
    description: t(`kitchen.options.${o.value}.description`),
  }));
  const special = SPECIAL_ROOMS.map((r) => ({
    value: r.key,
    label: t(`special.items.${r.key}`),
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

      <DesignChoiceQuestion name="kitchen" title={t("kitchen.title")} options={kitchen} />
      <DesignChoiceQuestion
        name="specialRooms"
        title={t("special.title")}
        hint={t("special.hint")}
        options={special}
        multiple
      />
    </Stack>
  );
}
