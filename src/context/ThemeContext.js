// src/context/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./../Styles/themes";

// 👉 contexto que usará todo el header y la app
export const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("themeMode");
      if (saved) setMode(saved);
      else setMode("light");
    } catch (err) {
      console.warn("⚠️ No se pudo leer el modo de tema:", err);
      setMode("light");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("themeMode", mode);
    } catch (err) {
      console.warn("⚠️ No se pudo guardar el modo de tema:", err);
    }
  }, [mode]);

  const toggleTheme = () => setMode((m) => (m === "light" ? "dark" : "light"));

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
