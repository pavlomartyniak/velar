"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  ADDONS,
  type ConfiguratorValues,
  HOUSE_STYLES,
  computeBudget,
  formatCurrency,
} from "../schema";
import CallbackDialog from "../CallbackDialog";

function VisualizationPanel({
  image,
  title,
  caption,
  demoLabel,
}: {
  image: string;
  title: string;
  caption: string;
  demoLabel: string;
}) {
  return (
    <Card variant="outlined" sx={{ overflow: "hidden" }}>
      <Box
        component="a"
        href={image}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ display: "block", position: "relative" }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            display: "block",
            width: "100%",
            aspectRatio: "4 / 3",
            objectFit: "cover",
            bgcolor: "action.hover",
          }}
        />
        <Chip
          size="small"
          label={demoLabel}
          sx={{ position: "absolute", top: 10, right: 10 }}
        />
        <OpenInNewRoundedIcon
          fontSize="small"
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            color: "common.white",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))",
          }}
        />
      </Box>
      <CardContent sx={{ py: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function ResultStep({ onEdit }: { onEdit: () => void }) {
  const { control } = useFormContext<ConfiguratorValues>();
  const values = useWatch({ control }) as Partial<ConfiguratorValues>;

  const t = useTranslations("configurator.result");
  const tc = useTranslations("configurator");

  const budget = computeBudget(values);
  const style = HOUSE_STYLES.find((s) => s.value === values.style);
  const selectedAddons = ADDONS.filter((addon) => values.addons?.[addon.key]);

  const styleLabel = style ? tc(`style.options.${style.value}.label`) : "—";
  const finishLabel = values.finish
    ? tc(`details.finish.options.${values.finish}.label`)
    : "—";
  const addonLabel = (key: string) => tc(`options.items.${key}.label`);

  const nextSteps = t.raw("nextSteps") as string[];

  const [callOpen, setCallOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [snack, setSnack] = useState<string | null>(null);

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {t("title")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {styleLabel} · {values.area} {tc("area.unit")} · {finishLabel}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        {style && <Chip label={styleLabel} color="primary" />}
        {selectedAddons.map((addon) => (
          <Chip key={addon.key} label={addonLabel(addon.key)} variant="outlined" />
        ))}
        {selectedAddons.length === 0 && (
          <Chip label={t("noAddons")} variant="outlined" />
        )}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <VisualizationPanel
          image="/mock-floor-plan.svg"
          title={t("planTitle")}
          caption={t("planCaption")}
          demoLabel={t("demo")}
        />
        <VisualizationPanel
          image="/mock-3d.svg"
          title={t("view3dTitle")}
          caption={t("view3dCaption")}
          demoLabel={t("demo")}
        />
      </Box>

      {/* Параметри проєкту */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            {t("paramsTitle")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" },
              gap: 2.5,
              mt: 1.5,
            }}
          >
            <Spec label={t("specs.area")} value={`${values.area} ${tc("area.unit")}`} />
            <Spec
              label={t("specs.floors")}
              value={tc(`details.floors.options.${values.floors}`)}
            />
            <Spec label={t("specs.bedrooms")} value={values.bedrooms ?? "—"} />
            <Spec
              label={t("specs.wall")}
              value={tc(`engineering.wall.options.${values.wallMaterial}.label`)}
            />
            <Spec
              label={t("specs.roof")}
              value={tc(`engineering.roof.options.${values.roof}.label`)}
            />
            <Spec
              label={t("specs.heating")}
              value={tc(`engineering.heating.options.${values.heating}.label`)}
            />
            <Spec
              label={t("specs.timeline")}
              value={tc(`details.timeline.options.${values.timeline}.label`)}
            />
            <Spec
              label={t("specs.plot")}
              value={tc(`engineering.plot.options.${values.plot}.label`)}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Бюджет */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            {t("budgetTitle")}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {formatCurrency(budget.min)} – {formatCurrency(budget.max)}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={1}>
            <Row
              label={t("constructionRow", {
                style: styleLabel,
                finish: finishLabel,
                area: values.area ?? 0,
              })}
              value={formatCurrency(budget.construction)}
            />
            {budget.bedroomsCost > 0 && (
              <Row
                label={t("bedroomsRow", { count: values.bedrooms ?? "" })}
                value={formatCurrency(budget.bedroomsCost)}
              />
            )}
            {budget.heatingCost > 0 && (
              <Row
                label={tc(`engineering.heating.options.${values.heating}.label`)}
                value={formatCurrency(budget.heatingCost)}
              />
            )}
            {selectedAddons.map((addon) => (
              <Row
                key={addon.key}
                label={addonLabel(addon.key)}
                value={formatCurrency(addon.price)}
              />
            ))}
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 2, display: "block" }}
          >
            {t("budgetNote")}
          </Typography>
        </CardContent>
      </Card>

      {/* Наступний крок — головна дія / стан підтвердження */}
      {submitted ? (
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 3, md: 4 },
            borderColor: "success.main",
            bgcolor: "rgba(46, 125, 50, 0.08)",
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
            <CheckCircleRoundedIcon color="success" />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {t("successTitle")}
            </Typography>
          </Stack>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {t("successText")}
          </Typography>
          <Stack spacing={2}>
            {nextSteps.map((step, index) => (
              <Stack
                key={step}
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </Box>
                <Typography variant="body1">{step}</Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      ) : (
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 2,
          }}
        >
          <Typography variant="overline" sx={{ opacity: 0.7 }}>
            {t("nextStepOverline")}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            {t("ctaTitle")}
          </Typography>
          <Typography sx={{ opacity: 0.85, mb: 3, maxWidth: 560 }}>
            {t("ctaText")}
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PhoneInTalkRoundedIcon />}
            onClick={() => setCallOpen(true)}
            sx={{
              bgcolor: "common.white",
              color: "text.primary",
              px: 4,
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            {t("ctaButton")}
          </Button>
        </Paper>
      )}

      {/* Другорядні дії */}
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        <Button
          component="a"
          href="/mock-presentation.pdf"
          download
          startIcon={<PictureAsPdfRoundedIcon />}
          onClick={() => setSnack(t("pdfSnack"))}
        >
          {t("downloadPdf")}
        </Button>
        <Button startIcon={<EditRoundedIcon />} onClick={onEdit}>
          {t("edit")}
        </Button>
      </Stack>

      <CallbackDialog
        open={callOpen}
        onClose={() => setCallOpen(false)}
        onSubmitted={() => setSubmitted(true)}
      />

      <Snackbar
        open={!!snack}
        autoHideDuration={4000}
        onClose={() => setSnack(null)}
        message={snack ?? ""}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Stack>
  );
}
