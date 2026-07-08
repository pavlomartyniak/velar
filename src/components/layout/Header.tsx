"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_HREFS = [
  { key: "home", href: "/" },
  { key: "design", href: "/design" },
] as const;

const SERVICES_MENU = [
  { key: "interiorDesign", href: "/interior-design" },
  { key: "landscapeDesign", href: "/landscape-design" },
] as const;

const NAV_HREFS_REST = [
  { key: "about", href: "/about" },
  { key: "configurator", href: "/configurator" },
] as const;

const MORE_MENU = [
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/faq" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesAnchor, setServicesAnchor] = useState<HTMLElement | null>(null);
  const servicesActive = SERVICES_MENU.some((link) => pathname === link.href);
  const [moreAnchor, setMoreAnchor] = useState<HTMLElement | null>(null);
  const moreActive = MORE_MENU.some((link) => pathname === link.href);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);

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

              <Button
                color="inherit"
                onClick={(e) => setServicesAnchor(e.currentTarget)}
                endIcon={<KeyboardArrowDownRoundedIcon />}
                sx={{
                  fontWeight: servicesActive ? 700 : 500,
                  opacity: servicesActive ? 1 : 0.85,
                  px: 1.5,
                  whiteSpace: "nowrap",
                  "&:hover": { opacity: 1 },
                }}
              >
                {t("services")}
              </Button>
              <Menu
                anchorEl={servicesAnchor}
                open={Boolean(servicesAnchor)}
                onClose={() => setServicesAnchor(null)}
              >
                {SERVICES_MENU.map((link) => (
                  <MenuItem
                    key={link.href}
                    component={Link}
                    href={link.href}
                    selected={pathname === link.href}
                    onClick={() => setServicesAnchor(null)}
                  >
                    {t(link.key)}
                  </MenuItem>
                ))}
              </Menu>

              {NAV_HREFS_REST.map((link) => {
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

              <Button
                color="inherit"
                onClick={(e) => setMoreAnchor(e.currentTarget)}
                endIcon={<KeyboardArrowDownRoundedIcon />}
                sx={{
                  fontWeight: moreActive ? 700 : 500,
                  opacity: moreActive ? 1 : 0.85,
                  px: 1.5,
                  whiteSpace: "nowrap",
                  "&:hover": { opacity: 1 },
                }}
              >
                {t("more")}
              </Button>
              <Menu
                anchorEl={moreAnchor}
                open={Boolean(moreAnchor)}
                onClose={() => setMoreAnchor(null)}
              >
                {MORE_MENU.map((link) => (
                  <MenuItem
                    key={link.href}
                    component={Link}
                    href={link.href}
                    selected={pathname === link.href}
                    onClick={() => setMoreAnchor(null)}
                  >
                    {t(link.key)}
                  </MenuItem>
                ))}
              </Menu>
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
          <ListItemButton
            onClick={() => setServicesExpanded((v) => !v)}
            selected={servicesActive}
          >
            <ListItemText primary={t("services")} />
            <KeyboardArrowDownRoundedIcon
              sx={{
                transition: "transform 0.25s ease",
                transform: servicesExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </ListItemButton>
          <Collapse in={servicesExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {SERVICES_MENU.map((link) => (
                <ListItemButton
                  key={link.href}
                  component={Link}
                  href={link.href}
                  selected={pathname === link.href}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={t(link.key)} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          {NAV_HREFS_REST.map((link) => (
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
          <ListItemButton
            onClick={() => setMoreExpanded((v) => !v)}
            selected={moreActive}
          >
            <ListItemText primary={t("more")} />
            <KeyboardArrowDownRoundedIcon
              sx={{
                transition: "transform 0.25s ease",
                transform: moreExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </ListItemButton>
          <Collapse in={moreExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {MORE_MENU.map((link) => (
                <ListItemButton
                  key={link.href}
                  component={Link}
                  href={link.href}
                  selected={pathname === link.href}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={t(link.key)} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
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
