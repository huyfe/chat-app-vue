

const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "./assets/scss/default.scss";
        `
      }
    }
  },
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }

})
