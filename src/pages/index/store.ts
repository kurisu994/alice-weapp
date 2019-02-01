import { action, observable, } from "mobx";
import * as api from './api';

export class CounterStore {
  @observable
  public counter: number = 0;

  @action
  public authentication = async (code: string, succes: Function): Promise<any> => {
    try {
      //const res = await api.auth(code);
      console.log(code);
      succes&&succes();
    } catch (e) {
      console.log(e.message);
    }
  };
}

export default new CounterStore();