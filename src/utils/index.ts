/**
 * author: yangbo
 * time: 2018-08-11
 */

import { getCurrentPages } from '@tarojs/taro';
import { Action as ReduxAction } from 'redux';

/**
 * 前置补0
 */
export function fixZero(num: number, length: number): string {
  let temp: string = num.toString();
  do {
    temp = `0${temp}`;
  }
  while (temp.length < length);

  return temp;
}

/**
 * 判断数据类型
 */
export function type(value: any): string {
  return Object.prototype.toString.call(value).split(' ')[1].slice(0, -1)
    .replace(/^[A-Z]/, (p) => p.toLowerCase());
}

/**
 * 获取当前页面的路径与参数
 */
export function getCurrentPage(): CurrentPage {
  // @ts-ignore
  const pages = getCurrentPages();
  const current = pages[pages.length - 1];

  return {
    route: current.route,
    params: current.options
  };
}

interface CurrentPage {
  route: string,
  params: {
    [key: string]: any
  }
}

/**
 * 对象转URL参数
 */
export function objToParams(obj: object): string {
  const p: Array<string> = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!obj[key] && obj[key] !== 0 && obj[key] !== false) {
        p.push(`${key}=`);
      } else {
        p.push(`${key}=${obj[key]}`);
      }
    }
  }
  return '?' + p.join('&');
}

/**
 * Action封装
 */
export namespace Action {
  /**
   * Action类型
   */
  export interface Type<P = any, T = any> extends ReduxAction<string> {
    data: P | T;
  }

  /**
   * Action方法
   */
  export interface Fn<P, T> {
    (data: P): Type<P, T>;
  }

  /**
   * Action处理回调
   */
  export interface DataProcessFn<P, T> {
    (data: P): T;
  }

  /**
   * Action创建方法
   * @param actionName Action名称
   * @param dataProcessor Action处理回调
   */
  export function create<P = any, T = any>(actionName: string, dataProcessor?: Action.DataProcessFn<P, T>): Action.Fn<P, T> {
    return (data: P): Action.Type<P, T> => {
      const proceedData: P | T = dataProcessor ? dataProcessor(data) : data;
      return { type: `${actionName}`, data: proceedData };
    };
  }
}

/**
 * 全局事件
 */
export enum GlobalEvent {
  /**
   * 请求失败
   */
  REQUEST_FAIL = 'request_fail',
  /**
   * token失效
   */
  TOKEN_INVALID = 'token_invalid'
}

