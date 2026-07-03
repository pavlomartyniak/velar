"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

type FaqItem = { question: string; answer: string };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FaqSection() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="md">
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          spacing={1.5}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}
        >
          <Typography
            component={motion.p}
            variants={item}
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 4 }}
          >
            {t("overline")}
          </Typography>
          <Typography
            component={motion.h1}
            variants={item}
            variant="h2"
            sx={{ fontWeight: 800 }}
          >
            {t("title")}
          </Typography>
          <Typography
            component={motion.p}
            variants={item}
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: 640, mx: "auto" }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>

        <Box
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((faqItem, index) => (
            <Accordion
              key={faqItem.question}
              component={motion.div}
              variants={item}
              disableGutters
              elevation={0}
              square={false}
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                mb: 1.5,
                "&:before": { display: "none" },
                "&.Mui-expanded": { mb: 1.5 },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreRoundedIcon />}
                aria-controls={`faq-panel-${index}-content`}
                id={`faq-panel-${index}-header`}
                sx={{ px: 3, py: 0.5 }}
              >
                <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {faqItem.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <Typography variant="body1" color="text.secondary">
                  {faqItem.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
