module.exports = {
  devServer: {
    open: true,
    port: 5500,
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#f53333",
          "link-color": "#f53333",
          "border-radius-base": "2px",
        },
      },
    },
  },
};
