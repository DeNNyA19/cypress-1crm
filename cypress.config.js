const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'https://demo.1crmcloud.com/',
    theme: 'Claro',
    language: 'en_us',
    username: 'admin',
    password: 'admin'
  },
});
