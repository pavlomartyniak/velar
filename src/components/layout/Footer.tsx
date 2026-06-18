"use client";

import { useTranslations } from "next-intl";
import { Link as IntlLink } from "@/i18n/navigation";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { siteConfig } from "@/lib/site";

const NAV_HREFS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "design", href: "/design" },
  { key: "portfolio", href: "/projects" },
  { key: "configurator", href: "/configurator" },
] as const;

const SOCIALS = [
  { label: "Instagram", href: siteConfig.socials[0], icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.socials[1], icon: FacebookRoundedIcon },
  { label: "YouTube", href: siteConfig.socials[2], icon: YouTubeIcon },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "common.white",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 6 },
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1.5fr" },
          }}
        >
          {/* Бренд */}
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, letterSpacing: 4, mb: 1.5 }}
            >
              VELAR
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 320 }}>
              {t("tagline")}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <IconButton
                    key={social.label}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{
                      color: "common.white",
                      border: 1,
                      borderColor: "rgba(255,255,255,0.25)",
                      "&:hover": { borderColor: "common.white" },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                );
              })}
            </Stack>
          </Box>

          {/* Навігація */}
          <Box>
            <Typography variant="subtitle2" sx={{ opacity: 0.6, mb: 2 }}>
              {t("navTitle")}
            </Typography>
            <Stack spacing={1.25}>
              {NAV_HREFS.map((link) => (
                <Link
                  key={link.href}
                  component={IntlLink}
                  href={link.href}
                  underline="hover"
                  sx={{ color: "common.white", opacity: 0.85, width: "fit-content" }}
                >
                  {tn(link.key)}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Контакти */}
          <Box>
            <Typography variant="subtitle2" sx={{ opacity: 0.6, mb: 2 }}>
              {t("contactsTitle")}
            </Typography>
            <Stack spacing={1.25}>
              <Link
                href={`tel:${siteConfig.phone}`}
                underline="hover"
                sx={{ color: "common.white", opacity: 0.85 }}
              >
                +380 (44) 123-45-67
              </Link>
              <Link
                href={`mailto:${siteConfig.email}`}
                underline="hover"
                sx={{ color: "common.white", opacity: 0.85 }}
              >
                {siteConfig.email}
              </Link>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {t("address")}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor: "rgba(255,255,255,0.15)" }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} Velar. {t("rights")}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            {t("slogan")}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
