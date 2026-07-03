"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/lib/blog";

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

export default function BlogPostHeader({ locale, post }: { locale: Locale; post: BlogPost }) {
  const t = useTranslations("blog");
  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

  return (
    <Box component="section" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <Stack
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          spacing={2}
        >
          <Typography
            component={motion.div}
            variants={item}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              width: "fit-content",
            }}
          >
            <Box
              component={Link}
              href="/blog"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: 14,
                fontWeight: 600,
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <ArrowBackRoundedIcon fontSize="small" />
              {t("backToBlog")}
            </Box>
          </Typography>
          <Typography
            component={motion.p}
            variants={item}
            variant="caption"
            color="text.secondary"
          >
            {formatter.format(new Date(post.publishedAt))}
          </Typography>
          <Typography
            component={motion.h1}
            variants={item}
            variant="h2"
            sx={{ fontWeight: 800 }}
          >
            {post.title}
          </Typography>
          <Typography
            component={motion.p}
            variants={item}
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            {post.excerpt}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
