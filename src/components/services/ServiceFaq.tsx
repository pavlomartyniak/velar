"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

type FaqItem = { question: string; answer: string };

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Компактний FAQ-блок для сторінок окремих послуг — контент дублює FAQPage JSON-LD, який будує сторінка. */
export default function ServiceFaq({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const items = t.raw("faq") as FaqItem[];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center", mb: { xs: 4, md: 5 } }}>
          {t("faqTitle")}
        </Typography>

        <Box
          component={motion.div}
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
                aria-controls={`service-faq-panel-${index}-content`}
                id={`service-faq-panel-${index}-header`}
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
