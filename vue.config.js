module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/openapi-vue' : '/',
  outputDir: './docs'
}
