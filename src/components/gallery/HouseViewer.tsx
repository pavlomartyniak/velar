"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
import { useProgress } from "@react-three/drei";
import type { Model3D } from "@/lib/models";

const ModelViewerScene = dynamic(() => import("@/components/shared/ModelViewerScene"), {
  ssr: false,
});

/**
 * Повноекранний режим: спершу нативний Fullscreen API (десктоп, Android
 * Chrome), а якщо недоступний — CSS-псевдо-повний екран. iOS Safari не
 * завжди підтримує requestFullscreen для довільних елементів.
 */
function useFullscreen(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fakeFullscreen, setFakeFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      if (document.fullscreenElement === containerRef.current) {
        setIsFullscreen(true);
      } else if (!fakeFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [containerRef, fakeFullscreen]);

  useEffect(() => {
    document.body.style.overflow = fakeFullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fakeFullscreen]);

  const enter = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      try {
        await el.requestFullscreen();
        return;
      } catch {
        // падаємо назад на CSS-фолбек
      }
    }
    setFakeFullscreen(true);
    setIsFullscreen(true);
  }, [containerRef]);

  const exit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setFakeFullscreen(false);
    setIsFullscreen(false);
  }, []);

  return { isFullscreen, fakeFullscreen, enter, exit };
}

function LoadingOverlay({ thumbnail, label }: { thumbnail: string; label: string }) {
  const { progress } = useProgress();
  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Image
        src={thumbnail}
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover", filter: "blur(18px)", transform: "scale(1.1)" }}
      />
      <Stack
        spacing={1.5}
        sx={{
          position: "absolute",
          inset: 0,
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0,0,0,0.35)",
          color: "common.white",
        }}
      >
        <CircularProgress size={32} sx={{ color: "common.white" }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {label} {Math.round(progress)}%
        </Typography>
      </Stack>
    </Box>
  );
}

export default function HouseViewer({ house }: { house: Model3D }) {
  const t = useTranslations("gallery");
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, fakeFullscreen, enter, exit } = useFullscreen(containerRef);
  const [ready, setReady] = useState(false);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: isFullscreen ? "background.default" : "transparent",
        ...(fakeFullscreen && {
          position: "fixed",
          inset: 0,
          zIndex: 1400,
          p: { xs: 1.5, sm: 3 },
        }),
        ...(isFullscreen && { height: fakeFullscreen ? "100dvh" : "100%" }),
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: isFullscreen ? "auto" : { xs: "4 / 3.6", sm: "16 / 9" },
          flexGrow: isFullscreen ? 1 : 0,
          minHeight: 0,
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "action.hover",
        }}
      >
        <ModelViewerScene modelUrl={house.file} onReady={() => setReady(true)} />
        {!ready && <LoadingOverlay thumbnail={house.thumbnail} label={t("loading")} />}
        <IconButton
          onClick={isFullscreen ? exit : enter}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(255,255,255,0.85)",
            "&:hover": { bgcolor: "common.white" },
          }}
        >
          {isFullscreen ? (
            <FullscreenExitRoundedIcon fontSize="small" />
          ) : (
            <FullscreenRoundedIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {!isFullscreen && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, textAlign: "center" }}>
          {t("dragHint")}
        </Typography>
      )}

      {!isFullscreen && (
        <Typography
          component={Link}
          href="/gallery"
          variant="body2"
          sx={{
            display: "inline-block",
            mt: 3,
            fontWeight: 600,
            color: "primary.main",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          ← {t("backToGallery")}
        </Typography>
      )}
    </Box>
  );
}
