module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/unsplash-test/'
    : '/',
  outputDir: 'docs'
}
