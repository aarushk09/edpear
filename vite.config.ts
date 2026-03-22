import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "showcase",
  css: {
    postcss: {
      plugins: [],
    },
  },
  server: {
    port: 4173,
    fs: {
      allow: [".."],
    },
  },
  build: {
    outDir: "../dist-showcase",
    emptyOutDir: true,
  },
});
