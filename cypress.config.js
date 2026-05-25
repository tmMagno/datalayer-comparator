const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://tmMagno.github.io/datalayer-comparator",
    setupNodeEvents(on, config) {},
  },
});