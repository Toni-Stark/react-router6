import axios, { AxiosInstance } from "axios";
import moment from "moment";
import { SERVER_URL } from "./api";

const qs = require("qs");

const baseURL = SERVER_URL;

// class ---------------------------------------------------
export interface ApiResultInterface {
  code?: number;
  message: string;
  result: any;
  success: boolean;
  timestamp: string;
}

export type ApiResult = ApiResultInterface;

export type RestfulOperateType = "get" | "post" | "put" | "patch" | "delete";

export type ApiParam = {
  url: string;
  params?: object;
  withToken?: boolean;
  multipart?: boolean;
};

export class Api {
  static get getInstance() {
    return this.instance || (this.instance = new this());
  }

  static instance: Api;
  public token = localStorage.getItem("token");

  readonly _api: AxiosInstance;
  readonly timeout: number = 10000;

  constructor() {
    this._api = axios.create({
      baseURL,
      timeout: this.timeout,
    });

    this._api.interceptors.request.use((config) => {
      config.data = qs.stringify(config.data);
      return config;
    });
    this._api.interceptors.response.use(async (response) => {
      if (response.data.errno === 999900) {
        const messageToUser = "登录失效";
        if (this.token) {
          await localStorage.removeItem("token");
          await Api.redirectToLoginScreen();
        } else {
          return {
            code: response.data.errno,
            message: messageToUser,
            result: response.data.result,
            success: false,
            timestamp: Api.getTimeStamp(),
          };
        }
      }
      return response;
    });
  }

  private static getTimeStamp(): string {
    return moment().format("x");
  }

  static async redirectToLoginScreen() {
    console.log("未登录或者登录失效");
  }

  private async RestfulOperate(
    operate: RestfulOperateType,
    url: string,
    params: any,
    withToken: boolean,
    multipart: boolean
  ): Promise<ApiResult> {
    let response: any;
    const headers = {
      Authorization: "",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    if (withToken) {
      if (this.token === null) {
        await Api.redirectToLoginScreen();
        return {
          code: 401,
          message: "登录失效",
          result: null,
          success: false,
          timestamp: Api.getTimeStamp(),
        };
      } else {
        headers["Authorization"] = this.token;
      }
    }
    if (multipart) {
      headers["Content-Type"] = "multipart/form-data";
    }

    switch (operate) {
      case "get":
        response = await this._api.get(url, { params, headers });
        break;
      case "post":
        response = await this._api.post(url, params, { headers });
        break;
      case "put":
        response = await this._api.put(url, params, { headers });
        break;
      case "patch":
        response = await this._api.patch(url, params, { headers });
        break;
      case "delete":
        response = await this._api.delete(url, { params, headers });
        break;
      default:
        return {
          code: 500,
          message: "消息格式错误",
          result: null,
          success: false,
          timestamp: Api.getTimeStamp(),
        };
    }

    switch (response.data.errno) {
      case 0:
        return {
          code: response.data.errno,
          message: response.data.error,
          result: response.data.data,
          success: true,
          timestamp: Api.getTimeStamp(),
        };
      // case CLIENT_ERROR:
      // case SERVER_ERROR:
      //   if (response.data?.message !== undefined) {
      //     return {
      //       code: response.data.status,
      //       message: response.data.message,
      //       result: response.data.result,
      //       success: false,
      //       timestamp: Api.getTimeStamp(),
      //     };
      //   } else if (response.status === 404) {
      //     return {
      //       code: response.status,
      //       message: "服务器地址错误",
      //       result: null,
      //       success: false,
      //       timestamp: Api.getTimeStamp(),
      //     };
      //   } else {
      //     return {
      //       code: response.status,
      //       message: "访问服务器资源发生错误",
      //       result: null,
      //       success: false,
      //       timestamp: Api.getTimeStamp(),
      //     };
      //   }
      // case TIMEOUT_ERROR:
      //   return {
      //     code: response.status,
      //     message: "访问服务器超时",
      //     result: null,
      //     success: false,
      //     timestamp: Api.getTimeStamp(),
      //   };
      // case CONNECTION_ERROR:
      //   return {
      //     code: response.status,
      //     message: "无法访问服务器",
      //     result: null,
      //     success: false,
      //     timestamp: Api.getTimeStamp(),
      //   };
      // case NETWORK_ERROR:
      //   return {
      //     code: response.status,
      //     message: "无法访问服务器",
      //     result: null,
      //     success: false,
      //     timestamp: Api.getTimeStamp(),
      //   };
      // case CANCEL_ERROR:
      default:
        return {
          code: response.data.errno,
          message: "发生未知错误",
          result: null,
          success: false,
          timestamp: Api.getTimeStamp(),
        };
    }
  }

  async get(param: ApiParam): Promise<ApiResult> {
    const { url, params = {}, withToken = true } = param;
    return this.RestfulOperate("get", url, params, withToken, false);
  }

  async post(param: ApiParam): Promise<ApiResult> {
    const { url, params = {}, withToken = true, multipart = false } = param;
    return this.RestfulOperate("post", url, params, withToken, multipart);
  }

  async put(param: ApiParam): Promise<ApiResult> {
    const { url, params = {}, withToken = true } = param;
    return this.RestfulOperate("put", url, params, withToken, false);
  }

  async patch(param: ApiParam): Promise<ApiResult> {
    const { url, params = {}, withToken = true } = param;
    return this.RestfulOperate("patch", url, params, withToken, false);
  }

  async delete(param: ApiParam): Promise<ApiResult> {
    const { url, params = {}, withToken = true } = param;
    return this.RestfulOperate("delete", url, params, withToken, false);
  }
}
