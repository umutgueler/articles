const path = require('path')


export default {
 
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    port: 6660,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:6006',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\//, ""),
      }
    }
  }
};

