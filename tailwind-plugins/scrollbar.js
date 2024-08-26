const plugin = require("tailwindcss/plugin");

const scrollbarHide = plugin(function ({ addUtilities }) {
  addUtilities({
    ".hide-scrollbar": {
      "scrollbar-width": "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    ".custom-scrollbar": {
      "&::-webkit-scrollbar": {
        display: "none",
      },

      /* Track */
      "&::-webkit-scrollbar-track": {
        display: "none",
      },

      "&:hover": {
        /* width */
        "&::-webkit-scrollbar": {
          display: "block",
          width: "2px",
        },

        /* Handle */
        "&::-webkit-scrollbar-thumb": {
          background: "#15e6b7",
          "border-radius": "50px",
        },
      },
    },
  });
});

module.exports = scrollbarHide;
