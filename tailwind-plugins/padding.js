const plugin = require("tailwindcss/plugin");

const paddedHorizontal = plugin(function ({ addUtilities }) {
  addUtilities({
    ".padded-horizontal": {
      "padding-left": "calc((100% - 1280px) / 2)",
      "padding-right": "calc((100% - 1280px) / 2)",
    },
    ".padded-horizontal-narrow": {
      "padding-left": "calc((100% - 960px) / 2)",
      "padding-right": "calc((100% - 960px) / 2)",
    },
    ".padded-horizontal-wide": {
      "padding-left": "calc((100% - 768px) / 2)",
      "padding-right": "calc((100% - 768px) / 2)",
    },

    "@media only screen and (max-width: 1320px)": {
      ".padded-horizontal": {
        "padding-left": "20px",
        "padding-right": "20px",
      },
    },

    "@media only screen and (max-width: 1000px)": {
      ".padded-horizontal-narrow": {
        "padding-left": "20px",
        "padding-right": "20px",
      },
    },

    "@media only screen and (max-width: 768px)": {
      ".padded-horizontal-wide": {
        "padding-left": "20px",
        "padding-right": "20px",
      },
    },
  });
});

module.exports = paddedHorizontal;
