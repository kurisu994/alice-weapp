import { action, observable, } from "mobx";
import Taro from '@tarojs/taro'

export class CounterStore {
  @observable
  public counter: number = 0;

  @action
  public increment = async (): Promise<any> => {
    const _auth = await Taro.login();
    console.log(_auth);
  };
}

export default new CounterStore();