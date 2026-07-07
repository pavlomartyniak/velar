"use client";

import { Link } from "@/i18n/navigation";
import { Box, Typography } from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

/** Помітний блок-підказка з посиланням на статтю блогу — для питань, де вибір неочевидний. */
export default function ArticleLinkHint({ slug, label }: { slug: string; label: string }) {
  return (
    <Box
      component={Link}
      href={`/blog/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.75,
        borderRadius: 2,
        border: 1,
        borderColor: "primary.main",
        bgcolor: "action.hover",
        textDecoration: "none",
        color: "text.primary",
        transition: "background-color .2s ease, box-shadow .2s ease",
        "&:hover": { bgcolor: "action.selected", boxShadow: 1 },
      }}
    >
      <MenuBookRoundedIcon color="primary" />
      <Typography variant="body2" sx={{ fontWeight: 600, flexGrow: 1 }}>
        {label}
      </Typography>
      <OpenInNewRoundedIcon sx={{ fontSize: 18 }} color="primary" />
    </Box>
  );
}
