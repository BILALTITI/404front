import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Watad rebrand: canonical brand tokens. */
        watad: {
          "navy-900": "#0C2740",
          "navy-700": "#123A5F",
          "blue-500": "#1B6491",
          "cyan-400": "#22B8DE",
          "cyan-300": "#3ED2F0",
          ink: "#1A1A1A",
          mist: "#E8EDF1",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
        /* Rebrand shim: the legacy `orange` utility scale now resolves to the
           Watad cyan/blue palette, so every existing *-orange-* class renders
           on-brand without touching component markup. */
        orange: {
          "50": "#EAF6FA",
          "100": "#D8EFF7",
          "200": "#B5E4F2",
          "300": "#3ED2F0",
          "400": "#22B8DE",
          "500": "#22B8DE",
          "600": "#1B6491",
          "700": "#123A5F",
          "800": "#0C2740",
          "900": "#0C2740",
          "950": "#081A2C",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
