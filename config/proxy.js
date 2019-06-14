module.exports = {
  "/api/*": {
    target: "http://localshot:3001",
    // pathRewrite: {
    //   "^/api": ""
    // },
    changeOrigin: true
  }
}
