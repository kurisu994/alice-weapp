import { action, observable, } from "mobx";
import * as api from './api';

export class CounterStore {
  @observable
  public counter: number = 0;

  @action
  public authentication = async (code: string, succes: Function): Promise<any> => {
    try {
      const res = await api.auth(code);
      res.data;
      succes&&succes();
    } catch (e) {
      
    }
  };
}

export default new CounterStore();