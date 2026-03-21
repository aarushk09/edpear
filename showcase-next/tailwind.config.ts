import type { Config } from "tailwindcss";

/* Semantic colors and radii come from styles/edpear.css (@theme inline).
   Only extend what the design tokens file does not define. */
const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;
