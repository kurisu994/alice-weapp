import { action, observable, } from "mobx";
import Taro from '@tarojs/taro';
import * as api from './api';

export class LoginStore {
  @observable
  public loginInfo: Login.LoginInfo = {};

  @action
  public authentication = async (code: string, succes: Function): Promise<any> => {
    try {
      const res = await api.auth(code);
      succes && succes(res.data);
    } catch (e) {
      console.log(e.message);
      Taro.showToast({ title: `授权失败：${e.message}`, icon: 'none' });
    }
  };

  @action
  public login = async (succes: Function): Promise<any> => {
    try {
      const res = await api.login(this.loginInfo);
      succes && succes(res.data);
    } catch (e) {
      console.log(e.message);
      Taro.showToast({ title: `登录失败：${e.message}`, icon: 'none' });
    }
  };
  @action
  public changeParam = (option: {}) => {
    try {
      const _param = {
        ...this.loginInfo,
        ...option,
      };
      this.loginInfo = _param;
    } catch (e) {
      console.log(e.message);
    }
  };
}

export default new LoginStore();