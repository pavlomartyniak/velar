"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { animate, useInView } from "framer-motion";
import { Box, Typography } from "@mui/material";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  sx?: object;
};

export default function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  aspectRatio = "4 / 5",
  sx,
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });
  const [value, setValue] = useState(50);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (!inView || interacted) return;
    const controls = animate(50, [28, 70, 50], {
      duration: 2.4,
      delay: 0.5,
      ease: "easeInOut",
      onUpdate: (latest: number) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, interacted]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio,
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "action.hover",
        userSelect: "none",
        cursor: "ew-resize",
        ...sx,
      }}
    >
      <Box
        component="img"
        src={afterSrc}
        alt={afterAlt}
        loading="lazy"
        draggable={false}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      <Box
        component="img"
        src={beforeSrc}
        alt={beforeAlt}
        loading="lazy"
        draggable={false}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          clipPath: `inset(0 ${100 - value}% 0 0)`,
        }}
      />

      {(beforeLabel || afterLabel) && (
        <>
          {beforeLabel && (
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                px: 1.25,
                py: 0.5,
                borderRadius: 1,
                bgcolor: "rgba(0,0,0,0.55)",
                color: "common.white",
                fontWeight: 600,
                letterSpacing: 0.5,
                pointerEvents: "none",
                opacity: value > 12 ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            >
              {beforeLabel}
            </Typography>
          )}
          {afterLabel && (
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                px: 1.25,
                py: 0.5,
                borderRadius: 1,
                bgcolor: "rgba(0,0,0,0.55)",
                color: "common.white",
                fontWeight: 600,
                letterSpacing: 0.5,
                pointerEvents: "none",
                opacity: value < 88 ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            >
              {afterLabel}
            </Typography>
          )}
        </>
      )}

      {/* Divider line */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${value}%`,
          width: "2px",
          bgcolor: "common.white",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      {/* Handle */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: `${value}%`,
          width: 44,
          height: 44,
          borderRadius: "50%",
          bgcolor: "common.white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
          pointerEvents: "none",
        }}
      >
        <UnfoldMoreRoundedIcon
          sx={{ transform: "rotate(90deg)", color: "text.primary" }}
        />
      </Box>

      <Box
        component="input"
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={value}
        onChange={handleChange}
        onPointerDown={() => setInteracted(true)}
        onTouchStart={() => setInteracted(true)}
        aria-label={
          beforeLabel && afterLabel
            ? `${beforeLabel} / ${afterLabel}`
            : "Compare slider"
        }
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          margin: 0,
          opacity: 0,
          cursor: "ew-resize",
        }}
      />
    </Box>
  );
}
