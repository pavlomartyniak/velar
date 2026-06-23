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
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import {
  ADDONS,
  type ConfiguratorValues,
  HOUSE_STYLES,
  UTILITIES,
  computeBudget,
  formatCurrency,
} from "../schema";
import CallbackDialog from "../CallbackDialog";

function VisualizationPanel({
  image,
  title,
  caption,
  locked,
  unlockCtaLabel,
  unlockedNote,
  onUnlock,
}: {
  image: string;
  title: string;
  caption: string;
  locked: boolean;
  unlockCtaLabel: string;
  unlockedNote: string;
  onUnlock: () => void;
}) {
  return (
    <Card variant="outlined" sx={{ overflow: "hidden" }}>
      <Box sx={{ display: "block", position: "relative", overflow: "hidden" }}>
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
            filter: "blur(16px)",
            transform: "scale(1.1)",
          }}
        />
        <Stack
          spacing={1.5}
          sx={{
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
            bgcolor: "rgba(0,0,0,0.4)",
            color: "common.white",
          }}
        >
          {locked ? (
            <>
              <LockRoundedIcon />
              <Button
                size="small"
                variant="contained"
                onClick={onUnlock}
                sx={{
                  bgcolor: "common.white",
                  color: "text.primary",
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                {unlockCtaLabel}
              </Button>
            </>
          ) : (
            <>
              <CheckCircleRoundedIcon color="success" />
              <Typography variant="caption" sx={{ fontWeight: 600, maxWidth: 220 }}>
                {unlockedNote}
              </Typography>
            </>
          )}
        </Stack>
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
  const selectedUtilities = UTILITIES.filter(
    (utility) => values.utilities?.[utility.key],
  );

  const styleLabel = style ? tc(`style.options.${style.value}.label`) : "—";
  const finishLabel = values.finish
    ? tc(`details.finish.options.${values.finish}.label`)
    : "—";
  const addonLabel = (key: string) => tc(`options.items.${key}.label`);
  const heatingLabel =
    (values.heating ?? [])
      .map((h) => tc(`engineering.heating.options.${h}.label`))
      .join(", ") || "—";

  const nextSteps = t.raw("nextSteps") as string[];

  const [callOpen, setCallOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          locked={!submitted}
          unlockCtaLabel={t("unlockCta")}
          unlockedNote={t("unlockedNote")}
          onUnlock={() => setCallOpen(true)}
        />
        <VisualizationPanel
          image="/mock-3d.svg"
          title={t("view3dTitle")}
          caption={t("view3dCaption")}
          locked={!submitted}
          unlockCtaLabel={t("unlockCta")}
          unlockedNote={t("unlockedNote")}
          onUnlock={() => setCallOpen(true)}
        />
      </Box>

      {/* CTA — отримати візуалізацію та консультацію */}
      {!submitted && (
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<LockOpenRoundedIcon />}
            onClick={() => setCallOpen(true)}
            sx={{ px: 5, py: 1.5 }}
          >
            {t("bigCta")}
          </Button>
        </Box>
      )}

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
            <Spec label={t("specs.heating")} value={heatingLabel} />
            <Spec
              label={t("specs.timeline")}
              value={tc(`details.timeline.options.${values.timeline}.label`)}
            />
            <Spec
              label={t("specs.plot")}
              value={tc(`plot.status.options.${values.plotStatus}.label`)}
            />
            <Spec
              label={t("specs.terrain")}
              value={tc(`plot.terrain.options.${values.terrain}.label`)}
            />
            <Spec
              label={t("specs.foundation")}
              value={tc(`plot.foundation.options.${values.foundation}.label`)}
            />
            <Spec
              label={t("specs.basement")}
              value={tc(`structure.basement.options.${values.basement}.label`)}
            />
            <Spec
              label={t("specs.windows")}
              value={tc(`structure.windows.options.${values.windows}.label`)}
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
                label={t("specs.heating")}
                value={formatCurrency(budget.heatingCost)}
              />
            )}
            {selectedUtilities.map((utility) => (
              <Row
                key={utility.key}
                label={tc(`plot.utilities.items.${utility.key}`)}
                value={formatCurrency(utility.price)}
              />
            ))}
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
      <Stack direction="row" sx={{ justifyContent: "center" }}>
        <Button startIcon={<EditRoundedIcon />} onClick={onEdit}>
          {t("edit")}
        </Button>
      </Stack>

      <CallbackDialog
        open={callOpen}
        onClose={() => setCallOpen(false)}
        onSubmitted={() => setSubmitted(true)}
        source="configurator"
        lead={{ kind: "construction", values }}
      />
    </Stack>
  );
}
