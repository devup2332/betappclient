module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      roboto: "Roboto, sans-serif",
      montserrat: "Montserrat, sans-serif;",
    },
    extend: {
      maxWidth: {
        xs: "300px",
        sm: "450px",
        modal: "500px",
        md: "768px",
        xl: "1300px",
        "2xl": "1600px",
      },
      boxShadow: {
        card: "0px 5px 15px -3px rgba(0, 0, 0, .3)",
        button: "0px 10px 15px -3px rgba(0, 0, 0, .2)",
      },
      colors: {
        primary: "#1f2a40",
        black: "#000000",
        white: "#ffffff",
        danger: "#fc031c",
        bgsidenav: "#1f2a40",
        bgsecondary: "rgba(0,0,0,0.2)",
        disabledText: "rgba(0,0,0,0.5)",
        bgbutton: "rgba(0,0,0,0.2)",
      },
      gridTemplateColumns: {
        14: "repeat(14, 1fr)",
        17: "repeat(17, 1fr)",
      },
    },
  },
  plugins: [],
};
