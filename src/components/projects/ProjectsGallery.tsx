"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Box, Stack, Typography } from "@mui/material";
import SquareFootRoundedIcon from "@mui/icons-material/SquareFootRounded";
import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded";
import BathtubRoundedIcon from "@mui/icons-material/BathtubRounded";
import StairsRoundedIcon from "@mui/icons-material/StairsRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {
  PROJECTS,
  type Project,
  projectImage,
  projectMeta,
} from "@/data/projects";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Stat({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
      <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Stack>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const tc = useTranslations("cta");
  return (
    <Box
      component={Link}
      href={`/projects/${project.slug}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        "&:hover": { boxShadow: 4, borderColor: "transparent" },
        "&:hover img": { transform: "scale(1.06)" },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 3" }}>
        <Box
          component="img"
          src={projectImage(project.cover, 800)}
          alt={project.title}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
            bgcolor: "action.hover",
          }}
        />

        {/* Назва на градієнті — завжди видна, незалежно від наведення */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            color: "common.white",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {projectMeta(project)} · {project.location}
          </Typography>
        </Box>
      </Box>

      {/* Інформаційна панель — завжди видна під фото (доступно й на дотик) */}
      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          sx={{ flexWrap: "wrap", mb: 1.5 }}
        >
          <Stat
            icon={<SquareFootRoundedIcon fontSize="small" />}
            value={`${project.area} м²`}
          />
          <Stat
            icon={<KingBedRoundedIcon fontSize="small" />}
            value={String(project.bedrooms)}
          />
          <Stat
            icon={<BathtubRoundedIcon fontSize="small" />}
            value={String(project.bathrooms)}
          />
          <Stat
            icon={<StairsRoundedIcon fontSize="small" />}
            value={`${project.floors} пов.`}
          />
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 1.5,
            flexGrow: 1,
          }}
        >
          {project.summary}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: "center", color: "primary.main", fontWeight: 600 }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {tc("viewProject")}
          </Typography>
          <ArrowForwardRoundedIcon fontSize="small" />
        </Stack>
      </Box>
    </Box>
  );
}

export default function ProjectsGallery({ limit }: { limit?: number }) {
  const projects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <Box
      component={motion.div}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      sx={{
        display: "grid",
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
      }}
    >
      {projects.map((project) => (
        <Box key={project.slug} component={motion.div} variants={item}>
          <ProjectCard project={project} />
        </Box>
      ))}
    </Box>
  );
}
