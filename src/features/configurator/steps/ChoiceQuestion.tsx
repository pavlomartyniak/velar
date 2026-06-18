"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { Path } from "react-hook-form";
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import type { ConfiguratorValues } from "../schema";

type Option = { value: string; label: string; description?: string };

export default function ChoiceQuestion({
  name,
  title,
  hint,
  options,
}: {
  name: Path<ConfiguratorValues>;
  title: string;
  hint?: string;
  options: readonly Option[];
}) {
  const { control } = useFormContext<ConfiguratorValues>();
  const hasDescriptions = options.some((option) => option.description);

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {hint && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {hint}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ToggleButtonGroup
            exclusive
            value={field.value ?? null}
            onChange={(_, value) => {
              if (value !== null) field.onChange(value);
            }}
            sx={{
              flexWrap: "wrap",
              gap: 1,
              mt: hint ? 0 : 1,
              width: "100%",
              "& .MuiToggleButtonGroup-grouped": {
                border: 1,
                borderColor: "divider",
                borderRadius: 1.5,
                textTransform: "none",
                px: 2,
                py: 1,
                flex: hasDescriptions
                  ? { xs: "1 1 100%", sm: "1 1 auto" }
                  : "0 0 auto",
              },
            }}
          >
            {options.map((option) => (
              <ToggleButton key={option.value} value={option.value}>
                <Box sx={{ textAlign: "left" }}>
                  <Typography sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {option.label}
                  </Typography>
                  {option.description && (
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                  )}
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      />
    </Box>
  );
}
