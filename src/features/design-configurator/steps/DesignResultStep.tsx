"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  DESIGN_CONFIGURATOR_STORAGE_KEY,
  DESIGN_PACKAGES,
  SPECIAL_ROOMS,
  computeDesignPrice,
  formatDesignCurrency,
  type DesignConfiguratorValues,
} from "../schema";
import { clearPersistedWizard } from "@/lib/usePersistedWizard";
import CallbackDialog from "@/features/configurator/CallbackDialog";
import { Link } from "@/i18n/navigation";

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
                sx={{ bgcolor: "common.white", color: "text.primary", "&:hover": { bgcolor: "grey.200" } }}
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

function BreakdownRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
        {value}
      </Typography>
    </Stack>
  );
}

export default function DesignResultStep({ onEdit }: { onEdit: () => void }) {
  const { control } = useFormContext<DesignConfiguratorValues>();
  const values = useWatch({ control }) as Partial<DesignConfiguratorValues>;

  const t = useTranslations("designConfigurator.result");
  const tc = useTranslations("designConfigurator");

  const price = computeDesignPrice(values);
  const pkg = DESIGN_PACKAGES.find((p) => p.value === values.package);

  const packageLabel = pkg ? tc(`scope.package.options.${pkg.value}.label`) : "—";
  const styleLabel = values.style ? tc(`architecture.style.options.${values.style}.label`) : "—";
  const floorsLabel = values.floors ? tc(`house.floors.options.${values.floors}.label`) : "—";
  const roofLabel = values.roof ? tc(`architecture.roof.options.${values.roof}.label`) : "—";
  const selectedRooms = SPECIAL_ROOMS.filter((r) => values.specialRooms?.includes(r.key));

  const [callOpen, setCallOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nextSteps = t.raw("nextSteps") as string[];

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {t("title")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {packageLabel} · {values.area} {tc("house.area.unit")} · {styleLabel}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <VisualizationPanel
          image="/mock-floor-plan.svg"
          title={t("plan.title")}
          caption={t("plan.caption")}
          locked={!submitted}
          unlockCtaLabel={t("unlockCta")}
          unlockedNote={t("unlockedNote")}
          onUnlock={() => setCallOpen(true)}
        />
        <VisualizationPanel
          image="/mock-3d.svg"
          title={t("view3d.title")}
          caption={t("view3d.caption")}
          locked={!submitted}
          unlockCtaLabel={t("unlockCta")}
          unlockedNote={t("unlockedNote")}
          onUnlock={() => setCallOpen(true)}
        />
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography
          component={Link}
          href="/gallery"
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "primary.main",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {t("galleryLink")}
        </Typography>
      </Box>

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

      {/* Параметри */}
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
            <Spec label={t("specs.area")} value={`${values.area} ${tc("house.area.unit")}`} />
            <Spec label={t("specs.floors")} value={floorsLabel} />
            <Spec label={t("specs.bedrooms")} value={values.bedrooms ?? "—"} />
            <Spec label={t("specs.bathrooms")} value={values.bathrooms ?? "—"} />
            <Spec label={t("specs.style")} value={styleLabel} />
            <Spec label={t("specs.roof")} value={roofLabel} />
            <Spec label={t("specs.package")} value={packageLabel} />
            <Spec
              label={t("specs.specialRooms")}
              value={
                selectedRooms.length
                  ? selectedRooms.map((r) => tc(`rooms.special.items.${r.key}`)).join(", ")
                  : "—"
              }
            />
          </Box>
        </CardContent>
      </Card>

      {/* Вартість */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            {t("priceTitle")}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {formatDesignCurrency(price.min)} – {formatDesignCurrency(price.max)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.25 }}>
            {t("breakdown.title")}
          </Typography>
          <Stack spacing={1}>
            <BreakdownRow label={t("breakdown.base")} value={formatDesignCurrency(price.base)} />
            {price.designCore > price.base && (
              <BreakdownRow
                label={t("breakdown.adjustments")}
                value={`+${formatDesignCurrency(price.designCore - price.base)}`}
              />
            )}
            {price.fixedFees > 0 && (
              <BreakdownRow
                label={t("breakdown.fixedFees")}
                value={`+${formatDesignCurrency(price.fixedFees)}`}
              />
            )}
            {price.supervision > 0 && (
              <BreakdownRow
                label={t("breakdown.supervision")}
                value={`+${formatDesignCurrency(price.supervision)}`}
              />
            )}
          </Stack>

          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
            {t("priceNote")}
          </Typography>
        </CardContent>
      </Card>

      {/* Підтвердження заявки */}
      {submitted && (
        <Paper
          variant="outlined"
          sx={{ p: { xs: 3, md: 4 }, borderColor: "success.main", bgcolor: "rgba(46, 125, 50, 0.08)" }}
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
              <Stack key={step} direction="row" spacing={2} sx={{ alignItems: "center" }}>
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
      )}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Button startIcon={<EditRoundedIcon />} onClick={onEdit}>
          {t("edit")}
        </Button>
        {!submitted && (
          <Button
            variant="contained"
            startIcon={<LockOpenRoundedIcon />}
            onClick={() => setCallOpen(true)}
          >
            {t("bigCta")}
          </Button>
        )}
      </Stack>

      <CallbackDialog
        open={callOpen}
        onClose={() => setCallOpen(false)}
        onSubmitted={() => {
          setSubmitted(true);
          clearPersistedWizard(DESIGN_CONFIGURATOR_STORAGE_KEY);
        }}
        source="design-configurator"
        lead={{ kind: "design", values }}
      />
    </Stack>
  );
}
