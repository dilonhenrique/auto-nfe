// import { dark, light } from "./src/lib/theme/color";
import { heroui } from "@abstrato/hero-ui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // manrope: "var(--font-manrope)",
        // michroma: "var(--font-michroma)",
      },
      fontSize: {
        "display-4xl": ["2rem", { lineHeight: "1.25em", fontWeight: "700" }],
        "display-3xl": ["1.75rem", { lineHeight: "1.25em", fontWeight: "700" }],
        "display-2xl": ["1.5rem", { lineHeight: "1.25em", fontWeight: "700" }],
        "title-3xl": ["1.75rem", { lineHeight: "1.25em", fontWeight: "500" }],
        "title-2xl": ["1.5rem", { lineHeight: "1.25em", fontWeight: "500" }],
        "title-xl": ["1.25rem", { lineHeight: "1.25em", fontWeight: "500" }],
        "title-lg": ["1.125rem", { lineHeight: "1.25em", fontWeight: "500" }],
        "title-md": ["1rem", { lineHeight: "1.25em", fontWeight: "500" }],
        "title-sm": ["0.875rem", { lineHeight: "1.25em", fontWeight: "500" }],
        "body-md": ["1rem", { lineHeight: "1.25em", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.25em", fontWeight: "400" }],
        "body-xs": ["0.75rem", { lineHeight: "1.25em", fontWeight: "400" }],
        "body-2xs": ["0.625rem", { lineHeight: "1.25em", fontWeight: "400" }],
        "label-lg": ["1.125rem", { lineHeight: "1.25em", fontWeight: "600" }],
        "label-md": ["1rem", { lineHeight: "1.25em", fontWeight: "600" }],
        "label-sm": ["0.875rem", { lineHeight: "1.25em", fontWeight: "600" }],
        "label-xs": ["0.75rem", { lineHeight: "1.25em", fontWeight: "600" }],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: { hoverOpacity: 0.6 },
      themes: {
        // light: { colors: light },
        // dark: { colors: dark },
      },
    }),
  ],
};
export default config;
