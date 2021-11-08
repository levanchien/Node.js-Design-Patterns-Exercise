import { EventEmitter } from "events";

export default class AsyncModule extends EventEmitter {
  constructor() {
    super();
    this.initalized = false;
  }

  initModule() {
    setTimeout(() => {
      this.initalized = true;
      this.emit("initalized");
    }, 5000);
  }

  isOdd(num) {
    return num % 2 !== 0;
  }

  async isEven(num) {
    if (!this.initalized) {
      throw new Error("Module is not initalized yet !");
    }
    return num % 2 === 0;
  }
}
