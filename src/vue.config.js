module.exports = {
  configureWebpack: {},
  devServer: {
    host: 'localhost',
    hot: true,
    port: 5173,
    open: 'Chrome',
    proxy: {
      //https://cli.vuejs.org/guide/html-and-static-assets.html#disable-index-generation
      '/*': {
        //everything from root
        target: 'http://localhost:7777',
        secure: false,
        ws: false,
      },
      '/ws/': {
        //web sockets
        target: 'http://localhost:7777',
        secure: false,
        ws: true,
      },
      '!/': {
        //except root, which is served by webpack's devserver, to faciliate instant updates
        target: 'http://localhost:7777/',
        secure: false,
        ws: false,
      },
    },
  },
}
