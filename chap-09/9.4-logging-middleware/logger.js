module.exports = class Logger {
  constructor() {
    this.middlwares = [];
  }

  log(message) {
    this.executeMiddleware(message);
  }

  use(middleware) {
    this.middlwares.push(middleware);
    return this;
  }

  async executeMiddleware(message) {
    let newMessage = message;
    for await (const middlewareFunc of this.middlwares) {
      newMessage = await middlewareFunc.call(this, newMessage);
    }
    return newMessage;
  }
};
