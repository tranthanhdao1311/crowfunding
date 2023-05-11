module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Epilogue", "sans-serif;"],
      },
      colors: {
        primaryColor: "#1DC071",
        primaryColor2: "#F1FBF7",
        secondaryColor: "#6F49FD",
        secondaryColor2: "#EEEAFD",
        darkBg: "#13131A",
        darkSecondary: "#1C1C24",
        softDark: "#22222C",
        darkSoft: "#24242C",
        darkStroke: "#3A3A43",
        darkRed2: "#422C32",
        text1: "#171725",
        text2: "#4B5264",
        text3: "#808191",
        text4: "#B2B3BD",
        iconColor: "#A2A2A8",
        white: "#FFFFFF",
        whiteSoft: "#FCFBFF",
        graySoft: "#FCFCFC",
        strock: "#F1F1F3",
        liteBg: "#FCFCFD",
        error: "#EB5757",
        redSoft: "#F9E3E3",
      },

      boxShadow: {
        customBoxShadow: "10px 10px 20px rgba(218, 213, 213, 0.15)",
        item: "0px 2px 4px rgba(184, 184, 184, 0.03), 0px 6px 12px rgba(184, 184, 184, 0.02), 0px 12px 20px rgba(184, 184, 184, 0.03)",
      },

      keyframes: {
        translateCustomActive: {
          "0%": { transform: "translateX(-100px)" },
          "100%": { transform: "translateX(0px)" },
        },
        translateCustomHidden: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-200px)" },
        },
      },

      animation: {
        translateCustomActive: "translateCustomActive 0.4s ease",
        translateCustomHidden: "translateCustomHidden 0.4s ease",
      },
    },
  },
  plugins: [],
};
