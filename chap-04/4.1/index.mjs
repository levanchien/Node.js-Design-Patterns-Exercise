import fs from "fs";

function concatFiles(dest, cb, ...files) {
  let index = 0;
  function concat() {
    fs.readFile(files[index], { encoding: "utf-8" }, (rError, content) => {
      if (rError) {
        return cb(rError);
      }
      fs.appendFile(dest, content, (wError) => {
        if (wError) {
          return cb(wError);
        }
        if (++index === files.length) {
          return cb();
        }
        concat();
      });
    });
  }

  concat();
}

concatFiles(
  "file3.txt",
  (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log("Done");
  },
  "file1.txt",
  "file2.txt"
);
