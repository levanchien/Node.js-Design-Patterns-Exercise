module.exports = class AsyncQueueIterator {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    this.queue.push(item);
  }

  done() {}

  [Symbol.asyncIterator]() {
    const self = this;
    return {
      async next() {
        const task = self.queue.shift();
        if (!task) {
          return {
            done: true,
          };
        }
        const result = await task();
        return {
          done: false,
          value: result,
        };
      },
    };
  }
};
