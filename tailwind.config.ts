import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#FFFAF0",
        foreground: "#1A1F2C",
        sidebar: {
          background: "#FFFFFF",
          hover: "#FFF8DC",
          active: "#FFE4B5",
          text: "#6B7280",
          "text-active": "#DAA520",
        },
        primary: {
          DEFAULT: "#DAA520",
          hover: "#B8860B",
          light: "#FFE4B5",
          dark: "#8B6914",
        },
        secondary: {
          DEFAULT: "#4A4A4A",
          hover: "#333333",
          light: "#666666",
          dark: "#1A1A1A",
        },
        accent: {
          DEFAULT: "#FFF8DC",
          hover: "#FFE4B5",
          light: "#FFFFFF",
          dark: "#FFD700",
        },
        gold: {
          light: "#FFD700",
          DEFAULT: "#DAA520",
          dark: "#B8860B",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;