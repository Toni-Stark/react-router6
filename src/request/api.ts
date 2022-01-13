export const appConfig = {
  VERSION: "v1.1.0",

  server: {
    dev: {
      API_PROTOCOL: "https://",
      // API_PROTOCOL: "http://",
      API_HOST: "ckd-hx.sersmed.cn/api",
      // API_HOST: "192.168.12.83:8002/api",
    },
    prod: {
      API_PROTOCOL: "",
      API_HOST: "/api",
    },
  },
};

export const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? `${appConfig.server.dev.API_PROTOCOL}${appConfig.server.dev.API_HOST}`
    : `${appConfig.server.prod.API_PROTOCOL}${appConfig.server.prod.API_HOST}`;
