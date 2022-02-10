module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      roboto: "Roboto, sans-serif",
      montserrat: "Montserrat, sans-serif;",
    },
    extend: {
      maxWidth: {
        xs: "300px",
        sm: "450px",
      },
      boxShadow: {
        card: "0px 5px 15px -3px rgba(0, 0, 0, .3)",
        button: "0px 10px 15px -3px rgba(0, 0, 0, .2)",
      },
      colors: {
        primary: "#4062BB",
        black: "#000000",
        white: "#ffffff",
        danger: "#fc031c",
      },
    },
  },
  plugins: [],
};
