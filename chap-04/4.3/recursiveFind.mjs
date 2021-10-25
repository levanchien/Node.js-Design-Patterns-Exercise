import fs from "fs";
import { listNestedFiles } from "./listNestedFiles.mjs";

import TaskQueue from "./taskQueue.mjs";

const queue = new TaskQueue(2);

function findInFile(file, keyword, callback) {
  fs.readFile(file, { encoding: "utf-8" }, (error, content) => {
    if (error) {
      return callback(error);
    }
    if (content.includes(keyword)) {
      return callback(null, true);
    }
    return callback(null, false);
  });
}

function recursiveFind(dir, keyword, callback) {
  const result = [];
  listNestedFiles(dir, (error, files) => {
    if (error) {
      return callback(error);
    }
    let length = 0;
    files.forEach((file) => {
      queue.pushTask((done) => {
        findInFile(file, keyword, (fError, found) => {
          if (fError) {
            return callback(fError);
          }
          if (found) {
            result.push(file);
          }
          if (++length === files.length) {
            callback(null, result);
          }
          done();
        });
      });
    });
  });
}

recursiveFind("../..", "king", (err, files) => {
  if (err) {
    throw new Error(err);
  }

  console.log("Found: " + files.length + " files");
  console.log(files);
});
