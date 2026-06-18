"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import SectionHeading from "@/components/ui/SectionHeading";

type Stage = { percent: string; title: string; description: string };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DesignPayment() {
  const t = useTranslations("design.payment");
  const stages = t.raw("stages") as Stage[];

  return (
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeading overline={t("overline")} title={t("title")} subtitle={t("subtitle")} />

        <Box
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          sx={{
            display: "grid",
            gap: { xs: 4, md: 5 },
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          }}
        >
          {stages.map((stage, index) => (
            <Stack
              key={stage.title}
              component={motion.div}
              variants={item}
              spacing={2}
              sx={{ alignItems: "flex-start" }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {stage.percent}
                </Typography>
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {stage.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stage.description}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
