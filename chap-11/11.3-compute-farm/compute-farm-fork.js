import path from "path";
import { EventEmitter } from "events";
import ProcessPool from "./process-pool.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workers = new ProcessPool(
  path.resolve(__dirname, "compute-farm-worker.js"),
  2
);

export default class ComputeFarmFork extends EventEmitter {
  constructor() {
    super();
  }

  async compute(code) {
    const worker = await workers.acquire();
    worker.send({ code });
    const onMessage = ({ event, data }) => {
      if (event === "error" || event === "done") {
        worker.removeListener("message", onMessage);
        workers.release(worker);
      }
      this.emit(event, data);
    };
    worker.on("message", onMessage);
  }
}
