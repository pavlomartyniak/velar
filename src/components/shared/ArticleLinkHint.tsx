"use client";

import { Link } from "@/i18n/navigation";
import { Box } from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

/** Невелике посилання на статтю блогу для питань, де вибір неочевидний. */
export default function ArticleLinkHint({ slug, label }: { slug: string; label: string }) {
  return (
    <Box
      component={Link}
      href={`/blog/${slug}`}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        mt: -0.5,
        fontSize: 13,
        fontWeight: 600,
        color: "primary.main",
        textDecoration: "none",
        width: "fit-content",
        "&:hover": { textDecoration: "underline" },
      }}
    >
      <MenuBookRoundedIcon sx={{ fontSize: 16 }} />
      {label}
      <ArrowForwardRoundedIcon sx={{ fontSize: 14 }} />
    </Box>
  );
}
