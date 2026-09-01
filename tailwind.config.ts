import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#101835",
        gold: "#9E7849",
        "gold-light": "#C7A875",
        ivory: "#F7F3EC",
        charcoal: "#292B32",
        line: "rgba(158, 120, 73, 0.28)"
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(16, 24, 53, 0.13)"
      }
    }
  },
  plugins: []
};

export default config;
