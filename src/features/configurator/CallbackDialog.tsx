"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormHelperText,
  Stack,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
/** Тип заявки визначає, який форматер використає бекенд для Telegram-повідомлення. */
export interface LeadDetails {
  kind: "construction" | "design" | "service";
  values: Record<string, unknown>;
}

interface CallbackDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
  source: string;
  lead?: LeadDetails;
}

export default function CallbackDialog({
  open,
  onClose,
  onSubmitted,
  source,
  lead,
}: CallbackDialogProps) {
  const t = useTranslations("configurator.callback");
  const [submitError, setSubmitError] = useState(false);

  const callbackSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("nameError")),
        phone: z
          .string()
          .refine((value) => !!value && isValidPhoneNumber(value), t("phoneError")),
        email: z.union([z.literal(""), z.string().email(t("emailError"))]),
      }),
    [t],
  );

  type CallbackValues = z.infer<typeof callbackSchema>;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CallbackValues>({
    resolver: zodResolver(callbackSchema),
    defaultValues: { name: "", phone: "", email: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(false);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source,
          kind: lead?.kind,
          payload: lead?.values,
        }),
      });
      if (!response.ok) throw new Error("failed");
      const result = await response.json();
      if (!result.delivered) throw new Error("not_delivered");
      window.gtag?.("event", "generate_lead", { source, kind: lead?.kind });
      reset();
      onClose();
      onSubmitted();
    } catch {
      setSubmitError(true);
    }
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{t("title")}</DialogTitle>
      <Box component="form" onSubmit={onSubmit} noValidate>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>{t("text")}</DialogContentText>
          <Stack spacing={2}>
            <TextField
              label={t("name")}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  color: errors.phone ? "error.main" : "text.secondary",
                }}
              >
                {t("phone")}
              </Typography>
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <PhoneInput
                    international
                    defaultCountry="UA"
                    value={value}
                    onChange={(next) => onChange(next ?? "")}
                    onBlur={onBlur}
                    className={errors.phone ? "PhoneInput--error" : undefined}
                  />
                )}
              />
              {errors.phone && (
                <FormHelperText error sx={{ mx: "14px" }}>
                  {errors.phone.message}
                </FormHelperText>
              )}
            </Box>
            <TextField
              label={t("email")}
              placeholder="you@example.com"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message ?? t("emailHint")}
              fullWidth
            />
          </Stack>
          {submitError && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {t("submitError")}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
