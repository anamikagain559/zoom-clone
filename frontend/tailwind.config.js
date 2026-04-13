/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "primary": "#ba9eff",
        "primary_dim": "#8455ef",
        "surface": "#0e0e0e",
        "surface_container_low": "#131313",
        "surface_container_high": "#20201f",
        "surface_container_highest": "#2c2c2c",
        "on_surface_variant": "#adaaaa",
        "surface_tint": "#ba9eff",
        "outline_variant": "rgba(186, 158, 255, 0.2)", // Ghost Border fallback
        "background": "#0e0e0e",
        "on_surface": "#ffffff",
        "on_primary": "#000000",
        "secondary_container": "#5e2c91",
        "on_secondary_container": "#e3c4ff",
        "primary_container": "#ae8dff",
        "on_primary_container": "#2b006e",
        "tertiary": "#ff97b5",
        "error": "#ff6e84"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.5rem", // 8px strictly
        "xl": "0.75rem",
        "full": "9999px"
      },
      "letterSpacing": {
        "tight_md": "-0.02em", // Display & Headline
        "widest_lg": "0.05em"  // Label Metadata
      },
      "fontFamily": {
        "sans": ["Inter", "sans-serif"],
        "headline": ["Inter"],
        "body": ["Inter"],
        "label": ["Inter"]
      }
    },
  },
  plugins: [],
}
