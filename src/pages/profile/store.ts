import { action, observable, } from "mobx";
import Taro from '@tarojs/taro';
import * as api from './api';

export class ProfileStore {

  @action
  public temp = async (succes?: Function): Promise<any> => {
    try {
      //const res = await api.temp();
    } catch (e) {
      Taro.showToast({ title: `失败：${e.message}`, icon: 'none' });
    }
  };
}

export default new ProfileStore();