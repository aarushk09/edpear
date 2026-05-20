"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    const key = "edpear-showcase-theme";
    const saved = window.localStorage.getItem(key);
    const root = document.documentElement;
    
    if (saved === "light") {
      root.classList.remove("dark");
    } else if (saved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.add("dark");
    }
  }, []);

  return null;
}
