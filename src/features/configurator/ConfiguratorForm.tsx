"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  FormProvider,
  type Path,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import {
  CONFIGURATOR_STORAGE_KEY,
  type ConfiguratorValues,
  computeBudget,
  configuratorSchema,
  defaultConfiguratorValues,
  formatCurrency,
} from "./schema";
import { clearPersistedWizard, usePersistedWizard } from "@/lib/usePersistedWizard";
import StyleStep from "./steps/StyleStep";
import AreaStep from "./steps/AreaStep";
import PlotStep from "./steps/PlotStep";
import DetailsStep from "./steps/DetailsStep";
import StructureStep from "./steps/StructureStep";
import EngineeringStep from "./steps/EngineeringStep";
import OptionsStep from "./steps/OptionsStep";
import ResultStep from "./steps/ResultStep";

const STEP_KEYS = [
  "style",
  "area",
  "plot",
  "details",
  "structure",
  "engineering",
  "options",
  "result",
] as const;

const stepFields: Record<number, Path<ConfiguratorValues>[]> = {
  0: ["style"],
  1: ["area"],
  2: ["plotStatus", "terrain", "foundation"],
  3: ["floors", "bedrooms", "finish", "timeline"],
  4: ["basement", "windows"],
  5: ["wallMaterial", "roof", "heating"],
  6: [],
};

/** Закріплена панель із бюджетом, що оновлюється на кожну зміну форми. */
function LivePrice() {
  const { control } = useFormContext<ConfiguratorValues>();
  const values = useWatch({ control }) as Partial<ConfiguratorValues>;
  const budget = computeBudget(values);
  const t = useTranslations("configurator.nav");

  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block" }}
      >
        {t("estimate")}
      </Typography>
      {values.style ? (
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {formatCurrency(budget.min)} – {formatCurrency(budget.max)}
        </Typography>
      ) : (
        <Typography variant="body2" color="text.secondary">
          {t("chooseStyle")}
        </Typography>
      )}
    </Box>
  );
}

export default function ConfiguratorForm() {
  const t = useTranslations("configurator");
  const [activeStep, setActiveStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);

  const methods = useForm<ConfiguratorValues>({
    resolver: zodResolver(configuratorSchema),
    defaultValues: defaultConfiguratorValues,
    mode: "onChange",
  });

  usePersistedWizard(
    CONFIGURATOR_STORAGE_KEY,
    methods,
    activeStep,
    maxReached,
    setActiveStep,
    setMaxReached,
  );

  const lastStep = STEP_KEYS.length - 1;
  const isResult = activeStep === lastStep;

  const goTo = (index: number) => {
    setActiveStep(index);
    setMaxReached((max) => Math.max(max, index));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /** Перехід на крок: назад — вільно, вперед — лише якщо проміжні поля валідні. */
  const handleStep = async (index: number) => {
    if (index === activeStep) return;
    if (index < activeStep) {
      goTo(index);
      return;
    }
    const fields = Array.from({ length: index - activeStep }, (_, i) =>
      stepFields[activeStep + i] ?? [],
    ).flat();
    const valid = fields.length === 0 ? true : await methods.trigger(fields);
    if (valid) goTo(index);
  };

  const handleNext = () => handleStep(Math.min(activeStep + 1, lastStep));
  const handleBack = () => goTo(Math.max(activeStep - 1, 0));

  const handleReset = () => {
    clearPersistedWizard(CONFIGURATOR_STORAGE_KEY);
    methods.reset(defaultConfiguratorValues);
    setActiveStep(0);
    setMaxReached(0);
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 1.5,
          }}
        >
          <Typography
            component="h1"
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 2 }}
          >
            {t("pageTitle")}
          </Typography>
          <Button
            size="small"
            color="inherit"
            onClick={handleReset}
            startIcon={<RestartAltRoundedIcon />}
            sx={{ color: "text.secondary", flexShrink: 0 }}
          >
            {t("nav.reset")}
          </Button>
        </Box>
        <Box
          sx={{
            overflowX: { xs: "auto", md: "visible" },
            mb: { xs: 4, md: 6 },
            pb: 1,
          }}
        >
          <Stepper
            nonLinear
            activeStep={activeStep}
            alternativeLabel
            sx={{
              minWidth: { xs: 760, sm: 880, md: "100%" },
              "& .MuiStep-root": {
                flex: { xs: "0 0 auto", sm: "0 0 auto", md: 1 },
                minWidth: { xs: 92, sm: 110, md: 0 },
                px: { xs: 0.5, sm: 1, md: 0 },
              },
              "& .MuiStepLabel-label": {
                fontSize: { xs: "0.65rem", sm: "0.8rem" },
                mt: { xs: 0.5, sm: 1 },
                whiteSpace: "nowrap",
              },
              "& .MuiStepIcon-root": {
                fontSize: { xs: "1.4rem", sm: "1.6rem" },
              },
            }}
          >
            {STEP_KEYS.map((key, index) => (
              <Step key={key} completed={index < maxReached}>
                <StepButton color="inherit" onClick={() => handleStep(index)}>
                  {t(`steps.${key}`)}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ minHeight: { xs: 280, md: 360 } }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeStep === 0 && <StyleStep />}
              {activeStep === 1 && <AreaStep />}
              {activeStep === 2 && <PlotStep />}
              {activeStep === 3 && <DetailsStep />}
              {activeStep === 4 && <StructureStep />}
              {activeStep === 5 && <EngineeringStep />}
              {activeStep === 6 && <OptionsStep />}
              {activeStep === 7 && (
                <ResultStep onEdit={() => goTo(0)} />
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

        {!isResult && (
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              mt: 4,
              py: 2,
              bgcolor: "background.default",
              borderTop: 1,
              borderColor: "divider",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            <LivePrice />
            <Box
              sx={{
                display: "flex",
                gap: 1,
                ml: { xs: 0, sm: "auto" },
                justifyContent: { xs: "space-between", sm: "flex-start" },
              }}
            >
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBackRoundedIcon />}
              >
                {t("nav.back")}
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForwardRoundedIcon />}
              >
                {activeStep === lastStep - 1
                  ? t("nav.getResult")
                  : t("nav.next")}
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </FormProvider>
  );
}
