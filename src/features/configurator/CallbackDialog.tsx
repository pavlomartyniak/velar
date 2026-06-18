"use client";

import { useMemo } from "react";
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
} from "@mui/material";

interface CallbackDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function CallbackDialog({
  open,
  onClose,
  onSubmitted,
}: CallbackDialogProps) {
  const t = useTranslations("configurator.callback");

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
    // TODO: відправити на бекенд, напр. api.post("/callback", values)
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("callback request", values);
    reset();
    onClose();
    onSubmitted();
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
