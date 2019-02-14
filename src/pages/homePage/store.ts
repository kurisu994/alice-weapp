import { action, observable, } from "mobx";
import * as api from './api';
import Taro from "@tarojs/taro";

export class AccountStore {
  @observable
  public accountList: Account.Account[] = [];
  @observable
  //@ts-ignore
  public accountDetail: Account.Detail = {};

  @action
  public getList = async (): Promise<any> => {
    try {
      const res = await api.list();
      this.accountList = res.data;
    } catch (e) {
      Taro.showToast({ title: `查询失败：${e.message}`, icon: 'none' });
    }
  };

  @action
  public getDetail = async (id: number): Promise<any> => {
    try {
      const res = await api.detail(id);
      this.accountDetail = res.data;
    } catch (e) {
      Taro.showToast({ title: `查询失败：${e.message}`, icon: 'none' });
    }
  };

  @action
  public reset = (): void => {
    //@ts-ignore
    this.accountDetail = {};
  };
}

export default new AccountStore();
