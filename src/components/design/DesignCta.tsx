"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import CallbackDialog from "@/features/configurator/CallbackDialog";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DesignCta() {
  const t = useTranslations("design.cta");
  const [open, setOpen] = useState(false);

  return (
    <Box
      component="section"
      sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: { xs: 8, md: 11 } }}
    >
      <Container maxWidth="md">
        <Stack
          component={motion.div}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          spacing={3}
          sx={{ alignItems: "center", textAlign: "center" }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {t("title")}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.85, maxWidth: 560 }}>
            {t("text")}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Button
              component={Link}
              href="/design-configurator"
              variant="contained"
              size="large"
              startIcon={<CalculateRoundedIcon />}
              sx={{
                bgcolor: "common.white",
                color: "text.primary",
                px: 4,
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              {t("primaryCta")}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PhoneInTalkRoundedIcon />}
              onClick={() => setOpen(true)}
              sx={{
                color: "common.white",
                borderColor: "rgba(255,255,255,0.6)",
                px: 4,
                "&:hover": { borderColor: "common.white", bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              {t("phoneCta")}
            </Button>
          </Stack>
        </Stack>
      </Container>

      <CallbackDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmitted={() => setOpen(false)}
        source="design"
      />
    </Box>
  );
}
