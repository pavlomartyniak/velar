"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
/** Тип заявки визначає, який форматер використає бекенд для Telegram-повідомлення. */
export interface LeadDetails {
  kind: "construction" | "design";
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
          .regex(/^\+?[0-9\s\-()]{10,}$/, t("phoneError")),
      }),
    [t],
  );

  type CallbackValues = z.infer<typeof callbackSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CallbackValues>({
    resolver: zodResolver(callbackSchema),
    defaultValues: { name: "", phone: "" },
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
            <TextField
              label={t("phone")}
              placeholder="+380 00 000 00 00"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
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
