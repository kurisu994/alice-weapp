declare namespace http {
  type Method = "GET" | "POST" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT";

  type Params = string | object | ArrayBuffer | JSON;

  type ResponseType = "text" | "arraybuffer";

  interface Config {
    /**
     * 请求方式
     */
    method?: Method,
    data?: Params,

    /**
     * 如果设为json，会尝试对返回的数据做一次 JSON.parse
     * @default json
     */
    readonly dataType?: string,
    readonly responseType?: ResponseType,
    readonly success?: Function,
    readonly fail?: Function,
    readonly complete?: Function,
    readonly timeout?: number,
    params?: Params,

    /**
     * 是否需要权限验证
     */
    auth?: boolean
  }

  interface FetchConfig extends Config {
    /**
     * 开发者服务接口地址
     */
    url: string,

    /**
     * 设置请求的 header，header 中不能设置 Referer
     */
    header: HeadersInit,
  }

  interface ParamsConfig extends Config {
    url?: string,
    header?: HeadersInit
  }

  interface ErrorCode {
    [key: number]: string
  }

  interface Promised<T extends any | string | ArrayBuffer = any> {
    /**
     * 开发者服务器返回的数据
     *
     * **data 数据说明：**
     *
     * 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
     *
     * *   对于 `GET` 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
     * *   对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，会对数据进行 JSON 序列化
     * *   对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
     */
    data: T
    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number
    /**
     * 开发者服务器返回的 HTTP Response Header
     *
     * @since 1.2.0
     */
    header: any,
    errMsg?: string
  }

  /**
   * server端返回的数据格式
   */
  interface ServerResponse<T> {
    readonly code: number,
    readonly success: boolean,
    readonly result: string,
    readonly data: T,
  }

  interface ParseResult<T> extends ServerResponse<T> {
    /**
     * http状态码
     */
    status: number
  }

  interface PageParam {
    /**
     * 页码
     */
    current?: number;
    /**
     * 每页数据量
     */
    pageSize?: number;
  }

  interface Page<T> {
    /**
     * 数据列表
     */
    data: Array<T>;
    /**
     * 数据总量
     */
    total: number;
  }

  interface ErrorMsg extends Error {
    errorCode?: number | string,
    errorMsg?: string
  }


}

export default http;