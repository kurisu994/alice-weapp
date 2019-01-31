import { action, observable, } from "mobx";

export class CounterStore {
  @observable
  public counter: number = 0;

  @action
  public counterStore = () => {
    this.counter++;
  };

  @action
  public increment = () => {
    this.counter++;
  };

  @action
  public decrement = () => {
    this.counter--;
  };

  @action
  public incrementAsync = async (): Promise<any> => {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  };
}

export default new CounterStore();