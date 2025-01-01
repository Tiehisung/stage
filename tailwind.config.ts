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
        primaryGreen: "var(--primary-green)",
        modalOverlay: "var(--modal-overlay)",
        lightGray: "var(--light-gray)",
        deepBlue: "var(--deep-blue)",
        arsh: "var(--arsh)",
        arshTrans: "var(--arsh-trans)",
        // dedicated
        players: "var(--players)",
        playersLite: "var(--players-lite)",
        sponsors: "var(--sponsors)",
        sponsorsLite: "var(--sponsors-lite)",
        home: "var(--home)",
        homeLite: "var(--home-lite)",
        fixtures: "var(--fixtures)",
        fixturesLite: "var(--fixtures-lite)",
        results: "var(--results)",
        resultsLite: "var(--results-lite)",
        contact: "var(--contact)",
        contactLite: "var(--contact-lite)",

        // background gray
        background: "#edeef3",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        breakfast2: "./src/public/images/breakfast2.jpg",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
