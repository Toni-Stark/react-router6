const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(proxy("/research", { target: "https://ckd-hx.sersmed.cn" }));
  app.use(proxy("/", { target: "http://192.168.12.83:8002" }));
};
