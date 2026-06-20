"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_HREFS = [
  { key: "home", href: "/" },
  { key: "design", href: "/design" },
  { key: "about", href: "/about" },
  { key: "portfolio", href: "/projects" },
  { key: "configurator", href: "/configurator" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          color: transparent ? "common.white" : "text.primary",
          bgcolor: transparent ? "transparent" : "background.paper",
          borderBottom: 1,
          borderColor: transparent ? "transparent" : "divider",
          backdropFilter: transparent ? "none" : "saturate(180%) blur(8px)",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            <Typography
              component={Link}
              href="/"
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: 4,
                textDecoration: "none",
                color: "inherit",
                mr: 4,
              }}
            >
              VELAR
            </Typography>

            {/* Десктоп-навігація */}
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}
            >
              {NAV_HREFS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Button
                    key={link.href}
                    component={Link}
                    href={link.href}
                    color="inherit"
                    sx={{
                      fontWeight: active ? 700 : 500,
                      opacity: active ? 1 : 0.85,
                      px: 1.5,
                      whiteSpace: "nowrap",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    {t(link.key)}
                  </Button>
                );
              })}
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}
            >
              <LanguageSwitcher />
              <Button
                component={Link}
                href="/design"
                variant={transparent ? "outlined" : "contained"}
                color="inherit"
                sx={{
                  whiteSpace: "nowrap",
                  ...(transparent
                    ? { borderColor: "rgba(255,255,255,0.7)" }
                    : {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      }),
                }}
              >
                {tc("orderDesignPage")}
              </Button>
            </Stack>

            {/* Бургер (мобільний/планшет) */}
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "inline-flex", lg: "none" }, mr: -1 }}
              aria-label="Menu"
            >
              <MenuRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Відступ під фіксований хедер на сторінках без hero */}
      {!isHome && <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />}

      {/* Мобільне меню */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 280 } } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 4 }}>
            VELAR
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {NAV_HREFS.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              selected={pathname === link.href}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={t(link.key)} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <Box sx={{ px: 1, py: 1 }}>
          <LanguageSwitcher />
        </Box>
        <Box sx={{ p: 2, mt: "auto" }}>
          <Button
            component={Link}
            href="/design"
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setDrawerOpen(false)}
          >
            {tc("orderDesignPage")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
