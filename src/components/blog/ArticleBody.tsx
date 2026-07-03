import { Box, List, ListItem, Typography } from "@mui/material";
import type { BlogBlock } from "@/lib/blog";

export default function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <Box sx={{ "& > *:not(:last-child)": { mb: 3 } }}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <Typography key={index} component="h2" variant="h5" sx={{ fontWeight: 700, mt: 5 }}>
              {block.text}
            </Typography>
          );
        }
        if (block.type === "list") {
          return (
            <List key={index} sx={{ listStyleType: "disc", pl: 3 }}>
              {block.items.map((li, i) => (
                <ListItem key={i} sx={{ display: "list-item", py: 0.5, pl: 0 }}>
                  <Typography variant="body1" color="text.secondary">
                    {li}
                  </Typography>
                </ListItem>
              ))}
            </List>
          );
        }
        return (
          <Typography key={index} variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {block.text}
          </Typography>
        );
      })}
    </Box>
  );
}
