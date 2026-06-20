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
import {
  type DesignConfiguratorValues,
  computeDesignPrice,
  defaultDesignValues,
  designConfiguratorSchema,
  formatDesignCurrency,
} from "./schema";
import PlotStep from "./steps/PlotStep";
import HouseStep from "./steps/HouseStep";
import LifestyleStep from "./steps/LifestyleStep";
import RoomsStep from "./steps/RoomsStep";
import ArchitectureStep from "./steps/ArchitectureStep";
import EngineeringStep from "./steps/EngineeringStep";
import ScopeStep from "./steps/ScopeStep";
import DesignResultStep from "./steps/DesignResultStep";

const STEP_KEYS = [
  "plot",
  "house",
  "lifestyle",
  "rooms",
  "architecture",
  "engineering",
  "scope",
  "result",
] as const;

const stepFields: Record<number, Path<DesignConfiguratorValues>[]> = {
  0: ["plotStatus", "terrain", "survey"],
  1: ["area", "floors", "basement", "garage"],
  2: ["residents", "bedrooms", "bathrooms", "household"],
  3: ["kitchen", "specialRooms"],
  4: ["style", "roof", "facade"],
  5: ["heating", "systems"],
  6: ["package", "extras"],
  7: [],
};

function LivePrice() {
  const { control } = useFormContext<DesignConfiguratorValues>();
  const values = useWatch({ control }) as Partial<DesignConfiguratorValues>;
  const price = computeDesignPrice(values);
  const t = useTranslations("designConfigurator.nav");

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
        {t("estimate")}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
        {formatDesignCurrency(price.min)} – {formatDesignCurrency(price.max)}
      </Typography>
    </Box>
  );
}

export default function DesignConfiguratorForm() {
  const t = useTranslations("designConfigurator");
  const [activeStep, setActiveStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);

  const methods = useForm<DesignConfiguratorValues>({
    resolver: zodResolver(designConfiguratorSchema),
    defaultValues: defaultDesignValues,
    mode: "onChange",
  });

  const lastStep = STEP_KEYS.length - 1;
  const isResult = activeStep === lastStep;

  const goTo = (index: number) => {
    setActiveStep(index);
    setMaxReached((max) => Math.max(max, index));
  };

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

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: { xs: 4, md: 6 },
            "& .MuiStepLabel-label": {
              fontSize: { xs: "0.65rem", sm: "0.8rem" },
              mt: { xs: 0.5, sm: 1 },
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

        <Box sx={{ minHeight: { xs: 280, md: 360 } }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeStep === 0 && <PlotStep />}
              {activeStep === 1 && <HouseStep />}
              {activeStep === 2 && <LifestyleStep />}
              {activeStep === 3 && <RoomsStep />}
              {activeStep === 4 && <ArchitectureStep />}
              {activeStep === 5 && <EngineeringStep />}
              {activeStep === 6 && <ScopeStep />}
              {activeStep === 7 && <DesignResultStep onEdit={() => goTo(0)} />}
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
              <Button onClick={handleBack} disabled={activeStep === 0} startIcon={<ArrowBackRoundedIcon />}>
                {t("nav.back")}
              </Button>
              <Button variant="contained" onClick={handleNext} endIcon={<ArrowForwardRoundedIcon />}>
                {activeStep === lastStep - 1 ? t("nav.getResult") : t("nav.next")}
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </FormProvider>
  );
}
