export const appConfig = {
  VERSION: "v1.1.0",

  server: {
    dev: {
      API_PROTOCOL: "http://",
      // API_HOST: "10.1.1.111",
      API_HOST: "localhost:5050",
      HOST_PORT: "/api",
    },
    prod: {
      API_PROTOCOL: "http://",
      // API_HOST: "app.icst-edu.com",
      API_HOST: "app.icst-edu.com",
      HOST_PORT: "50188/api/v2",
    },
  },
};

export const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? `${appConfig.server.dev.API_PROTOCOL}${appConfig.server.dev.API_HOST}:${appConfig.server.dev.HOST_PORT}`
    : `${appConfig.server.prod.API_PROTOCOL}${appConfig.server.prod.API_HOST}:${appConfig.server.prod.HOST_PORT}`;
