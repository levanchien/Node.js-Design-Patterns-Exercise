import http from "http";
import ComputeFarmFork from "./compute-farm-fork.js";

http
  .createServer((req, res) => {
    if (req.method !== "POST") {
      res.setHeader("Content-Type", "text/plain");
      res.writeHead(200);
      return res.end("Hello");
    }

    let code = "";
    req
      .on("data", (chunk) => {
        code += chunk.toString();
      })
      .on("end", () => {
        const computeFarm = new ComputeFarmFork();
        computeFarm.on("error", (result) => {
          res.setHeader("Content-Type", "text/plain");
          res.writeHead(500);
          return res.end(result);
        });
        computeFarm.on("done", (result) => {
          res.setHeader("Content-Type", "text/plain");
          res.writeHead(200);
          return res.end(`${result}`);
        });
        computeFarm.compute(code);
      });
  })
  .listen(8000);
