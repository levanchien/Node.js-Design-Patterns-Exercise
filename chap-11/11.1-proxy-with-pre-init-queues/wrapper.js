export function createWrapperAsyncModule(target, methods, propName, eventName) {
  return new Proxy(target, {
    get(t, p, r) {
      /* if not initalized yet or not function call or not function to augment */
      if (typeof t[p] !== "function" || !methods.includes(p) || t[propName]) {
        return t[p];
      }

      if (!t.queueCommands) {
        t.queueCommands = [];
      }

      /* on event initalized */
      t.once(eventName, () => {
        t.queueCommands.forEach((command) => command());
        delete t.queueCommands;
      });

      return function (...args) {
        return new Promise((resolve, reject) => {
          const command = () => {
            t[p](...args).then(resolve, reject);
          };
          t.queueCommands.push(command);
        });
      };
    },
  });
}
