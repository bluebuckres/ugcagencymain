import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-cream)",
        foreground: "var(--color-ink)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)"],
        sans: ["var(--font-dm-sans)"],
        mono: ["var(--font-dm-mono)"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
