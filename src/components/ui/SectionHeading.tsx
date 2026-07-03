"use client";

import { motion, type Variants } from "framer-motion";
import { Stack, type SxProps, type Theme, Typography } from "@mui/material";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type SectionHeadingProps = {
  overline: string;
  title: string;
  subtitle?: string;
  /** "h3" для секцій (за замовч.), "h2" для заголовків сторінок. Керує лише візуальним розміром. */
  titleVariant?: "h2" | "h3";
  /** Семантичний HTML-тег заголовка. За замовч. збігається з titleVariant. Задайте "h1" на сторінках без окремого Hero-компонента. */
  as?: "h1" | "h2" | "h3";
  /** "view" — поява при скролі (за замовч.), "mount" — одразу при завантаженні. */
  animateOn?: "view" | "mount";
  sx?: SxProps<Theme>;
};

export default function SectionHeading({
  overline,
  title,
  subtitle,
  titleVariant = "h3",
  as,
  animateOn = "view",
  sx,
}: SectionHeadingProps) {
  const headingTag = as ?? titleVariant;
  const TitleTag =
    headingTag === "h1" ? motion.h1 : headingTag === "h2" ? motion.h2 : motion.h3;

  const motionProps =
    animateOn === "mount"
      ? { initial: "hidden" as const, animate: "show" as const }
      : {
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.5 },
        };

  return (
    <Stack
      component={motion.div}
      variants={container}
      {...motionProps}
      spacing={1.5}
      sx={[
        { textAlign: "center", mb: { xs: 6, md: 8 } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        component={motion.p}
        variants={item}
        variant="overline"
        color="text.secondary"
        sx={{ letterSpacing: 4 }}
      >
        {overline}
      </Typography>
      <Typography
        component={TitleTag}
        variants={item}
        variant={titleVariant}
        sx={{ fontWeight: titleVariant === "h2" ? 800 : 700 }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          component={motion.p}
          variants={item}
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 400, maxWidth: 640, mx: "auto" }}
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}
