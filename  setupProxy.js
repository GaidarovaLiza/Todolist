const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://social-network.samuraijs.com/api/1.0",
      changeOrigin: true,
    })
  );
};
