import { dark } from "@mui/material/styles/createPalette";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "rgba(var(--color-primary-dark))",
          main: "rgba(var(--color-primary-main))",
          light: "rgba(var(--color-primary-light))",
        },
        neutral: {
          dark: "rgba(var(--color-neutral-dark))",
          main: "rgba(var(--color-neutral-main))",
          mediumMain: "rgba(var(--color-neutral-mediumMain))",
          medium: "rgba(var(--color-neutral-medium))",
          light: "rgba(var(--color-neutral-light))",
        },
        background: {
          default: "rgba(var(--color-background-default))",
          alt: "rgba(var(--color-background-alt))",
        },
      },
    },
  },
  plugins: [],
};
