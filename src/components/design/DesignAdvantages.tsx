"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SectionHeading from "@/components/ui/SectionHeading";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DesignAdvantages() {
  const t = useTranslations("design.advantages");
  const items = t.raw("items") as string[];

  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <SectionHeading overline={t("overline")} title={t("title")} />

        <Box
          component={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          sx={{
            display: "grid",
            gap: 2.5,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          {items.map((text) => (
            <Stack
              key={text}
              component={motion.div}
              variants={item}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "flex-start" }}
            >
              <CheckCircleRoundedIcon color="primary" sx={{ mt: "1px" }} />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {text}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
