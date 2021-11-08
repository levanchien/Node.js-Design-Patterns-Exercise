import vm from "vm";

export default class ComupteFarm {
  constructor() {}

  evalute(code) {
    return vm.runInNewContext(code);
  }
}
