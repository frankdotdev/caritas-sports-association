import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11130F",
        panel: "#1D2019",
        raised: "#292D24",
        lime: "#B8FF16",
        muted: "#92978B"
      }
    }
  },
  plugins: []
};
export default config;
