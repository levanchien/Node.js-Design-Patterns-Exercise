import AsyncModule from "./async-module.js";
import { createWrapperAsyncModule } from "./wrapper.js";

const asyncModule = new AsyncModule();
const asyncModuleWrapper = createWrapperAsyncModule(
  asyncModule,
  ["isEven"],
  "initalized",
  "initalized"
);
asyncModuleWrapper.initModule();
asyncModuleWrapper.isEven(2).then(console.log);
console.log(asyncModuleWrapper.isOdd(2));
console.log(asyncModuleWrapper.initalized);
setTimeout(() => {
  asyncModuleWrapper.isEven(5).then(console.log);
}, 5500);
