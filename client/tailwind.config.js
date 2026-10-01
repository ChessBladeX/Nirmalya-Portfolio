/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08070d",
        foreground: "#f5f5f7",
        muted: "#A1A1A6",
        border: "rgba(255, 255, 255, 0.1)",
        card: "rgba(18, 14, 36, 0.6)",
        "card-hover": "rgba(28, 22, 54, 0.8)",
        arc: {
          violet: "#8b5cf6",
          indigo: "#6366f1",
          deep: "#4c1d95",
          luminous: "#c4b5fd",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "SF Mono",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.025em",
        tightish: "-0.01em",
      },
      boxShadow: {
        dock: "0 24px 48px -12px rgba(0, 0, 0, 0.6)",
        "glow-violet": "0 0 35px -5px rgba(139, 92, 246, 0.35)",
        "glow-ember": "0 0 25px -4px rgba(249, 115, 22, 0.4)",
        "glass-inset": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)",
      },
      animation: {
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 8s linear infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: 0.85, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.02)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
  plugins: [],
};
