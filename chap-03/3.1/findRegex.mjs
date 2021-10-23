import { EventEmitter } from "events";
import fs from "fs";

export class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    process.nextTick(() => this.emit("start", this.files));
    this.files.forEach((file) => {
      fs.readFile(file, "utf8", (err, content) => {
        if (err) {
          return this.emit("error", err);
        }

        this.emit("fileread", file);

        let match = null;
        if ((match = content.match(this.regex))) {
          match.forEach((elem) => this.emit("found", file, elem));
        }
      });
    });
    return this;
  }
}
