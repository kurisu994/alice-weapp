import { action, observable, } from "mobx";
import * as api from './api';
import Taro from "@tarojs/taro";

export class AccountStore {
  @observable
  public accountList: Account.Account[] = [];
  @observable
  //@ts-ignore
  public accountDetail: Account.Detail = {};

  @observable
  public loadding: boolean = false;

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
      Taro.showLoading({
        title: '查询中',
        mask: true
      })
      const res = await api.detail(id);
      this.accountDetail = res.data;
      Taro.hideLoading()
    } catch (e) {
      Taro.showToast({ title: `查询失败：${e.message}`, icon: 'none' });
    }
  };

  @action
  public edit = (param: { }): void => {
    this.accountDetail = {
      ...this.accountDetail,
      ...param
    }
  }

  @action
  public reset = (): void => {
    //@ts-ignore
    this.accountDetail = {};
    this.loadding = false;
  };

  @action
  public save = async (sucss?: Function): Promise<any> => {
    try {
      this.loadding = true;
      const param = this.accountDetail;
      param.accountType = this.accountDetail.accountType || 1;
      console.log(param)
      const vaild = this.vaildData();
      if (vaild) {
        this.loadding = false;
        Taro.showToast({ title: `请输入完整信息`, icon: 'none' });
        return;
      }
      await api.save(param);
      await this.getList();
      this.loadding = false;
      sucss && sucss();
    } catch (e) {
      this.loadding = false;
      Taro.showToast({ title: `保存失败：${e.message}`, icon: 'none' });
    }
  };

  @action
  public generator = async (): Promise<any> => {
    try {
      const res = await api.generator();
      if (res.data) {
        this.accountDetail = {
          ...this.accountDetail,
          cipherCode: res.data
        }
      }
    } catch (e) {
      Taro.showToast({ title: `查询失败：${e.message}`, icon: 'none' });
    }
  };

  private vaildData = (): boolean => {
    const { account, cipherCode, name, accountType } = this.accountDetail;
    return !account || !cipherCode || !name || !accountType;
  }
}

export default new AccountStore();
