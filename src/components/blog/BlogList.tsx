"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
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

export default function BlogList({ locale, posts }: { locale: Locale; posts: BlogPost[] }) {
  const t = useTranslations("blog");
  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
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
          <Typography component={motion.h1} variants={item} variant="h2" sx={{ fontWeight: 800 }}>
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
          animate="show"
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          }}
        >
          {posts.map((post) => (
            <Stack
              key={post.slug}
              component={motion.article}
              variants={item}
              spacing={1.5}
              sx={{
                p: 3.5,
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
                height: "100%",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {formatter.format(new Date(post.publishedAt))}
              </Typography>
              <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                {post.excerpt}
              </Typography>
              <Typography
                component={Link}
                href={`/blog/${post.slug}`}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontWeight: 600,
                  color: "primary.main",
                  textDecoration: "none",
                  width: "fit-content",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {t("readMore")}
                <ArrowForwardRoundedIcon fontSize="small" />
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
