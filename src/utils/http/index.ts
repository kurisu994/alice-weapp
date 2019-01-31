import Taro from "@tarojs/taro";
import http from "./index_";
import ERROR_MSG from "./errorMsg";
import { GlobalEvent } from "../index";

const defaultOption: http.FetchConfig = {
  url: "",
  method: "GET",
  header: {
    // content-type 需要小写，大写会有问题
    "content-type": "application/json"
  },
  dataType: "json",
  responseType: "text",
  timeout: 10 * 1000,
  auth: true,
  params: {}
};

async function _fetch(options: http.FetchConfig): Promise<any> {
  if (options.auth) {
    try {
      const token = await Taro.getStorage({ key: "token" });
      options.header["Authorization"] = token.data;
    } catch (error) {
      Taro.eventCenter.trigger(GlobalEvent.TOKEN_INVALID);
      return Promise.reject(40104);
    }
  }

  return new Promise(async (resolve, reject) => {
    let response: http.Promised,
      _res: http.ParseResult<any>;
    try {
      //@ts-ignore
      response = await Taro.request(options);
      _res = parseResponse(response);

      if (!_res.success) {
        return reject(createError(_res));
      }
      resolve(_res);
    } catch (error) {
      // 逻辑待定
      reject(error);
    }
  });
}

/**
 * 为了保持一致的使用习惯，封装成为与axios一致的参数传入
 */
export function get<T>(requestURL: string, options?: http.ParamsConfig): Promise<http.ParseResult<T>> {
  const _header = options && options.header ?
    { ...defaultOption.header, ...options.header } : defaultOption.header;
  const _options = options ?
    { ...defaultOption, ...options, header: _header } : defaultOption;

  _options.method = "GET";
  _options.url = requestURL;
  _options.data = _options.data || _options.params;

  return _fetch(_options);
}

/**
 * 为了保持一致的使用习惯，封装成为与axios一致的参数传入
 */
export function post<T>(requestURL: string, params: any, options?: http.ParamsConfig): Promise<http.ParseResult<T>> {
  const _header = options && options.header ?
    { ...defaultOption.header, ...options.header } : defaultOption.header;
  const _options = options ?
    { ...defaultOption, ...options, header: _header } : defaultOption;

  _options.method = "POST";
  _options.url = requestURL;
  _options.data = _options.data || params;

  return _fetch(_options);
}

export default { get, post };

function parseResponse<T>(response: http.Promised): http.ParseResult<T> {
  let status: number = response.statusCode,
    success: boolean = false,
    code: number,
    result: string,
    data: any,
    _res: http.ServerResponse<T> = response.data,
    isOK: boolean = false;


  code = _res.code;
  // @ts-ignore
  result = _res.result || _res.message;

  data = _res.data;

  if (response.errMsg) {
    isOK = response.errMsg.indexOf("ok") > -1;
  }

  if (isOK && _res.success && _res.code >= 0) {
    success = true;
  }

  if (status === 401) {
    Taro.eventCenter.trigger(GlobalEvent.TOKEN_INVALID);
  }

  return { status, code, success, result, data };
}

function createError<T>(responseError: http.ParseResult<T> | number): http.ErrorMsg {
  let errorCode: number | string,
    message: string,
    error: http.ErrorMsg;

  if (typeof responseError === "number") {
    errorCode = responseError;
    message = ERROR_MSG[responseError] || "发生了预期之外的错误";
  } else {
    errorCode = responseError.code;
    message = responseError.result;
  }

  error = new Error(message);
  error.errorCode = errorCode;
  error.message = message;

  return error;
}
