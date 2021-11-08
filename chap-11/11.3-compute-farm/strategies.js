import vm from "vm";

export const vmStrategy = {
  evalute(code) {
    return vm.runInNewContext(code);
  },
};

export const evalStrategy = {
  evalute(code) {
    return eval(code);
  },
};
