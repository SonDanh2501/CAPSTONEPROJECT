/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  darkMode: "class",
  theme: {
    fontFamily: {
      main: ["Marcellus", "ui-serif"],
      'mono': ['ui-monospace', 'SFMono-Regular'],
    },
    extend: {
      width: {
        main: "1380px",
      },
      colors: {
        main: "#ee3131",
        overlay: "rgba(0,0,0,0.7)",
        dark: "#232A3C",
        medium: "#293245",
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.18)",
        login: "#061027",
        orange: "#F28123",
        "login-2": "#07386e",
        "dash-board": "#F1F5F9",
        io1: "#DBEAFE",
        io2: "#F3E8FF",
        io3: "#D2F4EE",
        io4: "#FEE2E2",
        io5: "#F3F5B6",
        io6: "#F4C3F7",
        slidebar_active: "#EEF6FE",
        // Dark Mode
        "header-bg-dark": "#132236",
        "icon-bg-dark": "#6F86A7",
        "footer-bg-dark": "#EEF1E4",
        // Dark Mode (Header Tab Personal)
        "font-bg-dark": "#90AFD2",
        "header-bg-dark-tab": "#1D2F45",
        "header-bg-dark-tab-font": "#557FB5",
        "notification-bg-dark-active-tab": "#1C2E45",
        // Dark Mode (Notication)
        "bg-select-tab": "#223A56",

        // Light Mode
        // Font
        "font-normal": "#163121",
        // Header
        "header-bg-light": "#FEFEFF",
        // Footer
        "bg-light": "#EEF1E4",
        // Button
        "button-color": "#173021",
        "button-color-hover": "#B6C4B6",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(20px);",
            transform: "translateY(40px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0px);",
            transform: "translateY(0px);",
          },
        },
        "slide-top-sm": {
          "0%": {
            "-webkit-transform": "translateY(8px);",
            transform: "translateY(8px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0px);",
            transform: "translateY(0px);",
          },
        },
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-1000px);",
            transform: "translateX(-1000px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0px);",
            transform: "translateX(0px);",
          },
        },
        "scale-up-ver-center": {
          "0%": {
            "-webkit-transform": "scaleY(0.4);",
            transform: "scaleY(0.4);",
          },
          "100%": {
            "-webkit-transform": " scaleY(1);",
            transform: "scaleY(1);",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-top-sm": "slide-top-sm 0.2s linear both;",
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "scale-up-center":
          "scale-up-ver-center 0.15s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
      },
      rotate: {
        "360": "360deg",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};