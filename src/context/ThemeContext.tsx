/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { PaletteMode } from "@mui/material";
import { getTheme } from "../themes/theme";
interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleTheme: () => {},
});
export const useThemeContext = () => useContext(ThemeContext);
export const CustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  useEffect(() => {
    const saved = localStorage.getItem("theme") as PaletteMode | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setMode(saved || (prefersDark ? "dark" : "light"));
  }, []);
  const toggleTheme = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("theme", next);
  };
  const theme = useMemo(() => getTheme(mode), [mode]);
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
