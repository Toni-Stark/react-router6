import axios, { AxiosInstance } from "axios";
import moment from "moment";
import { SERVER_URL } from "./api";
import { message } from "antd";

const qs = require("qs");

const baseURL = SERVER_URL;

// class ---------------------------------------------------
export interface ApiResultInterface {
  errno?: number;
  error: string;
  data: any;
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
  // public token = "Bearer DfoJgzS0gpAXPPkSUvJ9zlG8QMUNx3cF";
  public token = localStorage.getItem("h_search");
  readonly _api: AxiosInstance;
  readonly timeout: number = 300000;

  constructor() {
    this._api = axios.create({
      baseURL,
      timeout: this.timeout,
    });

    this._api.interceptors.request.use((config) => {
      config.data = qs.stringify(config.data);
      return config;
    });
    this._api.interceptors.response.use(
      async (response: any) => {
        if (response.data.errno === 999900) {
          if (this.token) {
            await localStorage.removeItem("h_search");
            await Api.redirectToLoginScreen(response.data);
          }
        }
        if (
          response.status >= 200 &&
          response.status <= 300 &&
          response.data.error !== 999900
        ) {
          return response.data;
        } else if (response.status >= 400) {
          let data = response.data;
          if (data) {
            message.error(data?.error);
          }
          return data;
        }
      },
      (error) => {
        return {
          errno: 0,
          error: error,
          data: null,
          success: false,
          timestamp: Api.getTimeStamp(),
        };
      }
    );
  }

  private static getTimeStamp(): string {
    return moment().format("x");
  }

  static async redirectToLoginScreen(data?: any) {
    message.destroy();
    message.error(`${data.error}，即将跳转回首页`);
    setTimeout(() => {
      window.location.href = data?.url || "https://ckd.sersmed.cn/login";
    }, 5000);
  }

  private async RestfulOperate(
    operate: RestfulOperateType,
    url: string,
    params: any,
    withToken: boolean,
    multipart: boolean
  ): Promise<ApiResult> {
    let response: any;
    const headers: any = {
      Authorization: "",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    if (withToken) {
      headers["Authorization"] = this.token;
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
          errno: 500,
          error: "请求格式错误",
          data: null,
          success: false,
          timestamp: Api.getTimeStamp(),
        };
    }
    switch (response.errno) {
      case 0:
        return {
          errno: response.errno,
          error: response.error,
          data: response.data,
          success:
            typeof response.success === "boolean" ? response.success : true,
          timestamp: Api.getTimeStamp(),
        };
      case 999900:
        return Promise.reject({
          errno: response.errno,
          error: response.error,
          data: null,
          success: false,
          timestamp: Api.getTimeStamp(),
        });
      default:
        return {
          errno: response.errno,
          error: response.error,
          data: null,
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
