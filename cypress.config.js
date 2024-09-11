const { defineConfig } = require('cypress');
const { configurePlugin } = require('cypress-mongodb');


module.exports = defineConfig({
  env: {
    mongodb: {
      uri: 'mongodb+srv://dba:admin123@bookapi.ob3nk.mongodb.net/?retryWrites=true&w=majority&appName=BookApi',
      database: 'test',
      collection: 'books'
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on)
    },
  },
});
