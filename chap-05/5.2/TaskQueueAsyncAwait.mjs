export class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          return resolve(result);
        } catch (error) {
          return reject(error);
        }
      });
      process.nextTick(this.next.bind(this));
    });
  }

  async next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.running++;
      await task();
      this.running--;
      this.next();
    }
  }
}
