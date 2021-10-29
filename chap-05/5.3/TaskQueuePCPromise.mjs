export class TaskQueuePCPromise {
  constructor(concurrency) {
    this.taskQueue = [];
    this.consumerQueue = [];
    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  /* get and execute task */
  consumer() {
    this.getNextTask().then(
      (task) => {
        task().finally(this.consumer.bind(this));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getNextTask() {
    return new Promise((resolve) => {
      if (this.taskQueue.length !== 0) {
        return resolve(this.taskQueue.shift());
      }

      this.consumerQueue.push(resolve);
    });
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const taskPromise = task();
        taskPromise.then(resolve, reject);
        return taskPromise;
      };

      if (this.consumerQueue.length !== 0) {
        const consumer = this.consumerQueue.shift();
        consumer(taskWrapper);
      } else {
        this.taskQueue.push(taskWrapper);
      }
    });
  }
}
