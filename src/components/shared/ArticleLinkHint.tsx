"use client";

import { Link } from "@/i18n/navigation";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

/**
 * Помітний блок-підказка з посиланням на статтю блогу — для питань, де вибір
 * неочевидний. На десктопі відкриває статтю в новій вкладці (не перериває
 * заповнення форми); на мобільному — в тій самій вкладці, бо керування
 * вкладками незручне і «назад» — головний жест навігації. Прогрес
 * конфігуратора при цьому не губиться — див. usePersistedWizard.
 */
export default function ArticleLinkHint({ slug, label }: { slug: string; label: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component={Link}
      href={`/blog/${slug}`}
      {...(!isMobile && { target: "_blank", rel: "noopener noreferrer" })}
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
      {isMobile ? (
        <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} color="primary" />
      ) : (
        <OpenInNewRoundedIcon sx={{ fontSize: 18 }} color="primary" />
      )}
    </Box>
  );
}
