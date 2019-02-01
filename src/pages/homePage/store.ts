import { action, observable, } from "mobx";
import * as api from './api';
import Taro from "@tarojs/taro";

export class AccountStore {
  @observable
  public accountList: Account.Account[] = [];

  @action
  public getList = async (): Promise<any> => {
    try {
      const res = await api.list();
      this.accountList = res.data;
    } catch (e) {
      console.log(e.message);
      Taro.showToast({ title: `查询失败：${e.message}`, icon: 'none' });
    }
  };
}

export default new AccountStore();
