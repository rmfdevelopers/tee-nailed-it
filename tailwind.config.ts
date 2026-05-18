import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF1493",
        secondary: "#F4C2C2",
        accent: "#FFFFFF"
      },
      fontFamily: {
        heading: ["Playfair Display"],
        sans: ["Outfit"]
      }
    }
  }
} satisfies Config;