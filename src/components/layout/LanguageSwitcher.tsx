"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Button, Menu, MenuItem } from "@mui/material";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const LOCALE_NAMES: Record<Locale, string> = {
  uk: "Українська",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  pl: "Polski",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSelect = (next: Locale) => {
    setAnchorEl(null);
    if (next !== locale) {
      router.replace(pathname, { locale: next });
    }
  };

  return (
    <>
      <Button
        color="inherit"
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        startIcon={<LanguageRoundedIcon fontSize="small" />}
        endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}
        sx={{ fontWeight: 600 }}
        aria-label="Change language"
      >
        {locale.toUpperCase()}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {routing.locales.map((l) => (
          <MenuItem
            key={l}
            selected={l === locale}
            onClick={() => handleSelect(l)}
          >
            {LOCALE_NAMES[l]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
