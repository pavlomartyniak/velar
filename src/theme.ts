"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: { main: "#141414" },
    background: { default: "#fafafa" },
  },
  shape: { borderRadius: 8 },
  typography: {
    button: { textTransform: "none", fontWeight: 600 },
  },
});

export default responsiveFontSizes(theme);
